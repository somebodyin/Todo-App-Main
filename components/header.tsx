import React from 'react'
// import { BsMoon, BsSun } from 'react-icons/bs';
import BsMoon from '@/public/images/icon-moon.svg';
import BsSun from '@/public/images/icon-sun.svg';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-center w-full">
        <h1 className="tracking-[1rem] h-[3rem] font-bold text-[2.5rem] uppercase">Todo</h1>
        <button className="flex items-center justify-center w-[1.75rem] h-[1.75rem]">
            {
                <Image src={true ? BsSun : BsMoon } alt="switch theme" className="w-[1.75rem] h-[1.75rem]" />
                
            }
        </button>
    </div>
  )
}
