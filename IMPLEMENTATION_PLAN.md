# IMPLEMENTATION_PLAN.md — WarrantyWise Implementation Roadmap

## Overview
This document tracks the phased execution plan for WarrantyWise in accordance with the master implementation prompt.

---

## Phase 0: Repository Inspection & Foundation Setup
- [x] Inspect clean workspace
- [x] Create `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md`, and `TASKS.md`
- [ ] Initialize Next.js 15+ App Router TypeScript project with Tailwind CSS
- [ ] Install core dependencies:
  - `@google/genai`
  - `@supabase/supabase-js`, `@supabase/ssr`
  - `@xyflow/react`
  - `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`
  - `zod`, `react-hook-form`, `@hookform/resolvers`
  - `@tanstack/react-query`
- [ ] Configure Tailwind CSS color tokens (Deep navy `#14233B`, Dark slate `#26364B`, Blue accent `#3867E8`, semantic states)
- [ ] Configure environment variables `.env.example` and validation schemas

## Phase 1: UI Foundation & Design System
- [ ] Build core UI components (`Button`, `Card`, `Badge`, `Input`, `Dialog`, `Table`, `Tabs`, `Alert`, `Skeleton`)
- [ ] Build application shell: Responsive Top Navigation, Sidebar navigation, user context menu
- [ ] Build high-converting Public Landing Page (`/`):
  - Brand header & navigation
  - High-impact Hero with realistic investigation preview
  - How it works (4 steps)
  - Features grid
  - Trust, provenance & security breakdown
  - Professional footer
- [ ] Build Authentication pages (`/login`, `/signup`, `/forgot-password`)
- [ ] Build Onboarding page (`/onboarding`)
- [ ] Build Dashboard (`/dashboard`) with real KPI cards, recent investigations table, filter tabs, quick-start drawer

## Phase 2: Database Schema & Supabase RLS Layer
- [ ] Define comprehensive PostgreSQL schema with Supabase migrations:
  - `profiles`, `cases`, `documents`, `extracted_facts`, `policy_clauses`, `policy_rules`, `evidence_items`, `evidence_relationships`, `investigation_runs`, `investigation_findings`, `finding_sources`, `audit_results`, `processing_jobs`, `user_activity`
- [ ] Define RLS policies ensuring strict multi-tenant isolation
- [ ] Define private storage bucket rules for `warranty_documents`
- [ ] Create Supabase server/client utilities (`lib/supabase/server.ts`, `client.ts`, `middleware.ts`)

## Phase 3: Case Creation & Document Pipeline
- [ ] Multi-step New Investigation Wizard (`/cases/new`):
  - Step 1: Product & Purchase details
  - Step 2: Rejection letter & stated manufacturer claims
  - Step 3: Document file uploader with drag-and-drop, validation, and metadata tagging
  - Step 4: Verification & investigation initiation
- [ ] Case Workspace (`/cases/[caseId]`):
  - Header with live status badge, actions, and tab navigation
  - Overview tab with case summary, rejection assertion vs. policy clauses, key findings list, missing evidence alert
- [ ] Document Workspace (`/cases/[caseId]/documents`):
  - Document sidebar with status, page counts, checksums
  - Document viewer (preview canvas, page navigation, zoom)
  - Extracted facts & clauses sidebar with exact page citation links

## Phase 4: Extraction Services & Policy Compiler
- [ ] Implement Gemini AI provider abstraction (`lib/ai/gemini.ts` using `@google/genai`)
- [ ] Strict prompt templates with structured JSON outputs:
  - Document classification & metadata extraction
  - Invoice fact extraction (purchase date, serial number, buyer, vendor)
  - Warranty policy clause parsing (durations, exclusions, limitations)
  - Rejection letter parsing (stated rationale, cited clauses)
  - Service report diagnostic extraction (observed vs. suspected cause)
- [ ] Policy Compiler (`services/policy-compiler.service.ts`): converts policy clauses into testable condition schemas

## Phase 5: Deterministic Rule Engine & Multi-Stage Investigation
- [ ] TypeScript 3-Valued Logic Rule Engine (`services/rules-engine.service.ts`):
  - Expiry calculation with leap years, month-end edge cases, and start triggers
  - Exclusion verification (checking whether condition criteria are formally met)
  - Exact provenance traceability validation
- [ ] Multi-stage Investigation Orchestrator (`services/investigation.service.ts`):
  - Stage A: Claim Parser
  - Stage B: Policy Analyst
  - Stage C: Evidence Analyst
  - Stage D: Initial Investigator
  - Stage E: Red-Team Adversarial Auditor
  - Stage F: Final Reconciler (`SUPPORTED`, `CONTRADICTED`, `INSUFFICIENT_EVIDENCE`)

## Phase 6: Evidence Graph & Report Generation
- [ ] Interactive Evidence Graph (`/cases/[caseId]/evidence` using `@xyflow/react`):
  - Custom nodes: Claim, Policy Clause, Invoice Fact, Service Report, Finding, Missing Evidence
  - Dynamic colored edges for SUPPORTS, CONTRADICTS, DEPENDS_ON, MISSING
  - Click-to-inspect detail drawer showing verbatim excerpt, page number, confidence
  - Search, filter by type, and fit-view controls
- [ ] Investigation Report (`/cases/[caseId]/report`):
  - Executive summary, claim breakdown, clause comparison, evidence table, red-team log, next actions
  - Print & PDF export layout with clean pagination & citations

## Phase 7: Demo Mode, Testing & Polish
- [ ] Seed realistic interactive showcase case: "SmartHome Washing Machine" with 4 synthetic sample documents
- [ ] Unit tests for deterministic rule engine (date math, 3-valued logic, boundary checks)
- [ ] End-to-end user journey verification via browser
- [ ] Documentation: `README.md` with complete setup, architecture, and verification steps

