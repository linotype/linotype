const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,vue,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#F2B441',
          10: '#FFFCF8',
          50: '#FEF8ED',
          100: '#FCF0DA',
          200: '#FAE1B4',
          300: '#F7D28D',
          400: '#F5C367',
          500: '#F2B441',
          600: '#EB9E10',
          700: '#B67B0C',
          800: '#825709',
          900: '#4D3405',
          950: '#332203'
        },
        secondary: {
          DEFAULT: '#122851',
          10: '#F1F3F7',
          50: '#4577D6',
          100: '#346BD2',
          200: '#2859B5',
          300: '#214994',
          400: '#193872',
          500: '#122851',
          600: '#081123',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        }
      },
    },
  },
  safelist: [
    'flex-row-reverse'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
};
