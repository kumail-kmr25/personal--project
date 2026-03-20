import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface AdminStats {
  counts: {
    projects: number;
    submissions: number;
    subscribers: number;
    blogPosts: number;
    unreadSubmissions: number;
  };
  recentSubscribers: Array<{
    id: string;
    email: string;
    createdAt: string;
  }>;
  visitorStats: Array<{
    name: string;
    views: number;
    unique: number;
  }>;
}

export function useStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/stats');
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
