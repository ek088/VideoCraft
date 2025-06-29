import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { Task } from '@/types';
import { getVideoUrl } from '@/lib/utils';
import { CheckCircle, Loader2, Video, Clapperboard } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskStatus = ({ progress }: { progress: number }) => {
  const isCompleted = progress === 100;
  
  const Icon = isCompleted ? CheckCircle : Loader2;
  const text = isCompleted ? 'Completed' : `In Progress... ${progress}%`;
  const color = isCompleted ? 'text-green-500' : 'text-accent-foreground';
  const progressColor = isCompleted ? 'bg-green-500' : 'bg-accent';

  return (
    <div>
        <div className={`flex items-center gap-2 text-sm font-medium ${color}`}>
            <Icon className={`h-4 w-4 ${!isCompleted ? 'animate-spin' : ''}`} />
            <span>{text}</span>
        </div>
        <Progress value={progress} className="h-2 mt-2" indicatorClassName={progressColor} />
    </div>
  );
};


export function TaskCard({ task }: TaskCardProps) {
  const isCompleted = task.progress === 100;
  const finalVideoUrl = isCompleted && task.videos.length > 0 ? getVideoUrl(task.videos[0]) : null;

  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-3">
            <Clapperboard className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
                <CardTitle className="font-headline text-lg leading-tight">
                    {task.script ? `"${task.script.substring(0, 80)}..."` : 'Untitled Task'}
                </CardTitle>
                <CardDescription className="mt-1 text-xs">ID: {task.task_id}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <TaskStatus progress={task.progress} />
      </CardContent>
      <CardFooter>
        {finalVideoUrl ? (
          <Button asChild className="w-full">
            <a href={finalVideoUrl} target="_blank" rel="noopener noreferrer">
              <Video className="mr-2 h-4 w-4" />
              Watch Video
            </a>
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full">
            <Video className="mr-2 h-4 w-4" />
            Video Not Available
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
