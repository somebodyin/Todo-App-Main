export type Task = {
	id: string,
	title: string,
	complete: boolean,
	author: string,
	createdAt: string
}

export type CheckboxProp = {
	isChecked: boolean;
	onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  
export type Filter = "all" | "active" | "completed";

export type FilterProp = {
	filter: Filter
}

export const ItemTypes = {
	TASK: 'task'
}