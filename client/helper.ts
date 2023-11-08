import { FilterProp } from "@/lib/type";

export async function fetchTasks({ filter }: FilterProp) {
	try {
		const response = await fetch(`/api/tasks?filter=${filter}`);

		if (!response.ok) {
			throw new Error('Failed to fetch tasks');
		}

		const tasks = await response.json();
		if (Array.isArray(tasks) && tasks.length === 0) {
			return await fetchTasks({ filter });
		}

		return tasks;
	} catch (error) {
		console.error("Error while fetching tasks: ", error);
		return null;
	}

}

export async function deleteCompletedTasks({ filter }: FilterProp) {
	try {
		const response = await fetch(`/api/tasks?filter=${filter}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('Failed to delete tasks');
		}

		return await response.json();
	} catch (error) {
		console.error("Error while deleting tasks: ", error);
		return null;
	}

}

export async function addTask ({
	title,
	complete
}: {
	title: string;
	complete: boolean;
}) {
	try {
		const response = await fetch('/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				complete
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to add task');
		}

		return await response.json();
	} catch (error) {
		console.error("Error while adding task: ", error);
		return null;
	}

}

export async function updateTask({
	id,
	complete
}: {
	id: string,
	complete: boolean
}) {
	try {
		const response = await fetch(`/api/tasks/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				complete,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to update task');
		}

		return await response.json();
	} catch (error) {
		console.error("Error while updating task: ", error);
		return null;
	}

}

export async function deleteTask({
	id
}: {
	id: string
} ) {
	try {
		const response = await fetch(`/api/tasks/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('Failed to update task');
		}

		return await response.json();
	} catch (error) {
		console.error("Error while deleting task: ", error);
		return null;
	}

}