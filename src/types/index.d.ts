// Posts types
export interface Post {
  id: number;
  title: string;
  platforms: string[];
  scheduledAt: string;
  status: 'scheduled' | 'published' | 'draft';
}

// Create Post Dialog types
export interface CreatePostDialogProps {
  children: React.ReactNode;
  onSave?: (data: CreatePostData) => void;
}

export interface CreatePostData {
  title: string;
  brandTone: string;
  platforms: string[];
  imagePrompt: string;
  scheduledAt: string;
}