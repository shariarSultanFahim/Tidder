const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#0E7490'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

