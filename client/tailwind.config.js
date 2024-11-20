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
        "light-2" : "#B1D1DA",
        "light-3" : "#79B6C8",
        "light-4" : "#437C8A",
        "dark-1" : "#869599",
        "dark-2" : "#606060",
        "dark-3" : "#303030",
        "dark-4" : "#1F1F1F",
      }
    }
  }

  // ...
}