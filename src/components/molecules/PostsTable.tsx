'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Post } from '@/types';

interface PostsTableProps {
  posts: Post[];
  onPublish?: (postId: number) => void;
}

export const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  onPublish
}) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-table-header">
            <TableHead className="py-3 pl-6 pr-3 text-left text-gray-500 font-medium">Title</TableHead>
            <TableHead className="px-3 text-left text-gray-500 font-medium">Platforms</TableHead>
            <TableHead className="px-3 text-left text-gray-500 font-medium">Scheduled At</TableHead>
            <TableHead className="px-3 text-left text-gray-500 font-medium">Status</TableHead>
            <TableHead className="py-3 pr-6 pl-3 text-right text-gray-500 font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="hover:bg-gray-50/60 border-b border-gray-100">
              <TableCell className="py-3 pl-6 pr-3 text-gray-900">{post.title}</TableCell>
              <TableCell className="px-3 text-gray-700">{post.platforms.join(', ')}</TableCell>
              <TableCell className="px-3 text-gray-700">{post.scheduledAt}</TableCell>
              <TableCell className="px-3 text-gray-700">
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </TableCell>
              <TableCell className="py-3 pr-6 pl-3 text-right">
                <Button 
                  size="sm"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 h-auto text-xs font-medium"
                  onClick={() => onPublish?.(post.id)}
                >
                  Publish
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};