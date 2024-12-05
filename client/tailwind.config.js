/* eslint-disable no-undef */
import flowbite  from 'flowbite/plugin'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js}',
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend : {
      maxWidth: {
        'screen-2xl': '1400px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      fontFamily : {
        'body': "Nunito, sans-serif"
      },
      colors: {
        "color_1" : "#f5f5f5",
        "color_2" : "#C0BFC2",
        "color_3" : "#abacad",
        "color_4" : "#414141",
        "color_5" : "#1e1e1e",
        "color_6" : "#D7263d",
      }
    }
  },
  plugins: [
    'flowbite/plugin'
]
}