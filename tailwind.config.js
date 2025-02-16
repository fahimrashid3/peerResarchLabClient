export default {
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
          100: "#CCD9E5", // Soft blue (not too white)
          200: "#99B3CC", // Light blue (balanced)
          300: "#668CB2", // Medium blue (subtle and rich)
          400: "#336699", // Vibrant blue (base primary color)
          500: "#004080", // Deep blue (emphasis)
          600: "#003366", // Rich blue (active/hover states)
          700: "#004080", // Lighter dark blue (buttons/key UI elements)
          800: "#003366", // Muted dark blue (shadows/accents)
          900: "#00264D", // Deep navy blue (strong contrast, not too black)
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
