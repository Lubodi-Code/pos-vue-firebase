module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./formkit.config.js",
    "./node_modules/@formkit/themes/dist/**/*.js",
    "./node_modules/vue-tailwind-datepicker/**/*.js", // Agrega esta línea
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": require("tailwindcss/colors").purple, // Light mode Datepicker color
        "vtd-secondary": require("tailwindcss/colors").white, // Dark mode Datepicker color
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
