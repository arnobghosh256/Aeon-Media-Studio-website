import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageContent, Service } from '../types/index.ts';
import { BrandLogo, LOGO_ASSET_PATH } from '../components/common/BrandLogo.tsx';

interface ExpertisePageProps {
  pageContent?: PageContent;
  services: Service[];
  onSelectServiceForInquiry: (serviceTitle: string) => void;
  onNavigate: (path: string) => void;
}

export const ExpertisePage: React.FC<ExpertisePageProps> = ({
  pageContent,
  services,
  onSelectServiceForInquiry,
  onNavigate,
}) => {
  const heroHeading = pageContent?.heroHeading || "The Art of Considered Hospitality Communication.";
  const heroSubtext = pageContent?.heroSubtext || "Every service we offer is tailored exclusively to luxury hotels, boutique resorts, private villas, and hospitality groups.";

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#22221F]/10 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#B6A17E]/60 ring-1 ring-[#22221F]/10 bg-[#161614] shrink-0">
              <img
                src={LOGO_ASSET_PATH}
                alt="AEON MEDIA Seal"
                className="w-full h-full object-cover object-top scale-130"
              />
            </div>
            <span>Services & Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>AEON MEDIA Practice</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#22221F] tracking-tight max-w-4xl text-balance">
            {heroHeading}
          </h1>
          <p className="text-base sm:text-lg font-sans text-[#22221F]/80 max-w-2xl leading-relaxed">
            {heroSubtext}
          </p>
        </div>
      </section>

      {/* Philosophy Callout Strip */}
      <section className="py-12 bg-[#EFECE6]/50 border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
          <div className="space-y-1">
            <span className="text-[#B6A17E] uppercase tracking-wider block font-semibold">Why Specialization Matters</span>
            <p className="text-[#22221F]/70 leading-relaxed">
              Generalist agencies write about luxury hotels using consumer cliches. We write with intimate knowledge of ADR justification, architecture, and guest psychology.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[#B6A17E] uppercase tracking-wider block font-semibold">Commercial Precision</span>
            <p className="text-[#22221F]/70 leading-relaxed">
              Every sentence is calibrated to increase direct bookings, reduce OTA dependency, and articulate the true value of your premier suites and villas.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[#B6A17E] uppercase tracking-wider block font-semibold">Enduring Verbal Heritage</span>
            <p className="text-[#22221F]/70 leading-relaxed">
              We create timeless copy that does not date in two seasons, grounding your verbal identity in architecture, terroir, and authentic hospitality traditions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-16 lg:py-24 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="p-8 sm:p-12 bg-white border border-[#22221F]/10 space-y-8 hover:border-[#B6A17E] transition-colors"
            >
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#22221F]/8 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#B6A17E]">
                    <span className="tabular-nums">0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-sans uppercase tracking-wider">{service.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
                    {service.title}
                  </h2>
                </div>

                <button
                  onClick={() => onSelectServiceForInquiry(service.title)}
                  className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans uppercase tracking-wider font-medium text-[#22221F] bg-[#F7F4EE] hover:bg-[#22221F] hover:text-[#F7F4EE] border border-[#22221F]/20 transition-all shrink-0"
                >
                  <span>Inquire for This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Service Description */}
              <p className="text-base sm:text-lg font-serif italic text-[#22221F]/90 leading-relaxed max-w-4xl">
                {service.description}
              </p>

              {/* Three-Column Specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#22221F]/8 text-sm font-sans">
                {/* Deliverables */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B6A17E]">
                    Core Deliverables
                  </h3>
                  <ul className="space-y-2 text-xs text-[#22221F]/80">
                    {service.deliverables?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B6A17E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable For */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B6A17E]">
                    Suitable Property Profile
                  </h3>
                  <p className="text-xs text-[#22221F]/70 leading-relaxed">
                    {service.suitableFor}
                  </p>
                </div>

                {/* Business Outcome */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B6A17E]">
                    Strategic Value & Return
                  </h3>
                  <p className="text-xs text-[#22221F]/70 leading-relaxed">
                    {service.clientOutcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#22221F] text-[#F7F4EE]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <BrandLogo variant="seal" lightText className="mb-2" />
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F7F4EE]">
            Need a Multi-Service Commission?
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#F7F4EE]/70 max-w-xl mx-auto leading-relaxed">
            We routinely assemble holistic packages covering website launch, brand codex, suite narratives, and pre-arrival email sequences for opening properties.
          </p>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-8 py-3.5 text-xs font-sans uppercase tracking-wider font-medium text-[#22221F] bg-[#F7F4EE] hover:bg-[#B6A17E] transition-colors"
          >
            Discuss a Comprehensive Project
          </button>
        </div>
      </section>
    </div>
  );
};
