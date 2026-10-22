/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          white: '#FFFFFF',
          offwhite: '#F5F3EF',
          charcoal: '#1F1F1F',
          softgrey: '#E7E5E1',
          accent: '#C84B31', // Muted rust for sale, low stock, progress bar
          'accent-bright': '#E64A19',
          border: '#E7E5E1',
          'border-dark': '#262626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        none: '0px',
      },
      transitionTimingFunction: {
        streetwear: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
      },
    },
  },
  plugins: [],
};
