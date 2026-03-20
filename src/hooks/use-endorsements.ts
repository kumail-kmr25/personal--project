import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Endorsement {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  skills: string[];
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export function useEndorsements() {
  const queryClient = useQueryClient();

  const { data: endorsements = [], isLoading, error } = useQuery<Endorsement[]>({
    queryKey: ['endorsements'],
    queryFn: async () => {
      const { data } = await axios.get('/api/endorsements');
      return data;
    },
  });

  const createEndorsement = useMutation({
    mutationFn: async (newEndorsement: Partial<Endorsement>) => {
      const { data } = await axios.post('/api/endorsements', newEndorsement);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorsements'] });
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Endorsement['status'] }) => {
      const { data } = await axios.patch('/api/endorsements', { id, status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endorsements'] });
    },
  });

  return {
    endorsements,
    isLoading,
    error,
    updateStatus,
  };
}
