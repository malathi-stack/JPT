/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F6F8',
        paperDark: '#ECEEF2',
        ink: '#14213D',
        inkSoft: '#3B4A6B',
        amber: '#E8A33D',
        amberDark: '#C97F1F',
        status: {
          wishlist: '#8B7FD1',
          applied: '#5B7FDE',
          interview: '#E8A33D',
          offer: '#2E9E6D',
          rejected: '#C4573D',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 33, 61, 0.06), 0 4px 12px rgba(20, 33, 61, 0.06)',
        cardHover: '0 2px 4px rgba(20, 33, 61, 0.08), 0 8px 24px rgba(20, 33, 61, 0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
