'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function SignupPage() {
  const router = useRouter();
  const { loginUser } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create account.');
      }

      loginUser(phone, name);
      router.push('/verify-email?registered=true');
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
            JOIN SHARMAZONE
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
            CREATE ACCOUNT
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Unlock 10% off your first order, priority Delhi NCR delivery, and express tracking.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 font-mono">
            <AlertCircle size={15} className="flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full bg-black border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 outline-none"
              />
              <User size={15} className="absolute left-3.5 top-3.5 text-neutral-500" />
            </div>
          </div>

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
                placeholder="rohan@example.com"
                className="w-full bg-black border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 outline-none"
              />
              <Mail size={15} className="absolute left-3.5 top-3.5 text-neutral-500" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
              Mobile Number (For Delhi NCR Delivery Updates)
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-black border border-neutral-700 focus:border-white px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 outline-none"
              />
              <Phone size={15} className="absolute left-3.5 top-3.5 text-neutral-500" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
              Password (Min. 6 Characters)
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
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
            {loading ? <span>CREATING ACCOUNT...</span> : <span>CREATE ACCOUNT</span>}
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400">
            Already have an account?{' '}
            <Link href="/login" className="text-white font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
