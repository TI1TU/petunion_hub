'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token || 'dev-token', newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to reset password.');
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col justify-center items-center px-4 py-28">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            ACCOUNT SECURITY
          </span>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1">
            NEW PASSWORD
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Choose a strong new password for your SHARMAZONE account.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 font-mono">
            <AlertCircle size={15} className="flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono space-y-2 text-center">
            <CheckCircle2 size={24} className="mx-auto text-emerald-400" />
            <p className="font-bold">Password Successfully Updated!</p>
            <p className="text-neutral-400">Redirecting to sign-in page...</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 outline-none"
                />
                <Lock size={15} className="absolute left-3.5 top-3.5 text-neutral-500" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 outline-none"
                />
                <Lock size={15} className="absolute left-3.5 top-3.5 text-neutral-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <span>UPDATING...</span> : <span>UPDATE PASSWORD</span>}
              <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-black text-white flex items-center justify-center">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">Loading Password Portal...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
