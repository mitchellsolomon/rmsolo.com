module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light100: "var(--light100)",
        light200: "var(--light200)",
        light300: "var(--light300)",
        light400: "var(--light400)",
        light500: "var(--light500)",
        light600: "var(--light600)",
        dark100: "var(--dark100)",
        dark200: "var(--dark200)",
        dark300: "var(--dark300)",
        dark400: "var(--dark400)",
        dark500: "var(--dark500)",
        dark600: "var(--dark600)",
      },
      fontFamily: {
        system: ["system-ui"],
        code: ["Fira Code"],
        inter: ["Inter"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
