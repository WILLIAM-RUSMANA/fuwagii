const { default: tailwindcss } = require("@tailwindcss/vite");

// tailwind.config.js
module.exports = {
  content: [
    "index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    // Add other directories if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
