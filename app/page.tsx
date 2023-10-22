import Header from '@/components/header'
import NewTask from '@/components/new-task'
import Task from '@/components/task'
import Tasks from '@/components/tasks'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="mx-auto flex flex-col min-h-screen items-center justify-center bg-slate-500 w-[35rem] p-3 gap-3">
      <Header />
      <NewTask />
      {/* <Task /> */}
      <Tasks />
    </main>
  )
}
