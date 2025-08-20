"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import Image from "next/image";
import {
  PLATFORMS,
  BRAND_TONES,
  MOCK_API_RESPONSES,
} from "@/constants/createPost";
import { CreatePostDialogProps, CreatePostData } from "@/types";

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  children,
  onSave,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreatePostData>({
    title: "",
    brandTone: "",
    platforms: ["Instagram"],
    imagePrompt: "",
    scheduledAt: "",
  });

  const handlePlatformToggle = (platformName: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformName)
        ? prev.platforms.filter((p) => p !== platformName)
        : [...prev.platforms, platformName],
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setOpen(false);
    // Reset form
    setFormData({
      title: "",
      brandTone: "",
      platforms: ["Instagram"],
      imagePrompt: "",
      scheduledAt: "",
    });
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset form
    setFormData({
      title: "",
      brandTone: "",
      platforms: ["Instagram"],
      imagePrompt: "",
      scheduledAt: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full !max-w-[640px] max-h-[673px] rounded-2xl shadow-2xl bg-white p-4 mx-6 overflow-y-auto">
        <DialogHeader className="border-gray-200">
          <DialogTitle className="text-xl font-semibold">
            Create Post
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-5">
          {/* Title + Brand Tone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </Label>
              <Input
                type="text"
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="rounded-xl border-gray-300 focus:border-gray-400"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                Brand Tone
              </Label>
              <Select
                value={formData.brandTone}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, brandTone: value }))
                }
              >
                <SelectTrigger className="rounded-xl border-gray-300 w-full cursor-pointer hover:bg-gray-50 transition-colors">
                  <SelectValue placeholder="Select Tone" />
                </SelectTrigger>
                <SelectContent>
                  {BRAND_TONES.map((tone) => (
                    <SelectItem
                      key={tone.value}
                      value={tone.value}
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Platforms</div>
            <div className="flex flex-wrap gap-3">
              {PLATFORMS.map((platform) => {
                const IconComponent = platform.icon;
                const isSelected = formData.platforms.includes(platform.name);
                return (
                  <Button
                    key={platform.name}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className={`rounded-xl flex items-center justify-center w-10 h-10 p-0 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handlePlatformToggle(platform.name)}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Image Prompt */}
          <div>
            <Label className="mb-1 block text-sm font-medium text-gray-700">
              Image Prompt
            </Label>
            <Input
              type="text"
              placeholder="Add Image Prompt"
              value={formData.imagePrompt}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  imagePrompt: e.target.value,
                }))
              }
              className="rounded-xl border-gray-300 focus:border-gray-400"
            />
          </div>

          {/* Scheduled At */}
          <div>
            <Label className="mb-1 block text-sm font-medium text-gray-700">
              Scheduled At
            </Label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="2025-08-20 09:00 (WIB)"
                value={formData.scheduledAt}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    scheduledAt: e.target.value,
                  }))
                }
                className="rounded-xl border-gray-300 pl-9 focus:border-gray-400"
              />
            </div>
          </div>

          {/* AI Post actions */}
          <div className="space-y-3 rounded-xl bg-gray-50">
            <div className="text-sm font-medium text-gray-700">
              AI Post (Generate image + Text)
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                Generate Image
              </Button>
              <Button
                type="button"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                Create Post
              </Button>
            </div>
            {/* Image Preview */}
            <div className="rounded-xl border border-gray-300 bg-gray-50 h-48 relative overflow-hidden">
              <Image
                src={MOCK_API_RESPONSES.success.post.image.url}
                alt={MOCK_API_RESPONSES.success.post.image.alt}
                fill
                className="object-cover"
                onError={() => {
                  // Fallback handled by Next.js Image component
                }}
              />
            </div>

            {/* Post Preview */}
            <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-3">
              <div className="text-sm font-medium text-gray-700">
                Post Preview
              </div>

              {/* Mock Social Media Post */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
                {/* Post Image */}
                <div className="rounded-lg bg-gradient-to-r from-green-100 to-green-200 h-48 relative overflow-hidden">
                  <Image
                    src={MOCK_API_RESPONSES.success.post.image.url}
                    alt={MOCK_API_RESPONSES.success.post.image.alt}
                    fill
                    className="object-cover"
                    onError={() => {
                      // Fallback handled by Next.js Image component
                    }}
                  />
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {MOCK_API_RESPONSES.success.post.content.text}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {MOCK_API_RESPONSES.success.post.content.hashtags.map(
                      (hashtag, index) => (
                        <span
                          key={index}
                          className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          {hashtag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-sm">❤️</span>
                    <span className="text-xs">Like</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-sm">💬</span>
                    <span className="text-xs">Comment</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-sm">📤</span>
                    <span className="text-xs">Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-gray-200">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="rounded-xl border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
