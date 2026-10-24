export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  role?: string;
  service: string;
  details: string;
  status: 'new' | 'in_review' | 'responded' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  isConceptual: boolean; // strictly distinguishes conceptual samples from client work
  coverImage: string;
  location: string;
  summary: string;
  challenge: string;
  narrativeVoice: string;
  deliverables: string[];
  excerpts: { title: string; text: string }[];
  isPublished: boolean;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  suitableFor: string;
  clientOutcome: string;
  order: number;
}

export interface PageContent {
  slug: 'home' | 'expertise' | 'portfolio' | 'about' | 'contact';
  title: string;
  subtitle: string;
  heroHeading: string;
  heroSubtext: string;
  ctaPrimaryText: string;
  ctaSecondaryText?: string;
  sections: Record<string, any>;
  isPublished: boolean;
  lastEdited: string;
}

export interface BrandSettings {
  studioName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  instagramHandle: string;
  location: string;
  availabilityNotice: string;
  directInquiryOpen: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
