"use client";

import React, { useEffect, useState } from 'react'
import FilterControl from './filter-control'
import { useTasks, useTasksDispatch } from '@/context/tasks-context'
import { Filter, Task as Task } from '@/lib/type'
import { deleteCompletedTasks } from '@/client/helper'
import TasksList from './tasks-list'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Tasks() {
	const data = useTasks();

	const dispatch = useTasksDispatch();
	const [filteredTasks, setFilteredTasks] = useState<Task[]>(data.tasks);
	const [leftTodo, setLeftTodo] = useState(0);
	const [filterType, setFilterType] = useState<Filter>("all");

	const handleDelete = () => {
		deleteCompletedTasks({ filter: "completed" })
			.then( (result) => {
				console.log(result);
				dispatch({
					type: "delete_tasks"
				});
			});
	};

	const handleFilter: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		const target = event.target as HTMLButtonElement;
		const filterValue = target.id as Filter;

		if (filterValue !== filterType) {
			console.log("change");
			setFilterType(filterValue);
			filterTasks(filterValue);
		}

	};

	const filterTasks = (filter: Filter) => {
		setFilteredTasks(data.tasks.filter( (task) => {
			if (filter === "completed") return task.complete;
			if (filter === "active") return !task.complete;
			return true;
		}));
	};
	
	const computeLeftTasks = () => {
		setLeftTodo(data.tasks.filter( t => !t.complete ).length);
	};
	
	useEffect(() => {
		if (Array.isArray(data.tasks) && data.tasks.length > 0) {
			filterTasks(filterType);
			computeLeftTasks();
		}
	}, [data.tasks]);


	return (
		<>
			<section className="w-full rounded-md overflow-hidden shadowBlack">
				{
					filteredTasks.length !== 0 ? (
						<DndProvider backend={HTML5Backend}>
							<TasksList filteredTasks={filteredTasks} filterType={filterType}/>
						</DndProvider>
					) : (
						<div className="flex w-full h-[4rem] items-center justify-center border-b-[0.1rem] bg-white border-b-light-VeryLightGrayishBlue text-light-VeryDarkGrayishBlue dark:bg-dark-VeryDarkDesaturatedBlue dark:border-b-dark-VeryDarkGrayishBlue2 dark:text-dark-LightGrayishBlue">Nothing in the {filterType} list yet!</div>
					)
					
				}
				

				<div className="filterNav flex justify-between px-6 h-[3rem] text-sm">
					<div>{leftTodo} items left</div>

					<div className="hidden md:block">
						<FilterControl onFilter={handleFilter} activeFilter={filterType} />
					</div>

					<button className="hover:text-light-VeryDarkGrayishBlue dark:hover:text-dark-LightGrayishBlueHover transition duration-300" onClick={handleDelete}>Clear Completed</button>

				</div>

			</section>
			<nav className="filterNav w-full justify-center  h-[3.5rem] text-base shadowBlack rounded-md
			md:hidden">
				<FilterControl onFilter={handleFilter} activeFilter={filterType} />
			</nav>
		</>

	);
}