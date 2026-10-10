/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        upnavy: {
          50: '#f0f5fa',
          100: '#dbe6f1',
          200: '#bad0e4',
          300: '#8db2d2',
          400: '#588ebb',
          500: '#3472a5',
          600: '#235987',
          700: '#1a466c',
          800: '#062F4F', 
          900: '#062640',
          950: '#031728',
          DEFAULT: '#062F4F',
        },
        upsaffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#e4541f', 
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#e4541f',
        },
        upsky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          DEFAULT: '#0284c7',
        },
        rural: {
          navy: '#062F4F',
          saffron: '#e4541f',
          sky: '#0284c7',
          emerald: '#059669',
          amber: '#e4541f',
          soil: '#062F4F',
          cream: '#fffbeb',
          dark: '#062F4F'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
