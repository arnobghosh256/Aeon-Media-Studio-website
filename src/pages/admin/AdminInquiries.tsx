import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Loader2, 
  MessageSquare, 
  ExternalLink, 
  Inbox, 
  Building, 
  Briefcase, 
  Calendar, 
  Tag, 
  RefreshCw,
  X,
  AlertTriangle
} from 'lucide-react';
import { api } from '../../api/client.ts';
import { Inquiry } from '../../types/index.ts';

interface AdminInquiriesProps {
  inquiries: Inquiry[];
  onInquiriesUpdated: (inquiries: Inquiry[]) => void;
  selectedInquiry?: Inquiry | null;
}

export const AdminInquiries: React.FC<AdminInquiriesProps> = ({
  inquiries,
  onInquiriesUpdated,
  selectedInquiry: initialSelected,
}) => {
  const [filter, setFilter] = useState<'all' | 'new' | 'in_review' | 'responded' | 'archived'>('all');
  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(
    initialSelected?.id || inquiries[0]?.id || null
  );
  const [notesInput, setNotesInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // In-UI Confirmation state (replaces fragile window.confirm)
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Keep active inquiry synced
  const activeInquiry = inquiries.find((i) => i.id === activeInquiryId) || inquiries[0] || null;

  useEffect(() => {
    if (activeInquiry) {
      setNotesInput(activeInquiry.notes || '');
    }
  }, [activeInquiryId, activeInquiry]);

  const handleSelectInquiry = (inq: Inquiry) => {
    setActiveInquiryId(inq.id);
    setNotesInput(inq.notes || '');
    setSuccess(null);
    setError(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const refreshed = await api.getInquiries();
      onInquiriesUpdated(refreshed);
      setSuccess('Inquiries list refreshed from database.');
      setTimeout(() => setSuccess(null), 2500);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh inquiries.');
    } finally {
      setRefreshing(false);
    }
  };

  const filteredInquiries = filter === 'all'
    ? inquiries
    : inquiries.filter((i) => i.status === filter);

  const handleStatusChange = async (newStatus: Inquiry['status']) => {
    if (!activeInquiry) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await api.updateInquiry(activeInquiry.id, { status: newStatus });
      const updatedList = inquiries.map((i) => (i.id === updated.id ? updated : i));
      onInquiriesUpdated(updatedList);
      setSuccess(`Status updated to "${newStatus.replace('_', ' ')}".`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update status.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await api.updateInquiry(activeInquiry.id, { notes: notesInput });
      const updatedList = inquiries.map((i) => (i.id === updated.id ? updated : i));
      onInquiriesUpdated(updatedList);
      setSuccess('Private notes saved.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save notes.');
    } finally {
      setLoading(false);
    }
  };

  // Open confirmation modal
  const promptDelete = (inquiry: Inquiry, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setError(null);
    setInquiryToDelete(inquiry);
  };

  // Execute confirmed deletion
  const confirmExecuteDelete = async () => {
    if (!inquiryToDelete || isDeleting) return;

    setIsDeleting(true);
    setError(null);

    const targetId = inquiryToDelete.id;
    const targetName = inquiryToDelete.name;

    try {
      await api.deleteInquiry(targetId);

      // Successfully deleted from database: remove from client state
      const updatedList = inquiries.filter((i) => i.id !== targetId);
      onInquiriesUpdated(updatedList);

      // If the active inquiry was the one deleted, switch to the first remaining
      if (activeInquiryId === targetId) {
        setActiveInquiryId(updatedList[0]?.id || null);
      }

      setSuccess(`Inquiry record for "${targetName}" permanently removed.`);
      setInquiryToDelete(null);
      setTimeout(() => setSuccess(null), 3500);
    } catch (err: any) {
      // Deletion failed: keep inquiry visible and display error
      setError(err.message || 'Failed to delete inquiry from database.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
            Inquiry Management
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
            Real inquiries submitted through the public /contact form.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-sans text-[#22221F] bg-white border border-[#22221F]/15 hover:bg-[#F7F4EE] transition-colors self-start sm:self-auto cursor-pointer"
          title="Reload latest records from database"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#B6A17E] ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh List'}</span>
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#22221F]/10 pb-4">
        {(['all', 'new', 'in_review', 'responded', 'archived'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider font-medium transition-colors cursor-pointer ${
              filter === st
                ? 'bg-[#22221F] text-[#F7F4EE]'
                : 'bg-white text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10'
            }`}
          >
            {st === 'all'
              ? `All Inquiries (${inquiries.length})`
              : `${st.replace('_', ' ')} (${inquiries.filter((i) => i.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Main View: Split Pane or Empty State */}
      {inquiries.length === 0 ? (
        <div className="p-16 text-center bg-white border border-[#22221F]/10 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F7F4EE] flex items-center justify-center mx-auto text-[#B6A17E]">
            <Inbox className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-serif text-[#22221F]">
              No inquiries received yet.
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#22221F]/60 max-w-md mx-auto leading-relaxed">
              When prospective clients submit briefs through the public /contact page, they will automatically appear here with full submission records.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inquiry Master List */}
          <div className="lg:col-span-5 bg-white border border-[#22221F]/10 overflow-hidden divide-y divide-[#22221F]/8 max-h-[750px] overflow-y-auto">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center text-xs font-sans text-[#22221F]/50">
                No inquiries matching "{filter.replace('_', ' ')}".
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = activeInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => handleSelectInquiry(inq)}
                    className={`p-5 cursor-pointer transition-colors space-y-2.5 relative group ${
                      isSelected
                        ? 'bg-[#F7F4EE] border-l-4 border-l-[#B6A17E]'
                        : 'hover:bg-[#F7F4EE]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-medium text-base text-[#22221F]">
                        {inq.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 font-sans font-medium ${
                            inq.status === 'new'
                              ? 'bg-amber-100 text-amber-900 font-semibold'
                              : inq.status === 'in_review'
                              ? 'bg-blue-100 text-blue-900'
                              : inq.status === 'responded'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {inq.status.replace('_', ' ')}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => promptDelete(inq, e)}
                          className="opacity-60 hover:opacity-100 p-1 text-red-600 hover:text-red-800 transition-opacity"
                          title="Delete this inquiry"
                          aria-label={`Delete inquiry from ${inq.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-sans text-[#22221F]/80 flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-[#B6A17E] shrink-0" />
                      <span className="font-medium truncate">{inq.company}</span>
                      {inq.role && (
                        <span className="text-[#22221F]/50 truncate">· {inq.role}</span>
                      )}
                    </div>

                    <p className="text-xs font-sans text-[#22221F]/60 line-clamp-2 leading-relaxed">
                      {inq.details}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-sans text-[#22221F]/40 pt-1 border-t border-[#22221F]/5">
                      <span className="truncate max-w-[180px]">{inq.service}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Inquiry Inspector */}
          <div className="lg:col-span-7 bg-white border border-[#22221F]/10 p-6 sm:p-8 space-y-6">
            {activeInquiry ? (
              <div className="space-y-6">
                {/* Header with Email & Delete Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22221F]/10 pb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
                      {activeInquiry.name}
                    </h2>
                    <div className="text-xs font-sans text-[#22221F]/60 flex items-center gap-2 mt-1">
                      <strong className="text-[#22221F]">{activeInquiry.company}</strong>
                      {activeInquiry.role ? (
                        <span>· {activeInquiry.role}</span>
                      ) : (
                        <span className="text-[#22221F]/40">(Role not provided)</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={`mailto:${activeInquiry.email}?subject=AEON MEDIA Inquiry Response — ${encodeURIComponent(activeInquiry.company)}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Initiate Reply</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <button
                      type="button"
                      onClick={() => promptDelete(activeInquiry)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans"
                      title="Delete inquiry record"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Workflow Status Selector */}
                <div className="p-4 bg-[#F7F4EE] border border-[#22221F]/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                      Workflow Status:
                    </span>
                    <span className="text-[11px] font-sans text-[#22221F]/60">
                      Current: <strong className="uppercase">{activeInquiry.status.replace('_', ' ')}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['new', 'in_review', 'responded', 'archived'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        disabled={loading}
                        onClick={() => handleStatusChange(st)}
                        className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer ${
                          activeInquiry.status === st
                            ? 'bg-[#22221F] text-[#F7F4EE] font-semibold ring-2 ring-[#B6A17E]'
                            : 'bg-white text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/15'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Structured Metadata Definition List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans pt-2 border-b border-[#22221F]/8 pb-6">
                  <div className="space-y-1">
                    <span className="text-[#22221F]/50 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#B6A17E]" />
                      <span>Business Email</span>
                    </span>
                    <a
                      href={`mailto:${activeInquiry.email}`}
                      className="text-[#22221F] font-medium underline decoration-[#B6A17E]/50"
                    >
                      {activeInquiry.email}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#22221F]/50 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#B6A17E]" />
                      <span>Requested Discipline</span>
                    </span>
                    <span className="text-[#22221F] font-medium block">
                      {activeInquiry.service}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#22221F]/50 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B6A17E]" />
                      <span>Submission Date & Time</span>
                    </span>
                    <span className="text-[#22221F]">
                      {new Date(activeInquiry.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#22221F]/50 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#B6A17E]" />
                      <span>Job Title / Role</span>
                    </span>
                    <span className="text-[#22221F]">
                      {activeInquiry.role || 'Not provided'}
                    </span>
                  </div>
                </div>

                {/* Project Description Brief */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#B6A17E] block">
                    Project Description & Narrative Scope
                  </span>
                  <div className="p-5 bg-[#F7F4EE]/60 border border-[#22221F]/10 text-sm font-sans text-[#22221F]/90 leading-relaxed whitespace-pre-wrap">
                    {activeInquiry.details}
                  </div>
                </div>

                {/* Private Staff Notes */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#B6A17E] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Private Internal Notes</span>
                    </span>
                    <span className="text-[11px] text-[#22221F]/40 font-sans">
                      (Visible only to authenticated studio personnel)
                    </span>
                  </div>

                  <textarea
                    rows={3}
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Add private staff comments, proposal ideas, or follow-up milestones..."
                    className="w-full p-3 bg-[#F7F4EE]/40 border border-[#22221F]/15 text-xs font-sans text-[#22221F] focus:outline-none focus:border-[#22221F]"
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSaveNotes}
                      className="px-5 py-2 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? 'Saving Notes...' : 'Save Private Notes'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-xs font-sans text-[#22221F]/50">
                Select an inquiry from the list to review details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Luxury In-DOM Confirmation Modal for Safe Deletion */}
      {inquiryToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#22221F]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div 
            className="fixed inset-0" 
            onClick={() => { if (!isDeleting) setInquiryToDelete(null); }} 
            aria-hidden="true" 
          />

          <div className="relative w-full max-w-lg bg-white border border-[#22221F]/20 shadow-2xl p-6 sm:p-8 space-y-6 z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-red-600">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 id="delete-dialog-title" className="text-lg font-serif text-[#22221F]">
                    Permanently Delete Inquiry?
                  </h3>
                  <div className="text-xs font-sans text-[#22221F]/50">
                    This action will immediately remove the record from persistent storage.
                  </div>
                </div>
              </div>

              {!isDeleting && (
                <button
                  type="button"
                  onClick={() => setInquiryToDelete(null)}
                  className="p-1.5 text-[#22221F]/40 hover:text-[#22221F] cursor-pointer"
                  aria-label="Cancel"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-4 bg-[#F7F4EE] border border-[#22221F]/10 space-y-2 text-xs font-sans">
              <div>
                <span className="text-[#22221F]/50 block">Contact Name</span>
                <strong className="text-sm font-serif text-[#22221F]">{inquiryToDelete.name}</strong>
              </div>
              <div>
                <span className="text-[#22221F]/50 block">Company / Property</span>
                <span className="text-[#22221F] font-medium">{inquiryToDelete.company}</span>
              </div>
              <div>
                <span className="text-[#22221F]/50 block">Requested Service</span>
                <span className="text-[#22221F]">{inquiryToDelete.service}</span>
              </div>
            </div>

            <p className="text-xs text-[#22221F]/70 font-sans leading-relaxed">
              Are you certain you wish to delete this inquiry? Once removed, the brief, contact history, and associated staff notes cannot be recovered.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#22221F]/10">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setInquiryToDelete(null)}
                className="px-4 py-2.5 text-xs font-sans uppercase tracking-wider text-[#22221F]/70 hover:text-[#22221F] hover:bg-[#F7F4EE] transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmExecuteDelete}
                className="px-5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold text-white bg-red-700 hover:bg-red-800 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing from Database...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
