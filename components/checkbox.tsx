import React from 'react'
import Image from 'next/image'
import checkIcon from "@/public/images/icon-check.svg"
import { CheckboxProp } from '@/lib/type'


export default function Checkbox({ isChecked, onToggle }: CheckboxProp) {
  return (
    <input
        className="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
    />
  )
}
