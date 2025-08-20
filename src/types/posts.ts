export interface Post {
  id: number;
  title: string;
  platforms: string[];
  scheduledAt: string;
  status: 'scheduled' | 'published' | 'draft';
}