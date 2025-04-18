const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...fontFamily.sans],
      },
      colors: {
        brand: {
          primary: '#8065F2',
          secondary: '#00B6DE',
          light: '#f1eeff',
          dark: '#6c54d8'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}