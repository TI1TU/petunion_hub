'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Which regions are serviced by SHARMAZONE?',
      a: 'SHARMAZONE exclusively services Delhi NCR: New Delhi & Old Delhi (110xxx PINs), Noida & Greater Noida (2013xx PINs), Gurugram (122xxx PINs), and Ghaziabad (2010xx PINs). Orders placed to these postal codes receive express 24 to 48-hour doorstep delivery.',
    },
    {
      q: 'What are the delivery charges and minimum threshold for free shipping?',
      a: 'We provide complimentary Express Delivery across all serviceable Delhi NCR pincodes on orders of ₹999 or more. For orders below ₹999, a nominal logistics charge of ₹99 applies.',
    },
    {
      q: 'Is Cash on Delivery (COD) supported?',
      a: 'Yes, Cash on Delivery is available for all verified addresses in Delhi, Noida, Gurugram, and Ghaziabad with zero COD convenience fee.',
    },
    {
      q: 'How does your sizing and silhouette compare to standard retail?',
      a: 'Our oversized t-shirts feature a deliberate drop-shoulder cut with a wider chest and a boxy drape. If you prefer the intended modern streetwear aesthetic, order your true size. For a regular tailored fit, order one size down. View our Size Guide or 3D Fit Finder for exact garment dimensions in inches and centimeters.',
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a 7-day hassle-free return and exchange policy. Our courier provides complimentary doorstep pickup across Delhi NCR. Refunds for prepaid orders are credited back to your original payment method or UPI within 24 hours of inspection.',
    },
    {
      q: 'How can I track my live order?',
      a: 'Once your order is dispatched from our Delhi atelier, you will receive an SMS and email with your AWB tracking code. You can also visit our Live Order Tracker page anytime to follow your delivery timeline.',
    },
    {
      q: 'How do I apply promotional discount codes like FIRST10 or DELHINCR?',
      a: 'During checkout or on the Shopping Bag page, enter your promotional code in the coupon field. First-time shoppers can apply "FIRST10" for 10% off. For Delhi NCR orders above ₹1,499, code "DELHINCR" applies an exclusive 15% discount.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            KNOWLEDGE BASE • DELHI NCR
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-sm text-neutral-400">
            Everything you need to know about shopping, delivery, fits, and returns at SHARMAZONE.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="bg-neutral-950 border border-neutral-800 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base uppercase tracking-tight text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans border-t border-neutral-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8 border-t border-neutral-800">
          <p className="text-xs text-neutral-400 mb-4 font-mono">
            Still have an unanswered question?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors"
          >
            <span>CONNECT WITH CLIENT SUPPORT</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
