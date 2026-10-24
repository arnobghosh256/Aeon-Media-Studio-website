import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Briefcase, 
  Inbox, 
  Sliders, 
  HardDrive, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { AdminOverview } from './AdminOverview.tsx';
import { AdminPages } from './AdminPages.tsx';
import { AdminServices } from './AdminServices.tsx';
import { AdminPortfolio } from './AdminPortfolio.tsx';
import { AdminInquiries } from './AdminInquiries.tsx';
import { AdminBrandAndSEOSettings } from './AdminBrandAndSEOSettings.tsx';
import { AdminSiteSettings } from './AdminSiteSettings.tsx';
import { 
  AdminUser, 
  Inquiry, 
  PortfolioItem, 
  Service, 
  PageContent, 
  BrandSettings 
} from '../../types/index.ts';

interface AdminLayoutProps {
  user: AdminUser;
  currentPath: string;
  inquiries: Inquiry[];
  portfolio: PortfolioItem[];
  services: Service[];
  pages: Record<string, PageContent>;
  brandSettings: BrandSettings;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onReturnToSite: () => void;
  onInquiriesUpdated: (inquiries: Inquiry[]) => void;
  onPortfolioUpdated: (items: PortfolioItem[]) => void;
  onServicesUpdated: (services: Service[]) => void;
  onPageUpdated: (slug: string, updated: PageContent) => void;
  onSettingsUpdated: (settings: BrandSettings) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  user,
  currentPath,
  inquiries,
  portfolio,
  services,
  pages,
  brandSettings,
  onNavigate,
  onLogout,
  onReturnToSite,
  onInquiriesUpdated,
  onPortfolioUpdated,
  onServicesUpdated,
  onPageUpdated,
  onSettingsUpdated,
}) => {
  const [selectedInquiryForView, setSelectedInquiryForView] = useState<Inquiry | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Derive active tab directly from URL path, defaulting strictly to 'inquiries'
  const getTabFromPath = (path: string): string => {
    if (path === '/admin/overview' || path.startsWith('/admin/overview')) return 'overview';
    if (path === '/admin/inquiries' || path.startsWith('/admin/inquiries')) return 'inquiries';
    if (path === '/admin/pages' || path.startsWith('/admin/pages')) return 'pages';
    if (path === '/admin/services' || path.startsWith('/admin/services')) return 'services';
    if (path === '/admin/portfolio' || path.startsWith('/admin/portfolio')) return 'portfolio';
    if (path === '/admin/settings' || path.startsWith('/admin/settings') || path.startsWith('/admin/brand') || path.startsWith('/admin/seo')) return 'settings';
    if (path === '/admin/site' || path.startsWith('/admin/site')) return 'site';
    return 'inquiries'; // DEFAULT IS INQUIRIES
  };

  const activeTab = getTabFromPath(currentPath);
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  // Strict sidebar navigation order required by specifications:
  // 1. Overview
  // 2. Inquiries
  // 3. Pages
  // 4. Services
  // 5. Portfolio
  // 6. Brand & SEO Settings
  // 7. Site Settings
  // 8. Logout
  const navigationItems = [
    { 
      id: 'overview', 
      path: '/admin/overview', 
      label: 'Overview', 
      icon: LayoutDashboard 
    },
    { 
      id: 'inquiries', 
      path: '/admin/inquiries', 
      label: 'Inquiries', 
      icon: Inbox, 
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
      isPrimaryAction: true,
    },
    { 
      id: 'pages', 
      path: '/admin/pages', 
      label: 'Pages', 
      icon: FileText 
    },
    { 
      id: 'services', 
      path: '/admin/services', 
      label: 'Services', 
      icon: Layers 
    },
    { 
      id: 'portfolio', 
      path: '/admin/portfolio', 
      label: 'Portfolio', 
      icon: Briefcase 
    },
    { 
      id: 'settings', 
      path: '/admin/settings', 
      label: 'Brand & SEO Settings', 
      icon: Sliders 
    },
    { 
      id: 'site', 
      path: '/admin/site', 
      label: 'Site Settings', 
      icon: HardDrive 
    },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#22221F] flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#22221F] text-[#F7F4EE] border-r border-[#343430] shrink-0 min-h-screen">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#343430] space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-[#B6A17E] font-semibold">
            Central Studio Console
          </div>
          <div className="text-xl font-serif text-[#F7F4EE] tracking-tight">
            AEON MEDIA
          </div>
        </div>

        {/* Navigation List in exact required order */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isInquiries = item.id === 'inquiries';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-sans tracking-wide transition-all text-left relative ${
                  isActive
                    ? isInquiries
                      ? 'bg-[#B6A17E] text-[#22221F] font-bold shadow-sm ring-1 ring-[#CBB99C]'
                      : 'bg-[#B6A17E] text-[#22221F] font-semibold'
                    : isInquiries
                    ? 'text-[#F7F4EE] hover:bg-[#2B2B27] border-l-2 border-[#B6A17E]/60'
                    : 'text-[#F7F4EE]/70 hover:bg-[#2B2B27] hover:text-[#F7F4EE]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isInquiries && !isActive ? 'text-[#B6A17E]' : ''}`} />
                  <span className={isInquiries ? 'font-medium' : ''}>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 font-bold ${
                        isActive
                          ? 'bg-[#22221F] text-[#F7F4EE]'
                          : 'bg-[#B6A17E] text-[#22221F]'
                      }`}
                      title={`${item.badge} new inquiry submissions`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout at bottom */}
        <div className="p-4 border-t border-[#343430] space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-7 h-7 bg-[#B6A17E] text-[#22221F] flex items-center justify-center font-bold text-xs">
              {user.name.slice(0, 1)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-[#F7F4EE] truncate">{user.name}</div>
              <div className="text-[10px] text-[#F7F4EE]/50 truncate">{user.email}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#F7F4EE]/60 hover:text-red-400 hover:bg-[#2B2B27] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#22221F]/10 px-6 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-1.5 text-[#22221F] hover:text-[#B6A17E]"
              aria-label="Toggle admin sidebar"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-xs uppercase tracking-wider font-sans text-[#22221F]/60">
              Admin / <strong className="text-[#22221F] capitalize">{activeTab.replace('_', ' ')}</strong>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans text-[#22221F] bg-[#F7F4EE] hover:bg-[#EFECE6] border border-[#22221F]/15 transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-[#22221F]/90 backdrop-blur-sm md:hidden flex flex-col p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="font-serif text-lg text-white">AEON MEDIA Dashboard</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 text-white hover:text-[#B6A17E]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left ${
                      isActive ? 'bg-[#B6A17E] text-[#22221F] font-semibold' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-xs font-mono bg-[#22221F] text-white px-2 py-0.5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <button
                onClick={onReturnToSite}
                className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-white border border-white/20"
              >
                View Public Website
              </button>
              <button
                onClick={onLogout}
                className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-red-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'inquiries' && (
              <AdminInquiries
                inquiries={inquiries}
                onInquiriesUpdated={onInquiriesUpdated}
                selectedInquiry={selectedInquiryForView}
              />
            )}

            {activeTab === 'overview' && (
              <AdminOverview
                inquiries={inquiries}
                portfolio={portfolio}
                services={services}
                pages={pages}
                onNavigateTab={(tab) => {
                  if (tab === 'inquiries') onNavigate('/admin/inquiries');
                  else if (tab === 'pages') onNavigate('/admin/pages');
                  else if (tab === 'services') onNavigate('/admin/services');
                  else if (tab === 'portfolio') onNavigate('/admin/portfolio');
                  else onNavigate('/admin/overview');
                }}
                onSelectInquiry={(inq) => {
                  setSelectedInquiryForView(inq);
                  onNavigate('/admin/inquiries');
                }}
              />
            )}

            {activeTab === 'pages' && (
              <AdminPages
                pages={pages}
                onPageUpdated={onPageUpdated}
              />
            )}

            {activeTab === 'services' && (
              <AdminServices
                services={services}
                onServicesUpdated={onServicesUpdated}
              />
            )}

            {activeTab === 'portfolio' && (
              <AdminPortfolio
                portfolio={portfolio}
                onPortfolioUpdated={onPortfolioUpdated}
              />
            )}

            {activeTab === 'settings' && (
              <AdminBrandAndSEOSettings
                settings={brandSettings}
                onSettingsUpdated={onSettingsUpdated}
              />
            )}

            {activeTab === 'site' && (
              <AdminSiteSettings />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
