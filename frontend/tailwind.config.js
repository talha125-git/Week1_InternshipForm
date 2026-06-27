/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14213D',
          light: '#24365C',
          50: '#EDF0F5',
        },
        paper: '#F5F6F3',
        gold: {
          DEFAULT: '#FFB100',
          dark: '#E29D00',
          50: '#FFF6E0',
        },
        green: {
          DEFAULT: '#1F7A5C',
          light: '#2A9C75',
          50: '#E7F4EF',
        },
        red: {
          DEFAULT: '#DC2626',
          light: '#EF4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 33, 61, 0.04), 0 8px 24px rgba(20, 33, 61, 0.06)',
        'card-hover': '0 4px 12px rgba(20, 33, 61, 0.08), 0 16px 40px rgba(20, 33, 61, 0.1)',
        glow: '0 0 20px rgba(255, 177, 0, 0.15)',
        modal: '0 24px 80px rgba(20, 33, 61, 0.25)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(100%) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(100%) scale(0.95)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        toastIn: 'toastIn 0.35s cubic-bezier(0.21, 1.02, 0.73, 1)',
        toastOut: 'toastOut 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
