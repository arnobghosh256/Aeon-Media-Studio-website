import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2, Globe } from 'lucide-react';
import { api } from '../../api/client.ts';
import { BrandSettings } from '../../types/index.ts';

interface AdminSEOSettingsProps {
  settings: BrandSettings;
  onSettingsUpdated: (settings: BrandSettings) => void;
}

export const AdminSEOSettings: React.FC<AdminSEOSettingsProps> = ({
  settings,
  onSettingsUpdated,
}) => {
  const [formData, setFormData] = useState<BrandSettings>(settings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const updated = await api.updateSettings(formData);
      onSettingsUpdated(updated);
      setSuccess('Search engine metadata updated successfully.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update SEO settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
          Search Engine Optimization (SEO) & Meta
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
          Control page titles, search descriptions, and social sharing cards.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-[#22221F]/10 p-6 sm:p-10 space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Global Meta Title Tag
          </label>
          <input
            type="text"
            value={formData.seoTitle}
            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
          />
          <span className="text-[11px] text-[#22221F]/50">
            Recommended length: 50–60 characters. Current: {formData.seoTitle?.length || 0}
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Meta Description (Google & Social Snippet)
          </label>
          <textarea
            rows={3}
            value={formData.seoDescription}
            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
          />
          <span className="text-[11px] text-[#22221F]/50">
            Recommended length: 140–160 characters. Current: {formData.seoDescription?.length || 0}
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Target Hospitality Keywords
          </label>
          <input
            type="text"
            value={formData.seoKeywords}
            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
          />
          <span className="text-[11px] text-[#22221F]/50">
            Comma-separated keywords reflecting luxury hospitality copywriting.
          </span>
        </div>

        {/* Live SERP Preview */}
        <div className="pt-4 border-t border-[#22221F]/10 space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-medium flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Search Result Simulation</span>
          </div>
          <div className="p-4 bg-[#F7F4EE]/60 border border-[#22221F]/10 space-y-1 font-sans">
            <div className="text-xs text-[#22221F]/60">https://aeonmedia.co</div>
            <div className="text-base text-blue-800 font-medium hover:underline cursor-pointer">
              {formData.seoTitle}
            </div>
            <div className="text-xs text-[#22221F]/80 leading-relaxed max-w-xl">
              {formData.seoDescription}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#22221F]/8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
