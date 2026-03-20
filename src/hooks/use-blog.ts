import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  image: string | null;
  status: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED';
  views: number;
  authorId: string;
  author: { name: string };
  createdAt: string;
  updatedAt: string;
}

export function useBlog() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data } = await axios.get('/api/blog');
      return data;
    },
  });

  const createPost = useMutation({
    mutationFn: async (newPost: Partial<BlogPost>) => {
      const { data } = await axios.post('/api/blog', newPost);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data } = await axios.patch(`/api/blog/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/blog/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });

  return {
    posts: postsQuery.data || [],
    isLoading: postsQuery.isLoading,
    error: postsQuery.error,
    createPost,
    updatePost,
    deletePost,
  };
}
