/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'dark': '3px 3px 5px black',
        'dark-t': '2px -2px 6px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}