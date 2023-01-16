/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bloodred: {
          100: "#C12121",
          200: "#8F0202",
          300: "#5E0505",
        },
        juicy: {
          100: "#E46E18",
          200: "#D7560D",
          300: "#8C2B0C",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
