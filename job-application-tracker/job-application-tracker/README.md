# Pathway — Job Application Tracker

A full-stack, mobile-responsive job application tracker.

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (JSON Web Tokens), passwords hashed with bcrypt

Track every application through a five-stage pipeline — **Wishlist → Applied → Interview → Offer / Rejected** — with a kanban board on desktop that collapses into swipeable tabs on mobile.

## Project structure

```
job-application-tracker/
├── backend/          Express API, MongoDB models, JWT auth
└── frontend/          React + Tailwind client (Vite)
```

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either:
  - Local MongoDB running on `mongodb://127.0.0.1:27017`, or
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended)

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/job-tracker
JWT_SECRET=some_long_random_string
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Run it:

```bash
npm run dev      # with nodemon (auto-restart)
# or
npm start
```

The API starts on `http://localhost:5000`. Check it's alive at `GET /api/health`.

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` only needs the API URL (default is already correct for local dev):

```
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Register an account, then start logging applications.

## 4. Building for production

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host (Vercel, Netlify, S3, etc.), and deploy `backend/` to any Node host (Render, Railway, Fly.io, a VPS, etc.). Set `CLIENT_ORIGIN` on the backend to your deployed frontend URL, and `VITE_API_URL` on the frontend to your deployed backend URL.

## API reference

All `/api/jobs/*` routes require an `Authorization: Bearer <token>` header.

| Method | Route              | Description                          |
|--------|---------------------|---------------------------------------|
| POST   | `/api/auth/register` | Create an account, returns a JWT     |
| POST   | `/api/auth/login`    | Log in, returns a JWT                |
| GET    | `/api/auth/me`       | Get the logged-in user's profile     |
| GET    | `/api/jobs`           | List applications (`?status=`, `?search=`) |
| GET    | `/api/jobs/stats`     | Counts per status                    |
| GET    | `/api/jobs/:id`       | Get one application                  |
| POST   | `/api/jobs`            | Create an application                |
| PUT    | `/api/jobs/:id`       | Update an application                |
| DELETE | `/api/jobs/:id`       | Delete an application                |

## Job fields

`company`, `position`, `location`, `jobType` (Full-time / Part-time / Internship / Contract / Freelance), `status` (Wishlist / Applied / Interview / Offer / Rejected), `applicationDate`, `salary`, `jobUrl`, `contactPerson`, `notes`.

## Notes on security

- Passwords are hashed with bcrypt before being stored — never stored in plain text.
- JWTs are signed with `JWT_SECRET` and expire after `JWT_EXPIRES_IN`.
- Every job route is scoped to `req.user._id`, so one account can never read or modify another account's data.
- Change `JWT_SECRET` to a long, random value before deploying anywhere public.
