// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['IBM Plex Sans Arabic', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs"), require("tw-elements-react/dist/plugin.cjs")],
};