import React from 'react'
import Image from 'next/image'
import checkIcon from "@/public/images/icon-check.svg"
import { TaskDone } from '@/lib/type'


type CheckboxProp = {
  isChecked: boolean;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
