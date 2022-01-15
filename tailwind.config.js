const defaultTheme = require('tailwindcss/defaultTheme')

const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Roboto', // <-- Roboto is a default sans font now
  'system-ui',
  // <-- you may provide more font fallbacks here
];

module.exports = {
  // purge: [],
  content: ["src/components/Options.js", "src/popup.js","src/components/Avatar.js","src/components/Navbar.js", "src/components/Logo.js", "src/components/Settings.js"],
  theme: {
    fontFamily: fontFamily,
    extend: {},
  },
  plugins: [],
}
