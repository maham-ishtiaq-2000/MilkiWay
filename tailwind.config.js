module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      navy: '#1f1d2a', // Dark Navy Colour
      pink : '#FA8072',
      slightlyDarkPink : '#C8665B',
      lightNavy : '#262835',
      lighterNavy : '#2e303d',
      platinum : '#FFFFFF',
      lightRed : '#4c353a',
      red : "#352528",
      offWhite : "#f0f0f0",
      lightestRed : "#f4deda",
      white : '#ffffff',
      gray : "#525252",
      darkGray : '#c3c3c3'
    },  
    
    extend: {
      boxShadow: {
        'pink': '0 4px 14px 0 rgba(237, 100, 166, 0.25)', // Custom pink shadow
      }
    },
  },
  plugins: [],
}
