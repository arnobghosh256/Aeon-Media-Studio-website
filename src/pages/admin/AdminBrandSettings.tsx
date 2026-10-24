import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../../api/client.ts';
import { BrandSettings } from '../../types/index.ts';

interface AdminBrandSettingsProps {
  settings: BrandSettings;
  onSettingsUpdated: (settings: BrandSettings) => void;
}

export const AdminBrandSettings: React.FC<AdminBrandSettingsProps> = ({
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
      setSuccess('Brand settings updated and saved to server.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update brand settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
          Brand & Studio Settings
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
          Configure core brand identity, official correspondence emails, and studio availability.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Studio Brand Name
            </label>
            <input
              type="text"
              value={formData.studioName}
              onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Official Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Studio Positioning & Abstract
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Official Correspondence Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Instagram Handle
            </label>
            <input
              type="text"
              value={formData.instagramHandle}
              onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Studio Geographic Desks
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Availability & Booking Season Notice
            </label>
            <input
              type="text"
              value={formData.availabilityNotice}
              onChange={(e) => setFormData({ ...formData, availabilityNotice: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[#22221F]/8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Brand Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
