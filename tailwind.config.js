/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'sans-serif'],
      },
      colors: {
        "dark-blue": "#1b0c35",
      }
    },
  },
  plugins: [],
}

