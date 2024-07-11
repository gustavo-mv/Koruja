/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ciano: "#0b1c36",
        laranja: "#e86800",
        chumbo: "#345e5e",
      },
    },
  },
  plugins: [],
};
