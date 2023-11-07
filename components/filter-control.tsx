import React from 'react'
import { clsx } from 'clsx';
import { Filter } from '@/lib/type';

const filterItems = [
	{
		"id": "all",
		"text": "All"
	},
	{
		"id": "active",
		"text": "Active"
	},
	{
		"id": "completed",
		"text": "Completed"
	}
];

export default function FilterControl({
	onFilter,
	activeFilter
}: {
	onFilter: React.MouseEventHandler<HTMLButtonElement>,
	activeFilter: Filter
}) {
  
  return (
	<div className="flex gap-5">
		{
		  filterItems.map((item) => (
			<FilterItem onClick={onFilter} id={item.id} active={activeFilter} key={item.id}>{item.text}</FilterItem>
		  ))
		}
	</div>
  )
}

type FilterItemProps = {
	children: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	id: string;
	active: Filter;
}

function FilterItem({ children, onClick, id, active }: FilterItemProps) {
  return (
	<button className={clsx("font-bold hover:text-light-VeryDarkGrayishBlue dark:hover:text-dark-LightGrayishBlueHover transition duration-300", {
		"text-brightBlue": active == id,
	})} onClick={onClick} id={id}>
		{children}
	</button>
  )
}
