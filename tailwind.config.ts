import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient':
          'linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      },
      colors: {
        "veryDarkBlue": "hsl(235, 21%, 11%)",
        "darkDesaturatedBlue": "hsl(235, 24%, 19%)",
        "lessDarkGrayishBlue": "hsl(234, 11%, 52%)",
        "lightGrayishBlue": "hsl(234, 39%, 85%)",
        "darkGrayishBlue": "hsl(237, 14%, 26%)",
        "disableText": "hsl(233, 14%, 35%)",
        "hoverLight": "hsl(236, 33%, 92%)",
        "brightBlue": "hsl(220, 98%, 61%)",
      }
    },
  },
  plugins: [],
}
export default config
