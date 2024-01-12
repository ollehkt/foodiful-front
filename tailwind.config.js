/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#711b98',
        link: '#000000',
        primary: '#F777FA',
        hover: '#D200D7',
        active: '#B33CB6',
        disabled: '#E0DCE0',
        textDisabled: '#605D5D',
      },
      fontFamily: {
        roboto: ['Noto Sans KR', 'Roboto Condensed', 'sans-serif'],
      },
      boxShadow: {
        basic: '0 0 8px 0 rgba(0, 0, 0, 0.18)',
      },
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
        translateY100: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '100' },
        },
        translateYDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100px)' },
        },
        click: {
          '0%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        ease: 'easeInOut 1s ease-in-out',
        toast: 'toast .6s ease-in-out',
        drop: 'drop .6s ease-in-out',
        left: 'left .6s ease',
        translateUp: 'translateY10 1s ease-in-out',
        translateUp100: 'translateY100 1s ease-in-out',
        translateYDown: 'translateDown 1s ease-in-out',
        click: 'click 1s ease-in-out',
      },
    },
  },

  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
