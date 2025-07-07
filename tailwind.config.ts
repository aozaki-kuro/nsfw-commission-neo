import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{astro,js,ts}'],
  // darkMode: 'class',
  theme: {
    screens: {
      ss: { max: '30rem' },
      md: { max: '70rem' },
    },
    fontFamily: {
      sans: ['var(--font-plex-sans)'],
      mono: [
        'var(--font-menlo)',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        'p-light': '#313233',
        highlight: '#f3f4f6',
        'dec-light': '#a5adb1',
        'dec-dark': '#5e6365',
        'inactive-nav-light': '#7b808a',
        'inactive-nav-dark': '#66686d',
        'back-light': '#fcfcfc',
        'back-dark': '#18181a',
        selected: '#95a5ac40',
      },
      minHeight: {
        dynamic: '100dvh',
      },
      letterSpacing: {
        custom: '0.005em',
      },
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
