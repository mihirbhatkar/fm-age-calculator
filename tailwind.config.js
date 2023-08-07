/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "prim-purple": "hsl(259, 100%, 65%)",
        "prim-light-red": "hsl(0, 100%, 67%)",

        "neu-white": "hsl(0, 0%, 100%)",
        "neu-off-white": "hsl(0, 0%, 94%)",
        "neu-light-grey": "hsl(0, 0%, 86%)",
        "neu-smokey-grey": "hsl(0, 1%, 44%) ",
        "neu-off-black": "hsl(0, 0%, 8%)",
      },

      screens: {
        mobile: "400px",
      },
    },
  },
  plugins: [],
};
