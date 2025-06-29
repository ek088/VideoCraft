"use server";

import type { TasksApiResponse, CreateTaskPayload } from '@/types';

const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:8080/api/v1';

export async function fetchTasks(page: number, pageSize: number): Promise<TasksApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks?page=${page}&page_size=${pageSize}`, { cache: 'no-store' });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch tasks with status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error('Network error or backend is unavailable.');
  }
}

export async function createTask(data: { video_subject: string; video_clip_duration: number; paragraph_number: number; }): Promise<{ task_id: string }> {
  const payload: CreateTaskPayload = {
    video_subject: data.video_subject,
    video_script: "",
    video_terms: "",
    video_aspect: "16:9",
    video_concat_mode: "random",
    video_transition_mode: "None",
    video_clip_duration: data.video_clip_duration,
    video_count: 1,
    video_source: "pexels",
    video_materials: [{ provider: "pexels", url: "", duration: 0 }],
    video_language: "ru-RU",
    voice_name: "ru-RU-DmitryNeural-Male",
    voice_volume: 1,
    voice_rate: 1,
    bgm_type: "random",
    bgm_file: "",
    bgm_volume: 0.2,
    subtitle_enabled: true,
    subtitle_position: "bottom",
    custom_position: 70,
    font_name: "MicrosoftYaHeiBold.ttc",
    text_fore_color: "#f5c045",
    text_background_color: true,
    font_size: 60,
    stroke_color: "#f5c045",
    stroke_width: 1.5,
    n_threads: 2,
    paragraph_number: data.paragraph_number
  };

  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to create task' }));
    throw new Error(errorData.detail || errorData.message || 'Failed to create task');
  }
    
  const result = await response.json();
  return result.data;
}
