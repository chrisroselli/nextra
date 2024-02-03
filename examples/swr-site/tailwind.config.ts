import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./{components,app,mdx}/**/*.{mdx,tsx}']
} satisfies Config
