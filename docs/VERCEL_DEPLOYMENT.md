# Despliegue en Vercel

Checklist y consideraciones para desplegar **Tus Ojos** (Next.js + Payload CMS + MongoDB) en Vercel.

---

## 1. Variables de entorno

Configura en **Vercel → Project → Settings → Environment Variables** (y en **Preview** si usas preview deployments):

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | Connection string de MongoDB (ej. `mongodb+srv://...`). **No** incluir credenciales en el repo. |
| `PAYLOAD_SECRET` | ✅ | Secret para JWT/cookies. Generar uno fuerte y **único en producción**. |
| `NEXT_PUBLIC_SERVER_URL` | ✅ | URL pública del sitio, **sin** barra final. Ej: `https://tus-ojos.vercel.app` o tu dominio. |
| `CRON_SECRET` | ✅ | Secret para proteger cron jobs y el endpoint de refresh de Instagram. Debe coincidir con el que uses en Vercel Cron. |
| `PREVIEW_SECRET` | Opcional | Para preview/draft en Payload. |
| `INSTAGRAM_ACCESS_TOKEN` | Si usas feed | Token de Instagram Graph API. |
| `INSTAGRAM_USER_ID` | Si usas feed | ID del usuario de Instagram. |

- **Producción**: usa valores de producción (DB de prod, dominio real).
- **Preview**: si usas otra DB o otro dominio para PRs, define las mismas variables con valores de preview.

---

## 2. Build y comandos

- **Build Command**: `pnpm build` (o el que tengas en `package.json`).
- **Output**: Next.js detecta automáticamente el framework; no hace falta configurar "Output Directory".
- **Install Command**: `pnpm install` (Vercel suele detectar pnpm por `pnpm-lock.yaml`).

Tu `next.config.js` ya usa `withPayload` y está preparado para Vercel. El script `postbuild` (`next-sitemap`) se ejecuta tras el build; asegúrate de que `NEXT_PUBLIC_SERVER_URL` (o `VERCEL_PROJECT_PRODUCTION_URL`) esté definido en el entorno de build para que el sitemap tenga la URL correcta.

---

## 3. Node / pnpm

- **Node.js Version**: en Vercel → Settings → General, selecciona **20.x** (tu `package.json` pide `^18.20.2 || >=20.9.0`).
- Si usas pnpm, Vercel lo detecta por el lockfile; no suele hacer falta configurar nada más.

---

## 4. URL del sitio (CORS, imágenes, sitemap)

- En producción, **NEXT_PUBLIC_SERVER_URL** debe ser la URL final del sitio (ej. `https://tudominio.com`).
- Payload usa esa URL para CORS (`payload.config.ts` → `cors: [getServerSideURL()]`).
- `getURL.ts` ya tiene fallback a `VERCEL_PROJECT_PRODUCTION_URL`; en Vercel suele bastar con definir `NEXT_PUBLIC_SERVER_URL` para tener control explícito.
- Las imágenes de Next.js ya incluyen `**.cdninstagram.com` en `remotePatterns`; si añades más dominios (ej. tu CDN o Storage), agrégalos en `next.config.js` → `images.remotePatterns`.

---

## 5. Cron jobs (Payload + refresh Instagram)

- Tienes un endpoint protegido: **`/api/refresh-instagram-token`** (requiere `?secret=CRON_SECRET`).
- Payload usa **CRON_SECRET** en el header `Authorization: Bearer <CRON_SECRET>` para jobs que requieran autenticación.

En **Vercel → Project → Settings → Cron Jobs** (o en `vercel.json`):

```json
{
  "crons": [
    {
      "path": "/api/refresh-instagram-token",
      "schedule": "0 0 * * *"
    }
  ]
}
```

- `schedule`: expresión cron (ej. diario a medianoche).
- Para llamar al endpoint con el secret: en Vercel Cron no puedes pasar query params directamente; una opción es usar un **Vercel Serverless Function** que llame a tu API con el secret en un header o en el body, o exponer el secret como variable y que el cron invoque una ruta que internamente use esa variable.  
  Alternativa práctica: crear una ruta tipo `api/cron/refresh-instagram` que lea `CRON_SECRET` y llame a la lógica de refresh; y en Vercel Cron apuntar a esa ruta, protegiéndola con **Vercel Authorization** (token en header) o con el mismo `CRON_SECRET` en un header que tu ruta valide.

Si solo usas el endpoint actual con `?secret=...`, puedes llamarlo desde un cron externo (ej. GitHub Actions, otro servicio) pasando el secret en la URL (mejor usar un header si el servicio lo permite).

---

## 6. Base de datos (MongoDB)

- Usa **MongoDB Atlas** (o un MongoDB con SSL) y una connection string que permita conexiones desde cualquier IP (Atlas: `0.0.0.0/0` en Network Access).
- La URL debe estar en `DATABASE_URL`; en producción no uses la misma DB que en desarrollo.
- Payload con `mongooseAdapter` funciona en serverless; las conexiones se gestionan por request.

---

## 7. Límites y optimización

- **Serverless timeouts**: Vercel tiene límite de ejecución (ej. 10s en Hobby, más en Pro). Operaciones muy pesadas (imports masivos, revalidaciones enormes) conviene hacerlas en background o en un job.
- **Cold starts**: La primera request tras inactividad puede ser más lenta; es normal en serverless.
- Tu app usa `revalidatePath` / `revalidateTag` en hooks de Payload; está bien para Vercel. El `unstable_cache` y los tags son compatibles con el runtime de Vercel.

---

## 8. Dominio propio

- En **Vercel → Settings → Domains** añades tu dominio y configuras DNS según las instrucciones.
- Después de asignar el dominio, actualiza **NEXT_PUBLIC_SERVER_URL** a `https://tudominio.com` y redeploya para que CORS, sitemap y OG usen la URL correcta.

---

## 9. Si ves 404 al desplegar

**Causas habituales y qué revisar:**

1. **Layout raíz**  
   Next.js App Router espera un layout en `app/layout.tsx`. En este proyecto ya existe y envuelve todo. Si en el pasado lo quitabas o no existía, eso puede provocar 404 en la raíz o en rutas en Vercel.

2. **Variables de entorno en tiempo de ejecución**  
   En Vercel, las env deben estar definidas para **Production** (y Preview si usas deploys de PR). Si `DATABASE_URL` o `PAYLOAD_SECRET` no están configuradas en el proyecto de Vercel, las páginas que usan Payload pueden fallar o devolver 404/500. Comprueba en **Settings → Environment Variables** que estén para el entorno correcto.

3. **Build sin errores pero 404**  
   Revisa el **Build Log** en Vercel. Si `generateStaticParams` o la conexión a la base de datos fallan durante el build, algunas rutas pueden no generarse bien. Asegúrate de que `DATABASE_URL` esté disponible **durante el build** (no solo en runtime).

4. **Ruta del admin**  
   El backoffice está en `/backoffice` (no en `/admin`). Comprueba que usas la URL correcta.

5. **Home y página estática**  
   Si no hay página con slug `home` en la base de datos, la raíz usa un contenido estático de fallback (`homeStatic`). Si algo falla al cargar ese fallback, podría mostrarse 404. Verifica que el build termine bien y que la DB sea accesible.

6. **Redeploy**  
   Después de añadir o cambiar variables de entorno, haz un **Redeploy** desde el dashboard de Vercel para que el nuevo build use las variables actualizadas.

---

## 10. Resumen rápido

1. Definir en Vercel: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `CRON_SECRET` (y las de Instagram si aplica).
2. Build: `pnpm build`; Node 20.x.
3. Tener layout raíz en `src/app/layout.tsx` (ya está en el proyecto).
4. Opcional: configurar Cron para `/api/refresh-instagram-token` (o ruta que valide `CRON_SECRET`).
5. Dominio: añadir dominio en Vercel y poner `NEXT_PUBLIC_SERVER_URL` con esa URL.
6. No commitear `.env`; usar solo variables de entorno de Vercel (o integraciones como Vercel + MongoDB Atlas).
