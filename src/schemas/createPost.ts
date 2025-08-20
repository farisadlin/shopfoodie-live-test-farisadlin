import { z } from "zod";
import { SocialPlatform, BrandTone } from "@/constants/createPost";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  
  brandTone: z
    .string()
    .min(1, "Brand tone is required") as z.ZodType<BrandTone>,
  
  platforms: z
    .array(z.string() as z.ZodType<SocialPlatform>)
    .min(1, "At least one platform is required"),
  
  imagePrompt: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 5,
      "Image prompt must be at least 5 characters if provided"
    ),
  
  scheduledAt: z
    .string()
    .optional()
});

