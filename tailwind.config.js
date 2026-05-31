/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#B49646', // Muted Gold/Saffron
          saffron: '#F4A261', // Provided Saffron
          gold: '#B49646',    // Muted Gold
          light: '#FDFBF7',   // Cream/Very light gold for backgrounds
        },
        charcoal: {
          DEFAULT: '#1F2937',
          dark: '#111827',
        },
        mediumgray: {
          DEFAULT: '#4B5563',
          light: '#9CA3AF',
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ["'Noto Naskh Arabic'", 'Amiri', 'serif'],
      },
      animation: {
        'fade-in-slow': 'fadeIn 1.5s ease-out forwards',
        'subtle-drift': 'subtleDrift 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        subtleDrift: {
          '0%': { transform: 'scale(1) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.05) translate(10px, -10px)' },
          '100%': { transform: 'scale(1) translate(0px, 0px)' },
        }
      }
    },
  },
  plugins: [],
}
