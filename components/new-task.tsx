"use client";

import React, { useState, useRef, use } from 'react'
import Checkbox from './checkbox'
import { useTasksDispatch } from '@/context/tasks-context';
import { v4 as uuidv4 } from 'uuid';

export default function NewTask() {
	const dispatch = useTasksDispatch();

	const inputRef = useRef<HTMLInputElement | null>(null);
	const [todoInput, setTodoInput] = useState<string>("");
	const [complete, setComplete] = useState<boolean>(false);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodoInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		setTodoInput("");
		inputRef?.current?.blur();

		dispatch({
			type: "add",
			id: uuidv4(),
			text: todoInput.trim(),
			complete: complete
		})
		

	};

  return (
	<div className="flex flex-row items-center gap-6 w-full h-[4rem] px-5 bg-darkDesaturatedBlue">
		<Checkbox isChecked={complete} onToggle={() => setComplete(!complete)} />
		<form className="w-full h-full" onSubmit={handleSubmit}>
			<input
				className="bg-transparent w-full h-full focus:outline-none"
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
