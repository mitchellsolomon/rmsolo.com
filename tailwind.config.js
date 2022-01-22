module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        system: ["system-ui"],
        code: ["Fira Code"],
        inter: ["Inter"],
      },
      colors: {
        "gray-1": "#f7f7f7",
        "gray-2": "#dedede",
        "gray-3": "#b0b0b0",
        "gray-4": "#737373",
        "gray-5": "#282828",
        "blue-1": "#4c97ff",
        "blue-2": "#2d72d2",
        "blue-3": "#24508f",
        "blue-4": "#1c2f4a",
        "blue-5": "#0d223f",
        "blue-6": "#121821",
      },
    },
  },
  plugins: [],
};
