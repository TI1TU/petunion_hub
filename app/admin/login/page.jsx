'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@sharmazone.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed.');
      }

      // Store admin token in localStorage for client auth header fallback
      localStorage.setItem('sz_admin_token', data.token);
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 p-8 shadow-2xl backdrop-blur-xl relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-600 via-white to-neutral-600" />

        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-full mb-3 text-white">
            <ShieldCheck size={28} />
          </div>
          <h1 className="font-display font-black text-2xl tracking-wider uppercase text-white">
            SHARMAZONE ADMIN
          </h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-mono">
            Authorized Personnel Only • Delhi NCR Hub
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sharmazone.com"
                className="w-full bg-black/60 border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-neutral-500" />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">
              Allowlisted: admin@sharmazone.com or vishal.20031203@gmail.com
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: SharmaAdmin2026!)"
                className="w-full bg-black/60 border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-neutral-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <span>VERIFYING...</span>
            ) : (
              <>
                <span>ENTER CONSOLE</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-[11px] text-neutral-500">
            For access credentials support, contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
