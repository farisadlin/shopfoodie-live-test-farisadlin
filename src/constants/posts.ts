import { Post } from '@/types';

export const MOCK_POSTS: Post[] = [
  { id: 1, title: 'Post 1', platforms: ['IG', 'X'], scheduledAt: 'Aug 20, 09:00', status: 'scheduled' },
  { id: 2, title: 'Post 2', platforms: ['IG', 'X'], scheduledAt: 'Aug 20, 10:00', status: 'scheduled' },
  { id: 3, title: 'Post 3', platforms: ['IG', 'X'], scheduledAt: 'Aug 20, 11:00', status: 'scheduled' },
  { id: 4, title: 'Post 4', platforms: ['IG', 'X'], scheduledAt: 'Aug 20, 12:00', status: 'scheduled' },
  { id: 5, title: 'Post 5', platforms: ['IG', 'X'], scheduledAt: 'Aug 20, 13:00', status: 'scheduled' },
];