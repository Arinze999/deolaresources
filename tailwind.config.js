/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        deolaBg: "#F3F4F6",
        deolaWhite: "#FFFFF",
        deolaBlack: "#000000",
        deolaYellow: "#FFD700",
        deolaYellowTrans: "#FFD7001A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        lato: ["Lato", "san-serif"],
        logofont: ["Rammetto One", "sans-serif"],
        poppings: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
