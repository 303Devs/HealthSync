# HealthSync

A modern healthcare management system and patient portal built by [303Devs](https://github.com/303Devs). HealthSync streamlines the patient experience — from initial registration through appointment scheduling — while giving administrators a centralized dashboard to manage their practice.

**Live Demo:** [health-sync-one.vercel.app](https://health-sync-one.vercel.app)

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=flat-square&logo=appwrite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Framework        | Next.js 16.1.6 (App Router)          |
| UI Library       | React 19                             |
| Language         | TypeScript 5                         |
| Backend / BaaS   | Appwrite                             |
| Styling          | Tailwind CSS v3, shadcn/ui, Radix UI |
| Forms            | React Hook Form + Zod                |
| Tables           | TanStack Table                       |
| Error Monitoring | Sentry                               |
| Phone Input      | react-phone-number-input             |
| Date Picker      | react-datepicker                     |
| File Uploads     | react-dropzone                       |
| Deployment       | Vercel                               |

---

## Features

- **Patient Registration** — Multi-step onboarding collecting personal information, medical history, insurance details, emergency contacts, and government-issued ID verification
- **Appointment Booking** — Patients select from a roster of physicians and book appointments with date/time selection
- **Consent & Compliance** — Built-in consent form collection as part of the registration flow
- **Admin Dashboard** — Protected `/admin` route for staff to view, manage, and update appointment statuses
- **Form Validation** — Strict schema validation via Zod on all patient-facing forms
- **Error Monitoring** — Sentry integration across client, server, and edge runtimes
- **Responsive Design** — Mobile-first layout using Tailwind CSS and shadcn/ui components

---

## App Routes

| Route                                | Description                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| `/`                                  | Patient landing page and initial registration entry                                |
| `/patients/[userId]/register`        | Multi-step registration (personal info, medical history, ID verification, consent) |
| `/patients/[userId]/new-appointment` | Appointment booking with physician selection                                       |
| `/admin`                             | Admin dashboard — appointment management                                           |

---

## Project Structure

```
healthsync/
├── app/
│   ├── page.tsx                  # Landing / registration entry
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/                    # Admin dashboard
│   ├── patients/
│   │   └── [userId]/
│   │       ├── register/         # Multi-step registration
│   │       └── new-appointment/  # Appointment booking
│   ├── api/                      # API routes
│   └── policies/                 # Policy pages
├── components/                   # Shared UI components
├── constants/                    # Doctors list, form field configs, enums
├── lib/                          # Appwrite client, utilities
├── types/                        # Global TypeScript types
├── public/                       # Static assets
├── sentry.client.config.ts
├── sentry.server.config.ts
└── sentry.edge.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- An [Appwrite](https://appwrite.io) project (Cloud or self-hosted)
- A [Sentry](https://sentry.io) project for error monitoring

### Installation

```bash
git clone https://github.com/303Devs/HealthSync.git
cd HealthSync
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in values from the private project credentials. Real Appwrite credentials, admin passkeys, and Sentry tokens must stay out of Git.

```bash
# Appwrite
NEXT_PUBLIC_ENDPOINT=
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
DOCTOR_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

# Admin access
NEXT_PUBLIC_ADMIN_PASSKEY=
NEXT_PRIVATE_ADMIN_PASSKEY=

# Sentry build/upload token
SENTRY_AUTH_TOKEN=
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Screenshots

<!-- Add screenshots here -->

---

## Deployment

The project is deployed on **Vercel** with zero-config Next.js support.

1. Push your fork to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy

---

## Status

Active portfolio project. Live at [health-sync-one.vercel.app](https://health-sync-one.vercel.app).

---

Built by [303Devs](https://github.com/303Devs)
