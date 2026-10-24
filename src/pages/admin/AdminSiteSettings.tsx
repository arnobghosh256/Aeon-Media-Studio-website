import React, { useState, useEffect } from 'react';
import { Database, Shield, KeyRound, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../../api/client.ts';

export const AdminSiteSettings: React.FC = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    try {
      const data = await api.getHealth();
      setHealthData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(null);
    setPasswordError(null);

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    setPasswordLoading(true);
    try {
      const msg = await api.changePassword(currentPassword, newPassword);
      setPasswordSuccess(msg || 'Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 4000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#22221F]">
          Site & System Infrastructure
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#22221F]/60">
          Server persistence status, cryptographic credentials, and backend database telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Telemetry Box */}
        <div className="bg-white border border-[#22221F]/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#22221F]/8 pb-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#B6A17E]" />
              <h2 className="text-lg font-serif text-[#22221F]">Database Telemetry</h2>
            </div>
            <button
              onClick={fetchHealth}
              disabled={loadingHealth}
              className="p-1.5 text-[#22221F]/70 hover:text-[#22221F] border border-[#22221F]/10"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="flex items-center justify-between py-2 border-b border-[#22221F]/5">
              <span className="text-[#22221F]/60">Backend Service Status</span>
              <span className="font-semibold text-emerald-700">● Operational (Express Node.js)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#22221F]/5">
              <span className="text-[#22221F]/60">Data Persistence Layer</span>
              <span className="font-mono text-[#22221F]">Atomic JSON Store (/data/database.json)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#22221F]/5">
              <span className="text-[#22221F]/60">Persisted Inquiries Count</span>
              <span className="font-mono text-[#22221F] tabular-nums font-semibold">
                {healthData?.database?.inquiriesCount ?? '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#22221F]/5">
              <span className="text-[#22221F]/60">Monographs in Archive</span>
              <span className="font-mono text-[#22221F] tabular-nums font-semibold">
                {healthData?.database?.portfolioCount ?? '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#22221F]/5">
              <span className="text-[#22221F]/60">Active Core Services</span>
              <span className="font-mono text-[#22221F] tabular-nums font-semibold">
                {healthData?.database?.servicesCount ?? '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[#22221F]/60">Server Time</span>
              <span className="font-mono text-[#22221F]/80">
                {healthData?.timestamp ? new Date(healthData.timestamp).toLocaleString() : '—'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#F7F4EE] border border-[#22221F]/8 text-xs font-sans text-[#22221F]/70 space-y-1">
            <div className="flex items-center gap-1.5 text-[#B6A17E] font-medium uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Production Security Notice</span>
            </div>
            <p className="leading-relaxed">
              All administrative write operations are guarded by Bearer session verification. Password hashing utilizes Node scrypt with unique salt bytes.
            </p>
          </div>
        </div>

        {/* Change Admin Password */}
        <div className="bg-white border border-[#22221F]/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#22221F]/8 pb-4">
            <KeyRound className="w-4 h-4 text-[#B6A17E]" />
            <h2 className="text-lg font-serif text-[#22221F]">Update Admin Password</h2>
          </div>

          {passwordSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3.5 bg-red-50 border border-red-300 text-red-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                New Password (minimum 8 chars)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-[#22221F]">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[#F7F4EE]/50 border border-[#22221F]/15 text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-2.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#F7F4EE] bg-[#22221F] hover:bg-[#343430] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating Security Token...</span>
                  </>
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
