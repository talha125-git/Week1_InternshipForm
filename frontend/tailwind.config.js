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
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 33, 61, 0.04), 0 8px 24px rgba(20, 33, 61, 0.06)',
      },
    },
  },
  plugins: [],
};
