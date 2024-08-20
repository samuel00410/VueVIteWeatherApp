/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
    },
    fontFamily: {
      TraditionalChinese: ["Noto Sans TC", "sans-serif"],
    },
    screen: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
