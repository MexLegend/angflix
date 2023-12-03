/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pocket-monk': ['Pocket Monk', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'sans-serif'],
      },
      colors: {
        "dark-blue": "#1b0c35",
      }
    },
  },
  plugins: [],
}

