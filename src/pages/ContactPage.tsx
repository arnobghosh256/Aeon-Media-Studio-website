import React, { useState } from 'react';
import { Mail, ArrowUpRight, MapPin, Clock, Copy, Check, Sparkles } from 'lucide-react';
import { PageContent, Service } from '../types/index.ts';
import { BrandLogo, LOGO_ASSET_PATH } from '../components/common/BrandLogo.tsx';

interface ContactPageProps {
  pageContent?: PageContent;
  services?: Service[];
  preselectedService?: string;
  onSuccess?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [copied, setCopied] = useState(false);

  const directEmail = 'aeonmediaofficial@gmail.com';
  const mailtoSubject = 'AEON%20MEDIA%20Project%20Enquiry';
  const fullMailtoLink = `mailto:${directEmail}?subject=${mailtoSubject}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="w-full bg-[#F7F4EE] text-[#22221F]">
      {/* 1. Header Banner */}
      <section className="pt-12 pb-14 lg:pt-16 lg:pb-20 border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#B6A17E]/60 ring-1 ring-[#22221F]/10 bg-[#161614] shrink-0">
              <img
                src={LOGO_ASSET_PATH}
                alt="AEON MEDIA Insignia"
                className="w-full h-full object-cover object-top scale-130"
              />
            </div>
            <span>Commissions & Direct Inquiries</span>
            <span aria-hidden="true" className="text-[#22221F]/30">·</span>
            <span>Atelier de Haute Rédaction</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#22221F] tracking-tight max-w-4xl uppercase">
            COMMISSION A NARRATIVE
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[#B6A17E] max-w-2xl leading-relaxed">
            Every exceptional property has a story worth telling.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Editorial Invitation Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Editorial Narrative Statement */}
            <div className="p-8 sm:p-12 lg:p-14 bg-white border border-[#22221F]/10 shadow-sm space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-[#22221F]/8">
                <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#B6A17E]" />
                  <span>Direct Hospitality Commissions</span>
                </div>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#22221F]/40 hidden sm:inline">
                  Strict Confidentiality Assured
                </span>
              </div>

              {/* Body Prose */}
              <div className="space-y-6 text-[#22221F]/85 text-base sm:text-lg font-sans leading-relaxed">
                <p>
                  At AEON MEDIA, we partner with hotels, luxury resorts, villas, and hospitality groups to craft distinctive brand narratives, refined guest communications, and strategic content designed to support direct-booking experiences.
                </p>
                <p>
                  Whether you are launching a new property, refining your brand voice, or exploring a long-term content partnership, we welcome the opportunity to learn about your vision.
                </p>
              </div>

              {/* Architectural Gold Rule */}
              <div className="pt-2">
                <div className="w-16 h-0.5 bg-[#B6A17E]/60" />
              </div>

              {/* Closing Invitation & Actions */}
              <div className="pt-4 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#22221F] tracking-tight uppercase">
                  LET'S BEGIN A CONVERSATION
                </h2>

                <p className="text-sm sm:text-base font-sans text-[#22221F]/75 leading-relaxed max-w-2xl">
                  For project enquiries, creative collaborations, and partnership opportunities, please contact our team directly.
                </p>

                {/* Action Buttons & Mailto Triggers */}
                <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Primary Email Button */}
                  <a
                    href={fullMailtoLink}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#22221F] text-[#F7F4EE] hover:bg-[#B6A17E] hover:text-[#22221F] active:scale-[0.99] border border-[#22221F] hover:border-[#B6A17E] text-xs font-sans uppercase tracking-[0.14em] font-medium transition-all shadow-md group cursor-pointer"
                    aria-label="Email our team regarding a project enquiry"
                  >
                    <Mail className="w-4 h-4 text-[#B6A17E] group-hover:text-[#22221F] transition-colors" />
                    <span>EMAIL OUR TEAM →</span>
                  </a>

                  {/* Copy Email Helper Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#F7F4EE] hover:bg-[#EFECE6] border border-[#22221F]/15 text-[#22221F] text-xs font-sans tracking-wide transition-colors cursor-pointer"
                    title="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span className="text-emerald-800 font-medium">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#22221F]/60" />
                        <span>Copy Email Address</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Display Email Link & Technical Note */}
                <div className="pt-4 space-y-2 border-t border-[#22221F]/8">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-sans">
                    <span className="text-xs uppercase tracking-wider text-[#22221F]/50 font-medium">
                      Direct Studio Inquiries:
                    </span>
                    <a
                      href={fullMailtoLink}
                      className="text-[#22221F] hover:text-[#B6A17E] font-medium underline underline-offset-4 decoration-[#B6A17E]/60 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>{directEmail}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  </div>
                  <p className="text-xs text-[#22221F]/50 font-sans italic">
                    Note: Clicking the button or link opens your device's default email application to compose a message directly to our studio directors.
                  </p>
                </div>
              </div>
            </div>

            {/* Commission Scope & Editorial Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
              <div className="p-6 bg-white border border-[#22221F]/10 space-y-2">
                <span className="text-[#B6A17E] font-serif text-lg font-normal block">01</span>
                <strong className="block text-[#22221F] uppercase tracking-wider font-semibold">
                  Independent Sanctuaries
                </strong>
                <p className="text-[#22221F]/70 leading-relaxed">
                  Boutique hideaways, heritage villas, and private island retreats requiring bespoke poetic prose.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#22221F]/10 space-y-2">
                <span className="text-[#B6A17E] font-serif text-lg font-normal block">02</span>
                <strong className="block text-[#22221F] uppercase tracking-wider font-semibold">
                  Flagship Launches
                </strong>
                <p className="text-[#22221F]/70 leading-relaxed">
                  Comprehensive architectural website prose, spatial descriptions, and brand codex architecture.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#22221F]/10 space-y-2">
                <span className="text-[#B6A17E] font-serif text-lg font-normal block">03</span>
                <strong className="block text-[#22221F] uppercase tracking-wider font-semibold">
                  Pre-Arrival Journeys
                </strong>
                <p className="text-[#22221F]/70 leading-relaxed">
                  Curated concierge sequences and loyalty correspondence that eliminate commoditized transactional language.
                </p>
              </div>
            </div>
          </div>

          {/* Studio Sidebar: Desks & Correspondence */}
          <div className="lg:col-span-4 space-y-8">
            {/* Direct Studio Desk */}
            <div className="p-8 bg-white border border-[#22221F]/10 space-y-6 shadow-sm">
              <div className="pb-4 border-b border-[#22221F]/8">
                <BrandLogo variant="header" showSubtitle={true} />
              </div>

              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                Direct Correspondence
              </div>

              <div className="space-y-4 text-sm font-sans">
                <div>
                  <span className="text-xs text-[#22221F]/50 block mb-1">Direct Commission Desk</span>
                  <a
                    href={fullMailtoLink}
                    className="text-[#22221F] hover:text-[#B6A17E] font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{directEmail}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#22221F]/50 block mb-1">Curated Journal & Social</span>
                  <a
                    href="https://instagram.com/aeonmedia.co"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#22221F] hover:text-[#B6A17E] font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>@aeonmedia.co</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Desks */}
            <div className="p-8 bg-white border border-[#22221F]/10 space-y-4 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                Studio Desks
              </div>
              <ul className="space-y-3.5 text-xs font-sans text-[#22221F]/70">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B6A17E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#22221F] block">Monaco & Côte d'Azur</strong>
                    <span>Riviera & Mediterranean Villa Commissions</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B6A17E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#22221F] block">London</strong>
                    <span>European Heritage & Editorial Publishing</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B6A17E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#22221F] block">Kyoto</strong>
                    <span>Asia-Pacific & Sukiya Sanctuaries</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Timeline & Availability */}
            <div className="p-6 bg-[#EFECE6]/70 border border-[#22221F]/10 space-y-2 text-xs font-sans text-[#22221F]/80">
              <div className="flex items-center gap-2 text-[#B6A17E] font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Response Standard</span>
              </div>
              <p className="leading-relaxed">
                All qualified hotel, villa, and resort briefs receive a direct reply from our principals within 48 business hours with preliminary scheduling guidance.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
