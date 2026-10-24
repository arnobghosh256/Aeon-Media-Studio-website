import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../../types/index.ts';

interface CaseStudyModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#22221F]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#F7F4EE] border border-[#22221F]/15 shadow-2xl z-10 max-h-[92vh] overflow-y-auto focus:outline-none">
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#22221F]/10">
          <div className="flex items-center gap-3 text-xs font-sans text-[#22221F]/60">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#B6A17E] font-medium">
              {project.isConceptual ? 'Conceptual Monograph' : 'Client Commission'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#22221F]/70 hover:text-[#22221F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6A17E]"
            aria-label="Close case study details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 sm:px-10 py-8 space-y-10">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EFECE6] border border-[#22221F]/8">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Title & Introduction */}
          <div className="space-y-4">
            <h2 id="modal-title" className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#22221F]">
              {project.title}
            </h2>
            <p className="text-lg sm:text-xl font-serif italic text-[#B6A17E] max-w-2xl">
              {project.summary}
            </p>
          </div>

          {/* Two-Column Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#22221F]/10 text-sm font-sans">
            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#B6A17E]">
                The Narrative Challenge
              </h3>
              <p className="text-[#22221F]/80 leading-relaxed">
                {project.challenge || 'Articulating the intangible atmospheric character of the sanctuary.'}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#B6A17E]">
                Verbal Architecture & Cadence
              </h3>
              <p className="text-[#22221F]/80 leading-relaxed">
                {project.narrativeVoice || 'Restrained, tactile, sensory cadence tuned to natural light.'}
              </p>
            </div>
          </div>

          {/* Written Excerpts Section */}
          {project.excerpts && project.excerpts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[#22221F]/10">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-medium">
                Written Excerpts & Monograph Samples
              </div>
              <div className="space-y-6">
                {project.excerpts.map((excerpt, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white/70 border border-[#22221F]/8 space-y-3"
                  >
                    <div className="text-xs font-sans font-semibold tracking-wide text-[#22221F]">
                      {excerpt.title}
                    </div>
                    <blockquote className="text-base sm:text-lg font-serif italic text-[#22221F]/90 leading-relaxed pl-4 border-l-2 border-[#B6A17E]">
                      "{excerpt.text}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables List */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[#22221F]/10">
              <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-medium">
                Scope & Suite of Deliverables
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans text-[#22221F]/80">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#B6A17E] text-xs mt-1" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-8 border-t border-[#22221F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#22221F]/60 font-sans">
              Conceptual Case Study · AEON MEDIA Archive
            </div>
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-sans uppercase tracking-wider font-medium text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors"
            >
              <span>Discuss a Similar Commission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
