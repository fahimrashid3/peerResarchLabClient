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
        // primary: {
        //   100: "#F8DADA", // Very light red (soft backgrounds)
        //   200: "#F1AFAF", // Light pastel red
        //   300: "#EA8585", // Light-medium red
        //   400: "#E35A5A", // Vibrant soft red
        //   500: "#D33C3C", // Base primary color
        //   600: "#B53333", // Darker for hover states
        //   700: "#992B2B", // Deep rich red
        //   800: "#5E1515", // New: Much darker (almost burgundy)
        //   900: "#3A0A0A", // New: Near-black red
        // },
      },
    },
  },
  plugins: [require("daisyui")],
};
