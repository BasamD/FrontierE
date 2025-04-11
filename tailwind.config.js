/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#654321',    // Brown
        secondary: '#D2B48C',  // Tan
        accent: '#DAA520',     // Gold
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}