"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Task } from '@/lib/type';
import { initialTasks } from '@/lib/data';
import { useImmer } from 'use-immer';

type TasksContextProviderProps = {
    children: React.ReactNode;
}

type TaskAction = 
    | { type: "add"; id: Task['id']; text: Task['text'], complete: Task['done'] }
    | { type: "change"; id: Task['id'], complete: Task['done'] }
    | { type: "delete" }

type TasksDispatchType = (action: TaskAction) => void;

const initialData = {
    tasks: initialTasks,
    leftTodo: initialTasks.filter(t => !t.done).length,
}

type dataType = (typeof initialData);

export const TasksContext = createContext<dataType | null>(null);
export const TasksDispatchContext = createContext<TasksDispatchType | null>(null);



export default function TasksContextProvider({ children }: TasksContextProviderProps) {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialData
    );

    // const [ leftCount, setLeftCount ] = useState(0);

    // useEffect(() => {
    //     const uncompletedTasks = tasks.filter(t => !t.done);
    //     setLeftCount(uncompletedTasks.length);
    // }, [tasks])


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


function tasksReducer(data: dataType, action: TaskAction) {
    switch (action.type) {
        case "add": {
            return {
                tasks: [ ...data.tasks, {
                    id: action.id,
                    text: action.text,
                    done: action.complete,
                }],
                leftTodo: data.leftTodo + Number(!action.complete)
            };
        }
        
        case "change": {
            return {
                tasks: data.tasks.map( t => {
                    if (t.id === action.id) {
                        return {
                            ...t, done: action.complete
                        }
                    } 
                    
                    return t;
                }),
                leftTodo: data.leftTodo + (action.complete ? -1 : 1)
            };
        }

        case "delete": {
            return {
                ...data,
                tasks: data.tasks.filter( t => !t.done)
            };
        }

        default: {
            throw Error("Unknown action");
        }
    }
}