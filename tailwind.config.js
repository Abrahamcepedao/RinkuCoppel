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
        'blue__primary': '#0f8ee2'
      },
      backgroundImage: {
        'auth': 'url(/img/background.jpg)',
        'auth__overlay': 'linear-gradient(51deg, rgba(40,43,55,1) 50%, rgba(40,43,55,0.773546918767507) 100%)'
      },
      colors: {
        'blue__primary': '#0f8ee2',
        'white': '#F8F8FF'
      }
    },
  },
  plugins: [],
}
