# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GymOS** — A web-based CrossFit/functional gym management platform. Starts as a single-gym tool, designed to evolve into a multi-tenant SaaS. The PRD source of truth is `prd_gym_crossfit_platform.md`.

System language: **Spanish** (prepared for future i18n).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router) |
| Backend | NestJS |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | JWT |
| Storage | Cloudflare R2 |
| Email | Resend |
| Payments (future) | Stripe |
| Deploy Frontend | Cloudflare Pages |
| Deploy Backend | Fly.io / Railway |

---

## Monorepo Structure

```
/
├── backend/          # NestJS API
│   └── src/
│       └── modules/  # One module per domain
│           ├── auth/
│           ├── users/
│           ├── gyms/
│           ├── members/
│           ├── memberships/
│           ├── payments/
│           ├── expenses/
│           ├── attendance/
│           ├── wod/
│           ├── results/
│           ├── blog/
│           └── dashboard/
└── frontend/         # Next.js App Router
    ├── app/
    │   └── dashboard/
    │       ├── members/
    │       ├── payments/
    │       ├── expenses/
    │       ├── attendance/
    │       ├── wod/
    │       ├── results/
    │       └── blog/
    ├── components/
    ├── features/
    ├── services/
    ├── hooks/
    └── utils/
```

---

## Architecture

### Multi-Tenancy
Every domain table includes `gym_id`. **All database queries MUST filter by `gym_id`** to enforce data isolation. This is the #1 architectural rule.

### Backend (NestJS)
Each module follows standard NestJS structure: `controller`, `service`, `module`, `dto/`, `entities/` (Prisma models). Use `class-validator` for DTO validation.

### Frontend (Next.js App Router)
- Server Components for data-fetching (dashboard pages, reports)
- Client Components for interactive forms and real-time UI
- `features/` holds domain-specific logic, `components/` holds shared UI

### Auth Flow
- JWT-based with role-based access control (RBAC)
- Roles: `admin`, `coach`, `member`
- Attach `gym_id` to JWT payload to scope all requests

---

## Database Schema (Prisma)

Core tables and their key fields:

| Table | Key Fields |
|-------|-----------|
| `gyms` | id, name, address, email, whatsapp |
| `users` | id, gym_id, name, email, password_hash, role |
| `members` | id, gym_id, user_id, phone, birth_date, height, weight, level |
| `memberships` | id, gym_id, name, price, duration_days |
| `payments` | id, gym_id, member_id, amount, payment_method, payment_date |
| `expenses` | id, gym_id, category, amount, date, description |
| `attendance` | id, gym_id, member_id, checkin_date, checkin_time |
| `wod` | id, gym_id, title, description, date, type |
| `wod_results` | id, gym_id, wod_id, member_id, score, category |
| `blog_posts` | id, gym_id, title, slug, content, cover_image, author_id |

---

## API Endpoints

```
POST   /auth/login
POST   /auth/register
GET    /auth/profile

GET    /members          POST   /members          PATCH  /members/:id
GET    /payments         POST   /payments
GET    /expenses         POST   /expenses
POST   /attendance/checkin    GET /attendance
GET    /wods             POST   /wods
POST   /results          GET    /results/wod/:id
GET    /blog             GET    /blog/:slug        POST   /blog
```

---

## User Roles

| Role | Key Permissions |
|------|----------------|
| `admin` | Full access: members, payments, expenses, WOD, blog, landing page, reports |
| `coach` | Read-only: WOD, results, attendance |
| `member` | QR check-in, view/post WOD results, leaderboard, own profile |

---

## QR Attendance System

A physical QR code on the gym wall links to the check-in page. Rules:
1. Member must have an active membership
2. Max 1 check-in per day per member

---

## WOD & Results

WOD types: `General`, `Programming`
Result categories: `RX`, `Scaled`, `Beginner`
Leaderboard auto-ranks by category per WOD.

---

## Development Roadmap

| Sprint | Features |
|--------|---------|
| 1 | Auth, users, gyms, members |
| 2 | Memberships, payments, expenses, dashboard |
| 3 | WOD, results, leaderboard, QR attendance |
| 4 | Landing page (editable), blog, SEO |

---

## Skills to Load

When working in this codebase, read the relevant skill files before writing code:

- Next.js App Router → `~/.claude/skills/nextjs-15/SKILL.md`
- React components → `~/.claude/skills/react-19/SKILL.md`
- TypeScript → `~/.claude/skills/typescript/SKILL.md`
- Tailwind styling → `~/.claude/skills/tailwind-4/SKILL.md`
- Zod validation → `~/.claude/skills/zod-4/SKILL.md`
