import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface MediaAsset {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  createdAt: string;
}

export function useMedia() {
  const queryClient = useQueryClient();

  const { data: media = [], isLoading, error } = useQuery<MediaAsset[]>({
    queryKey: ['media'],
    queryFn: async () => {
      const { data } = await axios.get('/api/media');
      return data;
    },
  });

  const deleteMedia = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/media?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });

  return {
    media,
    isLoading,
    error,
    deleteMedia,
  };
}
