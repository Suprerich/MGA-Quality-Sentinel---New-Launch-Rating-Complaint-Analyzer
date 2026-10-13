import React from 'react';
import { TrendingDown, TrendingUp, Minus, Download, History, AlertCircle } from 'lucide-react';
import { ProductItem, PLATFORMS } from '../types/qa';
import { useTranslation } from '../i18n/LanguageContext';

interface TrendTrackingViewProps {
  products: ProductItem[];
  threshold: number;
  onSelectProduct: (product: ProductItem) => void;
}

export const TrendTrackingView: React.FC<TrendTrackingViewProps> = ({
  products,
  threshold,
  onSelectProduct
}) => {
  const { t } = useTranslation();

  const getTrendDelta = (history: { date: string; rating: number }[]) => {
    if (!history || history.length < 2) return null;
    const first = history[0].rating;
    const last = history[history.length - 1].rating;
    return Number((last - first).toFixed(2));
  };

  const exportTrendCSV = () => {
    const rows = [['Product Name', 'Retailer', 'Date', 'Rating', 'Review Count', 'Status']];
    products.forEach(p => {
      (p.ratingHistory || []).forEach(h => {
        rows.push([
          p.name,
          PLATFORMS[p.platform]?.name || p.platform,
          h.date,
          h.rating.toString(),
          h.count.toString(),
          p.rating < threshold ? 'ALERT <3.0' : 'OK'
        ]);
      });
    });

    const csvContent = '\ufeff' + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MGA_Rating_Trend_History_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-0">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-700 fill-slate-200" />
            <span>{t.trendsTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.trendsSubtitle}
          </p>
        </div>

        <button
          onClick={exportTrendCSV}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-700 fill-slate-200" />
          <span>{t.btnExportTrendCsv}</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-slate-500 font-medium">
              <th className="py-3 px-4 w-64">{t.thProduct}</th>
              <th className="py-3 px-3 w-28">{t.thRetailer}</th>
              <th className="py-3 px-4">{t.thEvolution}</th>
              <th className="py-3 px-3 w-24 text-center">{t.thLatestRating}</th>
              <th className="py-3 px-3 w-28 text-center">{t.thTrendJudgment}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => {
              const history = p.ratingHistory || [];
              const delta = getTrendDelta(history);
              const isAlert = p.rating < threshold;
              const platInfo = PLATFORMS[p.platform] || { name: p.platform };

              return (
                <tr
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="hover:bg-slate-50/60 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div className="truncate max-w-[240px] font-medium" title={p.name}>
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      UPC: {p.upc} · #{p.platformId}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-slate-700 font-medium">
                    {platInfo.name}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {history.map((h, i) => {
                        const isBelow = h.rating < threshold;
                        return (
                          <React.Fragment key={h.date}>
                            <div className="flex flex-col items-center">
                              <span
                                className={`font-mono font-medium tabular-nums text-xs ${
                                  isBelow ? 'text-rose-600 font-bold' : 'text-slate-800'
                                }`}
                              >
                                {h.rating.toFixed(1)}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                {h.date.slice(5)}
                              </span>
                            </div>
                            {i < history.length - 1 && (
                              <span className="text-slate-300">→</span>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-center font-mono tabular-nums">
                    <span
                      className={`text-sm ${
                        isAlert ? 'text-rose-600 font-bold' : 'text-[#0071e3] font-medium'
                      }`}
                    >
                      {p.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      ({p.reviewCount})
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    {delta === null ? (
                      <span className="text-slate-300 font-mono text-[11px]">—</span>
                    ) : delta <= -0.2 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>▼ {delta}</span>
                      </span>
                    ) : delta >= 0.2 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>▲ +{delta}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                        <Minus className="w-3 h-3" />
                        <span>{delta >= 0 ? `+${delta}` : delta}</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-400 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
        <span>{t.trendsFooterNote}</span>
      </div>
    </div>
  );
};
