/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      maxWidth: {
        'screen-2xl': '1400px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      fontFamily : {
        'header': "Lato, sans-serif",
        'body': "Montserrat, serif"
      },
      colors: {
        "base": "#e4f2f7",
        "light-1" : "#AABFC3",
        "light-2" : "#8BB2B7",
        "light-3" : "#77A6C0",
        "dark-1" : "#979B9A",
        "dark-2" : "#314346",
        "dark-3" : "#222e30",
        "dark-4" : "#192224",
      }
    }
  }

  // ...
}