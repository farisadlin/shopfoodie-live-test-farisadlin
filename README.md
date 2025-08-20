# ShopFoodie Live Test - Content Generation Platform

> AI-Powered Social Media Content Creation and Management System

A modern Next.js application built for creating, managing, and scheduling social media content across multiple platforms with AI-generated images and text.

## 🌟 Features

### ✨ Core Functionality
- **AI Content Generation**: Automatically generate engaging social media posts with custom prompts
- **Multi-Platform Support**: Create content for Instagram, X (Twitter), Facebook, and LinkedIn
- **Image Generation**: AI-powered image creation based on text prompts
- **Brand Tone Customization**: Choose from Playful, Professional, Friendly, or Bold tones
- **Content Scheduling**: Schedule posts for specific dates and times
- **Real-time Preview**: Live preview of generated content before publishing

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Component Library**: Built with Radix UI primitives for accessibility
- **Form Management**: Robust form handling with Formik and Zod validation
- **Interactive Dialogs**: Modal-based content creation workflow
- **Real-time Feedback**: Loading states and error handling throughout

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Mock API Integration**: Simulated backend services for development
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern React Patterns**: Hooks, context, and functional components
- **Performance Optimized**: Built with Next.js 15 and Turbopack

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/farisadlin/shopfoodie-live-test-farisadlin.git
   cd shopfoodie-live-test-farisadlin
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── molecules/         # Complex components
│   │   ├── CreatePostDialog.tsx    # Main content creation dialog
│   │   ├── HeaderSearchBar.tsx     # Search functionality
│   │   ├── PostsTable.tsx          # Posts management table
│   │   └── UserProfile.tsx         # User profile dropdown
│   └── ui/                # Base UI components (Radix UI)
├── constants/             # Application constants
│   ├── createPost.ts      # Content creation constants
│   └── posts.ts           # Posts data
├── schemas/               # Zod validation schemas
│   └── createPost.ts      # Form validation
├── services/              # API services
│   └── api.ts             # Mock API implementation
├── types/                 # TypeScript definitions
│   └── index.d.ts         # Global type definitions
└── utils/                 # Utility functions
    └── string.ts          # String manipulation helpers
```

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Forms & Validation
- **[Formik](https://formik.org/)** - Form management and handling
- **[Zod](https://zod.dev/)** - Runtime type validation
- **[Zod-Formik-Adapter](https://www.npmjs.com/package/zod-formik-adapter)** - Integration layer

### UI Components
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[Class Variance Authority](https://cva.style/)** - Component variant management
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Conditional class merging

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler and dev server

## 🎯 Usage Guide

### Creating Content

1. **Click "Create Content"** button on the main dashboard
2. **Fill in the form**:
   - **Title**: Enter a descriptive title for your post
   - **Brand Tone**: Select from Playful, Professional, Friendly, or Bold
   - **Platforms**: Choose target social media platforms
   - **Image Prompt**: Describe the image you want to generate
   - **Schedule**: Set when you want the post to be published

3. **Generate AI Content**:
   - Click "Generate Image" to create a custom image
   - Click "Create Post" to generate text content
   - Preview the complete post in real-time

4. **Save and Schedule**: Review your content and save it to the system

### Managing Posts

- **View All Posts**: See all created content in the main table
- **Filter and Search**: Use the search bar to find specific posts
- **Publish Content**: Click the publish button to make posts live
- **Edit or Delete**: Manage existing content as needed

## 🔧 Configuration

### Environment Setup

The application uses mock APIs for development. In a production environment, you would configure:

1. **API Endpoints**: Update `src/services/api.ts` with real endpoints
2. **Authentication**: Implement user authentication system
3. **Database**: Connect to a real database for post storage
4. **Social Media APIs**: Integrate with platform-specific APIs

### Customization

- **Brand Tones**: Modify `src/constants/createPost.ts` to add new tones
- **Platforms**: Add new social media platforms in the same file
- **UI Components**: Extend or modify components in `src/components/ui/`
- **Styling**: Customize themes in `tailwind.config.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel automatically detects Next.js settings
3. **Deploy**: Push to main branch to trigger deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/farisadlin/shopfoodie-live-test-farisadlin)

### Other Platforms

- **Netlify**: Connect repository and deploy
- **AWS Amplify**: Use the Amplify console
- **Docker**: Build container with the provided Next.js configuration

## 🧪 Testing

The application includes:

- **Form Validation**: Zod schemas ensure data integrity
- **Error Handling**: Comprehensive error states and user feedback
- **Mock Data**: Realistic test data for development
- **Type Safety**: TypeScript prevents runtime errors

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow the project conventions
4. **Test thoroughly** and update documentation if needed
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Source code and contributions

### Additional Resources
- [React Documentation](https://react.dev/) - Learn React fundamentals
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling reference
- [Radix UI Documentation](https://www.radix-ui.com/primitives) - Component library

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Support

For questions or support regarding this project, please contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
