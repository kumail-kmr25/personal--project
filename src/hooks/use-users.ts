import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function useUsers() {
  const { data: users = [], isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('/api/users');
      return data;
    },
  });

  return {
    users,
    isLoading,
    error,
  };
}
