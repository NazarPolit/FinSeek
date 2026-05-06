/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        brandBlue: "#1C5BB7", 
        brandBlueLight: "#E8F0FE",
        brandGreen: "#70C128",
        brandGreenHover: "#5AA01E",
        
        surface: "#FFFFFF",
        surfaceLight: "#F8FAFC", 
        textMain: "#0F172A", 
        textMuted: "#64748B", 
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(28, 91, 183, 0.1), 0 4px 6px -2px rgba(28, 91, 183, 0.05)', // Тінь з легким синім відтінком
      }
    },
  },
  plugins: [],
};