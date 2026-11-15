export interface ControlledTestCase {
  id: string;
  name: string;
  description: string;
  expectedConclusion: 'SUPPORTED' | 'CONTRADICTED' | 'INSUFFICIENT_EVIDENCE';
  product: {
    name: string;
    manufacturer: string;
    model: string;
    serial: string;
    purchaseDate: string | null;
    country: string;
  };
  rejection: {
    claimReference: string;
    date: string | null;
    statedReason: string;
  };
  policyDurationMonths: number;
  documents: {
    id: string;
    name: string;
    type: string;
    excerpt: string;
    page: number;
  }[];
  notes: string;
}

export const CONTROLLED_BENCHMARK_CASES: ControlledTestCase[] = [
  {
    id: "case-01-clear-contradiction-expiry",
    name: "Clear Expiry Contradiction",
    description: "Manufacturer claimed warranty expired on Jan 9, 2026, but purchase date was Jan 10, 2025 and claim was filed Dec 20, 2025.",
    expectedConclusion: "CONTRADICTED",
    product: {
      name: "Front Load Washing Machine 9kg",
      manufacturer: "Example Appliances Corp",
      model: "WM-9000X",
      serial: "SN-EAC-2025-99812",
      purchaseDate: "2025-01-10",
      country: "United States",
    },
    rejection: {
      claimReference: "EAC-CLAIM-882194",
      date: "2025-12-20",
      statedReason: "Warranty period expired on Jan 9, 2026 prior to service booking.",
    },
    policyDurationMonths: 12,
    documents: [
      { id: "doc-1", name: "Invoice.pdf", type: "INVOICE", excerpt: "Invoice Date: 10 January 2025. Product: WM-9000X.", page: 1 },
      { id: "doc-2", name: "Policy.pdf", type: "WARRANTY_POLICY", excerpt: "Section 3.1: 12 months coverage commencing on purchase date.", page: 2 },
    ],
    notes: "Deterministic calendar calculation proves coverage until Jan 10, 2026.",
  },
  {
    id: "case-02-clearly-supported-expiry",
    name: "Clearly Supported Expiry Denial",
    description: "Customer purchased laptop on Feb 1, 2023 with 12 months warranty. Claim filed 25 months later on March 15, 2025.",
    expectedConclusion: "SUPPORTED",
    product: {
      name: "UltraBook Pro 14",
      manufacturer: "Apex Silicon",
      model: "UB-14-S",
      serial: "SN-APX-881920",
      purchaseDate: "2023-02-01",
      country: "United States",
    },
    rejection: {
      claimReference: "APX-DENIAL-1049",
      date: "2025-03-15",
      statedReason: "The 12-month standard warranty lapsed on Feb 1, 2024.",
    },
    policyDurationMonths: 12,
    documents: [
      { id: "doc-1", name: "Apex-Invoice.pdf", type: "INVOICE", excerpt: "Date of Purchase: Feb 1, 2023", page: 1 },
      { id: "doc-2", name: "Apex-Warranty.pdf", type: "WARRANTY_POLICY", excerpt: "Warranty Term: 1 year from original retail sale.", page: 1 },
    ],
    notes: "Denial is completely supported by documentary dates.",
  },
  {
    id: "case-03-missing-purchase-date",
    name: "Missing Purchase Date on Invoice",
    description: "Receipt is missing the printed purchase date stamp or is blurred beyond optical legibility.",
    expectedConclusion: "INSUFFICIENT_EVIDENCE",
    product: {
      name: "Cordless Stick Vacuum V11",
      manufacturer: "CleanPower",
      model: "CP-V11",
      serial: "SN-CP-4402",
      purchaseDate: null,
      country: "United States",
    },
    rejection: {
      claimReference: "CP-DISPUTE-09",
      date: "2025-06-12",
      statedReason: "Claim denied: Product is out of warranty period.",
    },
    policyDurationMonths: 24,
    documents: [
      { id: "doc-1", name: "Smudged-Receipt.pdf", type: "INVOICE", excerpt: "CleanPower Store #14 - Date: [UNREADABLE BLUR]", page: 1 },
    ],
    notes: "Three-valued logic engine must yield UNKNOWN and abstain from forced conclusion.",
  },
  {
    id: "case-04-unproven-liquid-damage",
    name: "Liquid Damage Exclusion Without Causation Proof",
    description: "Technician noted 'suspected moisture' externally but did not test internal sensor strips or prove liquid entered PCB.",
    expectedConclusion: "CONTRADICTED",
    product: {
      name: "OLED Gaming Monitor 34",
      manufacturer: "PixelVision",
      model: "PV-34-OLED",
      serial: "SN-PV-99120",
      purchaseDate: "2025-04-10",
      country: "United States",
    },
    rejection: {
      claimReference: "PV-REC-7712",
      date: "2025-09-02",
      statedReason: "Exclusion §4: Physical liquid contamination detected.",
    },
    policyDurationMonths: 24,
    documents: [
      { id: "doc-1", name: "ServiceReport.pdf", type: "SERVICE_REPORT", excerpt: "Moisture contact suspected externally; internal inspection not performed; strip test not done.", page: 1 },
      { id: "doc-2", name: "PixelVisionPolicy.pdf", type: "WARRANTY_POLICY", excerpt: "Section 4.1: Exclusion applies only where diagnostic causation proves liquid ingress.", page: 3 },
    ],
    notes: "Under Section 4.1, unverified suspicion fails the legal and evidentiary burden.",
  },
  {
    id: "case-05-conflicting-purchase-dates",
    name: "Conflicting Purchase Dates Across Documents",
    description: "Credit card receipt says 2024-03-01 but retail delivery docket says 2024-07-20.",
    expectedConclusion: "INSUFFICIENT_EVIDENCE",
    product: {
      name: "Smart Refrigerator TwinDoor",
      manufacturer: "NordicCool",
      model: "NC-FRIDGE-2",
      serial: "NC-SN-5521",
      purchaseDate: "2024-03-01",
      country: "United States",
    },
    rejection: {
      claimReference: "NC-CLM-119",
      date: "2025-05-10",
      statedReason: "12-month warranty expired based on March 1, 2024 order date.",
    },
    policyDurationMonths: 12,
    documents: [
      { id: "doc-1", name: "OrderConfirmation.pdf", type: "INVOICE", excerpt: "Order placed: March 1, 2024", page: 1 },
      { id: "doc-2", name: "DeliveryDocket.pdf", type: "INVOICE", excerpt: "Delivered & installed: July 20, 2024", page: 1 },
      { id: "doc-3", name: "Policy.pdf", type: "WARRANTY_POLICY", excerpt: "Section 2: Warranty commences on delivery for major freight appliances.", page: 1 },
    ],
    notes: "Requires review: start trigger ambiguity between purchase date and verified delivery date.",
  },
  {
    id: "case-06-mismatched-serial-number",
    name: "Serial Number Mismatch",
    description: "Invoice lists SN-998811, but denial cites inspection of SN-998812.",
    expectedConclusion: "CONTRADICTED",
    product: {
      name: "SoundBar Cinema 500",
      manufacturer: "Acoustix",
      model: "AX-500",
      serial: "SN-998811",
      purchaseDate: "2025-01-15",
      country: "United States",
    },
    rejection: {
      claimReference: "AX-REJ-401",
      date: "2025-06-01",
      statedReason: "Service depot inspected serial SN-998812 which had voided tamper seals.",
    },
    policyDurationMonths: 12,
    documents: [
      { id: "doc-1", name: "Invoice.pdf", type: "INVOICE", excerpt: "Serial: SN-998811", page: 1 },
      { id: "doc-2", name: "DepotReport.pdf", type: "SERVICE_REPORT", excerpt: "Serial logged at bench: SN-998812. Tamper seal damaged.", page: 1 },
    ],
    notes: "Depot examined the wrong physical unit or transcribed an incorrect serial number.",
  },
  {
    id: "case-07-ambiguous-wear-and-tear",
    name: "Ambiguous Wear and Tear Clause",
    description: "Mechanical motor bearing failure rejected as 'normal cosmetic wear and tear'.",
    expectedConclusion: "CONTRADICTED",
    product: {
      name: "Electric Lawn Mower 40V",
      manufacturer: "GreenYard",
      model: "GY-40V-PRO",
      serial: "GY-88129",
      purchaseDate: "2024-08-10",
      country: "United States",
    },
    rejection: {
      claimReference: "GY-CLM-672",
      date: "2025-05-10",
      statedReason: "Motor bearing seizure classified under Section 5 as normal wear and tear.",
    },
    policyDurationMonths: 24,
    documents: [
      { id: "doc-1", name: "Policy.pdf", type: "WARRANTY_POLICY", excerpt: "Section 5: Excludes blades, tires, and exterior cosmetic wear. Internal motors carry full 24-month protection.", page: 4 },
    ],
    notes: "Policy explicitly exempts internal electric motors from the wear-and-tear exclusion.",
  },
  {
    id: "case-08-unauthorized-service-allegation",
    name: "Unsubstantiated Unauthorized Service Allegation",
    description: "Manufacturer alleges third-party opened the device, but technician confirms factory adhesive seals were intact.",
    expectedConclusion: "CONTRADICTED",
    product: {
      name: "Drone Quadcopter Pro",
      manufacturer: "SkyNav",
      model: "SN-DRONE-4",
      serial: "SK-9012",
      purchaseDate: "2025-02-14",
      country: "United States",
    },
    rejection: {
      claimReference: "SN-DEN-3301",
      date: "2025-07-15",
      statedReason: "Voided due to unauthorized repair attempt.",
    },
    policyDurationMonths: 12,
    documents: [
      { id: "doc-1", name: "FieldInspection.pdf", type: "SERVICE_REPORT", excerpt: "Factory tamper stickers 100% intact. Screws show zero tool marks.", page: 1 },
    ],
    notes: "Technician's own physical inspection excerpt directly disproves the manufacturer's denial assertion.",
  },
  {
    id: "case-09-leap-year-boundary-condition",
    name: "Leap Year Leap-Day Boundary Condition",
    description: "Purchased on Feb 29, 2024 (leap year). Policy provides 12 months. Disputed whether expiry is Feb 28, 2025 or March 1, 2025.",
    expectedConclusion: "SUPPORTED",
    product: {
      name: "Mirrorless Camera Body",
      manufacturer: "FotoOptics",
      model: "FO-CAM-X",
      serial: "FO-88712",
      purchaseDate: "2024-02-29",
      country: "United States",
    },
    rejection: {
      claimReference: "FO-DISP-001",
      date: "2025-03-05",
      statedReason: "Warranty expired at the conclusion of February 2025.",
    },
    policyDurationMonths: 12,
    documents: [
      { id: "doc-1", name: "Invoice.pdf", type: "INVOICE", excerpt: "Date of Sale: February 29, 2024", page: 1 },
      { id: "doc-2", name: "Policy.pdf", type: "WARRANTY_POLICY", excerpt: "Coverage is for 1 calendar year.", page: 1 },
    ],
    notes: "Even extending through March 1, claim filed on March 5 is out of coverage.",
  },
  {
    id: "case-10-total-absence-of-policy-document",
    name: "Total Absence of Warranty Policy Document",
    description: "Invoice and rejection letter provided, but warranty policy document was never uploaded.",
    expectedConclusion: "INSUFFICIENT_EVIDENCE",
    product: {
      name: "Espresso Maker Supreme",
      manufacturer: "BaristaCraft",
      model: "BC-900",
      serial: "BC-3391",
      purchaseDate: "2024-11-20",
      country: "United States",
    },
    rejection: {
      claimReference: "BC-REJ-881",
      date: "2025-04-10",
      statedReason: "Heating thermoblock is limited to 90 days coverage under commercial policy.",
    },
    policyDurationMonths: 12, // Not verified in documents
    documents: [
      { id: "doc-1", name: "Invoice.pdf", type: "INVOICE", excerpt: "Purchased Nov 20, 2024", page: 1 },
      { id: "doc-2", name: "Rejection.pdf", type: "REJECTION_EMAIL", excerpt: "Heating elements carry 90 days only.", page: 1 },
    ],
    notes: "Cannot evaluate whether 90-day thermoblock clause exists without the original policy document.",
  },
];
