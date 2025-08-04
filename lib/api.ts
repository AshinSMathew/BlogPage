export interface ApiPost {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const getApiBaseUrl = (): string => {
  const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
  
  if (!projectSecret) {
    throw new ApiError('Project secret not found in environment variables. Please check your .env.local file.');
  }
  
  return `https://${projectSecret}.mockapi.io/api`;
};

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const url = `${getApiBaseUrl()}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};

export const blogApi = {
  getAllPosts: async (): Promise<ApiPost[]> => {
    return apiRequest<ApiPost[]>('/post');
  },

  getPost: async (id: string): Promise<ApiPost> => {
    return apiRequest<ApiPost>(`/post/${id}`);
  },

  getRecentPosts: async (limit: number = 3): Promise<ApiPost[]> => {
    const posts = await apiRequest<ApiPost[]>('/post');
    return posts.slice(0, limit);
  },

  getFeaturedPosts: async (skip: number = 3, limit: number = 5): Promise<ApiPost[]> => {
    const posts = await apiRequest<ApiPost[]>('/post');
    return posts.slice(skip, skip + limit);
  },
};

export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeApi = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      return await apiCall();
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeApi };
};
    
import { useState } from 'react';

export { ApiError };