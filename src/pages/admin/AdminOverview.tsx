import React from 'react';
import { 
  Inbox, 
  Layers, 
  FileText, 
  Briefcase, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { Inquiry, PortfolioItem, Service, PageContent } from '../../types/index.ts';

interface AdminOverviewProps {
  inquiries: Inquiry[];
  portfolio: PortfolioItem[];
  services: Service[];
  pages: Record<string, PageContent>;
  onNavigateTab: (tab: string) => void;
  onSelectInquiry: (inquiry: Inquiry) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  inquiries,
  portfolio,
  services,
  pages,
  onNavigateTab,
  onSelectInquiry,
}) => {
  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const inReviewInquiries = inquiries.filter((i) => i.status === 'in_review');
  const publishedPortfolio = portfolio.filter((p) => p.isPublished);

  return (
    <div className="space-y-10">
      {/* Title & Welcome */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
          Studio Overview & Telemetry
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
          Central monitoring for AEON MEDIA inquiries, published monographs, and editorial services.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="p-6 bg-white border border-[#22221F]/10 hover:border-[#B6A17E] transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-sans text-[#22221F]/60">
            <span className="uppercase tracking-wider">New Inquiries</span>
            <Inbox className="w-4 h-4 text-[#B6A17E]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif text-[#22221F] tabular-nums">
            {newInquiries.length}
          </div>
          <div className="text-xs font-sans text-[#22221F]/50 flex items-center gap-1.5">
            <span>{inReviewInquiries.length} in active review</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigateTab('portfolio')}
          className="p-6 bg-white border border-[#22221F]/10 hover:border-[#B6A17E] transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-sans text-[#22221F]/60">
            <span className="uppercase tracking-wider">Published Works</span>
            <Briefcase className="w-4 h-4 text-[#B6A17E]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif text-[#22221F] tabular-nums">
            {publishedPortfolio.length}
          </div>
          <div className="text-xs font-sans text-[#22221F]/50">
            <span>{portfolio.length} total in archive</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigateTab('services')}
          className="p-6 bg-white border border-[#22221F]/10 hover:border-[#B6A17E] transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-sans text-[#22221F]/60">
            <span className="uppercase tracking-wider">Active Services</span>
            <Layers className="w-4 h-4 text-[#B6A17E]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif text-[#22221F] tabular-nums">
            {services.length}
          </div>
          <div className="text-xs font-sans text-[#22221F]/50">
            <span>Core hospitality disciplines</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigateTab('pages')}
          className="p-6 bg-white border border-[#22221F]/10 hover:border-[#B6A17E] transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-sans text-[#22221F]/60">
            <span className="uppercase tracking-wider">Managed Pages</span>
            <FileText className="w-4 h-4 text-[#B6A17E]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif text-[#22221F] tabular-nums">
            {Object.keys(pages).length}
          </div>
          <div className="text-xs font-sans text-[#22221F]/50">
            <span>Live on public domain</span>
          </div>
        </div>
      </div>

      {/* Split Section: Recent Inquiries & Quick Management Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inquiries Table/List */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-white border border-[#22221F]/10 space-y-6">
          <div className="flex items-center justify-between border-b border-[#22221F]/8 pb-4">
            <div>
              <h2 className="text-lg font-serif text-[#22221F]">Recent Client Inquiries</h2>
              <p className="text-xs font-sans text-[#22221F]/60">Persisted submissions received from hoteliers</p>
            </div>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-sans text-[#B6A17E] hover:text-[#22221F] uppercase tracking-wider font-medium"
            >
              View All ({inquiries.length})
            </button>
          </div>

          {inquiries.length === 0 ? (
            <div className="py-8 text-center text-xs font-sans text-[#22221F]/50">
              No inquiries submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-[#22221F]/8">
              {inquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => {
                    onSelectInquiry(inq);
                    onNavigateTab('inquiries');
                  }}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F4EE]/50 px-2 cursor-pointer transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-medium text-[#22221F]">
                        {inq.name}
                      </span>
                      <span className="text-xs text-[#22221F]/50 font-sans">({inq.company})</span>
                    </div>
                    <div className="text-xs text-[#22221F]/70 font-sans flex items-center gap-2">
                      <span>{inq.service}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-xs text-[#22221F]/40">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-sans uppercase tracking-wider px-2.5 py-1 ${
                      inq.status === 'new'
                        ? 'bg-amber-100 text-amber-900 font-medium'
                        : inq.status === 'in_review'
                        ? 'bg-blue-100 text-blue-900'
                        : inq.status === 'responded'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {inq.status.replace('_', ' ')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#22221F]/40" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Studio Actions */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-white border border-[#22221F]/10 space-y-6">
          <div className="border-b border-[#22221F]/8 pb-4">
            <h2 className="text-lg font-serif text-[#22221F]">Publishing Actions</h2>
            <p className="text-xs font-sans text-[#22221F]/60">Fast studio shortcuts</p>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <button
              onClick={() => onNavigateTab('portfolio')}
              className="w-full text-left p-3.5 bg-[#F7F4EE] hover:bg-[#EFECE6] transition-colors border border-[#22221F]/8 flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-[#22221F] block">Add Portfolio Monograph</span>
                <span className="text-[#22221F]/60 text-[11px]">Publish new conceptual case study</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#B6A17E]" />
            </button>

            <button
              onClick={() => onNavigateTab('pages')}
              className="w-full text-left p-3.5 bg-[#F7F4EE] hover:bg-[#EFECE6] transition-colors border border-[#22221F]/8 flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-[#22221F] block">Edit Homepage Copy</span>
                <span className="text-[#22221F]/60 text-[11px]">Adjust hero headline and philosophy</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#B6A17E]" />
            </button>

            <button
              onClick={() => onNavigateTab('services')}
              className="w-full text-left p-3.5 bg-[#F7F4EE] hover:bg-[#EFECE6] transition-colors border border-[#22221F]/8 flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-[#22221F] block">Modify Core Services</span>
                <span className="text-[#22221F]/60 text-[11px]">Update deliverables or rates</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#B6A17E]" />
            </button>
          </div>

          <div className="pt-4 border-t border-[#22221F]/8 text-xs font-sans text-[#22221F]/60 space-y-1">
            <div><strong className="text-[#22221F]">Storage:</strong> Persistent Server DB</div>
            <div><strong className="text-[#22221F]">Authorization:</strong> Enforced via Server Middleware</div>
          </div>
        </div>
      </div>
    </div>
  );
};
