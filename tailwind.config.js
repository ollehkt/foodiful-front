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
      primary: '#F777FA',
      hover: '#E851EB',
      active: '#B33CB6',
      disabled: '#E0DCE0',
      textDisabled: '#605D5D',
    },
    extend: {
      keyframes: {
        easeInOut: {
          '0%, 100%': { transform: 'translateX(100)' },
        },
      },
      keyframes: {
        toast: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        drop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        left: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        translateY10: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '100' },
        },
      },
      animation: {
        ease: 'easeInOut 1s ease-in-out',
        toast: 'toast .6s ease-in-out',
        drop: 'drop .6s ease-in-out',
        left: 'left .6s ease',
        translateUp: 'translateY10 1s ease-in-out',
      },
    },
  },

  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
