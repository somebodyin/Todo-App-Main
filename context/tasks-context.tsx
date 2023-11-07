"use client";

import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { Task } from '@/lib/type'
import { fetchTasks } from '@/client/helper'
import update from 'immutability-helper'

type TasksContextProviderProps = {
	children: React.ReactNode;
}

type TaskAction = 
	| { type: "add", payload: Task }
	| { type: "change", id: Task['id'], complete: Task['complete'] }
	| { type: "delete", id: Task['id'] }
	| { type: "move", task: Task, index: number, atIndex: number }
	| { type: "delete_tasks" }
	| { type: "fetch_tasks", tasks: Task[] }

type TasksDispatchType = (action: TaskAction) => void;

const initialData = {
	tasks: [],
}

type dataType = {
	tasks: Task[]

}

export const TasksContext = createContext<dataType | null>(null);
export const TasksDispatchContext = createContext<TasksDispatchType | null>(null);


export default function TasksContextProvider({ children }: TasksContextProviderProps) {
	const [tasks, dispatch] = useReducer(
		tasksReducer,
		initialData
	);

	useEffect(() => {
		console.log("ex");
		fetchTasks({ filter: "all" })
			.then( (tasks) => {
				if (tasks) {
					dispatch({ type: "fetch_tasks", tasks: tasks });
				}
			})
	}, []);


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
			const payload = action.payload;     
			return {
				tasks: [ ...data.tasks, {
					id: payload['id'],
					title: payload['title'],
					complete: payload['complete'],
					author: payload['author'],
					createdAt: payload['createdAt']
				}],
			};         
		}

		case "change": {
			return {
				tasks: data.tasks.map( t => {
					if (t.id === action.id) {
						return {
							...t, complete: action.complete
						}
					} 
					
					return t;
				})
			};
		}

		case "delete": {
			return {
				tasks: data.tasks.filter( t => t.id !== action.id)
			};
		}

		case "move": {
			return {
				tasks: update(data.tasks, {
					$splice: [
						[action.index, 1],
						[action.atIndex, 0, action.task],
					],
				})
			};
		}

		case "delete_tasks": {
			return {
				tasks: data.tasks.filter( t => !t.complete)
			};
		}

		case "fetch_tasks": {
			return {
				tasks: action.tasks
			};
		}

		default: {
			throw Error("Unknown action");
		}
	}
}