import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { api } from '../../api/client.ts';
import { Service } from '../../types/index.ts';

interface AdminServicesProps {
  services: Service[];
  onServicesUpdated: (services: Service[]) => void;
}

export const AdminServices: React.FC<AdminServicesProps> = ({
  services,
  onServicesUpdated,
}) => {
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCreate = () => {
    setIsCreating(true);
    setEditingService({
      title: '',
      category: 'Hospitality Copywriting',
      description: '',
      deliverables: [''],
      suitableFor: '',
      clientOutcome: '',
      order: services.length + 1,
    });
    setSuccess(null);
    setError(null);
  };

  const startEdit = (s: Service) => {
    setIsCreating(false);
    setEditingService({ ...s, deliverables: s.deliverables ? [...s.deliverables] : [''] });
    setSuccess(null);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingService(null);
    setIsCreating(false);
  };

  const handleDeliverableChange = (idx: number, val: string) => {
    if (!editingService) return;
    const deliverables = [...(editingService.deliverables || [])];
    deliverables[idx] = val;
    setEditingService({ ...editingService, deliverables });
  };

  const addDeliverableField = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      deliverables: [...(editingService.deliverables || []), ''],
    });
  };

  const removeDeliverableField = (idx: number) => {
    if (!editingService) return;
    const deliverables = (editingService.deliverables || []).filter((_, i) => i !== idx);
    setEditingService({ ...editingService, deliverables });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.description) {
      setError('Title and description are required.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const cleanDeliverables = (editingService.deliverables || []).filter((d) => d.trim().length > 0);
      const payload = { ...editingService, deliverables: cleanDeliverables };

      if (isCreating) {
        const created = await api.createService(payload);
        const updatedList = [...services, created];
        onServicesUpdated(updatedList);
        setSuccess('New service created successfully.');
      } else if (editingService.id) {
        const updated = await api.updateService(editingService.id, payload);
        const updatedList = services.map((s) => (s.id === updated.id ? updated : s));
        onServicesUpdated(updatedList);
        setSuccess('Service updated successfully.');
      }

      setEditingService(null);
      setIsCreating(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Operation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete service '${title}'?`)) return;

    setLoading(true);
    try {
      await api.deleteService(id);
      const updatedList = services.filter((s) => s.id !== id);
      onServicesUpdated(updatedList);
      setSuccess(`Service '${title}' removed.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Delete failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
            Hospitality Services Management
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
            Define deliverables, commercial outcomes, and service descriptions.
          </p>
        </div>

        {!editingService && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
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

      {/* Service Editor Modal/Form */}
      {editingService && (
        <form onSubmit={handleSave} className="bg-white border border-[#22221F]/15 p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b border-[#22221F]/10 pb-4">
            <h2 className="text-xl font-serif text-[#22221F]">
              {isCreating ? 'Create New Service' : `Edit: ${editingService.title}`}
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
                Service Title *
              </label>
              <input
                type="text"
                value={editingService.title || ''}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
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
                value={editingService.category || ''}
                onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Editorial Description *
            </label>
            <textarea
              rows={3}
              value={editingService.description || ''}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              required
              className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Suitable Property Profile
              </label>
              <input
                type="text"
                value={editingService.suitableFor || ''}
                onChange={(e) => setEditingService({ ...editingService, suitableFor: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Strategic Value / Client Return
              </label>
              <input
                type="text"
                value={editingService.clientOutcome || ''}
                onChange={(e) => setEditingService({ ...editingService, clientOutcome: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>
          </div>

          {/* Deliverables Array */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
              Deliverables Checklist
            </label>
            <div className="space-y-2">
              {(editingService.deliverables || []).map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={deliv}
                    onChange={(e) => handleDeliverableChange(idx, e.target.value)}
                    placeholder="e.g. Master tone-of-voice codex"
                    className="flex-1 px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => removeDeliverableField(idx)}
                    className="p-2 text-red-600 hover:text-red-800"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDeliverableField}
                className="text-xs font-sans text-[#B6A17E] hover:text-[#22221F] underline"
              >
                + Add another deliverable
              </button>
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
              {loading ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      )}

      {/* Services List Table */}
      <div className="bg-white border border-[#22221F]/10 overflow-hidden">
        <div className="divide-y divide-[#22221F]/8">
          {services.map((serv, index) => (
            <div
              key={serv.id}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F7F4EE]/40 transition-colors"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2 text-xs text-[#22221F]/50 font-sans">
                  <span className="font-mono text-[#B6A17E] tabular-nums">0{index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase tracking-wider">{serv.category}</span>
                </div>
                <h3 className="text-lg font-serif text-[#22221F]">{serv.title}</h3>
                <p className="text-xs font-sans text-[#22221F]/70 line-clamp-2">
                  {serv.description}
                </p>
                <div className="text-[11px] font-sans text-[#22221F]/50">
                  {serv.deliverables?.length || 0} deliverables listed
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => startEdit(serv)}
                  className="p-2 text-[#22221F]/70 hover:text-[#22221F] hover:bg-[#F7F4EE] border border-[#22221F]/10 transition-colors"
                  title="Edit service"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(serv.id, serv.title)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 transition-colors"
                  title="Delete service"
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
