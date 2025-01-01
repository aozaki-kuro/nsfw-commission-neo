import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  // darkMode: 'class',
  theme: {
    screens: {
      ss: { max: '480px' },
      sd: { max: '540px' },
      md: { max: '674px' },
    },
    fontFamily: {
      sans: [
        'var(--font-inter)',
        {
          fontFeatureSettings: "'cpsp' 1, 'dlig' 1, 'cv01' 1, 'cv02', 'cv03' 1, 'cv04' 1",
          fontVariationSettings: "'common-ligatures','contextual'",
        },
      ],
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
    },
  },
  plugins: [],
}

export default config
