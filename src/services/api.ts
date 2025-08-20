import { CreatePostFormData } from "@/types";
import { CONTENT_BY_TONE } from "@/constants/createPost";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API request/response types based on specification
export interface GenerateImageRequest {
  imagePrompt: string;
  options?: {
    aspectRatio?: "1:1" | "4:5" | "16:9";
    styleHint?: "photo" | "illustration" | "studio";
    safety?: "strict" | "standard";
    seed?: number;
  };
}

export interface GenerateImageResponse {
  image: {
    id: string;
    url: string;
    alt: string;
    aspectRatio: string;
    metadata: {
      model: string;
      seed: number;
      inferenceMs: number;
    };
  };
}

export interface CreatePostRequest {
  title: string;
  brandTone: "playful" | "professional" | "friendly" | "bold";
  platforms: ("instagram" | "x" | "facebook" | "linkedin")[];
  image_url: string;
  scheduledAt: string;
  constraints?: {
    maxCharacters?: number;
    includeHashtags?: boolean;
    emoji?: "none" | "minimal" | "balanced" | "heavy";
    hashtagCount?: number;
    hashtagPlacement?: "end" | "inline" | "mixed";
    language?: "en" | "cn" | "my";
  };
}

export interface CreatePostResponse {
  post: {
    id: string;
    title: string;
    platforms: string[];
    scheduledAt: string;
    status: string;
    content: {
      text: string;
      hashtags: string[];
      effectiveMaxChars: number;
    };
    image: {
      url: string;
      alt: string;
    };
    usage: {
      model: string;
      estimatedTokens: number;
    };
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, string | number | boolean>;
  };
}

// Mock API service
export class MockApiService {
  
  // 1) Generate Image API - POST /api/v1/ai/image/generate
  static async generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse | ApiErrorResponse> {
    await delay(2000); // Simulate longer delay for image generation

    try {
      // Validation: imagePrompt must be 5-500 chars
      if (!request.imagePrompt || request.imagePrompt.length < 5 || request.imagePrompt.length > 500) {
        return {
          error: {
            code: "VALIDATION_ERROR",
            message: "imagePrompt must be 5..500 chars",
            details: { field: "imagePrompt" }
          }
        };
      }

      // Simulate random failures (10% chance)
      if (Math.random() < 0.1) {
        return {
          error: {
            code: "IMAGE_GENERATION_FAILED",
            message: "Failed to generate image. Please try again."
          }
        };
      }

      // Generate random image using picsum
      const seed = request.options?.seed || Math.floor(Math.random() * 999999) + 100000;
      const aspectRatio = request.options?.aspectRatio || "1:1";
      
      // Map aspect ratios to dimensions
      const dimensions = {
        "1:1": "400/400",
        "4:5": "400/500", 
        "16:9": "640/360"
      };
      
      const imageUrl = `https://picsum.photos/${dimensions[aspectRatio]}?random=${seed}`;
      const imageId = `img_${Date.now().toString(36)}`;

      const response: GenerateImageResponse = {
        image: {
          id: imageId,
          url: imageUrl,
          alt: `Generated image: ${request.imagePrompt.substring(0, 50)}...`,
          aspectRatio: aspectRatio,
          metadata: {
            model: "mock-img-v1",
            seed: seed,
            inferenceMs: Math.floor(Math.random() * 500) + 300
          }
        }
      };

      return response;

    } catch {
      return {
        error: {
          code: "UNEXPECTED_ERROR",
          message: "An unexpected error occurred during image generation"
        }
      };
    }
  }

  // 2) Create Post API - POST /api/posts/create
  static async createPost(request: CreatePostRequest): Promise<CreatePostResponse | ApiErrorResponse> {
    await delay(1500); // Simulate network delay

    try {
      // Validation: title (2..120 chars)
      if (!request.title || request.title.length < 2 || request.title.length > 120) {
        return {
          error: {
            code: "VALIDATION_ERROR",
            message: "title must be 2..120 chars",
            details: { field: "title" }
          }
        };
      }

      // Validation: brandTone (enum)
      const validBrandTones = ["playful", "professional", "friendly", "bold"];
      if (!validBrandTones.includes(request.brandTone)) {
        return {
          error: {
            code: "VALIDATION_ERROR",
            message: "brandTone must be one of: playful, professional, friendly, bold",
            details: { field: "brandTone" }
          }
        };
      }

      // Validation: platforms (min 1)
      if (!request.platforms || request.platforms.length === 0) {
        return {
          error: {
            code: "VALIDATION_ERROR",
            message: "At least one platform is required",
            details: { field: "platforms" }
          }
        };
      }

      // Validation: image_url must be valid https URL
      if (!request.image_url || !request.image_url.startsWith('https://')) {
        return {
          error: {
            code: "VALIDATION_ERROR",
            message: "image_url must be a valid https URL",
            details: { field: "image_url" }
          }
        };
      }

      // Validation: scheduledAt must be ISO-8601
      if (!request.scheduledAt) {
        return {
          error: {
            code: "VALIDATION_ERROR",
            message: "scheduledAt is required and must be ISO-8601 format",
            details: { field: "scheduledAt" }
          }
        };
      }

      // Simulate random failures (5% chance)
      if (Math.random() < 0.05) {
        return {
          error: {
            code: "SERVER_ERROR",
            message: "Internal server error occurred"
          }
        };
      }

      // Generate content based on brand tone
      const content = CONTENT_BY_TONE[request.brandTone];
      const postId = `post_${Date.now().toString(36)}`;

      const response: CreatePostResponse = {
        post: {
          id: postId,
          title: request.title,
          platforms: request.platforms,
          scheduledAt: request.scheduledAt,
          status: "Draft",
          content: {
            text: content.text,
            hashtags: [...content.hashtags],
            effectiveMaxChars: content.text.length
          },
          image: {
            url: request.image_url,
            alt: `Image for ${request.title}`
          },
          usage: {
            model: "mock-ai-v1",
            estimatedTokens: Math.floor(Math.random() * 200) + 120
          }
        }
      };

      return response;

    } catch {
      return {
        error: {
          code: "UNEXPECTED_ERROR",
          message: "An unexpected error occurred"
        }
      };
    }
  }

  // Helper function to convert form data to API request format
  static formDataToCreatePostRequest(
    formData: CreatePostFormData, 
    imageUrl: string
  ): CreatePostRequest {
    // Convert local time to UTC if scheduledAt is provided
    const scheduledAt = formData.scheduledAt 
      ? new Date(formData.scheduledAt).toISOString()
      : new Date().toISOString();

    return {
      title: formData.title,
      brandTone: formData.brandTone as "playful" | "professional" | "friendly" | "bold",
      platforms: formData.platforms as ("instagram" | "x" | "facebook" | "linkedin")[],
      image_url: imageUrl,
      scheduledAt: scheduledAt,
      constraints: {
        maxCharacters: 280,
        includeHashtags: true,
        emoji: "balanced",
        hashtagCount: 5,
        hashtagPlacement: "end",
        language: "en"
      }
    };
  }
}