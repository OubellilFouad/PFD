/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: '#3C486B',
        'blue-500': '#F9D949',
        paleMain: 'rgba(60,72,107,0.6)',
        palerMain: 'rgba(60, 72, 107, 0.08)',
        separator: '#e9ecef',
        dimText: '#828282',
        red: '#F45050',
        darkRed: '#c22929',
        'green-500': '#26ba1f'
      },
      fontFamily: {
        nunito: ['"Nunito Sans"']
      }
    },
  },
  plugins: [],
}
