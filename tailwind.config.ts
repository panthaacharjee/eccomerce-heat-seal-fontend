/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add other paths as needed for your project
  ],
  theme: {
    extend: {
      height: {
        "screen-half": "50vh",
        "screen-2/3": "66.666667vh",
        "screen-1/3": "33.333333vh",
        "screen-3/4": "75vh",
        "screen-1/4": "25vh",
      },
    },
  },
  plugins: [],
};
