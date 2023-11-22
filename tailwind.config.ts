import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#a82931',
        'dark-crimson': '#8c252e',
        black: '#000000',
        'dark-gray': '#808285',
        gray: '#bcbec0',
        'light-gray': '#e6e7e8',
        multi: '#004e6a',
        'dark-multi': '#003b55',
        metro: '#4daae9',
        'darker-metro': '#208cd7',
        arts: '#f99d1c',
        'dark-arts': '#f37e0d',
        sports: '#218446',
        'dark-sports': '#1c5f36',
      },
    },
  },
  plugins: [],
}

export default config
