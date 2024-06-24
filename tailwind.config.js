/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      copperPlate : ["CustomFont"] 
    },
    backgroundImage: {
      'home-nav' : "url('/public/assets/bgimage.svg')"
    }
  },
  plugins: [],
}

