# Intern Management Platform

React + Vite + TypeScript ilovasi. Mock backend sifatida `json-server` ishlatiladi (`db.json`).

## Stack

- React 19 + TypeScript
- Vite (React Compiler bilan)
- Tailwind CSS v4
- shadcn/ui + Base UI
- Zustand (state)
- React Router
- Axios + json-server (mock API)

## Talablar

- Node.js **>= 20**
- npm (yoki pnpm/yarn — quyidagi misollarda `npm` ishlatiladi)

## O'rnatish

```bash
git clone https://github.com/internship-uz/intern-management-platform.git
cd intern-management-platform
npm install
```

## Environment

Loyihaning ildizida `.env` fayli kerak — `.env.example` dan nusxa oling:

```bash
cp .env.example .env
```

Default qiymat:

```
VITE_API_URL=http://localhost:3001
```

Bu URL `json-server` ishlatadigan portga mos kelishi kerak.

## Ishga tushirish

### Frontend va mock API ni birga (tavsiya etiladi)

```bash
npm run dev:all
```

Bu `vite` (port `5173`) va `json-server` (port `3001`) ni `concurrently` orqali parallel ishga tushiradi.

### Alohida ishga tushirish

Ikkita alohida terminalda:

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — mock API
npm run dev:api
```

So'ngra brauzerda: <http://localhost:5173>

## Mock API

- Ma'lumotlar `db.json` faylida saqlanadi (`users`, `interns`, `tasks`)
- json-server `http://localhost:3001` da REST endpointlar taqdim etadi
- Login uchun test foydalanuvchi: `db.json > users` dagi yozuvni ishlating

## Boshqa skriptlar

| Skript | Tavsifi |
| --- | --- |
| `npm run dev` | Faqat Vite dev server |
| `npm run dev:api` | Faqat json-server |
| `npm run dev:all` | Vite + json-server parallel |
| `npm run build` | TypeScript tekshiruvi + production build |
| `npm run preview` | Build qilingan versiyani lokal ko'rish |
| `npm run lint` | ESLint |

## Loyiha tuzilmasi

```
src/
  api/          # apiClient (axios)
  components/   # umumiy UI komponentlar (shadcn)
  features/    # auth, dashboard, interns, tasks
  layouts/      # main-layout, auth-layout
  pages/        # route sahifalar
  router/       # React Router konfiguratsiyasi
  store/        # Zustand store'lar
```
