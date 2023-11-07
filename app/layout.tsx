import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import TasksContextProvider from '@/context/tasks-context';
import ThemeContextProvider from '@/context/theme-context';

const josefin_sans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Todo App',
	description: 'Made by next.js for task Frontendmentor.io',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${josefin_sans.className} bg-light-VeryLightGray dark:bg-dark-VeryDarkBlue bg-contain bg-no-repeat
			bg-[url(/bg-mobile-light.jpg)]
			dark:bg-[url(/bg-mobile-dark.jpg)]
			md:bg-[url(/bg-desktop-light.jpg)]
			md:dark:bg-[url(/bg-desktop-dark.jpg)]`}>

				<ThemeContextProvider>
					<TasksContextProvider>
						{children}
					</TasksContextProvider>
				</ThemeContextProvider>
			
			</body>
		</html>
	)
}