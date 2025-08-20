"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PostsTable } from "@/components/molecules/PostsTable";
import { HeaderSearchBar } from "@/components/molecules/HeaderSearchBar";
import { UserProfile } from "@/components/molecules/UserProfile";
import { CreatePostDialog } from "@/components/molecules/CreatePostDialog";
import { MOCK_POSTS } from "@/constants/posts";
import { CreatePostData } from "@/types";
import { Plus } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePublish = (postId: number) => {
    console.log("Publishing post:", postId);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  const handleCreatePost = (data: CreatePostData) => {
    console.log("Creating post with data:", data);
    // Add post creation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <HeaderSearchBar value={searchQuery} onChange={setSearchQuery} />
          <UserProfile
            name="John Doe"
            role="Admin"
            initials="JD"
            onLogout={handleLogout}
          />
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Section Heading with Create Button */}
        <section className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold">Content Generation</h1>
            <p className="text-sm text-gray-500">
              Create and manage content to power your AI models.
            </p>
          </div>

          {/* Create Button */}
          <CreatePostDialog onSave={handleCreatePost}>
            <Button
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Content
            </Button>
          </CreatePostDialog>
        </section>

        {/* Card */}
        <Card className="rounded-2xl border-gray-200 shadow-sm gap-0">
          <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6 py-0 border-gray-200">
            <h2 className="text-base font-semibold">Posts</h2>
          </CardHeader>

          <CardContent className="p-0">
            <PostsTable posts={MOCK_POSTS} onPublish={handlePublish} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
