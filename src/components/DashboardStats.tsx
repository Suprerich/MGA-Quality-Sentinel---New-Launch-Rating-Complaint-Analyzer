import React from 'react';
import { AlertTriangle, Clock, Layers, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { ProductItem, InspectionScheduleConfig } from '../types/qa';
import { useTranslation } from '../i18n/LanguageContext';

interface DashboardStatsProps {
  products: ProductItem[];
  schedule: InspectionScheduleConfig;
  threshold: number;
  onSetThreshold: (t: number) => void;
  onFilterAlerts: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  products,
  schedule,
  threshold,
  onSetThreshold,
  onFilterAlerts
}) => {
  const { t, format } = useTranslation();
  const alertProducts = products.filter(p => p.rating < threshold);
  const totalReviews = products.reduce((acc, p) => acc + p.reviewCount, 0);

  const uniqueSKUs = new Set(products.map(p => p.upc || p.name)).size;

  let safetyIssuesCount = 0;
  products.forEach(p => {
    p.reviews.forEach(r => {
      if (r.issueType === 'Safety') safetyIssuesCount++;
    });
  });

  const nextRunText = schedule.nextRunAt
    ? new Date(schedule.nextRunAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '-';

  return (
    <div className="space-y-4">
      {/* Top Filter Bar - Apple Minimalist Segmented Surface (rounded-2xl and rounded-full) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 sm:px-5 sm:py-3.5 rounded-2xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">
            {t.alertThresholdLabel}
          </span>
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-full">
            {[2.5, 3.0, 3.5, 4.0].map((val) => (
              <button
                key={val}
                onClick={() => onSetThreshold(val)}
                className={`px-3.5 py-1 text-xs rounded-full transition-all tabular-nums cursor-pointer ${
                  threshold === val
                    ? 'bg-white text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                &lt; {val.toFixed(1)}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 hidden lg:inline">
            {format(t.alertThresholdDesc, { t: threshold.toFixed(1) })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-500 fill-slate-100" />
          <span>{format(t.inspectPeriodLabel, { h: (schedule.intervalMinutes / 60).toFixed(0) })}</span>
          <span className="text-slate-300">·</span>
          <span>{t.nextRunLabel} <strong className="text-slate-800 font-mono tabular-nums">{nextRunText}</strong></span>
        </div>
      </div>

      {/* KPI Cards Grid - Apple Clean Cards with 24px Radius (rounded-3xl) and Solid Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Low-Rating Alerts */}
        <div 
          onClick={onFilterAlerts}
          className="bg-white p-6 rounded-3xl border border-slate-200/70 hover:border-slate-300 transition-all cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium tracking-wide">
              {format(t.statBelowThreshold, { t: threshold.toFixed(1) })}
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-600 fill-rose-100" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-semibold tracking-tight font-mono tabular-nums ${
              alertProducts.length > 0 ? 'text-rose-600' : 'text-slate-900'
            }`}>
              {alertProducts.length}
            </span>
            <span className="text-xs text-slate-400">
              {format(t.statBelowThresholdSub, { total: products.length })}
            </span>
          </div>
          <div className="mt-2.5 text-xs text-slate-500 flex items-center justify-between">
            <span className={alertProducts.length > 0 ? 'text-rose-600 font-medium' : 'text-emerald-700'}>
              {alertProducts.length > 0 ? t.statBelowThresholdUrgent : t.statBelowThresholdOk}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

        {/* KPI 2: Safety Concerns */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium tracking-wide">{t.statSafetyTitle}</span>
            <ShieldAlert className="w-4 h-4 text-amber-600 fill-amber-100" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-slate-900 font-mono tabular-nums">
              {safetyIssuesCount}
            </span>
            <span className="text-xs text-slate-400">{t.statSafetySub}</span>
          </div>
          <div className="mt-2.5 text-xs text-slate-500 truncate" title={t.statSafetyDesc}>
            {t.statSafetyDesc}
          </div>
        </div>

        {/* KPI 3: Monitored SKUs */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium tracking-wide">{t.statSkusTitle}</span>
            <Layers className="w-4 h-4 text-slate-700 fill-slate-200" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-slate-900 font-mono tabular-nums">
              {uniqueSKUs}
            </span>
            <span className="text-xs text-slate-400">{t.statSkusSub}</span>
          </div>
          <div className="mt-2.5 text-xs text-slate-500">
            {t.statSkusDesc}
          </div>
        </div>

        {/* KPI 4: Total Reviews Scanned */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium tracking-wide">{t.statReviewsTitle}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-slate-900 font-mono tabular-nums">
              {totalReviews}
            </span>
            <span className="text-xs text-slate-400">{t.statReviewsSub}</span>
          </div>
          <div className="mt-2.5 text-xs text-slate-500">
            {t.statReviewsDesc}
          </div>
        </div>
      </div>
    </div>
  );
};
