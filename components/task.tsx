"use client";

import React from 'react'
import Checkbox from './checkbox'
import { ItemTypes, Task } from '@/lib/type'
import Image from 'next/image';
import { useTasksDispatch } from '@/context/tasks-context';
import { updateTask, deleteTask } from '@/client/helper';
import IconCross from '@/public/icon-cross.svg';
import { useDrag, useDrop } from 'react-dnd';

interface Item {
	id: string
	originalIndex: number
}

export default function Task({ 
	id,
	title,
	complete,
	moveTaskFilterAll,
	findTask
}: {
	id: Task['id'],
	title: Task['title'],
	complete: Task['complete'],
	moveTaskFilterAll: (id: string, atIndex: number) => void,
	findTask: (id: string) => ({task: Task, index: number})
}) {
	const dispatch = useTasksDispatch();
	const completedClass = complete ? "text-light-LightGrayishBlue dark:text-dark-VeryDarkGrayishBlue line-through" : "text-light-VeryDarkGrayishBlue dark:text-dark-LightGrayishBlue";
	const originalIndex = findTask(id).index;

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.TASK,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id, originalIndex]
	);
	
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: ItemTypes.TASK,
			drop: ({id: droppedId}: Item) => {
				const { index: overIndex } = findTask(id);
				moveTaskFilterAll(droppedId, overIndex);
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver()
			})
		}),
		[findTask, moveTaskFilterAll]
	);

	let opacity = 1;

	if (isDragging) {
		opacity = 0.75;
	} else if (isOver) {
		opacity = 0.5;
	}

	const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {

		const updatedTask = await updateTask({
			id: id,
			complete: e.target.checked
		});

		dispatch({
			type: 'change',
			id: updatedTask['id'],
			complete: updatedTask['complete']
		});
	};

	const handleDelete = async(e: React.MouseEvent<HTMLButtonElement>) => {
		await deleteTask({
			id: id
		});

		dispatch({
			type: 'delete',
			id: id
		});
	};

	
	
	
	

	return (
		<li 
			className="group flex flex-row items-center justify-between  w-full h-[4.075rem] px-5 border-b-[0.1rem] bg-white border-b-light-VeryLightGrayishBlue dark:bg-dark-VeryDarkDesaturatedBlue dark:border-b-dark-VeryDarkGrayishBlue2"
			ref={(node) => drag(drop(node))}
			
		>
				<section className="flex flex-row items-center gap-6">
					<Checkbox isChecked={complete} onToggle={handleToggle} />
					
					<p className={`text-sm md:text-lg cursor-pointer ${completedClass}`} style={{opacity}}>
						{title}
					</p>

				</section>

				<button className="hidden  items-center justify-center w-[1.75rem] h-[1.75rem] group-hover:flex" onClick={handleDelete} >
				
					<Image
						src={IconCross}
						alt="switch theme"
						width={16}
						height={16}
					/>
					
				</button>
		</li>
	);
}
