import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVideoUrl(filePath: string): string {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8080';
  if (!filePath) return '';
  
  const storageKeyword = 'storage/';
  const storageIndex = filePath.indexOf(storageKeyword);
  
  if (storageIndex === -1) {
    return '';
  }
  
  const relativePath = filePath.substring(storageIndex);
  // The backend seems to serve from a /static route mapping to the storage directory
  return `${API_BASE_URL}/${relativePath.substring(storageKeyword.length)}`;
}
