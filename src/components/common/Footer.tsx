import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#22221F] text-[#F7F4EE] pt-20 pb-12 border-t border-[#343430]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#F7F4EE]/10">
          {/* Brand Column with Luxury Insignia Lockup */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="footer" onClick={() => onNavigate('/')} />
            <p className="text-base font-serif italic text-[#B6A17E] pt-1">
              Creating the Future of Luxury Hospitality.
            </p>
            <p className="text-sm text-[#F7F4EE]/70 font-sans max-w-sm leading-relaxed">
              A specialized content and brand storytelling studio crafting considered narratives for luxury hotels, private island sanctuaries, and hospitality collections.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-sans uppercase tracking-widest text-[#B6A17E] font-medium">
              Navigation
            </div>
            <ul className="space-y-2 text-sm font-sans text-[#F7F4EE]/80">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-[#B6A17E] transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/expertise')}
                  className="hover:text-[#B6A17E] transition-colors text-left"
                >
                  Expertise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/portfolio')}
                  className="hover:text-[#B6A17E] transition-colors text-left"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#B6A17E] transition-colors text-left"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#B6A17E] transition-colors text-left"
                >
                  Inquiries & Commissions
                </button>
              </li>
            </ul>
          </div>

          {/* Correspondence & Presence Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-sans uppercase tracking-widest text-[#B6A17E] font-medium">
              Correspondence
            </div>
            <div className="space-y-2 text-sm font-sans">
              <div>
                <a
                  href="mailto:aeonmediaofficial@gmail.com"
                  className="text-[#F7F4EE] hover:text-[#B6A17E] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>aeonmediaofficial@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/aeonmedia.co"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F7F4EE]/70 hover:text-[#B6A17E] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>@aeonmedia.co</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
              <p className="text-xs text-[#F7F4EE]/50 pt-3 leading-relaxed">
                Studio Desks: Monaco · London · Kyoto
                <br />
                Direct commissions for Autumn / Winter 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Lower Integrity & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-[#F7F4EE]/50">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} AEON MEDIA STUDIO. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Independent Luxury Practice</span>
            <span aria-hidden="true">·</span>
            <span>Monograph Series Vol. IV</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/admin')}
              className="text-[#B6A17E]/80 hover:text-[#B6A17E] transition-colors underline decoration-[#B6A17E]/40 underline-offset-4"
              title="Central Admin Dashboard for authorized studio personnel"
            >
              Studio Management Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
