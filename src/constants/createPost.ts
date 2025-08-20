import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

// Mock API responses
export const MOCK_API_RESPONSES = {
  success: {
    post: {
      id: "post_92c1da",
      title: "Iced Matcha Latte Promo",
      platforms: ["instagram", "x"],
      scheduledAt: "2025-08-20T09:00:00+07:00",
      status: "Draft",
      content: {
        text: "Celebrate independence with a cool sip! 🧊🍵 Buy 1 Get 1 Iced Matcha Latte—today only. Tag a friend!",
        hashtags: ["#MatchaMoment", "#ShopfoodieAI", "#IndependenceDay"],
        effectiveMaxChars: 280
      },
      image: {
        url: "https://picsum.photos/400/300",
        alt: "Iced matcha latte with festive green confetti"
      },
      usage: { model: "mock-ai-v1", estimatedTokens: 320 }
    }
  },
  error: {
    error: {
      code: "VALIDATION_ERROR",
      message: "image_url must be a valid https URL",
      details: { field: "image_url" }
    }
  }
};

export const PLATFORMS = [
  { name: "Instagram", icon: Instagram },
  { name: "X", icon: Twitter },
  { name: "Facebook", icon: Facebook },
  { name: "LinkedIn", icon: Linkedin },
];

export const BRAND_TONES = [
  { value: "playful", label: "Playful" },
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "bold", label: "Bold" },
];