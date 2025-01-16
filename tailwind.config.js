/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/bg.svg')",
      },
      backgroundSize: {
        "home-xl": "40%",
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

