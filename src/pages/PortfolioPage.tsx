import React, { useState } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { PageContent, PortfolioItem } from '../types/index.ts';

interface PortfolioPageProps {
  pageContent?: PageContent;
  portfolio: PortfolioItem[];
  onOpenCaseStudy: (item: PortfolioItem) => void;
  onNavigate: (path: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  pageContent,
  portfolio,
  onOpenCaseStudy,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const heroHeading = pageContent?.heroHeading || "Considered Words for Visionary Sanctuaries.";
  const heroSubtext = pageContent?.heroSubtext || "Explore our conceptual portfolio monographs. Each case study represents an exercise in verbal identity, spatial storytelling, and luxury guest resonance.";

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(portfolio.map((p) => p.category)))];

  const filteredItems = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#22221F]/10 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold">
            Monograph Archive
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#22221F] tracking-tight max-w-4xl text-balance">
            {heroHeading}
          </h1>
          <p className="text-base sm:text-lg font-sans text-[#22221F]/80 max-w-2xl leading-relaxed">
            {heroSubtext}
          </p>

          {/* Curatorial & Confidentiality Notice Box */}
          <div className="p-4 sm:p-5 bg-white/80 border border-[#22221F]/10 flex items-start gap-3.5 max-w-3xl text-xs font-sans text-[#22221F]/70">
            <Info className="w-4 h-4 text-[#B6A17E] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#22221F]">Editorial Transparency Notice:</strong> The case studies below are conceptual architectural studies authored by AEON MEDIA to demonstrate brand voice architecture across distinct hospitality terroirs. We strictly protect client confidentiality and proprietary project details.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Ribbon & Grid */}
      <section className="py-12 lg:py-20 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          {/* Functional Segmented Controls */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EFECE6] border border-[#22221F]/8 self-start max-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-[#22221F] shadow-sm'
                    : 'text-[#22221F]/60 hover:text-[#22221F]'
                }`}
              >
                {cat === 'all' ? 'All Monographs' : cat}
              </button>
            ))}
          </div>

          {/* Project Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenCaseStudy(item)}
                className="group cursor-pointer bg-white border border-[#22221F]/10 overflow-hidden hover:border-[#B6A17E] transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE6]">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#22221F]/85 text-[#F7F4EE] text-[11px] uppercase tracking-wider font-sans">
                    {item.isConceptual ? 'Conceptual Study' : 'Client Commission'}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 sm:p-10 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#22221F]/60 font-sans">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif text-[#22221F] group-hover:text-[#B6A17E] transition-colors">
                      {item.title}
                    </h2>

                    <p className="text-sm font-sans text-[#22221F]/70 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Sample Excerpt Preview */}
                  {item.excerpts && item.excerpts[0] && (
                    <div className="p-4 bg-[#F7F4EE]/70 border-l-2 border-[#B6A17E] text-xs font-serif italic text-[#22221F]/80 leading-relaxed">
                      "{item.excerpts[0].text.slice(0, 150)}..."
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#22221F]/8 flex items-center justify-between text-xs font-sans text-[#B6A17E]">
                    <span className="font-medium uppercase tracking-wider">Open Case Study Monograph</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="p-12 text-center bg-white border border-[#22221F]/8 space-y-3">
              <p className="text-base font-serif text-[#22221F]">No monographs found in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-sans text-[#B6A17E] underline"
              >
                Reset category filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Direct Commission Strip */}
      <section className="py-20 bg-[#22221F] text-[#F7F4EE]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F7F4EE]">
            Have an Upcoming Architectural Milestone?
          </h2>
          <p className="text-sm font-sans text-[#F7F4EE]/70 max-w-lg mx-auto leading-relaxed">
            We partner with independent property owners and creative directors before architectural completion to shape the property's verbal heritage.
          </p>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-8 py-3.5 text-xs font-sans uppercase tracking-wider font-medium text-[#22221F] bg-[#F7F4EE] hover:bg-[#B6A17E] transition-colors"
          >
            Initiate Project Inquiry
          </button>
        </div>
      </section>
    </div>
  );
};
