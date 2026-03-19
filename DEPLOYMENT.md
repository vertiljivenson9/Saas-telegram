# 🚀 Guía de Despliegue - AutoPost

## Opción 1: Railway.app (RECOMENDADO - Más Fácil)

Railway soporta API routes de Next.js nativamente.

### Pasos:

1. **Ve a [railway.app](https://railway.app)** y haz login con GitHub

2. **Click "Start a New Project"** → **"Deploy from GitHub repo"**

3. **Selecciona tu repositorio**

4. **Configura las variables de entorno** (Settings → Variables):
   ```
   CLOUDINARY_CLOUD_NAME=ddquy4oim
   CLOUDINARY_API_KEY=399214546928275
   CLOUDINARY_API_SECRET=sEMWm8uzPVTUqslnkImcqTtvguU
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=saastelegram-459f9.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=saastelegram-459f9
   ```

5. **Railway detecta Next.js automáticamente** y despliega

6. **Obtén tu URL**: `https://tu-proyecto.up.railway.app`

---

## Opción 2: Render.com (Gratis)

### Pasos:

1. **Ve a [render.com](https://render.com)** y haz login con GitHub

2. **Click "New"** → **"Web Service"**

3. **Conecta tu repositorio**

4. **Configura**:
   - **Name**: autopost
   - **Region**: Oregon (US West) o Frankfurt (Europe)
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Agrega variables de entorno** (Advanced → Add Environment Variable):
   ```
   CLOUDINARY_CLOUD_NAME=ddquy4oim
   CLOUDINARY_API_KEY=399214546928275
   CLOUDINARY_API_SECRET=sEMWm8uzPVTUqslnkImcqTtvguU
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=saastelegram-459f9.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=saastelegram-459f9
   ```

6. **Click "Create Web Service"**

---

## Opción 3: Cloudflare Pages (Solo Frontend)

⚠️ **IMPORTANTE**: Cloudflare Pages NO soporta API routes de Node.js.
Las funciones de upload y Telegram NO funcionarán.

Solo úsalo si quieres mostrar el frontend demo.

### Pasos:

1. **Ve a [dash.cloudflare.com](https://dash.cloudflare.com)**

2. **Click "Workers & Pages"** → **"Create application"**

3. **Click "Pages"** → **"Connect to Git"**

4. **Selecciona tu repositorio**

5. **Configura el build**:
   - **Production branch**: main
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`

6. **Agrega variables de entorno** (Settings → Environment Variables):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=saastelegram-459f9.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=saastelegram-459f9
   ```

7. **Click "Save and Deploy"**

---

## Opción 4: VPS (DigitalOcean, Linode, etc.)

Si tienes un VPS:

```bash
# 1. Clona el repositorio
git clone <tu-repo>
cd autopost

# 2. Instala dependencias
bun install

# 3. Configura variables de entorno
cp .env.example .env
# Edita .env con tus valores

# 4. Build
bun run build

# 5. Usa PM2 para producción
npm install -g pm2
pm2 start npm --name "autopost" -- start

# 6. Configura nginx como proxy inverso
```

---

## 🔧 Variables de Entorno Requeridas

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | `ddquy4oim` | Tu cloud de Cloudinary |
| `CLOUDINARY_API_KEY` | `399214546928275` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | `sEMWm8uzPVTUqslnkImcqTtvguU` | API Secret de Cloudinary |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyAIAbGS5saZiSxDW7eajGVO-ba-jGf2vgA` | Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `saastelegram-459f9.firebaseapp.com` | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `saastelegram-459f9` | Firebase Project ID |

---

## ✅ Verificar Despliegue

1. Abre tu URL en el navegador
2. Intenta hacer login con Google
3. Ve a Settings y conecta Telegram
4. Crea un post con imagen
5. Verifica que se publique en Telegram

---

## 🆘 Problemas Comunes

### "Build failed"
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build

### "API route not found"
- Cloudflare Pages no soporta API routes
- Usa Railway o Render en su lugar

### "Firebase not initialized"
- Verifica que las variables `NEXT_PUBLIC_FIREBASE_*` estén configuradas

### "Image upload failed"
- Verifica las credenciales de Cloudinary
- Revisa los logs del servidor
