/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass-dark': '#1a1a1acc',
        'accent-orange': '#ff8c42',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
