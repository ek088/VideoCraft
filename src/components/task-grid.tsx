import { TaskCard } from './task-card';
import type { Task } from '@/types';
import { FileQuestion } from 'lucide-react';

interface TaskGridProps {
  tasks: Task[];
}

export function TaskGrid({ tasks }: TaskGridProps) {
  if (tasks.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground bg-card border border-dashed rounded-lg p-12 min-h-[400px]">
            <FileQuestion className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-headline font-semibold text-foreground">No tasks found</h2>
            <p className="mt-2">Get started by creating a new video task.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {tasks.map(task => (
        <TaskCard key={task.task_id} task={task} />
      ))}
    </div>
  );
}
