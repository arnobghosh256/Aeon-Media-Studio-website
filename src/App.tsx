/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header.tsx';
import { Footer } from './components/common/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ExpertisePage } from './pages/ExpertisePage.tsx';
import { PortfolioPage } from './pages/PortfolioPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AdminLayout } from './pages/admin/AdminLayout.tsx';
import { AdminLogin } from './pages/admin/AdminLogin.tsx';
import { CaseStudyModal } from './components/portfolio/CaseStudyModal.tsx';
import { api } from './api/client.ts';
import { 
  Inquiry, 
  PortfolioItem, 
  Service, 
  PageContent, 
  BrandSettings, 
  AdminUser 
} from './types/index.ts';
import { 
  INITIAL_BRAND_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, 
  INITIAL_PAGES 
} from './data/initialData.ts';

export default function App() {
  // Current route path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Data states
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [pages, setPages] = useState<Record<string, PageContent>>(INITIAL_PAGES);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(INITIAL_BRAND_SETTINGS);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Admin Auth state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Active interaction states
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Synchronize route with browser history
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch initial public & studio data from Express backend
  useEffect(() => {
    async function loadData() {
      try {
        const [servData, portData, pagesData, settingsData] = await Promise.allSettled([
          api.getServices(),
          api.getPortfolio(),
          api.getPages(),
          api.getSettings(),
        ]);

        if (servData.status === 'fulfilled' && servData.value.length > 0) {
          setServices(servData.value);
        }
        if (portData.status === 'fulfilled' && portData.value.length > 0) {
          setPortfolio(portData.value);
        }
        if (pagesData.status === 'fulfilled' && Object.keys(pagesData.value).length > 0) {
          setPages(pagesData.value);
        }
        if (settingsData.status === 'fulfilled' && settingsData.value) {
          setBrandSettings(settingsData.value);
        }
      } catch (e) {
        console.warn('Initial data load completed with local fallback:', e);
      }
    }
    loadData();
  }, []);

  // Check admin authentication session on mount
  useEffect(() => {
    async function verifyAuth() {
      try {
        const user = await api.getCurrentUser();
        if (user) {
          setAdminUser(user);
          // If authenticated admin, also load full inquiries
          const inqs = await api.getInquiries();
          setInquiries(inqs);
        }
      } catch (e) {
        console.warn('Auth check concluded:', e);
      } finally {
        setCheckingAuth(false);
      }
    }
    verifyAuth();
  }, []);

  // Load inquiries whenever admin logs in and redirect to /admin/inquiries
  const handleAdminLoginSuccess = async (user: AdminUser) => {
    setAdminUser(user);
    try {
      const inqs = await api.getInquiries();
      setInquiries(inqs);
    } catch (e) {
      console.error(e);
    }
    navigate('/admin/inquiries');
  };

  // If user is authenticated and lands on /admin or /admin/, route directly to /admin/inquiries
  useEffect(() => {
    if (adminUser && (currentPath === '/admin' || currentPath === '/admin/')) {
      navigate('/admin/inquiries');
    }
  }, [adminUser, currentPath]);

  const handleAdminLogout = async () => {
    await api.logout();
    setAdminUser(null);
    navigate('/');
  };

  // Pre-select service from Expertise page
  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    navigate('/contact');
  };

  // Inquire from Case Study modal
  const handleInquireFromCaseStudy = (_projectName: string) => {
    setPreselectedService('Luxury Brand Storytelling & Voice Architecture');
    navigate('/contact');
  };

  // If path is /admin, render Admin Portal
  if (currentPath.startsWith('/admin')) {
    if (checkingAuth) {
      return (
        <div className="min-h-screen bg-[#22221F] flex items-center justify-center text-xs uppercase tracking-widest text-[#B6A17E] font-sans">
          Verifying Studio Security Session...
        </div>
      );
    }

    if (!adminUser) {
      return (
        <AdminLogin
          onSuccess={handleAdminLoginSuccess}
          onReturnToSite={() => navigate('/')}
        />
      );
    }

    return (
      <AdminLayout
        user={adminUser}
        currentPath={currentPath}
        inquiries={inquiries}
        portfolio={portfolio}
        services={services}
        pages={pages}
        brandSettings={brandSettings}
        onNavigate={navigate}
        onLogout={handleAdminLogout}
        onReturnToSite={() => navigate('/')}
        onInquiriesUpdated={setInquiries}
        onPortfolioUpdated={setPortfolio}
        onServicesUpdated={setServices}
        onPageUpdated={(slug, updated) => setPages((prev) => ({ ...prev, [slug]: updated }))}
        onSettingsUpdated={setBrandSettings}
      />
    );
  }

  // Otherwise, render Public Website
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#22221F]">
      {/* 1. Header (Shared across all public pages) */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {currentPath === '/' && (
          <HomePage
            pageContent={pages.home}
            services={services}
            portfolio={portfolio}
            onNavigate={navigate}
            onOpenCaseStudy={setSelectedCaseStudy}
          />
        )}

        {currentPath === '/expertise' && (
          <ExpertisePage
            pageContent={pages.expertise}
            services={services}
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
            onNavigate={navigate}
          />
        )}

        {currentPath === '/portfolio' && (
          <PortfolioPage
            pageContent={pages.portfolio}
            portfolio={portfolio}
            onOpenCaseStudy={setSelectedCaseStudy}
            onNavigate={navigate}
          />
        )}

        {currentPath === '/about' && (
          <AboutPage
            pageContent={pages.about}
            onNavigate={navigate}
          />
        )}

        {currentPath === '/contact' && (
          <ContactPage />
        )}
      </main>

      {/* 2. Footer (Shared across all public pages) */}
      <Footer onNavigate={navigate} />

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onInquire={handleInquireFromCaseStudy}
      />
    </div>
  );
}
