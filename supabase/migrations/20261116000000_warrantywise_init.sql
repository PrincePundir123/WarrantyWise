-- WarrantyWise Database Schema Migration
-- Production-minded PostgreSQL schema for Supabase

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  country TEXT,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Cases Table
CREATE TABLE IF NOT EXISTS public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  product_name TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  product_category TEXT,
  model_number TEXT,
  serial_number TEXT,
  purchase_date DATE,
  purchase_price NUMERIC(12,2),
  currency TEXT DEFAULT 'USD',
  country TEXT,
  claim_reference TEXT,
  rejection_date DATE,
  rejection_reason TEXT NOT NULL,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'UPLOADING', 'PROCESSING', 'INVESTIGATING', 'COMPLETED', 'FAILED', 'NEEDS_REVIEW')),
  final_conclusion TEXT DEFAULT 'PENDING' CHECK (final_conclusion IN ('PENDING', 'SUPPORTED', 'CONTRADICTED', 'INSUFFICIENT_EVIDENCE')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  document_type TEXT DEFAULT 'OTHER' CHECK (document_type IN ('INVOICE', 'WARRANTY_POLICY', 'REJECTION_EMAIL', 'SERVICE_REPORT', 'PRODUCT_PHOTO', 'REPAIR_ESTIMATE', 'OTHER')),
  processing_status TEXT DEFAULT 'QUEUED' CHECK (processing_status IN ('QUEUED', 'UPLOADING', 'EXTRACTING', 'CLASSIFYING', 'COMPLETED', 'FAILED', 'NEEDS_REVIEW')),
  page_count INT,
  checksum TEXT,
  error_message TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- 4. Extracted Facts Table
CREATE TABLE IF NOT EXISTS public.extracted_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  fact_type TEXT NOT NULL,
  fact_key TEXT NOT NULL,
  fact_value JSONB NOT NULL,
  normalized_value JSONB,
  source_page INT,
  source_excerpt TEXT NOT NULL,
  source_location JSONB,
  extraction_confidence NUMERIC(4,3) DEFAULT 1.000,
  verification_status TEXT DEFAULT 'UNVERIFIED' CHECK (verification_status IN ('UNVERIFIED', 'VERIFIED', 'FLAGGED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Policy Clauses Table
CREATE TABLE IF NOT EXISTS public.policy_clauses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  clause_reference TEXT NOT NULL,
  clause_title TEXT NOT NULL,
  clause_text TEXT NOT NULL,
  clause_type TEXT DEFAULT 'OTHER' CHECK (clause_type IN ('COVERAGE', 'EXCLUSION', 'DURATION', 'CONDITION', 'CLAIM_PROCESS', 'LIMITATION', 'OTHER')),
  conditions JSONB DEFAULT '{}'::jsonb,
  source_page INT,
  source_excerpt TEXT NOT NULL,
  confidence NUMERIC(4,3) DEFAULT 1.000,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Policy Rules Table
CREATE TABLE IF NOT EXISTS public.policy_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  policy_clause_id UUID NOT NULL REFERENCES public.policy_clauses(id) ON DELETE CASCADE,
  rule_name TEXT NOT NULL,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('DURATION', 'EXCLUSION', 'COVERAGE_CONDITION', 'CLAIM_DEADLINE', 'PROOF_REQUIREMENT')),
  rule_definition JSONB NOT NULL,
  source_page INT,
  enabled BOOLEAN DEFAULT TRUE,
  requires_human_review BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Evidence Items Table
CREATE TABLE IF NOT EXISTS public.evidence_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  extracted_fact_id UUID REFERENCES public.extracted_facts(id) ON DELETE SET NULL,
  evidence_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  source_page INT,
  source_excerpt TEXT NOT NULL,
  confidence NUMERIC(4,3) DEFAULT 1.000,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Evidence Relationships Table
CREATE TABLE IF NOT EXISTS public.evidence_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  source_evidence_id UUID NOT NULL REFERENCES public.evidence_items(id) ON DELETE CASCADE,
  target_evidence_id UUID NOT NULL REFERENCES public.evidence_items(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('SUPPORTS', 'CONTRADICTS', 'DEPENDS_ON', 'DERIVED_FROM', 'MISSING')),
  explanation TEXT NOT NULL,
  verification_status TEXT DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'DISPUTED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Investigation Runs Table
CREATE TABLE IF NOT EXISTS public.investigation_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED')),
  current_stage TEXT DEFAULT 'INIT',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  model_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Investigation Findings Table
CREATE TABLE IF NOT EXISTS public.investigation_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  investigation_run_id UUID NOT NULL REFERENCES public.investigation_runs(id) ON DELETE CASCADE,
  finding_type TEXT NOT NULL CHECK (finding_type IN ('SUPPORTING', 'CONTRADICTING', 'MISSING_EVIDENCE', 'AMBIGUOUS')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  conclusion TEXT NOT NULL CHECK (conclusion IN ('SUPPORTED', 'CONTRADICTED', 'INSUFFICIENT_EVIDENCE', 'PENDING')),
  severity TEXT DEFAULT 'INFO' CHECK (severity IN ('INFO', 'MEDIUM', 'HIGH', 'CRITICAL')),
  confidence NUMERIC(4,3) DEFAULT 1.000,
  verification_status TEXT DEFAULT 'CONFIRMED' CHECK (verification_status IN ('CONFIRMED', 'UNVERIFIED', 'CONTESTED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Finding Sources Table
CREATE TABLE IF NOT EXISTS public.finding_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  finding_id UUID NOT NULL REFERENCES public.investigation_findings(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  evidence_item_id UUID REFERENCES public.evidence_items(id) ON DELETE SET NULL,
  policy_clause_id UUID REFERENCES public.policy_clauses(id) ON DELETE SET NULL,
  page_number INT,
  source_excerpt TEXT NOT NULL,
  source_role TEXT NOT NULL CHECK (source_role IN ('SUPPORTING', 'CONTRADICTING', 'CONTEXT', 'DEPENDENCY'))
);

-- 12. Audit Results (Red-Team Auditor) Table
CREATE TABLE IF NOT EXISTS public.audit_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investigation_run_id UUID NOT NULL REFERENCES public.investigation_runs(id) ON DELETE CASCADE,
  initial_finding_id UUID NOT NULL REFERENCES public.investigation_findings(id) ON DELETE CASCADE,
  challenge_type TEXT NOT NULL,
  challenge_description TEXT NOT NULL,
  evidence_found BOOLEAN DEFAULT FALSE,
  evidence_references JSONB DEFAULT '{}'::jsonb,
  resolution TEXT NOT NULL,
  resolution_status TEXT DEFAULT 'RESOLVED' CHECK (resolution_status IN ('RESOLVED', 'UNRESOLVED', 'OVERTURNED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Processing Jobs Table
CREATE TABLE IF NOT EXISTS public.processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('CLASSIFICATION', 'EXTRACTION', 'INVESTIGATION')),
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
  attempts INT DEFAULT 0,
  progress INT DEFAULT 0,
  last_error TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. User Activity Log Table
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extracted_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_clauses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investigation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investigation_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finding_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processing_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read and update their own profile
CREATE POLICY "Users can manage their own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);

-- Cases: Users can only see and manage their own cases
CREATE POLICY "Users can manage their own cases"
  ON public.cases FOR ALL
  USING (auth.uid() = user_id);

-- Documents: Users can only access documents linked to their own cases
CREATE POLICY "Users can manage their own documents"
  ON public.documents FOR ALL
  USING (auth.uid() = user_id);

-- Extracted facts, policy clauses, rules, evidence, runs, findings, audits:
CREATE POLICY "Users can view case extracted facts"
  ON public.extracted_facts FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = extracted_facts.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can view case policy clauses"
  ON public.policy_clauses FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = policy_clauses.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can view case policy rules"
  ON public.policy_rules FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = policy_rules.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can view case evidence items"
  ON public.evidence_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = evidence_items.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can view case evidence relationships"
  ON public.evidence_relationships FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = evidence_relationships.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can manage case investigation runs"
  ON public.investigation_runs FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view case investigation findings"
  ON public.investigation_findings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = investigation_findings.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can view finding sources"
  ON public.finding_sources FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.investigation_findings f
    JOIN public.cases c ON c.id = f.case_id
    WHERE f.id = finding_sources.finding_id AND c.user_id = auth.uid()
  ));

CREATE POLICY "Users can view audit results"
  ON public.audit_results FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.investigation_runs r
    WHERE r.id = audit_results.investigation_run_id AND r.user_id = auth.uid()
  ));

CREATE POLICY "Users can view case processing jobs"
  ON public.processing_jobs FOR ALL
  USING (EXISTS (SELECT 1 FROM public.cases WHERE cases.id = processing_jobs.case_id AND cases.user_id = auth.uid()));

CREATE POLICY "Users can view their activity"
  ON public.user_activity FOR ALL
  USING (auth.uid() = user_id);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_cases_user_id ON public.cases(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_case_id ON public.documents(case_id);
CREATE INDEX IF NOT EXISTS idx_extracted_facts_case_id ON public.extracted_facts(case_id);
CREATE INDEX IF NOT EXISTS idx_policy_clauses_case_id ON public.policy_clauses(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_case_id ON public.evidence_items(case_id);
CREATE INDEX IF NOT EXISTS idx_investigation_findings_case_id ON public.investigation_findings(case_id);

