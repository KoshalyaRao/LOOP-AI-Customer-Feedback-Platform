/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#bae0fd',
          300: '#7cc2fd',
          400: '#36a3f9',
          500: '#0c87e8',
          600: '#006bc6',
          700: '#0155a3',
          800: '#064886',
          900: '#0b3c6f',
          950: '#07264a',
        },
        slate: {
          850: '#151e2e',
          950: '#0b0f17',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
