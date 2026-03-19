# AutoPost - SaaS Content Publisher

A modern SaaS platform for publishing content to multiple social platforms automatically.

## Features

- 🔐 **Firebase Authentication** - Google and Email/Password login
- 📝 **Content Management** - Create, edit, and delete posts
- 📱 **Telegram Integration** - Auto-publish to Telegram channels
- 🖼️ **Cloudinary Upload** - Image upload with Cloudinary
- 🎨 **Dark Mode UI** - Modern, responsive design
- 📱 **Mobile First** - Fully responsive with mobile navigation
- 🔄 **Demo Mode** - Try the app without signing in

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo>
cd autopost
bun install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Cloudflare Pages

### Option 1: Direct Upload

1. Build the project:
   ```bash
   bun run build
   ```

2. Deploy the `.next` folder to Cloudflare Pages

### Option 2: Git Integration

1. Connect your repository to Cloudflare Pages
2. Set build command: `bun run build`
3. Set output directory: `.next`
4. Add environment variables in Cloudflare dashboard

### Environment Variables for Cloudflare

Set these in your Cloudflare Pages dashboard:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

**Note**: API routes will not work on Cloudflare Pages static hosting. For full functionality, use Cloudflare Workers or deploy to a Node.js environment (VPS, Railway, Render, etc.).

## Telegram Bot Setup

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Copy the bot token
3. Add your bot to the channel/group as admin
4. Get the channel/group ID using [@userinfobot](https://t.me/userinfobot)
5. Enter both in the Settings page

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── posts/route.ts      # Posts CRUD
│   │   ├── upload/route.ts     # Cloudinary upload
│   │   └── telegram/           # Telegram integration
│   ├── page.tsx                # Main app
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── Dashboard.tsx           # Dashboard component
│   ├── AutoPostLogo.tsx        # Logo component
│   └── ui/                     # shadcn/ui components
├── hooks/
│   └── use-session.tsx         # Auth hook
└── lib/
    ├── firebase.ts             # Firebase config
    └── utils.ts                # Utilities
```

## License

MIT License
