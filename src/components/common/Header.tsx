import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

import { BrandLogo } from './BrandLogo.tsx';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Expertise', path: '/expertise' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#22221F]/8 py-3 shadow-[0_4px_24px_rgba(34,34,31,0.03)]'
            : 'bg-[#F7F4EE] border-b border-[#22221F]/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Luxury Brand Emblem & Wordmark */}
          <BrandLogo variant="header" onClick={() => handleLinkClick('/')} />

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-[#22221F]/70"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6A17E] ${
                    isActive
                      ? 'text-[#22221F] font-semibold'
                      : 'hover:text-[#22221F]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B6A17E]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('/contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-medium uppercase tracking-wider text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] active:scale-[0.98] transition-all rounded-none border border-[#22221F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6A17E] whitespace-nowrap shrink-0"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#22221F] hover:text-[#B6A17E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6A17E]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-[#F7F4EE] flex flex-col md:hidden border-t border-[#22221F]/10 px-8 py-10 animate-in fade-in duration-200">
          <div className="mb-8 pb-6 border-b border-[#22221F]/10 flex items-center justify-between">
            <BrandLogo variant="header" onClick={() => handleLinkClick('/')} />
          </div>

          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold mb-6">
            Navigation
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-2xl font-serif text-left transition-colors ${
                  currentPath === link.path
                    ? 'text-[#B6A17E] font-medium'
                    : 'text-[#22221F] hover:text-[#B6A17E]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-[#22221F]/10 flex flex-col gap-4">
            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full py-3.5 text-center text-xs font-sans font-medium uppercase tracking-wider text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors"
            >
              Discuss a Project
            </button>
            <div className="text-xs text-[#22221F]/60 flex justify-between items-center pt-2">
              <span>aeonmediaofficial@gmail.com</span>
              <span>@aeonmedia.co</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
