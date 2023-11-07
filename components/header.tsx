"use client";

import React, { useEffect } from 'react'
import BsMoon from '@/public/icon-moon.svg'
import BsSun from '@/public/icon-sun.svg'
import Image from 'next/image'
import { useTheme } from '@/context/theme-context'
import cookie from "js-cookie"
import uuid from 'react-uuid'

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		const localCookie = cookie.get("token");
		if (!localCookie) {
			cookie.set("token", uuid());
		}

	}, []);
	

	return (
		<div className="flex flex-row justify-between items-center w-full mt-[3.6rem] mb-[1.1rem]">
			<h1 className="tracking-[0.91rem] h-[3rem] font-bold text-[2.5rem] uppercase">Todo</h1>
			<button className="flex items-center justify-center w-[1.75rem] h-[1.75rem]" onClick={toggleTheme} >

				<Image src={theme === "light" ? BsMoon : BsSun } alt="switch theme" className="w-[1.75rem] h-[1.75rem]" />
					

			</button>
		</div>
	)
}
