import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          lime: '#05f26c',
          glow: '#00ff87',
          dark: '#02853d',
          cyan: '#00f0ff',
          yellow: '#f5ff00',
          purple: '#b026ff',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
        },
        brand: {
          dark: '#0b0f19',
          charcoal: '#151b28',
          slate: '#0f172a',
        },
      },
      boxShadow: {
        'neon': '0 0 25px -4px rgba(5, 242, 108, 0.45)',
        'neon-sm': '0 0 12px -2px rgba(5, 242, 108, 0.35)',
        'neon-cyan': '0 0 25px -4px rgba(0, 240, 255, 0.45)',
        'soft': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
        'lifted': '0 20px 40px -10px rgba(15, 23, 42, 0.1), 0 8px 12px -4px rgba(15, 23, 42, 0.05)',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
