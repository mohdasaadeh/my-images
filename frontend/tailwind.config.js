module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '900px',
      xl: '1280px',
      xxl: '1440px',
    },
    extend: {
      colors: {
        primary: '#fafafa',
        secondary: '#333',
        info: {
          dark: '#3799FE',
          light: 'rgba(55,153,254,0.62)',
          background: 'rgba(118,187,255,0.17)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
