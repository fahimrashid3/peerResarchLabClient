export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          200: "#F3F3F3",
          300: "#E8E8E8",
          400: "#D0D0D0",
          500: "#A1A1A1",
          600: "#737373",
          700: "#444444",
          800: "#111827", // Darker shade for text or UI elements
          900: "#151515", // Almost black for backgrounds or text
        },
        primary: {
          50: "#FEF2F2", // very light, for backgrounds
          100: "#FDE8E8", // lightest tint
          200: "#FACDCD", // lighter tint
          300: "#F29B9B", // light
          400: "#EB6B6B", // soft
          500: "#D33C3C", // main brand color
          600: "#B32B2B", // dark hover
          700: "#992323", // deeper
          800: "#7A1B1B", // very deep
          900: "#611313", // almost black
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
