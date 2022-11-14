/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#f8f8f8',
        ternary: '#757575',
        highlight: '#2088d2',
        success: '#79a429'
      },
      boxShadow: {
        darkShadow: '0 4px 8px rgba(0, 0, 0, 0.75)',
        lightShadow: '0 4px 8px rgba(0, 0, 0, 0.75)'
      }
    },
  },
  plugins: [],
}
