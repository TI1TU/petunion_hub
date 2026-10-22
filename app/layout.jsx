import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import QuickAddModal from '@/components/QuickAddModal';
import SizeGuideModal from '@/components/SizeGuideModal';
import AuthModal from '@/components/AuthModal';
import NotifyMeModal from '@/components/NotifyMeModal';
import CustomCursor from '@/components/CustomCursor';
import WhatsAppButton from '@/components/WhatsAppButton';
import ToastContainer from '@/components/ToastContainer';

export const metadata = {
  title: 'SHARMAZONE | Everyday Elevated Fashion — Delhi NCR',
  description:
    'SHARMAZONE is the premier contemporary fashion e-commerce brand serving Delhi, Noida, Gurugram, and Ghaziabad. Curated oversized silhouettes, tactical cargos, and priority 24-48h dispatch.',
  keywords: [
    'SHARMAZONE',
    'Delhi NCR fashion',
    'delhi streetwear',
    'oversized t-shirts delhi',
    'cargo pants noida',
    'fashion gurugram',
    'clothing brand ghaziabad',
    'contemporary apparel india',
  ],
  metadataBase: new URL('https://petunionhub.com'),
  alternates: {
    canonical: 'https://petunionhub.com',
  },
  openGraph: {
    title: 'SHARMAZONE | Everyday Elevated Fashion — Delhi NCR',
    description:
      'Curated silhouettes, refined mineral washes, and uncompromising fashion essentials designed for the Delhi NCR metropolis.',
    url: 'https://petunionhub.com',
    siteName: 'SHARMAZONE',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SHARMAZONE Fashion Campaign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHARMAZONE | Everyday Elevated Fashion — Delhi NCR',
    description:
      'Contemporary fashion essentials engineered for Delhi, Noida, Gurugram, and Ghaziabad.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
};

// JSON-LD Structured Data Schema for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://petunionhub.com/#organization',
      name: 'SHARMAZONE APPAREL',
      url: 'https://petunionhub.com',
      logo: 'https://petunionhub.com/logo.png',
      sameAs: [
        'https://instagram.com/sharmazone.official',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Okhla Industrial Area, Phase III',
        addressLocality: 'New Delhi',
        postalCode: '110020',
        addressRegion: 'Delhi NCR',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9876543210',
        contactType: 'customer service',
        areaServed: 'Delhi NCR',
        availableLanguage: ['en', 'hi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://petunionhub.com/#website',
      url: 'https://petunionhub.com',
      name: 'SHARMAZONE',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://petunionhub.com/shop?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which regions are serviced by SHARMAZONE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SHARMAZONE exclusively services the Delhi NCR capital region: Delhi, Noida, Gurugram, and Ghaziabad with priority doorstep delivery in 24 to 48 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does SHARMAZONE offer Cash on Delivery (COD)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Cash on Delivery (COD) is available with zero convenience fee across all verified addresses in Delhi, Noida, Gurugram, and Ghaziabad.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the return and exchange policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide a 7-day doorstep return and size exchange service with free courier pickup across Delhi NCR.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-black text-white antialiased selection:bg-white selection:text-black min-h-screen flex flex-col font-sans">
        <StoreProvider>
          {/* Desktop Custom Luxury Cursor */}
          <CustomCursor />

          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <SearchOverlay />
          <QuickAddModal />
          <SizeGuideModal />
          <AuthModal />
          <NotifyMeModal />
          <ToastContainer />
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  );
}
