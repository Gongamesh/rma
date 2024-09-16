/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6B8E23',   // Maslinasto zelena
        white: '#FFFFFF',     // Bijela
        dark: '#2C3E50',      // Tamno siva
        lightGray: '#E0E0E0', // Svijetlo siva
        accent: '#DAA520',    // Zlatna
      },
    },
  },
  plugins: [],
};