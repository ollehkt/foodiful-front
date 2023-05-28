/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      main: '#711b98',
      link: '#000000',
    },
    extend: {
      keyframes: {
        easeInOut: {
          '0%, 100%': { transform: 'translateX(100)' },
        },
      },
      animations: {
        ease: 'easeInOut 1s ease-in-out',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
