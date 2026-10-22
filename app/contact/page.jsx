'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            CLIENT CONCIERGE • DELHI NCR
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
            CONTACT SHARMAZONE
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Have questions about fit, custom styling, or your Delhi NCR priority dispatch? Our team is available 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-6">
              <h2 className="font-display font-bold text-sm uppercase text-white tracking-wider border-b border-neutral-800 pb-3">
                Delhi NCR Studio & Hub
              </h2>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold">SHARMAZONE Atelier</p>
                    <p className="text-neutral-400">
                      Okhla Industrial Area, Phase III, New Delhi 110020
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold">Concierge Email</p>
                    <a
                      href="mailto:support@sharmazone.com"
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      support@sharmazone.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold">Direct Line & WhatsApp</p>
                    <a
                      href="tel:+919876543210"
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold">Operating Hours</p>
                    <p className="text-neutral-400">Monday – Sunday: 10:00 AM – 8:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                DELHI NCR EXPRESS DISPATCH
              </span>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Orders placed before 2:00 PM in Delhi, Noida, Gurugram, and Ghaziabad are processed for immediate priority delivery.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 p-6 sm:p-8">
            <h2 className="font-display font-bold text-lg uppercase tracking-tight text-white mb-6">
              SEND A MESSAGE
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 space-y-3 font-mono text-xs text-center">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
                <p className="font-bold text-sm">Thank You for Reaching Out</p>
                <p className="text-neutral-300">
                  Your inquiry has been logged with SHARMAZONE client support. A specialist will respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Kabir Sharma"
                      className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kabir@example.com"
                      className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Sizing inquiry / Order update / Delhi NCR delivery"
                    className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can assist you..."
                    className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors inline-flex items-center gap-2 shadow-xl"
                >
                  <span>TRANSMIT MESSAGE</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
