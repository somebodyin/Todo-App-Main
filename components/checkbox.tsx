import React from 'react'
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
