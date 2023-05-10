/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      animation: {
        'float-btn-active': 'moveBtnActive .5s forwards',
      },
      keyframes: {
        moveBtnActive: {
          '0%': { 
            transform: 'rotate(-3deg)',
            bottom: '100px'
          },
          '100%': { 
            transform: 'rotate(360deg)',
            bottom: '128px'
         },
        },
      }
    }
  },
  plugins: [

  ],
}