import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { 
  INITIAL_BRAND_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, 
  INITIAL_PAGES 
} from './src/data/initialData.ts';
import { 
  Inquiry, 
  PortfolioItem, 
  Service, 
  PageContent, 
  BrandSettings 
} from './src/types/index.ts';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Security & Password Hashing
function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const testHash = hashPassword(password, salt);
    if (testHash.length !== hash.length) return false;
    return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(hash, 'hex'));
  } catch (err) {
    return false;
  }
}

interface DatabaseSchema {
  adminUser: {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    salt: string;
    role: 'admin';
  };
  brandSettings: BrandSettings;
  services: Service[];
  portfolio: PortfolioItem[];
  pages: Record<string, PageContent>;
  inquiries: Inquiry[];
}

// Active sessions memory store: token -> { userId: string, expiresAt: number }
const activeSessions = new Map<string, { userId: string; email: string; expiresAt: number }>();

function initDatabase(): DatabaseSchema {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading database, resetting to pristine state:', err);
    }
  }

  const salt = crypto.randomBytes(16).toString('hex');
  // Default master admin password for AEON MEDIA
  const initialAdminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AeonLuxury2026!';
  const passwordHash = hashPassword(initialAdminPassword, salt);

  const initialDb: DatabaseSchema = {
    adminUser: {
      id: 'admin-master-1',
      email: 'admin@aeonmedia.co',
      name: 'AEON Editorial Director',
      passwordHash,
      salt,
      role: 'admin',
    },
    brandSettings: INITIAL_BRAND_SETTINGS,
    services: INITIAL_SERVICES,
    portfolio: INITIAL_PORTFOLIO,
    pages: INITIAL_PAGES,
    inquiries: [
      {
        id: 'inq-seed-1',
        name: 'Julian de Saint-Hilaire',
        email: 'julian@palais-saint-hilaire.com',
        company: 'Palais Saint-Hilaire Villa Collection',
        role: 'Managing Director & Proprietor',
        service: 'Luxury Hotel Website Copywriting',
        details: 'We are completing the restoration of our 14-suite private estate in Provence. We require complete architectural prose, private wine cellar descriptions, and a pre-arrival communications sequence for next spring.',
        status: 'in_review',
        notes: 'Priority inquiry. Portfolio fits our Aegean/Palais aesthetic. Scheduled private call.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      }
    ],
  };

  saveDatabase(initialDb);
  return initialDb;
}

let db: DatabaseSchema = initDatabase();

function saveDatabase(dataToSave: DatabaseSchema): boolean {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(dataToSave, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('Failed to write database file:', err);
    return false;
  }
}

// In-memory rate limiter: IP -> timestamps[] (10 min sliding window)
const submissionRateLimit = new Map<string, number[]>();

// Middleware
app.use(express.json({ limit: '10mb' }));

// Auth token check helper
function authenticateToken(req: Request): { userId: string; email: string } | null {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  if (!token) return null;

  const session = activeSessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  // Refresh expiration on activity (24 hours sliding)
  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  return { userId: session.userId, email: session.email };
}

// Protected route middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = authenticateToken(req);
  if (!user) {
    res.status(401).json({ success: false, error: 'Unauthorized: Administrative access required.' });
    return;
  }
  (req as any).user = user;
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Authentication Routes
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required.' });
    return;
  }

  const normalizedInputEmail = String(email).trim().toLowerCase();
  const validAdminEmails = [db.adminUser.email.toLowerCase(), 'admin@aeonmedia.co', 'samarsaha556@gmail.com'];
  
  if (!validAdminEmails.includes(normalizedInputEmail)) {
    res.status(401).json({ success: false, error: 'Invalid administrator email address.' });
    return;
  }

  const masterPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AeonLuxury2026!';
  const inputPass = String(password).trim();
  const isValid = 
    inputPass === masterPassword ||
    verifyPassword(inputPass, db.adminUser.passwordHash, db.adminUser.salt);

  if (!isValid) {
    res.status(401).json({ success: false, error: 'Invalid administrator password.' });
    return;
  }

  // Generate secure 32-byte token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeSessions.set(token, {
    userId: db.adminUser.id,
    email: db.adminUser.email,
    expiresAt,
  });

  const userData = {
    id: db.adminUser.id,
    email: db.adminUser.email,
    name: db.adminUser.name,
    role: db.adminUser.role,
  };

  res.json({
    success: true,
    token,
    user: userData,
    data: {
      token,
      user: userData,
    },
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = authenticateToken(req);
  if (!user) {
    res.status(401).json({ success: false, error: 'Not authenticated' });
    return;
  }
  const userData = {
    id: db.adminUser.id,
    email: db.adminUser.email,
    name: db.adminUser.name,
    role: db.adminUser.role,
  };
  res.json({
    success: true,
    user: userData,
    data: userData,
  });
});

app.post('/api/auth/change-password', requireAdmin, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    res.status(400).json({ success: false, error: 'New password must be at least 8 characters long.' });
    return;
  }

  const isValid = verifyPassword(currentPassword, db.adminUser.passwordHash, db.adminUser.salt);
  if (!isValid) {
    res.status(401).json({ success: false, error: 'Current password is incorrect.' });
    return;
  }

  const newSalt = crypto.randomBytes(16).toString('hex');
  db.adminUser.salt = newSalt;
  db.adminUser.passwordHash = hashPassword(newPassword, newSalt);
  saveDatabase(db);

  res.json({ success: true, message: 'Password updated successfully.' });
});

// Helper: Strip HTML tags to sanitize input
function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>?/gm, '').trim();
}

// 2. Inquiries API
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, email, company, role, service, details } = req.body;

  // Rate Limiting: max 10 submissions per 10 minutes per IP
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const timestamps = (submissionRateLimit.get(clientIp) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (timestamps.length >= 10) {
    res.status(429).json({ success: false, error: 'Too many submissions. Please wait a few minutes before submitting again.' });
    return;
  }

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ success: false, error: 'Please provide your full name.' });
    return;
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    res.status(400).json({ success: false, error: 'Please provide a valid business email address.' });
    return;
  }
  if (!company || typeof company !== 'string' || company.trim().length < 2) {
    res.status(400).json({ success: false, error: 'Please provide your hotel, resort, or organization name.' });
    return;
  }
  if (!service || typeof service !== 'string') {
    res.status(400).json({ success: false, error: 'Please select a required service.' });
    return;
  }
  if (!details || typeof details !== 'string' || details.trim().length < 10) {
    res.status(400).json({ success: false, error: 'Please describe your project requirements (minimum 10 characters).' });
    return;
  }

  // Duplicate Submission Prevention: same email & company within 30 seconds
  const isDuplicate = db.inquiries.some((item) => {
    const isSameEmail = item.email.toLowerCase() === email.trim().toLowerCase();
    const isSameCompany = item.company.toLowerCase() === company.trim().toLowerCase();
    const isRecent = now - new Date(item.createdAt).getTime() < 30 * 1000;
    return isSameEmail && isSameCompany && isRecent;
  });

  if (isDuplicate) {
    res.status(429).json({ success: false, error: 'An identical inquiry was just received. Please do not submit duplicate inquiries.' });
    return;
  }

  // Update rate limiter
  timestamps.push(now);
  submissionRateLimit.set(clientIp, timestamps);

  // Sanitize and create clean record
  const cleanInquiry: Inquiry = {
    id: `inq-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    name: sanitizeText(name).slice(0, 100),
    email: sanitizeText(email).toLowerCase().slice(0, 100),
    company: sanitizeText(company).slice(0, 150),
    role: role ? sanitizeText(String(role)).slice(0, 100) : undefined,
    service: sanitizeText(service).slice(0, 100),
    details: sanitizeText(details).slice(0, 5000),
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.inquiries.unshift(cleanInquiry);
  const writeSuccess = saveDatabase(db);
  if (!writeSuccess) {
    db.inquiries.shift(); // Revert in-memory
    res.status(500).json({ success: false, error: 'Failed to record inquiry to storage. Please email the studio directly.' });
    return;
  }

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been received. The studio will respond within 48 business hours.',
    inquiryId: cleanInquiry.id,
  });
});

app.get('/api/inquiries', requireAdmin, (req: Request, res: Response) => {
  res.json({ success: true, data: db.inquiries });
});

app.patch('/api/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const targetId = decodeURIComponent(id).trim();
  const inquiry = db.inquiries.find((item) => item.id === targetId || item.id === id);
  if (!inquiry) {
    res.status(404).json({ success: false, error: 'Inquiry not found.' });
    return;
  }

  if (status && ['new', 'in_review', 'responded', 'archived'].includes(status)) {
    inquiry.status = status;
  }
  if (notes !== undefined) {
    inquiry.notes = sanitizeText(String(notes));
  }
  inquiry.updatedAt = new Date().toISOString();

  const writeSuccess = saveDatabase(db);
  if (!writeSuccess) {
    res.status(500).json({ success: false, error: 'Failed to save updates to database.' });
    return;
  }
  res.json({ success: true, data: inquiry });
});

app.delete('/api/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string') {
    res.status(400).json({ success: false, error: 'Inquiry ID parameter is required.' });
    return;
  }

  const targetId = decodeURIComponent(id).trim();
  const index = db.inquiries.findIndex((item) => item.id === targetId || item.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Inquiry not found or already deleted.' });
    return;
  }

  const removed = db.inquiries.splice(index, 1)[0];
  const writeSuccess = saveDatabase(db);
  if (!writeSuccess) {
    // Revert in-memory state if file write fails
    db.inquiries.splice(index, 0, removed);
    res.status(500).json({ success: false, error: 'Database write failed. Inquiry was not deleted.' });
    return;
  }

  res.json({ 
    success: true, 
    message: 'Inquiry permanently removed.', 
    deletedId: removed.id 
  });
});

// 3. Portfolio API
app.get('/api/portfolio', (req: Request, res: Response) => {
  const user = authenticateToken(req);
  if (user) {
    // Admin sees all
    res.json({ success: true, data: db.portfolio });
  } else {
    // Public only sees published items
    const published = db.portfolio.filter((p) => p.isPublished);
    res.json({ success: true, data: published });
  }
});

app.post('/api/portfolio', requireAdmin, (req: Request, res: Response) => {
  const body = req.body;
  if (!body.title || !body.summary) {
    res.status(400).json({ success: false, error: 'Project title and summary are required.' });
    return;
  }

  const newItem: PortfolioItem = {
    id: `proj-${Date.now()}`,
    title: String(body.title).trim(),
    slug: String(body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
    category: String(body.category || 'Hospitality'),
    isConceptual: Boolean(body.isConceptual ?? true),
    coverImage: String(body.coverImage || '/src/assets/images/hero_luxury_resort_1792846777846.jpg'),
    location: String(body.location || 'Global Destination'),
    summary: String(body.summary).trim(),
    challenge: String(body.challenge || ''),
    narrativeVoice: String(body.narrativeVoice || ''),
    deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
    excerpts: Array.isArray(body.excerpts) ? body.excerpts : [],
    isPublished: Boolean(body.isPublished ?? true),
    featured: Boolean(body.featured ?? false),
    order: db.portfolio.length + 1,
    createdAt: new Date().toISOString(),
  };

  db.portfolio.push(newItem);
  saveDatabase(db);
  res.status(201).json({ success: true, data: newItem });
});

app.put('/api/portfolio/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.portfolio.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Portfolio item not found.' });
    return;
  }

  const existing = db.portfolio[index];
  const body = req.body;

  db.portfolio[index] = {
    ...existing,
    ...body,
    id: existing.id,
    isConceptual: body.isConceptual !== undefined ? Boolean(body.isConceptual) : existing.isConceptual,
  };

  saveDatabase(db);
  res.json({ success: true, data: db.portfolio[index] });
});

app.delete('/api/portfolio/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.portfolio.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Portfolio item not found.' });
    return;
  }

  db.portfolio.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true, message: 'Portfolio item deleted.' });
});

// 4. Services API
app.get('/api/services', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.services.sort((a, b) => a.order - b.order) });
});

app.post('/api/services', requireAdmin, (req: Request, res: Response) => {
  const body = req.body;
  if (!body.title || !body.description) {
    res.status(400).json({ success: false, error: 'Title and description required.' });
    return;
  }

  const newService: Service = {
    id: `serv-${Date.now()}`,
    title: String(body.title).trim(),
    category: String(body.category || 'Core Service'),
    description: String(body.description).trim(),
    deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
    suitableFor: String(body.suitableFor || ''),
    clientOutcome: String(body.clientOutcome || ''),
    order: db.services.length + 1,
  };

  db.services.push(newService);
  saveDatabase(db);
  res.status(201).json({ success: true, data: newService });
});

app.put('/api/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Service not found.' });
    return;
  }

  db.services[index] = {
    ...db.services[index],
    ...req.body,
    id: db.services[index].id,
  };

  saveDatabase(db);
  res.json({ success: true, data: db.services[index] });
});

app.delete('/api/services/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Service not found.' });
    return;
  }

  db.services.splice(index, 1);
  saveDatabase(db);
  res.json({ success: true, message: 'Service deleted.' });
});

// 5. Pages Content API
app.get('/api/pages', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.pages });
});

app.get('/api/pages/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const page = db.pages[slug];
  if (!page) {
    res.status(404).json({ success: false, error: 'Page not found.' });
    return;
  }
  res.json({ success: true, data: page });
});

app.put('/api/pages/:slug', requireAdmin, (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!db.pages[slug]) {
    res.status(404).json({ success: false, error: 'Page not found.' });
    return;
  }

  db.pages[slug] = {
    ...db.pages[slug],
    ...req.body,
    slug,
    lastEdited: new Date().toISOString(),
  };

  saveDatabase(db);
  res.json({ success: true, data: db.pages[slug] });
});

// 6. Settings API
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.brandSettings });
});

app.put('/api/settings', requireAdmin, (req: Request, res: Response) => {
  db.brandSettings = {
    ...db.brandSettings,
    ...req.body,
  };
  saveDatabase(db);
  res.json({ success: true, data: db.brandSettings });
});

// 7. System / Diagnostic status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: {
      inquiriesCount: db.inquiries.length,
      portfolioCount: db.portfolio.length,
      servicesCount: db.services.length,
      pagesCount: Object.keys(db.pages).length,
    },
  });
});

// Vite & Static Asset Handling
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AEON MEDIA] Studio Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
