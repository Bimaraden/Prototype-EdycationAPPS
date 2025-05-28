/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-black': '#000000',
        'custom-blue': '#3B82F6',
        gray: {
          900: '#0A0F1C',
          800: '#151C2C',
          700: '#1F2937',
          600: '#374151',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(59, 130, 246, 0.5)',
        'neon-lg': '0 0 30px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
};