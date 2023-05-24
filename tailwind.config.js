/** @type {import('tailwindccs'.Config)} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandOrange: "#FFAB2E",
        accentOrange: "#FF6721",
        accentBlue: "#080FA0",
        offWhite: "#FCFCFC",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
