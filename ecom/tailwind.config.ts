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
        // Deep Dark Colors
        dark: {
          950: '#04060a',
          900: '#090d16',
          850: '#0d1320',
          800: '#131b2e',
          700: '#1c2842',
          600: '#28385a',
        },
        // Clean Light Gray Palette
        light: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
        },
        // Electric Neon Accents
        neon: {
          lime: '#00ff87',
          green: '#05f26c',
          cyan: '#00f0ff',
          yellow: '#faff00',
          dark: '#038c47',
        },
      },
      boxShadow: {
        'neon': '0 0 25px -2px rgba(0, 255, 135, 0.45)',
        'neon-sm': '0 0 12px -2px rgba(0, 255, 135, 0.35)',
        'neon-cyan': '0 0 25px -2px rgba(0, 240, 255, 0.45)',
        'dark-card': '0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'light-card': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
