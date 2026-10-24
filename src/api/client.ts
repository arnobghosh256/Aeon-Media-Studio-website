import { 
  Inquiry, 
  PortfolioItem, 
  Service, 
  PageContent, 
  BrandSettings, 
  AdminUser, 
  ApiResponse 
} from '../types/index.ts';

const TOKEN_KEY = 'aeon_admin_token';

export const authStorage = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token: string, remember: boolean = true) {
    try {
      if (remember) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        sessionStorage.setItem(TOKEN_KEY, token);
      }
    } catch (e) {
      console.error('Failed to store token:', e);
    }
  },
  clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Failed to clear token:', e);
    }
  }
};

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await apiFetch<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const token = res.token || res.data?.token;
    const user = res.user || res.data?.user;

    if (token && user) {
      authStorage.setToken(token);
      return { token, user };
    }
    throw new Error(res.error || 'Login failed. Please verify credentials.');
  },

  async logout(): Promise<void> {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      authStorage.clearToken();
    }
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    const token = authStorage.getToken();
    if (!token) return null;
    try {
      const res = await apiFetch<any>('/api/auth/me');
      return res.user || res.data?.user || res.data || null;
    } catch {
      authStorage.clearToken();
      return null;
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<string> {
    const res = await apiFetch<ApiResponse<null>>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return res.message || 'Password updated';
  },

  // Inquiries
  async submitInquiry(inquiryData: {
    name: string;
    email: string;
    company: string;
    role?: string;
    service: string;
    details: string;
  }): Promise<{ message: string; inquiryId: string }> {
    const res = await apiFetch<{ success: boolean; message: string; inquiryId: string }>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
    return { message: res.message, inquiryId: res.inquiryId };
  },

  async getInquiries(): Promise<Inquiry[]> {
    const res = await apiFetch<ApiResponse<Inquiry[]>>('/api/inquiries');
    return res.data || [];
  },

  async updateInquiry(id: string, updates: { status?: Inquiry['status']; notes?: string }): Promise<Inquiry> {
    const res = await apiFetch<ApiResponse<Inquiry>>(`/api/inquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return res.data!;
  },

  async deleteInquiry(id: string): Promise<void> {
    await apiFetch(`/api/inquiries/${id}`, { method: 'DELETE' });
  },

  // Portfolio
  async getPortfolio(): Promise<PortfolioItem[]> {
    const res = await apiFetch<ApiResponse<PortfolioItem[]>>('/api/portfolio');
    return res.data || [];
  },

  async createPortfolioItem(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const res = await apiFetch<ApiResponse<PortfolioItem>>('/api/portfolio', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return res.data!;
  },

  async updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const res = await apiFetch<ApiResponse<PortfolioItem>>(`/api/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.data!;
  },

  async deletePortfolioItem(id: string): Promise<void> {
    await apiFetch(`/api/portfolio/${id}`, { method: 'DELETE' });
  },

  // Services
  async getServices(): Promise<Service[]> {
    const res = await apiFetch<ApiResponse<Service[]>>('/api/services');
    return res.data || [];
  },

  async createService(item: Partial<Service>): Promise<Service> {
    const res = await apiFetch<ApiResponse<Service>>('/api/services', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return res.data!;
  },

  async updateService(id: string, updates: Partial<Service>): Promise<Service> {
    const res = await apiFetch<ApiResponse<Service>>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.data!;
  },

  async deleteService(id: string): Promise<void> {
    await apiFetch(`/api/services/${id}`, { method: 'DELETE' });
  },

  // Pages
  async getPages(): Promise<Record<string, PageContent>> {
    const res = await apiFetch<ApiResponse<Record<string, PageContent>>>('/api/pages');
    return res.data || {};
  },

  async getPage(slug: string): Promise<PageContent> {
    const res = await apiFetch<ApiResponse<PageContent>>(`/api/pages/${slug}`);
    return res.data!;
  },

  async updatePage(slug: string, updates: Partial<PageContent>): Promise<PageContent> {
    const res = await apiFetch<ApiResponse<PageContent>>(`/api/pages/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.data!;
  },

  // Settings
  async getSettings(): Promise<BrandSettings> {
    const res = await apiFetch<ApiResponse<BrandSettings>>('/api/settings');
    return res.data!;
  },

  async updateSettings(updates: Partial<BrandSettings>): Promise<BrandSettings> {
    const res = await apiFetch<ApiResponse<BrandSettings>>('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.data!;
  },

  // Health
  async getHealth(): Promise<any> {
    return await apiFetch('/api/health');
  }
};
