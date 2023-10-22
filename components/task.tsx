"use client";

import React from 'react'
import Checkbox from './checkbox'
import { Task } from '@/lib/type'
import { useTasksDispatch } from '@/context/tasks-context';


export default function Task({ 
  id,
  text,
  done  
}: Task) {
  const dispatch = useTasksDispatch();

  const completedClass = done ? "text-disableText line-through" : "text-lightGrayishBlue";

  return (
    <li className="flex flex-row items-center gap-6 w-full h-[4rem] px-5 bg-darkDesaturatedBlue border-b-[0.1rem] border-b-darkGrayishBlue">
        <Checkbox isChecked={done} onToggle={(e) => {
          dispatch({
            type: 'change',
            id: id,
            complete: e.target.checked
          });
        }} />
        <p className={completedClass}>{text}</p>
    </li>
  )
}
