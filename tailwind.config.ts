import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    files: ["./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",],
  },
  theme: {
    extend: {
      fontFamily: {
        apple: ["Homemade Apple", "roboto"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-accent": "#FFC107",
        "custom-accent-alternate": "#E6A04C",
        "custom-tertiary-text": "#FEFEFE",
        "custom-secondary-text": "#7A5E3A",
        "custom-primary-text": "#4A3421",
        "custom-primary1": "#D4A373",
        "custom-primary2": "#B28453",
        "custom-primary3": "#8C6349",
        "custom-secondary1": "#F0E6D6",
        "custom-background1": "#FFF5E1",
        "custom-background2": "#EAD7B2",
        "custom-neutral-dark": "#5C4033",
        "custom-neutral-light": "#F7F3EF",
        
      },
      
    },
  },
};
export default config;