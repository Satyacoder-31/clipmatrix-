/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        matrix: {
          bg: "#090612",
          card: "#120C1D",
          panel: "#1A1227",
          border: "#2A1F3D",
          borderLight: "#3D2E57",
          primary: "#8B5CF6",
          primaryHover: "#7C3AED",
          secondary: "#C084FC",
          highlight: "#A78BFA",
          text: "#FFFFFF",
          muted: "#A7A1B5",
          darkMuted: "#6B647B",
          accentPink: "#F43F5E",
          accentCyan: "#06B6D4",
          accentGreen: "#22C55E",
          accentAmber: "#F59E0B"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'purple-glow': 'radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, rgba(9,6,18,0) 70%)',
        'hero-mesh': 'radial-gradient(at 27% 37%, hsla(263, 85%, 28%, 0.4) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(275, 80%, 25%, 0.3) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(260, 90%, 18%, 0.35) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-purple-lg': '0 0 40px -5px rgba(139, 92, 246, 0.55)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
