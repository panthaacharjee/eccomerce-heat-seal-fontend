const config = {
  plugins: {
    "@tailwindcss/postcss": {},

    "postcss-preset-env": {
      features: {
        "at-rule-custom-property": true,
      },
    },
  },
};

export default config;
