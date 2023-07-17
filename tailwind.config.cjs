/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#5980CD',
        'brand-secondary': '#66B271',
        'brand-text': '#2A3335',
        'brand-neutral': '#D1D6DB',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
