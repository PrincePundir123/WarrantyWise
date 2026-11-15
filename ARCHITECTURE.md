# ARCHITECTURE.md — WarrantyWise System Architecture

## 1. Overview
WarrantyWise is an AI-powered warranty dispute investigation and evidence intelligence platform. It enables consumers to upload warranty claims, purchase invoices, service reports, and denial letters, then runs deterministic policy rule validation coupled with a bounded multi-stage AI reasoning workflow (Claim Parser -> Policy Analyst -> Evidence Analyst -> Initial Investigator -> Red-Team Auditor -> Final Reconciler).

Every finding is strictly anchored to traceable source evidence (document ID, page number, verbatim excerpt, and confidence score).

---

## 2. Tech Stack Architecture

### Frontend
- **Framework:** Next.js (App Router, React 19, TypeScript strict mode)
- **Styling & UI:** Tailwind CSS, shadcn/ui design primitives, Lucide React icons
- **State & Queries:** TanStack React Query (server-state), Zustand (client UI/modal state where needed), React Hook Form + Zod
- **Evidence Visualization:** `@xyflow/react` (React Flow) for interactive evidence lineage & contradiction graphs
- **Document Viewing:** PDF.js / custom canvas & structured excerpt viewer with exact provenance highlighting

### Backend & Storage
- **API Runtime:** Next.js Route Handlers (`/api/...`)
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) & Supabase Storage (private document buckets with time-limited signed URLs)
- **Database Layer / ORM:** Supabase Client + Typed schema definitions with database migration scripts
- **AI Integration:** Google Gemini API (`@google/genai` SDK), strictly configurable via `GEMINI_MODEL` and `GEMINI_API_KEY`. Structured output enforcement via Zod / JSON Schema.

### Deterministic Engine
- Built-in TypeScript rule engine for 3-valued logic (`TRUE`, `FALSE`, `UNKNOWN`), leap-year/month-end warranty duration calculations, exclusion tests, and provenance verification. LLMs are never allowed to calculate dates or expiry.

---

## 3. Core Database Entities
- `profiles`: User profile data referencing `auth.users`
- `cases`: Root investigation case records (product, manufacturer, claim, rejection details, conclusion)
- `documents`: Uploaded artifacts with storage pointers, SHA-256 checksums, and processing states
- `extracted_facts`: Granular structured facts extracted with exact page and excerpt provenance
- `policy_clauses`: Formalized policy sections (COVERAGE, EXCLUSION, DURATION, etc.)
- `policy_rules`: Compiled deterministic rules with 3-valued logic inputs
- `evidence_items`: Normalized evidence tokens mapped to document sources
- `evidence_relationships`: Edges (SUPPORTS, CONTRADICTS, DEPENDS_ON, DERIVED_FROM, MISSING)
- `investigation_runs`: Tracked lifecycle runs for multi-stage reasoning
- `investigation_findings`: Individual conclusions with severity, confidence, and source links
- `finding_sources`: Many-to-many link between findings and documentary excerpts
- `audit_results`: Independent red-team auditor challenges and resolutions
- `processing_jobs`: Async queue status tracking for resilient processing

---

## 4. Multi-Stage Investigation Pipeline
1. **Stage A — Claim Parser:** Extracts stated rejection assertions, referenced clauses, dates, and asserted rationale from the manufacturer's denial communication.
2. **Stage B — Policy Analyst:** Analyzes the warranty policy to extract active coverage terms, explicit exclusions, and condition dependencies.
3. **Stage C — Evidence Analyst:** Extracts purchase date, model numbers, serial numbers, technician observations, and inspection caveats from invoices, photos, and service tickets.
4. **Stage D — Initial Investigator:** Synthesizes evidence against policy rules using deterministic date/logic validation to yield provisional findings.
5. **Stage E — Independent Red-Team Auditor:** Adversarial critic specifically tasked with uncovering unverified assumptions, date ambiguities, misread exclusions, or missing proof in the initial findings.
6. **Stage F — Final Reconciler:** Merges auditor critique with deterministic rules and verified provenance to output an objective investigation outcome: `SUPPORTED`, `CONTRADICTED`, or `INSUFFICIENT_EVIDENCE`.

