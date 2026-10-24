import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PageContent } from '../types/index.ts';

interface AboutPageProps {
  pageContent?: PageContent;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ pageContent, onNavigate }) => {
  const heroHeading = pageContent?.heroHeading || "Words as Enduring as the Architecture.";
  const heroSubtext = pageContent?.heroSubtext || "AEON MEDIA was founded on a singular conviction: that extraordinary hotels deserve writing as refined as their design.";

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#22221F]/10 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            About the Studio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#22221F] tracking-tight max-w-4xl text-balance">
            {heroHeading}
          </h1>
          <p className="text-base sm:text-lg font-sans text-[#22221F]/80 max-w-2xl leading-relaxed">
            {heroSubtext}
          </p>
        </div>
      </section>

      {/* Narrative & Editorial Image Split */}
      <section className="py-16 lg:py-24 bg-[#F7F4EE] border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base font-sans text-[#22221F]/80 leading-relaxed">
            <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-semibold">
              The Studio Thesis
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#22221F]">
              The Problem with Standard Hospitality Copy
            </h2>

            <p>
              In luxury hospitality, words are frequently treated as a last-minute commodity. An owner invests years alongside renowned architects, landscape designers, and acoustic engineers to create a tranquil sanctuary—only for its digital presence to be filled with recycled ad agency clichés: <em>"breathtaking views," "nestled in nature,"</em> and <em>"unparalleled luxury."</em>
            </p>

            <p>
              These phrases communicate nothing about the property's soul. They fail to convey the temperature of the hand-chiseled stone at dusk, the scent of wild herbs carried on the evening mist, or the unhurried grace of the staff.
            </p>

            <blockquote className="my-6 p-6 bg-white border-l-2 border-[#B6A17E] text-lg font-serif italic text-[#22221F]">
              "A guest does not fall in love with amenities. They fall in love with the feeling of who they become when they inhabit your sanctuary."
            </blockquote>

            <p>
              AEON MEDIA exists to bridge that gap. We write as design partners, treating language as a tactile material that frames space, evokes anticipation, and honors the physical craftsmanship of the property.
            </p>
          </div>

          {/* Right Editorial Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFECE6] border border-[#22221F]/10 shadow-[0_8px_30px_rgba(34,34,31,0.04)]">
              <img
                src="/src/assets/images/about_editorial_table_1792846780431.jpg"
                alt="Studio editorial table with fountain pen and architectural stone swatches"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-serif italic text-[#22221F]/60 text-center">
              The studio archive: material research, fountain ink, and raw limestone.
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Commitments */}
      <section className="py-20 lg:py-28 bg-[#EFECE6]/40 border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
              Operating Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#22221F]">
              Four Pillars of Our Editorial Practice
            </h2>
            <p className="text-sm font-sans text-[#22221F]/70">
              How we protect quality, credibility, and brand value for the properties we represent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white border border-[#22221F]/8 space-y-4">
              <div className="text-xs font-mono text-[#B6A17E] uppercase tracking-wider">01 · Craft</div>
              <h3 className="text-xl font-serif text-[#22221F]">Zero Generic Clichés</h3>
              <p className="text-xs sm:text-sm font-sans text-[#22221F]/70 leading-relaxed">
                We ban lazy hospitality tropes. Every adjective is tested against physical reality: tactile materials, lighting, culinary terroir, and stillness.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#22221F]/8 space-y-4">
              <div className="text-xs font-mono text-[#B6A17E] uppercase tracking-wider">02 · Terroir</div>
              <h3 className="text-xl font-serif text-[#22221F]">Grounded in Place</h3>
              <p className="text-xs sm:text-sm font-sans text-[#22221F]/70 leading-relaxed">
                A Cycladic cliffside property sounds distinct from a Viennese heritage residence or an American desert pavilion. Language honors the regional landscape.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#22221F]/8 space-y-4">
              <div className="text-xs font-mono text-[#B6A17E] uppercase tracking-wider">03 · Purpose</div>
              <h3 className="text-xl font-serif text-[#22221F]">Commercial Justification</h3>
              <p className="text-xs sm:text-sm font-sans text-[#22221F]/70 leading-relaxed">
                Poetic prose serves direct business metrics: it justifies $2,500+ nightly rates for signature villas and eliminates price hesitation.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#22221F]/8 space-y-4">
              <div className="text-xs font-mono text-[#B6A17E] uppercase tracking-wider">04 · Privacy</div>
              <h3 className="text-xl font-serif text-[#22221F]">Absolute Discretion</h3>
              <p className="text-xs sm:text-sm font-sans text-[#22221F]/70 leading-relaxed">
                We operate under strict confidentiality. We do not plaster client logos or trumpet confidential partnerships without explicit written consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Collaborate */}
      <section className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-[#22221F]/10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
              Studio Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#22221F]">
              How We Collaborate with Hoteliers
            </h2>
          </div>

          <div className="space-y-6 text-sm font-sans text-[#22221F]/80 leading-relaxed">
            <div className="p-6 bg-white border border-[#22221F]/8 flex items-start gap-4">
              <div className="w-8 h-8 rounded-none bg-[#F7F4EE] text-[#B6A17E] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#22221F]/10">
                1
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-serif text-[#22221F]">Direct Access to the Principal Writers</h4>
                <p className="text-xs sm:text-sm text-[#22221F]/70">
                  You work directly with senior editorial directors who understand luxury hospitality, not junior copywriters or account managers.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#22221F]/8 flex items-start gap-4">
              <div className="w-8 h-8 rounded-none bg-[#F7F4EE] text-[#B6A17E] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#22221F]/10">
                2
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-serif text-[#22221F]">Architectural & Operational Alignment</h4>
                <p className="text-xs sm:text-sm text-[#22221F]/70">
                  We review floorplans, finish schedules, culinary menus, and guest arrival protocols before writing a single headline.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#22221F]/8 flex items-start gap-4">
              <div className="w-8 h-8 rounded-none bg-[#F7F4EE] text-[#B6A17E] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#22221F]/10">
                3
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-serif text-[#22221F]">Turnkey Digital Integration</h4>
                <p className="text-xs sm:text-sm text-[#22221F]/70">
                  Deliverables include exact page hierarchy, room comparison frameworks, and web agency markup notes ready for your web developers.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-3.5 text-xs font-sans uppercase tracking-wider font-medium text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors inline-flex items-center gap-2"
            >
              <span>Discuss Your Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
