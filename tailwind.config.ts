import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  // darkMode: 'class',
  theme: {
    screens: {
      ss: { max: '30rem' },
      md: { max: '70rem' },
    },
    extend: {
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0' },
          '30%, 70%': { opacity: '1' },
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 2s',
      },
    },
  },
  plugins: [],
}

export default config
