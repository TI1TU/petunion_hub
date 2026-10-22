'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (_) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col justify-center items-center px-4 py-28">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            SECURITY ASSISTANCE
          </span>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1">
            RESET PASSWORD
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Enter your account email to receive a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs font-mono space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="font-bold">Instructions Sent</span>
            </div>
            <p className="text-neutral-300">
              If an account exists for {email}, a secure password reset link has been dispatched.
            </p>
            <div className="pt-2">
              <Link href="/login" className="text-white underline hover:no-underline font-bold">
                Return to Login →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                Account Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 outline-none"
                />
                <Mail size={15} className="absolute left-3.5 top-3.5 text-neutral-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <span>SENDING...</span> : <span>SEND RESET LINK</span>}
              <ArrowRight size={15} />
            </button>

            <div className="text-center pt-4">
              <Link href="/login" className="text-xs font-mono text-neutral-400 hover:text-white underline">
                Remember your password? Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
