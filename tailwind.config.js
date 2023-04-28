/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark__alt': '#313544',
        'blue__primary': '#0f8ee2',
        'red__cancel': '#d3193e',
        'white': '#F8F8FF',
        'dash1': "rgba(239, 55, 55, 0.15)",
        'dash2': "rgba(52, 90, 239, 0.15)",
        'dash3': "rgba(67, 206, 205, 0.15)",
        'dash4': "rgba(72, 214, 112, 0.15)",
        'dash5': "rgba(228, 21, 119, 0.15)",
        'dash6': "rgba(234, 99, 21, 0.15)",
      },
      backgroundImage: {
        'auth': 'url(/img/background.jpg)',
        'auth__overlay': 'linear-gradient(51deg, rgba(40,43,55,1) 50%, rgba(40,43,55,0.773546918767507) 100%)'
      },
      colors: {
        'blue__primary': '#0f8ee2',
        'white': '#F8F8FF',
        'black': 'rgb(40,43,55)',
        'dash1': "#ef1717",
        'dash2': "#345aef",
        'dash3': "#23cece",
        'dash4': "#1dd670",
        'dash5': "#e51677",
        'dash6': "#ea6315",
      }
    },
  },
  plugins: [],
}
