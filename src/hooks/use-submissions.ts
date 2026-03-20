import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Submission {
  id: string;
  status: 'NEW' | 'READ' | 'DONE';
  name: string;
  email: string;
  projectType: string | null;
  budget: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export function useSubmissions() {
  const queryClient = useQueryClient();

  const submissionsQuery = useQuery<Submission[]>({
    queryKey: ['submissions'],
    queryFn: async () => {
      const { data } = await axios.get('/api/submissions');
      return data;
    },
  });

  const updateSubmission = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Submission> & { id: string }) => {
      const { data } = await axios.patch(`/api/submissions/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });

  const deleteSubmission = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/submissions/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });

  return {
    submissions: submissionsQuery.data || [],
    isLoading: submissionsQuery.isLoading,
    error: submissionsQuery.error,
    updateSubmission,
    deleteSubmission,
  };
}
