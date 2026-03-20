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
  metrics?: { label: string; value: string; icon: string }[];
  year?: number;
  featured?: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'fashionco-e-commerce',
    title: 'FashionCo E-Commerce',
    description: 'A premium full-stack e-commerce platform with Stripe integration and real-time inventory.',
    category: 'E-Commerce',
    status: 'PUBLISHED',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    metrics: [
      { label: 'Revenue', value: '+300%', icon: 'TrendingUp' },
      { label: 'Load Time', value: '1.2s', icon: 'Zap' },
    ],
    year: 2024,
    featured: true,
    views: 1200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'saas-analytics-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'Complex data visualization platform for enterprise metrics and user behavior tracking.',
    category: 'SaaS',
    status: 'PUBLISHED',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    metrics: [
      { label: 'Users', value: '10k+', icon: 'Users' },
      { label: 'Latency', value: '<50ms', icon: 'Clock' },
    ],
    year: 2024,
    featured: true,
    views: 850,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'modern-law-firm-portfolio',
    title: 'Modern Law Firm Portfolio',
    description: 'High-conversion business website focusing on performance and professional lead generation.',
    category: 'Websites',
    status: 'PUBLISHED',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    techStack: ['Next.js', 'Prisma', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Conversion', value: '+120%', icon: 'Target' },
      { label: 'Traffic', value: '5k/mo', icon: 'LineChart' },
    ],
    year: 2023,
    featured: true,
    views: 940,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'high-performance-api-engine',
    title: 'High-Performance API Engine',
    description: 'Scalable backend infrastructure supporting millions of requests with Redis caching.',
    category: 'API/Backend',
    status: 'PUBLISHED',
    image: 'https://images.unsplash.com/photo-1558494943-9839bd4d31e6',
    techStack: ['Node.js', 'Express', 'Redis', 'Docker'],
    metrics: [
      { label: 'Requests', value: '1M/hr', icon: 'Zap' },
      { label: 'Uptime', value: '99.99%', icon: 'CheckCircle' },
    ],
    year: 2023,
    featured: true,
    views: 3100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'creative-interaction-portfolio',
    title: 'Creative Interaction Portfolio',
    description: 'Award-winning personal project showcasing advanced animations and 3D web experiences.',
    category: 'Personal',
    status: 'PUBLISHED',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    techStack: ['Three.js', 'GSAP', 'React Three Fiber', 'WebGL'],
    metrics: [
      { label: 'Awards', value: '2 site of day', icon: 'Trophy' },
      { label: 'Speed Score', value: '98', icon: 'Star' },
    ],
    year: 2024,
    featured: true,
    views: 5200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ai-powered-crm-system',
    title: 'AI-Powered CRM System',
    description: 'Latest work integrating OpenAI GPT-4 for automated customer relationship management.',
    category: 'Recent',
    status: 'PUBLISHED',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    techStack: ['Next.js', 'Python', 'OpenAI', 'LangChain'],
    metrics: [
      { label: 'Accuracy', value: '99%', icon: 'Cpu' },
      { label: 'Automation', value: '80%', icon: 'Workflow' },
    ],
    year: 2024,
    featured: true,
    views: 1100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useProjects() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await axios.get('/api/projects');
      return data;
    },
  });

  const projects = projectsQuery.data && projectsQuery.data.length > 0 
    ? projectsQuery.data 
    : MOCK_PROJECTS;

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
    projects,
    isLoading: projectsQuery.isLoading,
    error: projectsQuery.error,
    createProject,
    updateProject,
    deleteProject,
  };
}
