import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        dark: "#0a0a0a",
        chrome: "#c0c0c0",
        "chrome-10": "rgba(192,192,192,0.1)",
        "chrome-20": "rgba(192,192,192,0.2)",
        "chrome-30": "rgba(192,192,192,0.3)",
        silver: "#d0d0d0",
        electric: "#00bfff"
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
        "expo-out": "expo-out 0.7s ease-out forwards"
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(192,192,192,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(192,192,192,0.6)" }
        },
        "expo-out": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: [],
}
export default config
