/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/Assets/night-japan-background.jpeg')"
      },
      fontFamily: {
        teko: ['"Teko"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

