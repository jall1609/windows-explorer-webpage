import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

module.exports =  {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
    },
    screens: {
      
    },
  },
  plugins: [],
} satisfies Config;
