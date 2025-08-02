import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  // darkMode: 'class',
  theme: {
    screens: {
      ss: { max: '30rem' },
      md: { max: '70rem' },
    },
  },
  plugins: [],
}

export default config
