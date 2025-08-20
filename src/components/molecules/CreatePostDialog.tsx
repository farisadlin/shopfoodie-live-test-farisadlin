"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
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
  SOCIAL_PLATFORMS,
  BRAND_TONES,
  MOCK_API_RESPONSES,
} from "@/constants/createPost";
import { CreatePostDialogProps, CreatePostFormData } from "@/types";
import { createPostSchema } from "@/schemas/createPost";
import { BrandTone } from "@/constants/createPost";
import { MockApiService, GenerateImageRequest } from "@/services/api";

// Validation function using Zod schema
const validateForm = (values: CreatePostFormData) => {
  try {
    createPostSchema.parse(values);
    return {};
  } catch (error) {
    const errors: Record<string, string> = {};
    if (error instanceof Error && "errors" in error) {
      const zodError = error as {
        errors: Array<{ path: string[]; message: string }>;
      };
      zodError.errors.forEach((err) => {
        const path = err.path[0];
        errors[path] = err.message;
      });
    }
    return errors;
  }
};

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  children,
  onSave,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [generatedContent, setGeneratedContent] = useState<{
    text: string;
    hashtags: string[];
  } | null>(null);
  const [showPostPreview, setShowPostPreview] = useState(false);

  const initialValues: CreatePostFormData = {
    title: "",
    brandTone: "" as BrandTone,
    platforms: [SOCIAL_PLATFORMS[0].value],
    imagePrompt: "",
    scheduledAt: "",
  };

  const handleSubmit = async (
    values: CreatePostFormData,
    { resetForm }: FormikHelpers<CreatePostFormData>
  ) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      // First, generate image if imagePrompt is provided
      let imageUrl = generatedImageUrl;

      if (!imageUrl && values.imagePrompt && values.imagePrompt.length >= 5) {
        const imageResult = await MockApiService.generateImage({
          imagePrompt: values.imagePrompt,
          options: {
            aspectRatio: "1:1",
            styleHint: "photo",
            safety: "standard",
          },
        });

        if ("error" in imageResult) {
          setApiError(imageResult.error.message);
          return;
        }

        imageUrl = imageResult.image.url;
        setGeneratedImageUrl(imageUrl);
      }

      // Use default image if no image generated
      if (!imageUrl) {
        imageUrl = MOCK_API_RESPONSES.success.post.image.url;
      }

      // Create the post
      const createPostRequest = MockApiService.formDataToCreatePostRequest(
        values,
        imageUrl
      );

      // Show payload alert for form submission
      alert(
        `Final Submit API Payload:\n${JSON.stringify(
          createPostRequest,
          null,
          2
        )}`
      );

      const postResult = await MockApiService.createPost(createPostRequest);

      // Show response alert for form submission
      alert(
        `Final Submit API Response:\n${JSON.stringify(postResult, null, 2)}`
      );

      if ("error" in postResult) {
        setApiError(postResult.error.message);
        return;
      }

      // Success - call onSave with the response data and close dialog
      onSave?.(values);
      setOpen(false);
      resetForm();

      // Reset state
      setGeneratedImageUrl(null);
      setGeneratedContent(null);
      setApiError(null);
      setShowPostPreview(false);
    } catch {
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateImage = async (imagePrompt: string) => {
    if (!imagePrompt || imagePrompt.length < 5) {
      setApiError("Image prompt must be at least 5 characters long");
      return;
    }

    setIsGeneratingImage(true);
    setApiError(null);

    try {
      const payload: GenerateImageRequest = {
        imagePrompt,
        options: {
          aspectRatio: "1:1" as const,
          styleHint: "photo" as const,
          safety: "standard" as const,
        },
      };

      // Show payload alert
      alert(`Generate Image API Payload:\n${JSON.stringify(payload, null, 2)}`);

      const result = await MockApiService.generateImage(payload);

      // Show response alert
      alert(`Generate Image API Response:\n${JSON.stringify(result, null, 2)}`);

      if ("error" in result) {
        setApiError(result.error.message);
        return;
      }

      setGeneratedImageUrl(result.image.url);
    } catch {
      setApiError("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleCancel = (resetForm: () => void) => {
    setOpen(false);
    resetForm();
    setGeneratedImageUrl(null);
    setGeneratedContent(null);
    setApiError(null);
    setShowPostPreview(false);
  };

  // Format datetime for display
  const formatScheduledAt = (dateTimeValue: string): string => {
    if (!dateTimeValue) return "";

    const date = new Date(dateTimeValue);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}.${minutes}`;
  };

  const handleCreatePost = async (values: CreatePostFormData) => {
    setIsGeneratingContent(true);
    setApiError(null);

    try {
      // Use generated image if available, otherwise use default
      const imageUrl =
        generatedImageUrl || MOCK_API_RESPONSES.success.post.image.url;

      // Create the post request
      const createPostRequest = MockApiService.formDataToCreatePostRequest(
        values,
        imageUrl
      );

      // Show payload alert
      alert(
        `Create Post API Payload:\n${JSON.stringify(
          createPostRequest,
          null,
          2
        )}`
      );

      const result = await MockApiService.createPost(createPostRequest);

      // Show response alert
      alert(`Create Post API Response:\n${JSON.stringify(result, null, 2)}`);

      if ("error" in result) {
        setApiError(result.error.message);
        return;
      }

      // Set generated content from API response
      setGeneratedContent({
        text: result.post.content.text,
        hashtags: result.post.content.hashtags,
      });
      setShowPostPreview(true);
    } catch {
      setApiError("Failed to create post. Please try again.");
    } finally {
      setIsGeneratingContent(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full !max-w-[640px] max-h-[673px] rounded-2xl shadow-2xl bg-white p-4 overflow-y-auto">
        <DialogHeader className="border-gray-200">
          <DialogTitle className="text-xl font-semibold">
            Create Post
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form>
              <div className="space-y-5 py-5">
                {/* API Error Display */}
                {apiError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm font-medium">
                      {apiError}
                    </p>
                  </div>
                )}
                {/* Title + Brand Tone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1 block text-sm font-medium text-gray-700">
                      Title
                    </Label>
                    <Field name="title">
                      {({
                        field,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => void;
                          onBlur: (
                            e: React.FocusEvent<HTMLInputElement>
                          ) => void;
                        };
                      }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Post Title"
                          className="rounded-xl border-gray-300 focus:border-gray-400"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 block text-sm font-medium text-gray-700">
                      Brand Tone
                    </Label>
                    <Select
                      value={values.brandTone}
                      onValueChange={(value) =>
                        setFieldValue("brandTone", value)
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
                    <ErrorMessage
                      name="brandTone"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                {/* Platforms */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">
                    Platforms
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {SOCIAL_PLATFORMS.map((platform) => {
                      const IconComponent = platform.icon;
                      const isSelected = values.platforms.includes(
                        platform.value
                      );
                      return (
                        <Button
                          key={platform.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`rounded-xl flex items-center justify-center w-10 h-10 p-0 cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            const newPlatforms = isSelected
                              ? values.platforms.filter(
                                  (p) => p !== platform.value
                                )
                              : [...values.platforms, platform.value];
                            setFieldValue("platforms", newPlatforms);
                          }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </Button>
                      );
                    })}
                  </div>
                  <ErrorMessage
                    name="platforms"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Image Prompt */}
                <div>
                  <Label className="mb-1 block text-sm font-medium text-gray-700">
                    Image Prompt
                  </Label>
                  <Field name="imagePrompt">
                    {({
                      field,
                    }: {
                      field: {
                        name: string;
                        value: string;
                        onChange: (
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => void;
                        onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
                      };
                    }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Add Image Prompt"
                        className="rounded-xl border-gray-300 focus:border-gray-400"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="imagePrompt"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Scheduled At */}
                <div>
                  <Label className="mb-1 block text-sm font-medium text-gray-700">
                    Scheduled At
                  </Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Field name="scheduledAt">
                      {({
                        field,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => void;
                          onBlur: (
                            e: React.FocusEvent<HTMLInputElement>
                          ) => void;
                        };
                      }) => (
                        <Input
                          {...field}
                          type="datetime-local"
                          className="rounded-xl border-gray-300 pl-9 focus:border-gray-400"
                        />
                      )}
                    </Field>
                  </div>
                  {values.scheduledAt && (
                    <div className="text-xs text-gray-500 mt-1">
                      Scheduled: {formatScheduledAt(values.scheduledAt)}
                    </div>
                  )}
                  <ErrorMessage
                    name="scheduledAt"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* AI Post actions */}
                <div className="space-y-3 rounded-xl bg-gray-50 p-4">
                  <div className="text-sm font-medium text-gray-700">
                    AI Post (Generate image + Text)
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      disabled={
                        !values.imagePrompt ||
                        values.imagePrompt.length < 5 ||
                        isGeneratingImage
                      }
                      className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
                      size="sm"
                      onClick={() =>
                        handleGenerateImage(values.imagePrompt || "")
                      }
                    >
                      {isGeneratingImage ? "Generating..." : "Generate Image"}
                    </Button>
                    <Button
                      type="button"
                      disabled={
                        !values.title ||
                        !values.brandTone ||
                        values.platforms.length === 0 ||
                        isGeneratingContent
                      }
                      className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
                      size="sm"
                      onClick={() => handleCreatePost(values)}
                    >
                      {isGeneratingContent ? "Creating..." : "Create Post"}
                    </Button>
                  </div>
                  {/* Image Preview */}
                  <div className="rounded-xl border border-gray-300 bg-gray-50 h-48 relative overflow-hidden">
                    {isGeneratingImage ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <div className="text-sm">Generating image...</div>
                        </div>
                      </div>
                    ) : generatedImageUrl ? (
                      <Image
                        src={generatedImageUrl}
                        alt="Generated image"
                        fill
                        className="object-cover"
                        onError={() => {
                          // Fallback handled by Next.js Image component
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500">
                        <div className="text-sm">Image Preview</div>
                      </div>
                    )}
                  </div>

                  {/* Post Preview */}
                  <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-3">
                    <div className="text-sm font-medium text-gray-700">
                      Post Preview
                    </div>

                    {showPostPreview && generatedContent ? (
                      /* Generated Social Media Post */
                      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
                        {/* Post Image - Only show if there's a generated image */}
                        {generatedImageUrl && (
                          <div className="rounded-lg bg-gradient-to-r from-green-100 to-green-200 h-48 relative overflow-hidden">
                            <Image
                              src={generatedImageUrl}
                              alt="Generated image"
                              fill
                              className="object-cover"
                              onError={() => {
                                // Fallback handled by Next.js Image component
                              }}
                            />
                          </div>
                        )}

                        {/* Post Content */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {generatedContent.text}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {generatedContent.hashtags.map((hashtag, index) => (
                              <span
                                key={index}
                                className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
                              >
                                {hashtag}
                              </span>
                            ))}
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
                    ) : isGeneratingContent ? (
                      /* Loading State */
                      <div className="rounded-lg border border-gray-200 bg-white p-4 h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <div className="text-sm">
                            Generating post content...
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Empty State */
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-sm">Post Preview</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="border-gray-200 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCancel(resetForm)}
                  className="rounded-xl border-gray-300 text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    isGeneratingImage ||
                    isGeneratingContent ||
                    !showPostPreview
                  }
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
