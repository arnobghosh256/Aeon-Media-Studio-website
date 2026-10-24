import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { api } from '../../api/client.ts';
import { Service } from '../../types/index.ts';

interface InquiryFormProps {
  services: Service[];
  preselectedService?: string;
  onSuccess?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  services,
  preselectedService,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    service: preselectedService || (services[0]?.title ?? 'Luxury Hotel Website Copywriting'),
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ message: string; inquiryId: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid business email address.';
    }
    if (!formData.company.trim()) {
      errors.company = 'Hotel, resort, or organization name is required.';
    }
    if (!formData.details.trim()) {
      errors.details = 'Please outline your property or project requirements.';
    } else if (formData.details.trim().length < 10) {
      errors.details = 'Please provide a bit more context (at least 10 characters).';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.submitInquiry(formData);
      setSubmittedData(res);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit inquiry. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div className="p-8 sm:p-12 bg-white border border-[#22221F]/10 space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 text-[#B6A17E]">
          <CheckCircle2 className="w-8 h-8" />
          <span className="text-xs uppercase tracking-widest font-sans font-semibold">
            Inquiry Registered
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
            Thank you, {formData.name}.
          </h3>
          <p className="text-sm sm:text-base font-sans text-[#22221F]/80 leading-relaxed max-w-xl">
            {submittedData.message}
          </p>
        </div>

        <div className="p-4 bg-[#F7F4EE] border border-[#22221F]/8 text-xs font-sans text-[#22221F]/70 space-y-1">
          <div><strong className="text-[#22221F]">Reference ID:</strong> {submittedData.inquiryId}</div>
          <div><strong className="text-[#22221F]">Target Property:</strong> {formData.company}</div>
          <div><strong className="text-[#22221F]">Service Area:</strong> {formData.service}</div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-[#22221F]/10">
          <button
            onClick={() => {
              setSubmittedData(null);
              setFormData({
                name: '',
                email: '',
                company: '',
                role: '',
                service: services[0]?.title ?? 'Luxury Hotel Website Copywriting',
                details: '',
              });
            }}
            className="text-xs font-sans text-[#B6A17E] hover:text-[#22221F] underline underline-offset-4"
          >
            Submit another inquiry
          </button>
          <span className="text-xs text-[#22221F]/50 font-sans">
            Direct desk: aeonmediaofficial@gmail.com
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-white border border-[#22221F]/10 space-y-8" noValidate>
      <div className="space-y-2 border-b border-[#22221F]/8 pb-6">
        <h3 className="text-xl sm:text-2xl font-serif text-[#22221F]">
          Commission a Narrative
        </h3>
        <p className="text-xs sm:text-sm font-sans text-[#22221F]/70">
          Please provide initial context regarding your property and scheduling horizons.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Full Name <span className="text-[#B6A17E]">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alistair Sterling"
            className={`w-full px-4 py-3 bg-[#F7F4EE]/50 border text-sm text-[#22221F] placeholder:text-[#22221F]/30 focus:outline-none focus:border-[#22221F] focus:bg-white transition-colors ${
              fieldErrors.name ? 'border-red-400' : 'border-[#22221F]/15'
            }`}
          />
          {fieldErrors.name && (
            <p className="text-xs text-red-600 font-sans">{fieldErrors.name}</p>
          )}
        </div>

        {/* Business Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Business Email <span className="text-[#B6A17E]">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. sterling@grandresidences.com"
            className={`w-full px-4 py-3 bg-[#F7F4EE]/50 border text-sm text-[#22221F] placeholder:text-[#22221F]/30 focus:outline-none focus:border-[#22221F] focus:bg-white transition-colors ${
              fieldErrors.email ? 'border-red-400' : 'border-[#22221F]/15'
            }`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600 font-sans">{fieldErrors.email}</p>
          )}
        </div>

        {/* Hotel / Resort */}
        <div className="space-y-1.5">
          <label htmlFor="company" className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Hotel, Resort or Organization <span className="text-[#B6A17E]">*</span>
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Villa Monaldeschi Collection"
            className={`w-full px-4 py-3 bg-[#F7F4EE]/50 border text-sm text-[#22221F] placeholder:text-[#22221F]/30 focus:outline-none focus:border-[#22221F] focus:bg-white transition-colors ${
              fieldErrors.company ? 'border-red-400' : 'border-[#22221F]/15'
            }`}
          />
          {fieldErrors.company && (
            <p className="text-xs text-red-600 font-sans">{fieldErrors.company}</p>
          )}
        </div>

        {/* Job Title / Role */}
        <div className="space-y-1.5">
          <label htmlFor="role" className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
            Job Title or Role <span className="text-[#22221F]/40 lowercase">(optional)</span>
          </label>
          <input
            id="role"
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g. General Manager / Brand Director"
            className="w-full px-4 py-3 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] placeholder:text-[#22221F]/30 focus:outline-none focus:border-[#22221F] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Required Service Dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="service" className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
          Required Service Area <span className="text-[#B6A17E]">*</span>
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-3 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm text-[#22221F] focus:outline-none focus:border-[#22221F] focus:bg-white transition-colors"
        >
          {services.map((serv) => (
            <option key={serv.id} value={serv.title}>
              {serv.title} — ({serv.category})
            </option>
          ))}
          <option value="Multi-Service Bespoke Commission">Multi-Service Bespoke Commission</option>
        </select>
      </div>

      {/* Project Details */}
      <div className="space-y-1.5">
        <label htmlFor="details" className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
          Project Details & Narrative Requirements <span className="text-[#B6A17E]">*</span>
        </label>
        <textarea
          id="details"
          rows={5}
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          placeholder="Please describe your property, key milestones, existing challenges, and expected timeline..."
          className={`w-full px-4 py-3 bg-[#F7F4EE]/50 border text-sm text-[#22221F] placeholder:text-[#22221F]/30 focus:outline-none focus:border-[#22221F] focus:bg-white transition-colors resize-y ${
            fieldErrors.details ? 'border-red-400' : 'border-[#22221F]/15'
          }`}
        />
        {fieldErrors.details && (
          <p className="text-xs text-red-600 font-sans">{fieldErrors.details}</p>
        )}
      </div>

      {/* Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-[#22221F]/60 font-sans">
          All client conversations and pre-launch briefs remain strictly confidential.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-sans uppercase tracking-wider font-medium text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
