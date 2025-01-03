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
        deolaDarkGreen: "#207176",
        deolaDarkGreen2: "#0F3A39",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        lato: ["Lato", "san-serif"],
        logofont: ["Rammetto One", "sans-serif"],
        poppings: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        custom: "-5px 5px 12px -3px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};
