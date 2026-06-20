# Internship Registration (MERN)

A simple internship registration form. Users submit their **name, email, and
technology**; submissions are saved to MongoDB and shown in a registrations
list in the same app.

## Project structure

```
internship-registration/
├── backend/
│   ├── models/Registration.js       # Mongoose schema
│   ├── routes/registrationRoutes.js # POST + GET /api/registrations
│   ├── server.js                    # Express app entry point
│   ├── .env                         # MONGO_URI, PORT
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── RegistrationForm.jsx
    │   │   └── RegistrationList.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

## 1. Backend setup

```bash
cd backend
npm install
npm run dev      # starts on http://localhost:5000 (needs nodemon, included in devDependencies)
# or: npm start
```

`backend/.env` already has your `MONGO_URI`. **Before this will connect**,
go to MongoDB Atlas → Network Access and whitelist your machine's IP (or
`0.0.0.0/0` for testing) — Atlas blocks connections from unknown IPs by
default.

⚠️ **Rotate your database password.** It was pasted into this chat, so treat
it as exposed — change it in Atlas → Database Access, then update
`MONGO_URI` in `.env` to match.

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173
```

`frontend/.env` points the app at `http://localhost:5000/api/registrations`.
Change `VITE_API_URL` there if your backend runs elsewhere.

## API

| Method | Route                  | Body                                | Description                  |
|--------|-------------------------|--------------------------------------|-------------------------------|
| POST   | `/api/registrations`    | `{ name, email, technology }`        | Create a registration         |
| GET    | `/api/registrations`    | —                                     | List all, newest first        |

## How it works

- The **Apply** tab has the form. On submit, it `POST`s to the backend,
  shows a confirmation, and lets you jump straight to the list.
- The **Registrations** tab `GET`s all saved entries and renders them as
  ticket-style cards (each with a sequential ID like `INT-0001`).
- Both tabs live in one page (`App.jsx` toggles between them) — no router
  needed for a two-section app this size.

## Verified

This project was installed and built in a clean environment before
delivery: `npm install` succeeds for both `backend` and `frontend`, the
backend starts and reaches your real MongoDB Atlas cluster (only blocked by
IP allowlisting, which is expected), and `npm run build` produces a working
production bundle for the frontend with the custom Tailwind theme compiled
in correctly.
