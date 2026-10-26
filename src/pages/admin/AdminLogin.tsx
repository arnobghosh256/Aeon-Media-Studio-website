import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../../api/client.ts';
import { AdminUser } from '../../types/index.ts';

interface AdminLoginProps {
  onSuccess: (user: AdminUser) => void;
  onReturnToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onReturnToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both administrative email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.login(email, password);
      onSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#22221F] text-[#F7F4EE] flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Lockup with Official Gold Insignia */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#B6A17E]/50 ring-2 ring-[#B6A17E]/20 bg-[#161614] shadow-2xl p-0.5">
              <img
                src="/assets/aistudio/IMG_20261003_095753_7e6246d0.png"
                alt="AEON MEDIA Crest"
                className="w-full h-full object-cover object-top scale-125"
              />
            </div>
          </div>
          <div className="text-xs uppercase tracking-widest text-[#B6A17E] font-sans font-semibold pt-1">
            Central Studio Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#F7F4EE] tracking-[0.1em] uppercase">
            AEON MEDIA
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#F7F4EE]/60">
            Administrative Authentication Gateway
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-[#2B2B27] border border-[#3E3E38] p-8 sm:p-10 space-y-6 shadow-2xl">
          {error && (
            <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans text-[#F7F4EE]/80">
                Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#1F1F1C] border border-[#3E3E38] text-sm text-[#F7F4EE] focus:outline-none focus:border-[#B6A17E] transition-colors"
                placeholder="staff@aeonmedia.co"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans text-[#F7F4EE]/80">
                Security Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#1F1F1C] border border-[#3E3E38] text-sm text-[#F7F4EE] focus:outline-none focus:border-[#B6A17E] transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 text-xs font-sans uppercase tracking-wider font-semibold text-[#22221F] bg-[#B6A17E] hover:bg-[#CBB99C] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Enter Studio Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={onReturnToSite}
            className="text-xs font-sans text-[#F7F4EE]/50 hover:text-[#B6A17E] transition-colors"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
