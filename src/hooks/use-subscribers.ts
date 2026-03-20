import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  status: 'ACTIVE' | 'PENDING' | 'UNSUBSCRIBED';
  createdAt: string;
  updatedAt: string;
}

export function useSubscribers() {
  const queryClient = useQueryClient();

  const subscribersQuery = useQuery<Subscriber[]>({
    queryKey: ['subscribers'],
    queryFn: async () => {
      const { data } = await axios.get('/api/subscribers');
      return data;
    },
  });

  const updateSubscriber = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Subscriber> & { id: string }) => {
      const { data } = await axios.patch(`/api/subscribers/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
  });

  const deleteSubscriber = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/subscribers/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
  });

  return {
    subscribers: subscribersQuery.data || [],
    isLoading: subscribersQuery.isLoading,
    error: subscribersQuery.error,
    updateSubscriber,
    deleteSubscriber,
  };
}
