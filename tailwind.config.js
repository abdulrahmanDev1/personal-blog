/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{pug, html}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'dracula', 'night']
  }
}
