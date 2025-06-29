'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Task, TasksApiResponse } from '@/types';
import { fetchTasks } from '@/lib/api';
import { useToast } from './use-toast';

export function useTasks(initialPage = 1, pageSize = 12) {
  const [state, setState] = useState<{
    tasks: Task[];
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
  }>({
    tasks: [],
    totalPages: 1,
    currentPage: initialPage,
    isLoading: true,
    error: null,
  });

  const { toast } = useToast();
  const activeFetchControllers = useRef<AbortController[]>([]);

  const getTasks = useCallback(async (page: number, isPolling = false) => {
    if (!isPolling) {
      setState(prevState => ({ ...prevState, isLoading: true, error: null }));
    }
    
    const controller = new AbortController();
    activeFetchControllers.current.push(controller);

    try {
      const data: TasksApiResponse = await fetchTasks(page, pageSize);
      setState(prevState => ({
        ...prevState,
        tasks: data.data.tasks,
        totalPages: Math.ceil(data.data.total / data.data.page_size),
        currentPage: data.data.page,
        isLoading: false,
      }));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      if (!isPolling) {
        setState(prevState => ({ ...prevState, error: errorMessage, isLoading: false }));
        toast({
          variant: "destructive",
          title: "Error Fetching Tasks",
          description: errorMessage,
        })
      }
      console.error(errorMessage);
    } finally {
      activeFetchControllers.current = activeFetchControllers.current.filter(c => c !== controller);
    }
  }, [pageSize, toast]);

  const refreshTasks = useCallback(() => {
    getTasks(state.currentPage);
  }, [state.currentPage, getTasks]);

  useEffect(() => {
    getTasks(state.currentPage);
    const interval = setInterval(() => {
      getTasks(state.currentPage, true);
    }, 60000); // 60 seconds

    return () => {
      clearInterval(interval);
      activeFetchControllers.current.forEach(controller => controller.abort());
    };
  }, [state.currentPage, getTasks]);

  const goToPage = (page: number) => {
    if (page > 0 && page <= state.totalPages && page !== state.currentPage) {
      setState(prevState => ({ ...prevState, currentPage: page }));
    }
  };

  return { ...state, refreshTasks, goToPage };
}
