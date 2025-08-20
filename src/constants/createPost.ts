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

export const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram", short: "IG", icon: Instagram },
  { value: "x", label: "X (Twitter)", short: "X", icon: Twitter },
  { value: "facebook", label: "Facebook", short: "FB", icon: Facebook },
  { value: "linkedin", label: "LinkedIn", short: "IN", icon: Linkedin },
] as const;

export const BRAND_TONES = [
  { value: "playful", label: "Playful" },
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "bold", label: "Bold" },
] as const;

export type SocialPlatform = typeof SOCIAL_PLATFORMS[number]["value"];
export type BrandTone = typeof BRAND_TONES[number]["value"];

// Content generation templates by brand tone
export const CONTENT_BY_TONE = {
  playful: {
    text: "Get ready for something amazing! 🎉 This is going to be so much fun - you won't want to miss it! Tag a friend and let's make some memories! ✨",
    hashtags: ["#MatchaMoment", "#ShopfoodieAI", "#PlayfulVibes", "#FunTimes", "#Amazing"]
  },
  professional: {
    text: "We're pleased to announce our latest premium offering. Crafted with precision and attention to detail, delivering excellence in every sip.",
    hashtags: ["#Premium", "#Quality", "#Excellence", "#Professional", "#ShopfoodieAI"]
  },
  friendly: {
    text: "Hey there! We've got something special to share with you. Hope you love it as much as we do! Come join our community! 😊",
    hashtags: ["#Friendly", "#Community", "#Special", "#ShareTheLove", "#ShopfoodieAI"]
  },
  bold: {
    text: "GAME CHANGER ALERT! 🚀 This is what you've been waiting for. Are you ready to level up your taste experience? Let's go!",
    hashtags: ["#GameChanger", "#Bold", "#LevelUp", "#Revolutionary", "#ShopfoodieAI"]
  }
} as const;