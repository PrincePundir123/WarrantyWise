export type CaseStatus =
  | 'DRAFT'
  | 'UPLOADING'
  | 'PROCESSING'
  | 'INVESTIGATING'
  | 'COMPLETED'
  | 'FAILED'
  | 'NEEDS_REVIEW';

export type InvestigationConclusion =
  | 'SUPPORTED'
  | 'CONTRADICTED'
  | 'INSUFFICIENT_EVIDENCE'
  | 'PENDING';

export type DocumentType =
  | 'INVOICE'
  | 'WARRANTY_POLICY'
  | 'REJECTION_EMAIL'
  | 'SERVICE_REPORT'
  | 'PRODUCT_PHOTO'
  | 'REPAIR_ESTIMATE'
  | 'OTHER';

export type ProcessingStatus =
  | 'QUEUED'
  | 'UPLOADING'
  | 'EXTRACTING'
  | 'CLASSIFYING'
  | 'COMPLETED'
  | 'FAILED'
  | 'NEEDS_REVIEW';

export type ClauseType =
  | 'COVERAGE'
  | 'EXCLUSION'
  | 'DURATION'
  | 'CONDITION'
  | 'CLAIM_PROCESS'
  | 'LIMITATION'
  | 'OTHER';

export type RuleType =
  | 'DURATION'
  | 'EXCLUSION'
  | 'COVERAGE_CONDITION'
  | 'CLAIM_DEADLINE'
  | 'PROOF_REQUIREMENT';

export type RuleLogicResult = 'TRUE' | 'FALSE' | 'UNKNOWN';

export type FindingClassification =
  | 'SUPPORTING'
  | 'CONTRADICTING'
  | 'MISSING_EVIDENCE'
  | 'AMBIGUOUS';

export type RelationshipType =
  | 'SUPPORTS'
  | 'CONTRADICTS'
  | 'DEPENDS_ON'
  | 'DERIVED_FROM'
  | 'MISSING';

export interface Profile {
  id: string;
  full_name: string | null;
  country: string | null;
  currency: string | null;
  created_at: string;
  updated_at: string;
}

export interface Case {
  id: string;
  user_id: string;
  title: string;
  product_name: string;
  manufacturer: string;
  product_category: string | null;
  model_number: string | null;
  serial_number: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  currency: string;
  country: string | null;
  claim_reference: string | null;
  rejection_date: string | null;
  rejection_reason: string;
  status: CaseStatus;
  final_conclusion: InvestigationConclusion;
  created_at: string;
  updated_at: string;
}

export interface DocumentItem {
  id: string;
  case_id: string;
  user_id: string;
  original_filename: string;
  storage_path: string;
  mime_type: string;
  file_size: number;
  document_type: DocumentType;
  processing_status: ProcessingStatus;
  page_count: number | null;
  checksum: string | null;
  error_message: string | null;
  uploaded_at: string;
  processed_at: string | null;
}

export interface ExtractedFact {
  id: string;
  case_id: string;
  document_id: string;
  fact_type: string;
  fact_key: string;
  fact_value: any;
  normalized_value: any;
  source_page: number | null;
  source_excerpt: string;
  source_location?: { x?: number; y?: number; w?: number; h?: number };
  extraction_confidence: number;
  verification_status: 'UNVERIFIED' | 'VERIFIED' | 'FLAGGED';
  created_at: string;
}

export interface PolicyClause {
  id: string;
  case_id: string;
  document_id: string;
  clause_reference: string;
  clause_title: string;
  clause_text: string;
  clause_type: ClauseType;
  conditions: any;
  source_page: number | null;
  source_excerpt: string;
  confidence: number;
  created_at: string;
}

export interface PolicyRule {
  id: string;
  case_id: string;
  policy_clause_id: string;
  rule_name: string;
  rule_type: RuleType;
  rule_definition: {
    start_event?: string;
    duration_months?: number;
    end_inclusive?: boolean;
    condition?: string;
    requires_causation_evidence?: boolean;
    [key: string]: any;
  };
  source_page: number | null;
  enabled: boolean;
  requires_human_review: boolean;
  created_at: string;
}

export interface EvidenceItem {
  id: string;
  case_id: string;
  document_id: string;
  extracted_fact_id?: string | null;
  evidence_type: string;
  title: string;
  description: string;
  source_page: number | null;
  source_excerpt: string;
  confidence: number;
  created_at: string;
}

export interface EvidenceRelationship {
  id: string;
  case_id: string;
  source_evidence_id: string;
  target_evidence_id: string;
  relationship_type: RelationshipType;
  explanation: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'DISPUTED';
  created_at: string;
}

export interface InvestigationRun {
  id: string;
  case_id: string;
  user_id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  current_stage: string;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
  model_name: string;
  created_at: string;
}

export interface FindingSource {
  id: string;
  finding_id: string;
  document_id: string;
  evidence_item_id?: string | null;
  policy_clause_id?: string | null;
  page_number: number | null;
  source_excerpt: string;
  source_role: 'SUPPORTING' | 'CONTRADICTING' | 'CONTEXT' | 'DEPENDENCY';
}

export interface InvestigationFinding {
  id: string;
  case_id: string;
  investigation_run_id: string;
  finding_type: FindingClassification;
  title: string;
  description: string;
  conclusion: InvestigationConclusion;
  severity: 'INFO' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  verification_status: 'CONFIRMED' | 'UNVERIFIED' | 'CONTESTED';
  sources?: FindingSource[];
  created_at: string;
}

export interface AuditResult {
  id: string;
  investigation_run_id: string;
  initial_finding_id: string;
  challenge_type: string;
  challenge_description: string;
  evidence_found: boolean;
  evidence_references: any;
  resolution: string;
  resolution_status: 'RESOLVED' | 'UNRESOLVED' | 'OVERTURNED';
  created_at: string;
}

export interface ProcessingJob {
  id: string;
  case_id: string;
  document_id: string | null;
  job_type: 'CLASSIFICATION' | 'EXTRACTION' | 'INVESTIGATION';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  attempts: number;
  progress: number;
  last_error: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

