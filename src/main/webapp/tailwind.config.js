export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {
      /* 🎨 Brand Colors */
      colors: {
        primary: "#111827",   // dark brand color
        accent: "#ff3f6c",    // myntra style accent
        muted: "#6b7280",
        light: "#f9fafb",
      },

      /* 🔵 Border Radius */
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },

      /* 🌑 Shadows */
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        card: "0 6px 20px rgba(0,0,0,0.06)",
        hover: "0 12px 40px rgba(0,0,0,0.12)",
      },

      /* ⚡ Smooth Transitions */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      /* 🔤 Font */
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      /* ✨ Shimmer Animation (Day 4 Upgrade) */
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },

      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },

  plugins: [],
};
