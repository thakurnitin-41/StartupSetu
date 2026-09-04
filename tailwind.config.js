/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: '#0B2545',
          navy: '#134074',
          accent: '#0066CC',
          light: '#EEF4F8',
          gold: '#D4AF37',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          surface: '#F8FAFC',
          card: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
