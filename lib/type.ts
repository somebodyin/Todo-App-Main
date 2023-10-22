import { initialTasks } from '@/lib/data';


export type Task = (typeof initialTasks)[number];
export type TaskDone = (typeof initialTasks)[number]['done'];

export type CheckboxProp = {
    isChecked: boolean;
    onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  