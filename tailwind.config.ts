import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B4513',
          50: '#F7E4D4',
          100: '#F2D1B8',
          200: '#E8AC80',
          300: '#DE8748',
          400: '#C16A2B',
          500: '#8B4513',
          600: '#7A3D11',
          700: '#69350E',
          800: '#582D0C',
          900: '#47250A',
          950: '#3C1F08'
        }
      }
    },
  },
  plugins: [],
}

export default config 