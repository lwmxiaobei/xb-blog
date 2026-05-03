/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pampas: '#F4F3EE',
        crail: '#C15F3C',
        'crail-dark': '#A04E2E',
        'crail-light': '#D4845F',
        cloudy: '#B1ADA1',
        'pampas-dark': '#E8E6DF',
        'cloudy-light': '#D0CEC8',
      },
      fontFamily: {
        heading: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        btn: '0 1px 3px rgba(193,95,60,0.3)',
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
