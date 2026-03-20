import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Setting {
  id: string;
  key: string;
  value: string | number | boolean;
  label?: string;
  group?: string;
}

export function useSettings() {
  const queryClient = useQueryClient();

  const { data: settings = [], isLoading, error } = useQuery<Setting[]>({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data } = await axios.get('/api/settings');
      return data;
    },
  });

  const updateSetting = useMutation({
    mutationFn: async (setting: Partial<Setting>) => {
      const { data } = await axios.post('/api/settings', setting);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSetting,
  };
}
