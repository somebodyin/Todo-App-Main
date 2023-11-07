import React, { useCallback } from 'react'
import Task from './task'
import { ItemTypes, Filter, Task as TaskType } from '@/lib/type'
import { useDrop } from 'react-dnd'
import { useTasksDispatch } from '@/context/tasks-context'

export default function TasksList({
	filteredTasks,
	filterType
}: {
	filteredTasks: TaskType[],
	filterType: Filter
}) {
	const dispatch = useTasksDispatch();
	const [, drop] = useDrop(() => ({ accept: ItemTypes.TASK }));

	const findTask = useCallback(
		(id: string) => {
			const task = filteredTasks.filter((t) => t.id === id)[0] as TaskType;

			return {
				task,
				index: filteredTasks.indexOf(task)
			};
		},
		[filteredTasks]
	)

	const moveTask = useCallback(
		(id: string, atIndex: number) => {
			const { task, index } = findTask(id);

			dispatch({
				type: 'move',
				task: task,
				index: index,
				atIndex: atIndex
			});
		},
		[findTask, dispatch]
	)

	const moveTaskFilterAll = useCallback(
		(id: string, atIndex: number) => {
			if (filterType === "all") {
				moveTask(id, atIndex);
			}
		},
		[moveTask, filterType]
	);

	return (
		<ul ref={drop}>
			{
				filteredTasks.map( (t: TaskType) => (
					<Task key={t.id} {...t} moveTaskFilterAll={moveTaskFilterAll} findTask={findTask} />
				) )
			}
		</ul>
	);
}
