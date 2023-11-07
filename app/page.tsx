import Header from '@/components/header'
import NewTask from '@/components/new-task'
import Tasks from '@/components/tasks'

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen items-center justify-start w-full px-5 md:mx-auto md:w-[35rem] md:p-[0.65rem] gap-[1.5rem] ">
			<Header />
			<NewTask />
			<Tasks />
			<p className="text-[0.85rem] leading-[1.25rem] mt-2 text-light-DarkGrayishBlue dark:text-dark-VeryDarkGrayishBlue font-semibold">Drag and drop to reorder list</p>
		</main>
	)
}
