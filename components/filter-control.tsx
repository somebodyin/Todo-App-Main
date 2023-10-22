import React from 'react'

export default function FilterControl() {
  return (
    <div className="flex gap-5">
        <Filter>All</Filter>
        <Filter>Active</Filter>
        <Filter>Completed</Filter>
    </div>
  )
}

type FilterProps = {
    children: string;
}

function Filter({ children }: FilterProps) {
  return (
    <button className="font-bold hover:text-hoverLight focus:text-brightBlue transition duration-300">
        {children}
    </button>
  )
}
