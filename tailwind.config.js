/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  content: [],
  theme: {
    extend: {
      width: {
        '80-screen': '80vw',
      },
      height: {
        '80-screen': '80vh',
      },
    },
  },
  plugins: [],
}
