# LOOP — AI Customer Feedback Intelligence Platform

> “LOOP turns scattered customer feedback into a ranked, evidence-backed list of what to do next.”

LOOP is a production-quality, multi-tenant SaaS application designed for Product Managers, Support Leads, Analysts, and Founders. It ingests customer feedback from multiple channels, performs AI-powered sentiment and theme classification, tracks spike trends over time, provides grounded RAG AI chat ("Ask LOOP"), and generates executive Voice of Customer (VoC) reports.

---

## 🌟 Core Features

1. **Analytics Dashboard**: Real-time KPI cards (Total Feedback, Negative %, New This Week, Top Trending Theme), period date range filters (7/30/90 days), and Recharts visual metrics (Volume over time, Sentiment breakdown donut, Top themes bar chart).
2. **Real-time Feedback Ingestion**: Instant submission with automatic AI classification for sentiment, score, feature area, and themes.
3. **Bulk CSV Import**: Drag-and-drop CSV parser with preview, line-by-line validation, progress tracking, and downloadable sample CSV file.
4. **Simulated Channel Integrations**: One-click demo generators for "Support Tickets" and "App Store Reviews".
5. **Feedback Inbox & Data Table**: Server-side pagination, text search, channel/sentiment/theme/status filters, inline status updating (`NEW` → `REVIEWED` → `ACTIONED`), detail modal with AI rationale, and manual AI re-classification.
6. **Trends & Theme Clustering**: Theme cards with trend indicators (`↑`, `↓`, `→`), automatic spike detection comparing 30-day periods, and multi-theme volume timelines.
7. **Ask LOOP AI Chat**: Grounded Q&A interface using a local TF-IDF search engine. Returns evidence-backed answers supported by verified feedback quote cards (no hallucinations).
8. **Voice of Customer Reports**: Automated executive report generator calculating period statistics, sentiment shifts, theme spikes, quotes, and prioritized actions with print/PDF layout.
9. **Role-Based Access Control (RBAC)**: Server-side enforced permissions for `ADMIN`, `ANALYST`, and `VIEWER` roles.
10. **Multi-Tenant Architecture**: Strict workspace-level data isolation via `workspaceId` across all database models and API routes.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Vanilla CSS design system, dark mode & glassmorphic aesthetic)
- **Database**: PostgreSQL / SQLite with Prisma ORM
- **Authentication**: NextAuth.js / Auth.js (Credentials provider with bcrypt password hashing)
- **Validation**: Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI Service**: Anthropic Claude API integration (`@anthropic-ai/sdk`) with an intelligent local fallback classifier & grounded generator.

---

## 🚀 Local Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory (see `.env.example`):
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="loop-super-secret-jwt-key-2026"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="" # Optional: fallback AI works out of the box if missing
```

### 3. Initialize Database & Seed Demo Data
```bash
npx prisma db push
npm run seed
```

This will seed:
- **1 Workspace**: "Acme SaaS"
- **3 Accounts**: Admin, Analyst, and Viewer
- **120+ Feedback Items**: Spanning 90 days across 5 channels and 10 standard themes

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@acme.com` | `password123` | Full access, manage workspace team members & roles, import CSV, generate reports, CRUD feedback. |
| **ANALYST** | `analyst@acme.com` | `password123` | Ingest feedback, import CSV, change status, reclassify AI, ask LOOP, generate VoC reports. |
| **VIEWER** | `viewer@acme.com` | `password123` | Read-only access to view dashboard, inbox, trends, Ask LOOP, and VoC reports. |

---

## 🏗 Architecture & Data Flow

```
Browser (React / Tailwind)
    │
    ▼
Next.js 14 App Router (API Routes & Server Actions)
    │
    ├── Authentication & RBAC (NextAuth / JWT / bcrypt)
    ├── Tenant Scoping (workspaceId)
    │
    ├── Prisma ORM (SQLite / PostgreSQL)
    │
    └── AI Classification & Grounded Engine (lib/ai.ts + lib/search.ts)
            ├── Anthropic Claude API (if ANTHROPIC_API_KEY set)
            └── Local Heuristic Classifier & TF-IDF Search Engine (Fallback)
```

---

## 🔒 Multi-Tenant Security

Every tenant-owned database query is strictly scoped using `workspaceId`. A user logged into Workspace A can never read or mutate data belonging to Workspace B. Permissions are enforced server-side inside API route handlers before executing database operations.
