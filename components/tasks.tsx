"use client";

import React, { useState, useEffect } from 'react'
import Task from './task'
import FilterControl from './filter-control'
import { useTasks, useTasksDispatch } from '@/context/tasks-context'

export default function Tasks() {
  const data = useTasks();
  const dispatch = useTasksDispatch();
  const tasks = data.tasks;
  const leftTodo = data.leftTodo;
  

  return (
    <section className="w-full">
        <ul>
            {
              tasks.map( t => (
                <Task key={t.id} {...t} />
              ) )
            }
        </ul>

        <div className="flex flex-row items-center justify-between px-6 bg-darkDesaturatedBlue h-[3rem] text-sm text-lessDarkGrayishBlue">
            <div>{leftTodo} items left</div>

            <FilterControl />

            <button className="hover:text-hoverLight transition duration-300" onClick={ () => {
              dispatch({
                type: "delete"
              });
            }}>Clear Completed</button>

        </div>
    </section>
  )
}
