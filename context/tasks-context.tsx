"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Task } from '@/lib/type';
import { initialTasks } from '@/lib/data';

type TasksContextProviderProps = {
    children: React.ReactNode;
}

type TaskAction = 
    | { type: "add"; id: Task['id']; text: Task['text'] }
    | { type: "change"; id: Task['id'], complete: Task['done'] }
    | { type: "delete" }

type TasksDispatchType = (action: TaskAction) => void;

export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<TasksDispatchType | null>(null);

export default function TasksContextProvider({ children }: TasksContextProviderProps) {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )

}

export function useTasks() {
    const context = useContext(TasksContext);

    if (context === null) {
        throw new Error(
            "useTasks must be used within an TasksContextProvider"
        );
    }

    return context;
}

export function useTasksDispatch() {
    const context = useContext(TasksDispatchContext);

    if (context === null) {
        throw new Error(
            "useTasksDispatch must be used within an TasksDispatchContext"
        );
    }

    return context;
}


function tasksReducer(tasks: Task[], action: TaskAction) {
    switch (action.type) {
        case "add": {
            return [ ...tasks, {
                id: action.id,
                text: action.text,
                done: false,
            }];
        }
        
        case "change": {
            return tasks.map( t => {
                if (t.id === action.id) {
                    return {
                        ...t, done: action.complete
                    }
                } 
                
                return t;
            });
        }

        case "delete": {
            return tasks.filter( t => !t.done);
        }

        default: {
            throw Error("Unknown action");
        }
    }
}