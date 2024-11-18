/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/Component/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
}

