
/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          display: ["var(--font-display)", "sans-serif"], // Bebas Neue
          body: ["var(--font-body)", "sans-serif"], // Roboto Condensed
        },
        fontSize: {
          massive: "var(--font-massive)",
          title: "var(--font-title)",
          h2: "var(--font-h2)",
          p1: "var(--font-paragraph)",
          p2: "var(--font-paragraph)",
        },
        letterSpacing: {
          default: "var(--tracking-default)",
        },
        lineHeight: {
          default: "var(--leading-default)",
        },
        colors: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          tertiary: "var(--color-tertiary)",
          white1: "var(--color-white-1)",
          white2: "var(--color-white-2)",
          black: "var(--color-black)",
        },
      },
    },
    plugins: [],
};