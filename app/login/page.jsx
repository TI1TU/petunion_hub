'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid email or password.');
      }

      // Update client store state
      loginUser(data.user.phone, data.user.name);
      router.push('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col justify-center items-center px-4 py-28">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            SHARMAZONE ACCOUNT
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
            SIGN IN
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Access your orders, saved addresses, and Delhi NCR delivery updates.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 font-mono">
            <AlertCircle size={15} className="flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
              Email Address
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-mono text-neutral-400 hover:text-white underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <span>VERIFYING...</span> : <span>SIGN IN</span>}
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="text-white font-bold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
