/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6457F0",
      },
      screens: {
        lg: { max: "2023px" },

        sm: { max: "1000px" },
      },
    },
  },
  plugins: [],
};
