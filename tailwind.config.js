/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      colors: {
        amr: "#1e90ff",
        img: "#f0f0f0",
        offWhite: "#333",
        buttonBg: "#e9c27d",
        backgroundAColor: "#3b5998",
        backgroundAColor2: "#55acee",
        addProductInputBorder: "#494969",
        iconColor: "#7b79ff",
        addPhotoText: "#a5a5ba",
        disableColor: "#d5d5d5",
        darkNav: "#192734",
        darkBody: "#15202B",
        darkCard: "#192734",
        darkPText: "#ffffff",
        darkSText: "#8899A6",
        darkMenu: "#9b9b9b",
      },
    },
  },
  plugins: [],
};
