import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Loader2, X, Eye, EyeOff } from 'lucide-react';
import { api } from '../../api/client.ts';
import { PortfolioItem } from '../../types/index.ts';

interface AdminPortfolioProps {
  portfolio: PortfolioItem[];
  onPortfolioUpdated: (items: PortfolioItem[]) => void;
}

export const AdminPortfolio: React.FC<AdminPortfolioProps> = ({
  portfolio,
  onPortfolioUpdated,
}) => {
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCreate = () => {
    setIsCreating(true);
    setEditingItem({
      title: '',
      slug: '',
      category: 'Cliffside Sanctuary',
      isConceptual: true, // Defaults strictly to conceptual study
      coverImage: '/src/assets/images/portfolio_aegean_sanctuary_1792846778691.jpg',
      location: 'Mediterranean Basin',
      summary: '',
      challenge: '',
      narrativeVoice: '',
      deliverables: ['Brand Storytelling Manifesto', 'Website Narrative'],
      excerpts: [{ title: 'Suite Monograph', text: '' }],
      isPublished: true,
      featured: false,
    });
    setSuccess(null);
    setError(null);
  };

  const startEdit = (item: PortfolioItem) => {
    setIsCreating(false);
    setEditingItem({
      ...item,
      deliverables: item.deliverables ? [...item.deliverables] : [],
      excerpts: item.excerpts ? [...item.excerpts] : [],
    });
    setSuccess(null);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleExcerptChange = (index: number, field: 'title' | 'text', val: string) => {
    if (!editingItem) return;
    const excerpts = [...(editingItem.excerpts || [])];
    excerpts[index] = { ...excerpts[index], [field]: val };
    setEditingItem({ ...editingItem, excerpts });
  };

  const addExcerpt = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      excerpts: [...(editingItem.excerpts || []), { title: 'New Excerpt', text: '' }],
    });
  };

  const removeExcerpt = (index: number) => {
    if (!editingItem) return;
    const excerpts = (editingItem.excerpts || []).filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, excerpts });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.summary) {
      setError('Title and summary are mandatory.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (isCreating) {
        const created = await api.createPortfolioItem(editingItem);
        const updatedList = [created, ...portfolio];
        onPortfolioUpdated(updatedList);
        setSuccess('Monograph created and saved to database.');
      } else if (editingItem.id) {
        const updated = await api.updatePortfolioItem(editingItem.id, editingItem);
        const updatedList = portfolio.map((p) => (p.id === updated.id ? updated : p));
        onPortfolioUpdated(updatedList);
        setSuccess('Monograph updated successfully.');
      }

      setEditingItem(null);
      setIsCreating(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save portfolio item.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete portfolio monograph '${title}'?`)) return;

    setLoading(true);
    try {
      await api.deletePortfolioItem(id);
      const updatedList = portfolio.filter((p) => p.id !== id);
      onPortfolioUpdated(updatedList);
      setSuccess(`Monograph '${title}' deleted.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Delete failed.');
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (item: PortfolioItem) => {
    setLoading(true);
    try {
      const updated = await api.updatePortfolioItem(item.id, { isPublished: !item.isPublished });
      const updatedList = portfolio.map((p) => (p.id === updated.id ? updated : p));
      onPortfolioUpdated(updatedList);
      setSuccess(`Updated publication state for '${item.title}'.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to toggle status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
            Portfolio Monograph Management
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
            Publish case studies with strict conceptual vs verified client-work designations.
          </p>
        </div>

        {!editingItem && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Monograph</span>
          </button>
        )}
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

      {/* Editor Modal/Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="bg-white border border-[#22221F]/15 p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b border-[#22221F]/10 pb-4">
            <h2 className="text-xl font-serif text-[#22221F]">
              {isCreating ? 'New Portfolio Monograph' : `Editing: ${editingItem.title}`}
            </h2>
            <button
              type="button"
              onClick={cancelEdit}
              className="p-1.5 text-[#22221F]/60 hover:text-[#22221F]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Project Title *
              </label>
              <input
                type="text"
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Category *
              </label>
              <input
                type="text"
                value={editingItem.category || ''}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Location / Terroir
              </label>
              <input
                type="text"
                value={editingItem.location || ''}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Cover Image URL / Path
              </label>
              <input
                type="text"
                value={editingItem.coverImage || ''}
                onChange={(e) => setEditingItem({ ...editingItem, coverImage: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Summary Narrative *
            </label>
            <textarea
              rows={3}
              value={editingItem.summary || ''}
              onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
              required
              className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Narrative Challenge
              </label>
              <textarea
                rows={3}
                value={editingItem.challenge || ''}
                onChange={(e) => setEditingItem({ ...editingItem, challenge: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Verbal Architecture & Cadence
              </label>
              <textarea
                rows={3}
                value={editingItem.narrativeVoice || ''}
                onChange={(e) => setEditingItem({ ...editingItem, narrativeVoice: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>
          </div>

          {/* Strict Conceptual vs Verified Client Work designation */}
          <div className="p-4 bg-[#F7F4EE] border border-[#22221F]/10 space-y-3">
            <div className="text-xs font-sans uppercase tracking-wider text-[#B6A17E] font-medium">
              Editorial Integrity & Legal Designation
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-xs font-sans">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isConceptual}
                  onChange={(e) => setEditingItem({ ...editingItem, isConceptual: e.target.checked })}
                  className="w-4 h-4 text-[#B6A17E] rounded"
                />
                <span className="font-semibold text-[#22221F]">
                  Designate as Conceptual Monograph
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isPublished}
                  onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
                  className="w-4 h-4 text-[#B6A17E] rounded"
                />
                <span className="font-semibold text-[#22221F]">
                  Published to Public Portfolio
                </span>
              </label>
            </div>
            <p className="text-[11px] text-[#22221F]/60">
              Note: Unchecked 'Conceptual Monograph' marks it as a verified private client commission. Never fabricate client logos or claims.
            </p>
          </div>

          {/* Written Excerpts Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Monograph Written Excerpts
              </label>
              <button
                type="button"
                onClick={addExcerpt}
                className="text-xs font-sans text-[#B6A17E] hover:text-[#22221F] underline"
              >
                + Add Excerpt
              </button>
            </div>

            <div className="space-y-4">
              {(editingItem.excerpts || []).map((exc, idx) => (
                <div key={idx} className="p-4 bg-[#F7F4EE]/50 border border-[#22221F]/10 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      value={exc.title}
                      onChange={(e) => handleExcerptChange(idx, 'title', e.target.value)}
                      placeholder="Excerpt Title (e.g. Suite Description)"
                      className="flex-1 px-3 py-1.5 bg-white border border-[#22221F]/15 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeExcerpt(idx)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={exc.text}
                    onChange={(e) => handleExcerptChange(idx, 'text', e.target.value)}
                    placeholder="Written excerpt body text..."
                    className="w-full px-3 py-1.5 bg-white border border-[#22221F]/15 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22221F]/10">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2 text-xs font-sans text-[#22221F]/70 hover:text-[#22221F]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Monograph'}
            </button>
          </div>
        </form>
      )}

      {/* Portfolio Items List */}
      <div className="bg-white border border-[#22221F]/10 overflow-hidden">
        <div className="divide-y divide-[#22221F]/8">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-[#F7F4EE]/40 transition-colors"
            >
              <div className="flex items-center gap-5">
                <div className="w-20 h-16 bg-[#EFECE6] border border-[#22221F]/10 overflow-hidden shrink-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#22221F]/50 font-sans">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#B6A17E] font-medium">
                      {item.isConceptual ? 'Conceptual' : 'Client Commission'}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-[#22221F]">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs font-sans">
                    <span className={item.isPublished ? 'text-emerald-700' : 'text-stone-500'}>
                      {item.isPublished ? '● Published' : '○ Draft'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => togglePublish(item)}
                  className="p-2 text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10"
                  title={item.isPublished ? 'Unpublish' : 'Publish'}
                >
                  {item.isPublished ? <Eye className="w-4 h-4 text-emerald-700" /> : <EyeOff className="w-4 h-4 text-stone-500" />}
                </button>
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10"
                  title="Edit monograph"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 text-red-600 hover:text-red-800 border border-red-200"
                  title="Delete monograph"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
