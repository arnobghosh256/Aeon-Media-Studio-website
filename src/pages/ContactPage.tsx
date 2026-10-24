import React from 'react';
import { ArrowUpRight, Mail, Instagram, MapPin, Clock } from 'lucide-react';
import { InquiryForm } from '../components/contact/InquiryForm.tsx';
import { PageContent, Service } from '../types/index.ts';

interface ContactPageProps {
  pageContent?: PageContent;
  services: Service[];
  preselectedService?: string;
  onSuccess?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  pageContent,
  services,
  preselectedService,
  onSuccess,
}) => {
  const heroHeading = pageContent?.heroHeading || "Let's Give Your Property the Voice It Deserves.";
  const heroSubtext = pageContent?.heroSubtext || "We collaborate with a limited number of exceptional properties each season to ensure uncompromising quality.";

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#22221F]/10 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            Inquiries & Commissions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#22221F] tracking-tight max-w-4xl text-balance">
            {heroHeading}
          </h1>
          <p className="text-base sm:text-lg font-sans text-[#22221F]/80 max-w-2xl leading-relaxed">
            {heroSubtext}
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Studio Sidebar */}
      <section className="py-16 lg:py-24 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Inquiry Form Column */}
          <div className="lg:col-span-8">
            <InquiryForm
              services={services}
              preselectedService={preselectedService}
              onSuccess={onSuccess}
            />
          </div>

          {/* Studio Correspondence & Desks Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Direct Studio Desk */}
            <div className="p-8 bg-white border border-[#22221F]/10 space-y-6">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                Direct Correspondence
              </div>

              <div className="space-y-4 text-sm font-sans">
                <div>
                  <span className="text-xs text-[#22221F]/50 block mb-1">Direct Commission Email</span>
                  <a
                    href="mailto:aeonmediaofficial@gmail.com"
                    className="text-[#22221F] hover:text-[#B6A17E] font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>aeonmediaofficial@gmail.com</span>
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
            <div className="p-8 bg-white border border-[#22221F]/10 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                Studio Desks
              </div>
              <ul className="space-y-3 text-xs font-sans text-[#22221F]/70">
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
            <div className="p-6 bg-[#EFECE6]/60 border border-[#22221F]/10 space-y-2 text-xs font-sans text-[#22221F]/80">
              <div className="flex items-center gap-2 text-[#B6A17E] font-medium uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Response Standard</span>
              </div>
              <p className="leading-relaxed">
                All qualified hotel and resort briefs receive a direct, personal reply within 48 business hours with preliminary scheduling guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
