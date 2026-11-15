# TASKS.md — WarrantyWise Granular Task Checklist & Commit Plan

## Git Commit Milestones Strategy
- Commit 1: `chore: initialize repository architecture, documentation and implementation roadmap`
- Commit 2: `feat(core): scaffold Next.js project with Tailwind CSS, design tokens, and dependencies`
- Commit 3: `feat(ui): implement design system components, layout shell, and marketing landing page`
- Commit 4: `feat(auth): add authentication flows, onboarding, and protected user dashboard`
- Commit 5: `feat(db): add comprehensive Supabase migrations, RLS security policies, and typed schemas`
- Commit 6: `feat(cases): implement new investigation wizard and document upload pipeline`
- Commit 7: `feat(ai): integrate Gemini AI provider with structured prompts and policy compiler`
- Commit 8: `feat(engine): implement deterministic 3-valued rule engine and multi-stage investigation orchestrator`
- Commit 9: `feat(graph): build interactive React Flow evidence graph and comprehensive investigation report`
- Commit 10: `feat(demo): add interactive realistic showcase demo workspace with synthetic test documents`
- Commit 11: `test: add unit tests for deterministic rule engine and verification suites`
- Commit 12: `docs: update documentation, deployment guides, and project status`

---

## Detailed Task Checklist

### Phase 0: Setup & Planning
- [x] Create ARCHITECTURE.md
- [x] Create IMPLEMENTATION_PLAN.md
- [x] Create TASKS.md
- [ ] Initialize git repo configuration & initial commit

### Phase 1: Foundation & Design System
- [ ] Initialize Next.js 15+ App Router application with TypeScript & Tailwind CSS
- [ ] Install packages (`@google/genai`, `@supabase/supabase-js`, `@supabase/ssr`, `@xyflow/react`, `lucide-react`, `zod`, `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query`)
- [ ] Setup Tailwind CSS theme tokens (`#14233B`, `#26364B`, `#3867E8`, semantic status colors)
- [ ] Build reusable UI components (Button, Input, Card, Badge, Modal/Dialog, Tabs, Progress, Toast)
- [ ] Build marketing landing page (`/`)
- [ ] Build auth pages (`/login`, `/signup`, `/forgot-password`) & onboarding (`/onboarding`)
- [ ] Build dashboard (`/dashboard`) with real KPI metrics and case listing

### Phase 2: Database & Backend Services
- [ ] Create Supabase migration with 14 relational tables
- [ ] Configure Row Level Security (RLS) policies and private storage buckets
- [ ] Create Supabase server and client singletons with cookie auth handling

### Phase 3: Case Management & Document Ingestion
- [ ] Create multi-step Case Wizard (`/cases/new`) with draft persistence
- [ ] Build Document Upload & Ingestion service with SHA-256 hashing and validation
- [ ] Build Case Workspace (`/cases/[caseId]`) with Overview and Documents tab
- [ ] Build Document Viewer with page navigation and highlighted excerpt citation

### Phase 4: AI & Deterministic Engine
- [ ] Build Gemini AI service with `@google/genai` provider abstraction
- [ ] Build structured JSON extraction prompts for Invoices, Policies, Denial letters, and Service Reports
- [ ] Build Policy Compiler service for structured coverage/exclusion rules
- [ ] Build Deterministic 3-Valued Logic Rule Engine (`TRUE`, `FALSE`, `UNKNOWN`)
- [ ] Build Multi-stage Investigation Orchestrator (Stages A through F) with Red-Team adversarial auditor

### Phase 5: Evidence Graph, Reports & Demo
- [ ] Build interactive Evidence Graph (`/cases/[caseId]/evidence`) with `@xyflow/react`
- [ ] Build Investigation Report view (`/cases/[caseId]/report`) with printable styling and PDF export
- [ ] Build pre-seeded Realistic Showcase Case with synthetic files (SmartHome Washing Machine)
- [ ] Add unit test suite for date arithmetic, leap years, and 3-valued rule logic
- [ ] Verify complete user flow in browser

