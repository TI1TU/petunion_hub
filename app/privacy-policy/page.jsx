import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SHARMAZONE™',
  description: 'Digital Personal Data Protection and data confidentiality at SHARMAZONE.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            PRIVACY &amp; DATA POLICY
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Committed to Indian Digital Personal Data Protection standards.
          </p>
        </div>

        <div className="space-y-6 text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-6 md:p-8 border border-brand-charcoal">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              1. Information We Collect
            </h2>
            <p>
              We collect information necessary to fulfill your streetwear orders, including mobile phone numbers for OTP verification, delivery addresses, postal codes, and email addresses for automated tracking and GST invoices.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              2. Payment Security
            </h2>
            <p>
              We do not store complete credit card or debit card credentials on our servers. All financial transactions are securely tokenized and handled through PCI-DSS Level 1 certified gateways supporting Indian UPI, RuPay, Visa, and Mastercard.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              3. WhatsApp Communications
            </h2>
            <p>
              If opted in, you receive order receipts, dispatch timestamps, and live courier tracking links via WhatsApp. You can revoke WhatsApp messaging at any time by replying &ldquo;STOP&rdquo;.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              4. Grievance Redressal
            </h2>
            <p>
              Grievance Officer: Vishal Sharma | Email: support@sharmazone.com | Address: SHARMAZONE FASHIONS, Okhla Industrial Area Phase III, New Delhi 110020.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
