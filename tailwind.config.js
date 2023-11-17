const defaultTheme = require('tailwindcss/defaultTheme')
// /** @type {import('tailwindcss').Config} */

export default {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        // mono: ['Windows Command Prompt', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          DEFAULT: '#0B0C10',
          light: '#ebb0b437',
          dark: '#DC8085',
        },
        gray: {
          DEFAULT: '#727271',
        },
      },
      screens: {
        '2xl': '1400px',
      },
    },
  },
}
