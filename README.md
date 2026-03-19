# AutoPost - SaaS Content Publisher

Una aplicación SaaS moderna para publicar contenido en múltiples plataformas automáticamente.

## 🚀 Opciones de Deployment

### ⚠️ IMPORTANTE: Cloudflare Pages NO soporta API routes

Cloudflare Pages usa **Edge Runtime**, no Node.js. Esto significa que las API routes de Next.js NO funcionarán.

**Tienes 3 opciones:**

---

### Opción 1: Railway.app (RECOMENDADO)

✅ Soporta Next.js completo con API routes
✅ Deployment automático desde GitHub
✅ Fácil configuración

**Pasos:**
1. Ve a [railway.app](https://railway.app)
2. Login con GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona `Saas-telegram`
5. Agrega variables de entorno:

```env
CLOUDINARY_CLOUD_NAME=ddquy4oim
CLOUDINARY_API_KEY=399214546928275
CLOUDINARY_API_SECRET=sEMWm8uzPVTUqslnkImcqTtvguU
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=saastelegram-459f9.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=saastelegram-459f9
```

---

### Opción 2: Render.com (GRATIS)

✅ Plan gratuito disponible
✅ Soporta Next.js con API routes

**Pasos:**
1. Ve a [render.com](https://render.com)
2. "New" → "Web Service"
3. Conecta tu repo
4. Configura:
   - Build: `npm install && npm run build`
   - Start: `npm start`
5. Agrega las variables de entorno

---

### Opción 3: Vercel (CREADOR DE NEXT.JS)

✅ Soporte nativo para Next.js
✅ Deployment en 1 click

**Pasos:**
1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repo de GitHub
3. Agrega las variables de entorno
4. Deploy

---

## 📦 Desarrollo Local

```bash
# Instalar dependencias
bun install

# Copiar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# Ejecutar en desarrollo
bun run dev
```

## 🔧 Variables de Entorno

| Variable | Valor |
|----------|-------|
| `CLOUDINARY_CLOUD_NAME` | `ddquy4oim` |
| `CLOUDINARY_API_KEY` | `399214546928275` |
| `CLOUDINARY_API_SECRET` | `sEMWm8uzPVTUqslnkImcqTtvguU` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `saastelegram-459f9.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `saastelegram-459f9` |

## 🎨 Características

- 🔐 **Firebase Auth** - Google + Email/Password
- 📤 **Cloudinary** - Upload de imágenes
- 📱 **Telegram** - Publicación automática
- 🎯 **Firestore** - Base de datos en tiempo real
- 📱 **Mobile First** - Diseño responsivo
- 🌙 **Dark Mode** - UI moderna

## 📁 Estructura

```
src/
├── app/
│   ├── api/              # API Routes
│   │   ├── posts/        # CRUD posts
│   │   ├── upload/       # Cloudinary upload
│   │   └── telegram/     # Telegram integration
│   ├── page.tsx          # App principal
│   └── layout.tsx        # Layout
├── components/
│   ├── Dashboard.tsx     # Dashboard
│   └── ui/               # Componentes UI
├── hooks/
│   └── use-session.tsx   # Auth context
└── lib/
    └── firebase.ts       # Firebase config
```

## 📱 Telegram Setup

1. Crea un bot con [@BotFather](https://t.me/BotFather)
2. Copia el token del bot
3. Agrega el bot a tu canal como admin
4. Obtén el ID del canal con [@userinfobot](https://t.me/userinfobot)
5. Configura en Settings

## 📄 Licencia

MIT
