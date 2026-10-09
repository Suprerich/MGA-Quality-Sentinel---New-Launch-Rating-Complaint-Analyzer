export type PlatformKey = 'WMUS' | 'WMCA' | 'AMZUS' | 'AMZCA' | 'TARGET' | 'COSTCOUS' | 'COSTCOCA';

export interface PlatformInfo {
  key: PlatformKey;
  name: string;
  country: 'US' | 'CA';
  domain: string;
  currency: string;
}

export const PLATFORMS: Record<PlatformKey, PlatformInfo> = {
  WMUS: { key: 'WMUS', name: 'Walmart US', country: 'US', domain: 'walmart.com', currency: 'USD' },
  WMCA: { key: 'WMCA', name: 'Walmart CA', country: 'CA', domain: 'walmart.ca', currency: 'CAD' },
  AMZUS: { key: 'AMZUS', name: 'Amazon US', country: 'US', domain: 'amazon.com', currency: 'USD' },
  AMZCA: { key: 'AMZCA', name: 'Amazon CA', country: 'CA', domain: 'amazon.ca', currency: 'CAD' },
  TARGET: { key: 'TARGET', name: 'Target US', country: 'US', domain: 'target.com', currency: 'USD' },
  COSTCOUS: { key: 'COSTCOUS', name: 'Costco US', country: 'US', domain: 'costco.com', currency: 'USD' },
  COSTCOCA: { key: 'COSTCOCA', name: 'Costco CA', country: 'CA', domain: 'costco.ca', currency: 'CAD' },
};

export type DefectSeverity = 'Critical' | 'Major' | 'Minor';

export type DefectCategory =
  | 'Safety'
  | 'Function issue'
  | 'Missing parts'
  | 'Damage'
  | 'Quality'
  | 'Packaging'
  | 'Assembly / Instruction'
  | 'Size / Appearance mismatch'
  | 'Delivery'
  | 'Value'
  | 'Other';

export interface TaxonomyRule {
  issue: DefectCategory;
  severity: DefectSeverity;
  words: string[];
  description: string;
}

export type Sentiment = 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE';

export interface ReviewItem {
  id: string;
  rating: number; // 1-5
  author: string;
  date: string;
  title?: string;
  comment: string;
  sentiment: Sentiment;
  issueType: DefectCategory;
  severity: DefectSeverity;
  keywords: string[];
  verifiedPurchase?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  series?: string;
  upc: string;
  model: string;
  isNewLaunch: boolean;
  launchDate?: string;
  countryOfOrigin: string;
  platform: PlatformKey;
  platformId: string; // WM#, TCIN, ASIN, Costco Item #
  url: string;
  rating: number; // e.g. 2.4
  reviewCount: number;
  lastCheckedAt: string;
  status: 'ALERT' | 'OK' | 'NEED MANUAL CHECK';
  mainIssue: DefectCategory;
  issueBreakdown: Record<string, number>;
  issueBreakdownText: string;
  reviews: ReviewItem[];
  ratingHistory: { date: string; rating: number; count: number }[];
}

export interface WatchlistSKU {
  id: string;
  name: string;
  upc: string;
  model: string;
  wm: string;
  tcin: string;
  asin: string;
  costco: string;
  brand?: string;
  isNewLaunch: boolean;
  notes?: string;
  addedAt: string;
}

export interface InspectionScheduleConfig {
  enabled: boolean;
  intervalMinutes: number; // e.g. 360 (6 hours), 1440 (24 hours)
  threshold: number; // default 3.0
  lastRunAt: string | null;
  nextRunAt: string | null;
  emailAlertEnabled: boolean;
  recipientEmail: string;
}

export interface InspectionRunLog {
  id: string;
  runAt: string;
  durationMs: number;
  totalProductsScanned: number;
  lowRatingAlertsCount: number; // < threshold
  criticalSafetyCount: number;
  platformsScanned: PlatformKey[];
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  summaryMessage: string;
}

export interface SlideData {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  speakerNotes: string;
  steps: {
    badge: string;
    heading: string;
    detail: string;
    metric?: { label: string; value: string };
  }[];
  category: 'vision' | 'challenge' | 'matrix' | 'threshold' | 'voc' | 'schedule' | 'deliverable' | 'future';
}
