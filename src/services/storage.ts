import { ProductItem, WatchlistSKU, InspectionScheduleConfig, InspectionRunLog } from '../types/qa';
import { INITIAL_PRODUCTS, INITIAL_WATCHLIST } from './mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'mga_qc_products_v2',
  WATCHLIST: 'mga_qc_watchlist_v2',
  SCHEDULE: 'mga_qc_schedule_v2',
  LOGS: 'mga_qc_logs_v2',
  THRESHOLD: 'mga_qc_threshold_v2'
};

const DEFAULT_SCHEDULE: InspectionScheduleConfig = {
  enabled: true,
  intervalMinutes: 720, // 12 hours
  threshold: 3.0,
  lastRunAt: '2026-10-08T14:30:00Z',
  nextRunAt: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
  emailAlertEnabled: true,
  recipientEmail: 'qa-compliance@mgae.com'
};

const DEFAULT_LOGS: InspectionRunLog[] = [
  {
    id: 'log-1003',
    runAt: '2026-10-08T14:30:00Z',
    durationMs: 4210,
    totalProductsScanned: 11,
    lowRatingAlertsCount: 6,
    criticalSafetyCount: 1,
    platformsScanned: ['WMUS', 'WMCA', 'AMZUS', 'AMZCA', 'TARGET', 'COSTCOUS', 'COSTCOCA'],
    status: 'SUCCESS',
    summaryMessage: '巡检完成：共核查 11 个渠道商品，发现 6 个商品评分低于 3.0 警戒线，捕捉到 1 起安全隐患（Little Tikes 电池过热）。'
  },
  {
    id: 'log-1002',
    runAt: '2026-10-07T14:30:00Z',
    durationMs: 3890,
    totalProductsScanned: 11,
    lowRatingAlertsCount: 5,
    criticalSafetyCount: 1,
    platformsScanned: ['WMUS', 'WMCA', 'AMZUS', 'AMZCA', 'TARGET'],
    status: 'SUCCESS',
    summaryMessage: '定时自动巡检：完成 11 款商品扫描，发现 5 款低于 3.0。'
  },
  {
    id: 'log-1001',
    runAt: '2026-10-06T14:30:00Z',
    durationMs: 4120,
    totalProductsScanned: 10,
    lowRatingAlertsCount: 4,
    criticalSafetyCount: 0,
    platformsScanned: ['WMUS', 'WMCA', 'AMZUS', 'TARGET'],
    status: 'SUCCESS',
    summaryMessage: '常规巡检完成：各渠道正常同步。'
  }
];

export class StorageService {
  static getProducts(): ProductItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load products from storage', e);
    }
    this.saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }

  static saveProducts(products: ProductItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }

  static getWatchlist(): WatchlistSKU[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load watchlist from storage', e);
    }
    this.saveWatchlist(INITIAL_WATCHLIST);
    return INITIAL_WATCHLIST;
  }

  static saveWatchlist(items: WatchlistSKU[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save watchlist', e);
    }
  }

  static getScheduleConfig(): InspectionScheduleConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load schedule from storage', e);
    }
    this.saveScheduleConfig(DEFAULT_SCHEDULE);
    return DEFAULT_SCHEDULE;
  }

  static saveScheduleConfig(config: InspectionScheduleConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save schedule', e);
    }
  }

  static getLogs(): InspectionRunLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load logs from storage', e);
    }
    this.saveLogs(DEFAULT_LOGS);
    return DEFAULT_LOGS;
  }

  static saveLogs(logs: InspectionRunLog[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save logs', e);
    }
  }

  static addLog(log: InspectionRunLog): void {
    const logs = this.getLogs();
    const updated = [log, ...logs].slice(0, 50); // Keep last 50 runs
    this.saveLogs(updated);
  }

  static resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.WATCHLIST);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
  }
}
