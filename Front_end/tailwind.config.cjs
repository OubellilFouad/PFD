/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: '#5030E5',
        paleMain: 'rgba(80,48,229,0.6)',
        palerMain: 'rgba(80, 48, 229, 0.08)',
        separator: '#F5F5F5',
        dimText: '#828282',
        red: '#E53030'
      },
      fontFamily: {
        nunito: ['"Nunito Sans"']
      }
    },
  },
  plugins: [],
}
