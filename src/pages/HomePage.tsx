import React from 'react';
import { ArrowRight, ArrowUpRight, Compass, Feather, Sparkles, ShieldCheck } from 'lucide-react';
import { PageContent, PortfolioItem, Service } from '../types/index.ts';

interface HomePageProps {
  pageContent?: PageContent;
  services: Service[];
  portfolio: PortfolioItem[];
  onNavigate: (path: string) => void;
  onOpenCaseStudy: (item: PortfolioItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  pageContent,
  services,
  portfolio,
  onNavigate,
  onOpenCaseStudy,
}) => {
  const heroHeading = pageContent?.heroHeading || "Creating the Future of Luxury Hospitality.";
  const heroSubtext = pageContent?.heroSubtext || "We craft considered content and compelling brand narratives for luxury hotels, resorts, and exceptional destinations.";
  const philosophy = pageContent?.sections?.philosophy || {
    heading: "Beyond Words. Into Experience.",
    leadText: "In the realm of true luxury, architecture and service are only half the journey. The other half is how a property lives in the imagination of the guest before they arrive—and in their memory long after they depart.",
    bodyText: "Thoughtful writing does not simply describe amenities; it captures the weight of morning light on limestone, the fragrance of cedar at dusk, and the unspoken discretion of extraordinary hospitality. We give visionary destinations the voice they deserve."
  };
  const approachSteps = pageContent?.sections?.approach?.steps || [
    { number: "01", title: "Discovery & Research", description: "Deep immersion in your property's architecture, history, terroir, competitive positioning, and guest expectations." },
    { number: "02", title: "Brand Voice Alignment", description: "Definition of a distinctive verbal identity, establishing the precise cadence, tone, and vocabulary unique to your address." },
    { number: "03", title: "Content Development", description: "Crafting considered narratives across all touchpoints—from digital flagship copy to private suite monographs and guest communications." },
    { number: "04", title: "Review & Refinement", description: "Collaborative iteration alongside leadership, marketing, and operational stakeholders to polish every nuance." },
    { number: "05", title: "Final Delivery & Governance", description: "Seamless handoff of production-ready copy with clear implementation guidelines for marketing teams and digital agencies." }
  ];

  // 4 Featured core editorial areas for home page
  const featuredServices = services.slice(0, 4);
  const featuredPortfolio = portfolio.slice(0, 3);

  return (
    <div className="w-full">
      {/* ========================================================
          A & B. HERO SECTION (Editorial Cinematic Composition)
          ======================================================== */}
      <section className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Typographic Kicker */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold mb-6">
            <span>AEON MEDIA</span>
            <span aria-hidden="true">·</span>
            <span>Hospitality Brand Storytelling Studio</span>
          </div>

          {/* Hero Headline & Subtitle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 lg:mb-14">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#22221F] leading-[1.08] tracking-tight text-balance">
                {heroHeading}
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <p className="text-base sm:text-lg font-sans text-[#22221F]/80 leading-relaxed">
                {heroSubtext}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/expertise')}
                  className="px-6 py-3 text-xs font-sans uppercase tracking-wider font-medium text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore Our Expertise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-6 py-3 text-xs font-sans uppercase tracking-wider font-medium text-[#22221F] bg-transparent hover:bg-[#22221F]/5 transition-colors border border-[#22221F]/20 inline-flex items-center gap-2"
                >
                  <span>Discuss a Project</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cinematic Architectural Photography Container */}
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#EFECE6] border border-[#22221F]/10 shadow-[0_12px_40px_rgba(34,34,31,0.05)]">
            <img
              src="/src/assets/images/hero_luxury_resort_1792846777846.jpg"
              alt="Ultra-luxury minimalist pavilion reflection pool at twilight"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-[1.01] hover:scale-100 transition-transform duration-700 ease-out"
            />
            {/* Measured subtle scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#22221F]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-sans text-[#F7F4EE]/90">
              <span className="font-serif italic">Curated Hospitality Monographs</span>
              <span>Monaco · London · Kyoto</span>
            </div>
          </div>

          {/* Editorial Trust Strip Below Hero */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#22221F]/10 text-xs font-sans text-[#22221F]/70">
            <div>
              <span className="text-[#B6A17E] uppercase tracking-wider block mb-1">Focus</span>
              <span className="font-medium text-[#22221F]">Luxury Hospitality Only</span>
            </div>
            <div>
              <span className="text-[#B6A17E] uppercase tracking-wider block mb-1">Verbal Craft</span>
              <span className="font-medium text-[#22221F]">Zero Generic Clichés</span>
            </div>
            <div>
              <span className="text-[#B6A17E] uppercase tracking-wider block mb-1">Methodology</span>
              <span className="font-medium text-[#22221F]">Spatial & Sensory Prose</span>
            </div>
            <div>
              <span className="text-[#B6A17E] uppercase tracking-wider block mb-1">Discretion</span>
              <span className="font-medium text-[#22221F]">Confidential Practice</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          C. PHILOSOPHY SECTION (Aman / Rosewood inspired restraint)
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-[#22221F]/10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            Studio Philosophy
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#22221F] tracking-tight">
            {philosophy.heading}
          </h2>

          <div className="w-12 h-[1px] bg-[#B6A17E] mx-auto my-6" aria-hidden="true" />

          <p className="text-lg sm:text-xl font-serif italic text-[#22221F]/90 leading-relaxed max-w-3xl mx-auto">
            {philosophy.leadText}
          </p>

          <p className="text-sm sm:text-base font-sans text-[#22221F]/70 leading-relaxed max-w-2xl mx-auto">
            {philosophy.bodyText}
          </p>
        </div>
      </section>

      {/* ========================================================
          D. EXPERTISE SECTION (4 Core Editorial Areas)
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#EFECE6]/40 border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                Core Disciplines
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#22221F]">
                Editorial Services for Visionary Properties
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/expertise')}
              className="text-xs font-sans uppercase tracking-wider text-[#22221F] hover:text-[#B6A17E] inline-flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>View All 8 Core Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="p-8 bg-white border border-[#22221F]/8 flex flex-col justify-between space-y-6 hover:border-[#B6A17E]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#B6A17E] tabular-nums">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-serif text-[#22221F]">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#22221F]/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#22221F]/8 space-y-2">
                  <div className="text-[11px] font-sans uppercase tracking-wider text-[#B6A17E] font-medium">
                    Key Focus
                  </div>
                  <p className="text-xs font-sans text-[#22221F]/80">
                    {service.clientOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          E. SELECTED WORK (Conceptual Case Studies)
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
                Selected Monographs
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#22221F]">
                Conceptual Case Studies
              </h2>
              <p className="text-xs sm:text-sm font-sans text-[#22221F]/60 max-w-xl">
                To protect client confidentiality and proprietary launch timelines, the studies below are clearly designated conceptual demonstrations of our verbal architecture.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/portfolio')}
              className="text-xs font-sans uppercase tracking-wider text-[#22221F] hover:text-[#B6A17E] inline-flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPortfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenCaseStudy(item)}
                className="group cursor-pointer bg-white border border-[#22221F]/8 overflow-hidden hover:border-[#B6A17E] transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE6]">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#22221F]/80 text-[#F7F4EE] text-[10px] uppercase tracking-wider font-sans">
                    Conceptual Study
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-[#22221F]/60 font-sans flex items-center gap-2">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </div>
                    <h3 className="text-xl font-serif text-[#22221F] group-hover:text-[#B6A17E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans text-[#22221F]/70 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#22221F]/8 flex items-center justify-between text-xs font-sans text-[#B6A17E]">
                    <span className="font-medium">Read Case Monograph</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          F. APPROACH (5-Step Rigorous Methodology)
          ======================================================== */}
      <section className="py-20 lg:py-28 bg-[#EFECE6]/40 border-b border-[#22221F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-16 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
              The Method
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#22221F]">
              Five Stages of Considered Content Creation
            </h2>
            <p className="text-sm font-sans text-[#22221F]/70">
              A structured, editorial process tailored to luxury hoteliers and property proprietors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {approachSteps.map((step: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white border border-[#22221F]/8 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-lg font-serif text-[#B6A17E] tabular-nums font-semibold">
                    {step.number}
                  </div>
                  <h3 className="text-base font-serif font-medium text-[#22221F]">
                    {step.title}
                  </h3>
                  <p className="text-xs font-sans text-[#22221F]/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          G. CLOSING CTA (Every Exceptional Property Has a Story)
          ======================================================== */}
      <section className="py-24 lg:py-32 bg-[#22221F] text-[#F7F4EE] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8 relative z-10">
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            Inquiries & Collaborations
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#F7F4EE]">
            Every Exceptional Property Has a Story.
          </h2>

          <p className="text-lg sm:text-xl font-serif italic text-[#B6A17E] max-w-xl mx-auto">
            Let's give yours the words it deserves.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-3.5 text-xs font-sans uppercase tracking-wider font-medium text-[#22221F] bg-[#F7F4EE] hover:bg-[#B6A17E] hover:text-[#22221F] transition-colors"
            >
              Discuss a Project
            </button>
            <button
              onClick={() => onNavigate('/expertise')}
              className="px-8 py-3.5 text-xs font-sans uppercase tracking-wider font-medium text-[#F7F4EE] bg-transparent border border-[#F7F4EE]/30 hover:border-[#F7F4EE] transition-colors"
            >
              Review Services Deck
            </button>
          </div>

          <p className="text-xs text-[#F7F4EE]/50 font-sans pt-4">
            Direct Studio Desk: aeonmediaofficial@gmail.com · Response within 48 business hours
          </p>
        </div>
      </section>
    </div>
  );
};
