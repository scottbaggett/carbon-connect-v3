module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  prefix: "cc-",
  theme: {
    extend: {
      colors: {
        high_em: "#000000",
        low_em: "#0000007a", //rgba(0,0,0,0.48)
        info_em: "#067BF9",
        white: "#FFFFFF",
        "surface-info_main": "#0BABFB",
        "surface-white": "#FFFFFF",
        "surface-surface_1": "rgba(0, 0, 0, 0.04)",
        "color-black-7": "rgba(0, 0, 0, 0.07)",
        "outline-low_em": "rgba(0, 0, 0, 0.12)",
        "outline-med_em": "rgba(0, 0, 0, 0.16)",
        disabledtext: "rgba(0, 0, 0, 0.32)",
        "gray-50": "#F3F3F4",
        "gradient-blue":
          "linear-gradient(0deg, rgba(31, 123, 245, 0.10) 0%, rgba(31, 123, 245, 0.10) 100%), var(--color-white-20, rgba(255, 255, 255, 0.20)",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        modal: "0px 40px 48px -8px rgba(0, 0, 0, 0.07)",
        logo: "0px 3px 4px -2px (0, 0, 0, 0.16)",
        dropdown: "0px 8px 24px -4px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
