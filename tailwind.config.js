const defaultTheme = require('tailwindcss/defaultTheme')

const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Roboto', // <-- Roboto is a default sans font now
  'system-ui',
  // <-- you may provide more font fallbacks here
];

module.exports = {
  // purge: [],
  content: ['src/components/*', 'src/popup.js'],
  theme: {
    fontFamily: fontFamily,
    extend: {},
  },
  plugins: []
}
