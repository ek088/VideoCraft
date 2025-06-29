export interface Task {
  task_id: string;
  state: number;
  progress: number;
  videos: string[];
  combined_videos: string[];
  script: string;
  terms: string[];
}

export interface TasksApiResponse {
  status: number;
  message: string;
  data: {
    tasks: Task[];
    total: number;
    page: number;
    page_size: number;
  };
}

export interface CreateTaskPayload {
  video_subject: string;
  video_script: string;
  video_terms: string;
  video_aspect: string;
  video_concat_mode: string;
  video_transition_mode: string;
  video_clip_duration: number;
  video_count: number;
  video_source: string;
  video_materials: {
    provider: string;
    url: string;
    duration: number;
  }[];
  video_language: string;
  voice_name: string;
  voice_volume: number;
  voice_rate: number;
  bgm_type: string;
  bgm_file: string;
  bgm_volume: number;
  subtitle_enabled: boolean;
  subtitle_position: string;
  custom_position: number;
  font_name: string;
  text_fore_color: string;
  text_background_color: boolean;
  font_size: number;
  stroke_color: string;
  stroke_width: number;
  n_threads: number;
  paragraph_number: number;
}
