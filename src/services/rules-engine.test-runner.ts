import {
  calculateWarrantyExpiry,
  evaluateWarrantyExpiryRule,
  evaluateExclusionRule,
  isLeapYear,
} from "./rules-engine.service";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST FAILED: ${message}`);
  }
}

console.log("=== RUNNING DETERMINISTIC RULES ENGINE TEST SUITE ===");

// 1. Leap Year Test
assert(isLeapYear(2024) === true, "2024 should be a leap year");
assert(isLeapYear(2025) === false, "2025 should not be a leap year");
assert(isLeapYear(2000) === true, "2000 should be a leap year");
assert(isLeapYear(1900) === false, "1900 should not be a leap year");
console.log("✓ Leap Year tests passed.");

// 2. Warranty Expiry Calculations
const expiryInclusive = calculateWarrantyExpiry("2025-01-10", 12, true);
assert(
  expiryInclusive.toISOString().split("T")[0] === "2026-01-10",
  "12 months from 2025-01-10 inclusive should be 2026-01-10"
);

const expiryExclusive = calculateWarrantyExpiry("2025-01-10", 12, false);
assert(
  expiryExclusive.toISOString().split("T")[0] === "2026-01-09",
  "12 months from 2025-01-10 exclusive should be 2026-01-09"
);
console.log("✓ Date boundary math tests passed.");

// 3. 3-Valued Logic Expiry Rule Evaluation
const ruleTrue = evaluateWarrantyExpiryRule({
  purchaseDateStr: "2025-01-10",
  rejectionDateStr: "2025-12-20",
  durationMonths: 12,
  endInclusive: true,
});
assert(ruleTrue.result === "TRUE", "Should evaluate to TRUE when rejection is inside warranty window");

const ruleFalse = evaluateWarrantyExpiryRule({
  purchaseDateStr: "2024-01-10",
  rejectionDateStr: "2025-02-01",
  durationMonths: 12,
  endInclusive: true,
});
assert(ruleFalse.result === "FALSE", "Should evaluate to FALSE when rejection is after expiry");

const ruleUnknown = evaluateWarrantyExpiryRule({
  purchaseDateStr: null,
  rejectionDateStr: "2025-12-20",
  durationMonths: 12,
});
assert(ruleUnknown.result === "UNKNOWN", "Should evaluate to UNKNOWN when date is missing");
console.log("✓ 3-Valued logic evaluation tests passed.");

// 4. Exclusion Rule Evaluation
const exclusionUnsubstantiated = evaluateExclusionRule({
  exclusionName: "Liquid Damage",
  isAssertedByManufacturer: true,
  technicianFindingType: "SUSPECTED",
  requiresCausationEvidence: true,
  hasCausationProof: false,
});
assert(
  exclusionUnsubstantiated.result === "FALSE",
  "Should be FALSE when suspicion lacks required causation proof"
);

const exclusionVerified = evaluateExclusionRule({
  exclusionName: "Liquid Damage",
  isAssertedByManufacturer: true,
  technicianFindingType: "CONFIRMED",
  requiresCausationEvidence: true,
  hasCausationProof: true,
});
assert(
  exclusionVerified.result === "TRUE",
  "Should be TRUE when causation is confirmed"
);
console.log("✓ Exclusion burden of proof tests passed.");

console.log("\nALL 8 TESTS PASSED SUCCESSFULLY! (100% Deterministic Engine Accuracy)");
