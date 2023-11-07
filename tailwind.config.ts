import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const commonGradient = 'linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient': commonGradient,
				'gradient-dark': `linear-gradient(hsl(235, 24%, 19%), hsl(235, 24%, 19%)), ${commonGradient}`,
				'gradient-light': `linear-gradient(hsl(0, 0%, 100%), hsl(0, 0%, 100%)), ${commonGradient}`,
			},
			
			colors: {
				//DARK THEME
				"dark-VeryDarkBlue": "hsl(235, 21%, 11%)",
				"dark-VeryDarkDesaturatedBlue": "hsl(235, 24%, 19%)",
				"dark-LightGrayishBlue": "hsl(234, 39%, 85%)",
				"dark-LightGrayishBlueHover": "hsl(236, 33%, 92%)",
				"dark-DarkGrayishBlue": "hsl(234, 11%, 52%)",
				"dark-VeryDarkGrayishBlue": "hsl(233, 14%, 35%)",
				"dark-VeryDarkGrayishBlue2": "hsl(237, 14%, 26%)",
				"brightBlue": "hsl(220, 98%, 61%)",
				
				// LIGHT THEME
				"light-VeryLightGray": "hsl(0, 0%, 98%)",
				"light-VeryLightGrayishBlue": "hsl(236, 33%, 92%)",
				"light-LightGrayishBlue": "hsl(233, 11%, 84%)",
				"light-DarkGrayishBlue": "hsl(236, 9%, 61%)",
				"light-VeryDarkGrayishBlue": "hsl(235, 19%, 35%)",

			}
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.clip-padding-border': {
					backgroundClip: 'padding-box, border-box',
				},
			})
		})
	],
	darkMode: "class"
}
export default config