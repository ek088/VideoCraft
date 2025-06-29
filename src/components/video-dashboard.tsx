'use client';

import { useState } from 'react';
import { Film, PlusCircle, RefreshCw } from 'lucide-react';
import { useTasks } from '@/hooks/use-tasks';
import { CreateTaskModal } from '@/components/create-task-modal';
import { TaskGrid } from '@/components/task-grid';
import { Button } from '@/components/ui/button';
import { PaginationControls } from '@/components/pagination-controls';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function VideoDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, isLoading, error, refreshTasks, currentPage, totalPages, goToPage } = useTasks();

  const onTaskCreated = () => {
    setIsModalOpen(false);
    refreshTasks();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Film className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-foreground">VideoCraft AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={refreshTasks} disabled={isLoading} aria-label="Refresh tasks">
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Task
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {isLoading && tasks.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : (
          <TaskGrid tasks={tasks} />
        )}
      </main>

      {totalPages > 1 && (
        <footer className="container py-4">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </footer>
      )}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={onTaskCreated}
      />
    </div>
  );
}
