import React from 'react'
import Checkbox from './checkbox'

export default function NewTask() {
  return (
    <div className="flex flex-row items-center gap-6 w-full h-[4rem] px-5 bg-darkDesaturatedBlue">
        <Checkbox />
        <input
            className="bg-transparent w-full h-full focus:outline-none"
            type="text"
            placeholder="Create a new todo..."
        />
    </div>
  )
}
