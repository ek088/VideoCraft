'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createTask } from '@/lib/api';
import { AISubjectSuggester } from './ai-subject-suggester';

const formSchema = z.object({
  video_subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }).max(100),
  video_clip_duration: z.coerce.number().min(1, { message: 'Duration must be at least 1.' }).max(60),
  paragraph_number: z.coerce.number().min(1, { message: 'Must have at least 1 paragraph.' }).max(10),
});

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video_subject: '',
      video_clip_duration: 5,
      paragraph_number: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data = await createTask(values);
      toast({
        title: 'Task Created Successfully',
        description: `Your new video task with ID: ${data.task_id} has been started.`,
      });
      onTaskCreated();
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Creating Task',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create New Video Task</DialogTitle>
          <DialogDescription>Fill in the details below to start a new video generation task.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="video_subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Subject</FormLabel>
                   <AISubjectSuggester
                    currentTopic={field.value}
                    onSuggestionSelect={(suggestion) => form.setValue('video_subject', suggestion, { shouldValidate: true })}
                   >
                    <FormControl>
                        <Input placeholder="e.g., 'Facts about Ancient Rome'" {...field} />
                    </FormControl>
                   </AISubjectSuggester>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="video_clip_duration"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Clip Duration (sec)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="paragraph_number"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Paragraphs</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
