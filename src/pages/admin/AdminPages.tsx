import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../../api/client.ts';
import { PageContent } from '../../types/index.ts';

interface AdminPagesProps {
  pages: Record<string, PageContent>;
  onPageUpdated: (slug: string, updated: PageContent) => void;
}

export const AdminPages: React.FC<AdminPagesProps> = ({ pages, onPageUpdated }) => {
  const [activeSlug, setActiveSlug] = useState<string>('home');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentPage = pages[activeSlug] || {
    slug: activeSlug,
    title: activeSlug.toUpperCase(),
    subtitle: '',
    heroHeading: '',
    heroSubtext: '',
    ctaPrimaryText: 'Learn More',
    ctaSecondaryText: '',
    sections: {},
    isPublished: true,
    lastEdited: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<PageContent>(currentPage);

  const handleTabChange = (slug: string) => {
    setActiveSlug(slug);
    setFormData(pages[slug] || {
      slug,
      title: slug.toUpperCase(),
      subtitle: '',
      heroHeading: '',
      heroSubtext: '',
      ctaPrimaryText: 'Learn More',
      ctaSecondaryText: '',
      sections: {},
      isPublished: true,
      lastEdited: new Date().toISOString(),
    });
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const updated = await api.updatePage(activeSlug, formData);
      onPageUpdated(activeSlug, updated);
      setSuccessMessage(`Page '${updated.title}' updated successfully. Changes are live on the public site.`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update page content.');
    } finally {
      setSaving(false);
    }
  };

  const pageTabs = [
    { slug: 'home', label: 'Home Page' },
    { slug: 'expertise', label: 'Expertise' },
    { slug: 'portfolio', label: 'Portfolio' },
    { slug: 'about', label: 'About Studio' },
    { slug: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
          Page Content Management
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
          Modify editorial headings, hero narratives, and publication states across public routes.
        </p>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#22221F]/10 pb-4">
        {pageTabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => handleTabChange(tab.slug)}
            className={`px-4 py-2 text-xs font-sans uppercase tracking-wider font-medium transition-colors ${
              activeSlug === tab.slug
                ? 'bg-[#22221F] text-[#F7F4EE]'
                : 'bg-white text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Banners */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSave} className="bg-white border border-[#22221F]/10 p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22221F]/8 pb-6">
          <div>
            <h2 className="text-xl font-serif text-[#22221F]">
              Editing: {formData.title || activeSlug.toUpperCase()}
            </h2>
            <div className="text-xs font-sans text-[#22221F]/50">
              Route: <code>/{activeSlug === 'home' ? '' : activeSlug}</code> · Last edited:{' '}
              {new Date(formData.lastEdited || Date.now()).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-sans text-[#22221F] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 text-[#B6A17E] rounded border-[#22221F]/30"
              />
              <span className="font-medium">Published Status</span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to DB...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish Updates</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Internal Page Name
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] focus:outline-none focus:border-[#22221F] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Subtitle / Eyebrow Header
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] focus:outline-none focus:border-[#22221F] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Primary Hero Headline
            </label>
            <input
              type="text"
              value={formData.heroHeading}
              onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] font-serif focus:outline-none focus:border-[#22221F] focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Hero Supporting Copy
            </label>
            <textarea
              rows={3}
              value={formData.heroSubtext}
              onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] focus:outline-none focus:border-[#22221F] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={formData.ctaPrimaryText}
                onChange={(e) => setFormData({ ...formData, ctaPrimaryText: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] focus:outline-none focus:border-[#22221F] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Secondary CTA Button Label
              </label>
              <input
                type="text"
                value={formData.ctaSecondaryText || ''}
                onChange={(e) => setFormData({ ...formData, ctaSecondaryText: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] focus:outline-none focus:border-[#22221F] focus:bg-white"
                placeholder="(Optional)"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#22221F]/8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors"
          >
            {saving ? 'Publishing...' : 'Save & Publish Page'}
          </button>
        </div>
      </form>
    </div>
  );
};
