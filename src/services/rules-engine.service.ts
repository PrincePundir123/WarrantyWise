import { RuleLogicResult } from "@/types";

export interface DateExpiryCheckInput {
  purchaseDateStr: string | null | undefined;
  rejectionDateStr: string | null | undefined;
  durationMonths: number;
  endInclusive?: boolean;
}

export interface DateExpiryCheckResult {
  ruleId: string;
  ruleName: string;
  result: RuleLogicResult;
  computedExpiryDateStr: string | null;
  explanation: string;
  inputs: Record<string, any>;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function calculateWarrantyExpiry(
  purchaseDateStr: string,
  durationMonths: number,
  endInclusive: boolean = true
): Date {
  const [yearStr, monthStr, dayStr] = purchaseDateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // 0-indexed in JS
  const day = parseInt(dayStr, 10);

  const targetDate = new Date(Date.UTC(year, month, day));
  targetDate.setUTCMonth(targetDate.getUTCMonth() + durationMonths);

  // If boundary is inclusive (e.g. 1 year from Jan 10 is through Jan 10), keep it.
  // If exclusive, expiry occurs at the end of the previous day.
  if (!endInclusive) {
    targetDate.setUTCDate(targetDate.getUTCDate() - 1);
  }

  return targetDate;
}

export function evaluateWarrantyExpiryRule(
  input: DateExpiryCheckInput
): DateExpiryCheckResult {
  if (!input.purchaseDateStr || !input.rejectionDateStr) {
    return {
      ruleId: "rule-warranty-duration-calc",
      ruleName: "deterministic_warranty_expiry_check",
      result: "UNKNOWN",
      computedExpiryDateStr: null,
      explanation:
        "Insufficient date evidence: either purchase date or rejection notice date is missing.",
      inputs: input,
    };
  }

  try {
    const expiryDate = calculateWarrantyExpiry(
      input.purchaseDateStr,
      input.durationMonths,
      input.endInclusive ?? true
    );
    const computedExpiryStr = expiryDate.toISOString().split("T")[0];

    const rejectionDate = new Date(input.rejectionDateStr + "T00:00:00Z");

    // TRUE if claim rejection occurred WITHIN warranty period
    // FALSE if rejection occurred AFTER warranty expiry
    const isWithinWarranty = rejectionDate.getTime() <= expiryDate.getTime();

    return {
      ruleId: "rule-warranty-duration-calc",
      ruleName: "deterministic_warranty_expiry_check",
      result: isWithinWarranty ? "TRUE" : "FALSE",
      computedExpiryDateStr: computedExpiryStr,
      explanation: isWithinWarranty
        ? `The claim rejection date (${input.rejectionDateStr}) fell within the active warranty window (expires ${computedExpiryStr}). The product was legally under warranty.`
        : `The claim rejection date (${input.rejectionDateStr}) occurred after the computed warranty expiry date (${computedExpiryStr}).`,
      inputs: {
        ...input,
        computedExpiry: computedExpiryStr,
      },
    };
  } catch (err: any) {
    return {
      ruleId: "rule-warranty-duration-calc",
      ruleName: "deterministic_warranty_expiry_check",
      result: "UNKNOWN",
      computedExpiryDateStr: null,
      explanation: `Date evaluation failed due to invalid format: ${err.message}`,
      inputs: input,
    };
  }
}

export interface ExclusionEvaluationInput {
  exclusionName: string;
  isAssertedByManufacturer: boolean;
  technicianFindingType: "CONFIRMED" | "SUSPECTED" | "ABSENT";
  requiresCausationEvidence: boolean;
  hasCausationProof: boolean;
}

export function evaluateExclusionRule(
  input: ExclusionEvaluationInput
): {
  result: RuleLogicResult;
  explanation: string;
} {
  if (!input.isAssertedByManufacturer) {
    return {
      result: "UNKNOWN",
      explanation: `Exclusion ${input.exclusionName} was not formally asserted by the manufacturer.`,
    };
  }

  if (input.technicianFindingType === "ABSENT") {
    return {
      result: "FALSE",
      explanation: `The manufacturer claimed ${input.exclusionName}, but no technician or photographic inspection evidence was provided.`,
    };
  }

  if (input.technicianFindingType === "SUSPECTED") {
    if (input.requiresCausationEvidence && !input.hasCausationProof) {
      return {
        result: "FALSE",
        explanation: `Technician merely noted '${input.exclusionName}' as suspected without diagnostic causation evidence or physical proof. Under policy rules, unconfirmed suspicion does not meet the burden of exclusion.`,
      };
    }
    return {
      result: "UNKNOWN",
      explanation: `Inspection report lists '${input.exclusionName}' as suspected, but lacks definitive diagnostic confirmation.`,
    };
  }

  return {
    result: "TRUE",
    explanation: `Technician report and physical evidence confirm '${input.exclusionName}' with causation verified.`,
  };
}

