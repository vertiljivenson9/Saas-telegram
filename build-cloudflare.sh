#!/bin/bash

# Build script for Cloudflare Pages deployment
# This creates a static export without API routes

echo "Building for Cloudflare Pages..."

# Set environment variables for build
export NEXT_PUBLIC_FIREBASE_API_KEY="${NEXT_PUBLIC_FIREBASE_API_KEY:-AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA}"
export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:-saastelegram-459f9.firebaseapp.com}"
export NEXT_PUBLIC_FIREBASE_PROJECT_ID="${NEXT_PUBLIC_FIREBASE_PROJECT_ID:-saastelegram-459f9}"

# Build
bun run build

echo "Build complete!"
echo "Output in .next folder"
