import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  image?: string;
  links?: { github?: string; external?: string };
  techStack: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export function useProjects() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await axios.get('/api/projects');
      return data;
    },
  });

  const createProject = useMutation({
    mutationFn: async (newProject: Partial<Project>) => {
      const { data } = await axios.post('/api/projects', newProject);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Project> & { id: string }) => {
      const { data } = await axios.patch(`/api/projects/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/projects/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projectsQuery.data || [],
    isLoading: projectsQuery.isLoading,
    error: projectsQuery.error,
    createProject,
    updateProject,
    deleteProject,
  };
}
