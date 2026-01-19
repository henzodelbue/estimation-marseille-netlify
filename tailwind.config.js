/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs Llinares Immobilier
        'gold': '#c9a962',
        'gold-light': '#e8d4a0',
        'primary': '#1a1a2e',
        'text-gray': '#6c757d',
        'surface': '#f8f9fa',
      },
    },
  },
  plugins: [],
}
