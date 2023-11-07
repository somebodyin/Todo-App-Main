"use client";

import React, { useState, useRef } from 'react'
import Checkbox from './checkbox'
import { addTask } from '@/client/helper'
import { useTasksDispatch } from '@/context/tasks-context'

export default function NewTask() {

	const inputRef = useRef<HTMLInputElement | null>(null);
	const [todoInput, setTodoInput] = useState<string>("");
	const [complete, setComplete] = useState<boolean>(false);
	const dispatch = useTasksDispatch();
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodoInput(e.target.value);
	};

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		
		setTodoInput("");
		inputRef?.current?.blur();

		const task = await addTask({
			title: todoInput.trim(),
			complete: complete
		});

		dispatch({ type: "add", payload: task });
	};

	return (
		<div className="flex flex-row items-center gap-6 w-full h-[4rem] px-5 bg-white dark:bg-dark-VeryDarkDesaturatedBlue shadowBlack rounded-md">
			<Checkbox isChecked={complete} onToggle={() => setComplete(!complete)} />
			<form className="w-full h-full" onSubmit={handleSubmit}>
				<input
					className="bg-transparent w-full h-full focus:outline-none  text-light-VeryDarkGrayishBlue dark:text-dark-LightGrayishBlue text-lg"
					name="todo-input"
					type="text"
					placeholder="Create a new todo..."
					required
					maxLength={60}
					ref={inputRef}
					value={todoInput}
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

