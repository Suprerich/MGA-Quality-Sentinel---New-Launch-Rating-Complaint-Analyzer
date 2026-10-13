import React, { useState } from 'react';
import { Copy, Check, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { ProductItem, PlatformKey, PLATFORMS } from '../types/qa';
import { ExportService } from '../services/exportService';
import { generateKeyFindings } from '../services/taxonomy';
import { useTranslation } from '../i18n/LanguageContext';

interface CrossPlatformMatrixViewProps {
  products: ProductItem[];
  threshold: number;
  onSelectProduct: (product: ProductItem) => void;
}

export const CrossPlatformMatrixView: React.FC<CrossPlatformMatrixViewProps> = ({
  products,
  threshold,
  onSelectProduct
}) => {
  const { t, format, language } = useTranslation();
  const [onlyBelow, setOnlyBelow] = useState(false);
  const [copied, setCopied] = useState(false);

  const platKeys: PlatformKey[] = ['WMUS', 'WMCA', 'AMZUS', 'AMZCA', 'TARGET', 'COSTCOUS', 'COSTCOCA'];

  const groupsMap = new Map<string, {
    name: string;
    upc: string;
    model: string;
    brand: string;
    isNewLaunch: boolean;
    platforms: Partial<Record<PlatformKey, ProductItem>>;
  }>();

  for (const p of products) {
    const key = p.upc || p.name;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        name: p.name,
        upc: p.upc,
        model: p.model,
        brand: p.brand,
        isNewLaunch: p.isNewLaunch,
        platforms: {}
      });
    }
    groupsMap.get(key)!.platforms[p.platform] = p;
  }

  const allGroups = Array.from(groupsMap.values());

  const displayedGroups = allGroups.filter(g => {
    if (!onlyBelow) return true;
    return platKeys.some(k => {
      const p = g.platforms[k];
      return p && p.rating < threshold;
    });
  });

  const handleCopyEmail = () => {
    const html = ExportService.buildEmailTableHtml(products, threshold, language);
    const plainText = products
      .map(p => `${p.name}\t${p.platform}\t${p.rating}\t${p.reviewCount}`)
      .join('\n');

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' })
          })
        ]).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
      } else {
        navigator.clipboard.writeText(plainText).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
      }
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-0">
      {/* Header Toolbar */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-slate-900">
            {t.matrixTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.matrixSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyBelow}
              onChange={(e) => setOnlyBelow(e.target.checked)}
              className="rounded-none text-slate-900 focus:ring-slate-900"
            />
            <span>{format(t.matrixOnlyBelow, { t: threshold.toFixed(1) })}</span>
          </label>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-colors cursor-pointer"
            title="Outlook HTML"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 text-slate-600 fill-slate-200" />}
            <span>{copied ? t.btnCopiedEmail : t.btnCopyEmail}</span>
          </button>

          <button
            onClick={() => ExportService.exportFullExcel(products, threshold, 'MGA_Cross_Platform_Matrix', language)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            <span>{t.btnExportMatrixExcel}</span>
          </button>
        </div>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-slate-500 font-medium">
              <th className="py-3 px-5 w-72">{t.thProduct}</th>
              <th className="py-3 px-3 w-28 font-mono">{t.thUpcModel}</th>
              <th className="py-3 px-2 text-center w-24">Walmart US</th>
              <th className="py-3 px-2 text-center w-24">Walmart CA</th>
              <th className="py-3 px-2 text-center w-24">Amazon US</th>
              <th className="py-3 px-2 text-center w-24">Amazon CA</th>
              <th className="py-3 px-2 text-center w-24">Target</th>
              <th className="py-3 px-2 text-center w-24">Costco US</th>
              <th className="py-3 px-2 text-center w-24">Costco CA</th>
              <th className="py-3 px-4 text-center w-28">{format(t.thBelowCount, { t: threshold.toFixed(1) })}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedGroups.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400 font-light">
                  {t.noMatchingProducts}
                </td>
              </tr>
            ) : (
              displayedGroups.map((g) => {
                let belowCount = 0;
                platKeys.forEach(k => {
                  const p = g.platforms[k];
                  if (p && p.rating < threshold) belowCount++;
                });

                return (
                  <tr key={g.name} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-slate-900">
                      <div className="relative inline-flex items-start">
                        {g.isNewLaunch && (
                          <sup className="text-[9.5px] font-bold text-[#F37021] select-none leading-none mr-1 -top-0.5 relative tracking-tight shrink-0">
                            {t.tagNewLaunch}
                          </sup>
                        )}
                        <span className="truncate max-w-[280px] font-medium" title={g.name}>
                          {g.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                        {g.brand || 'MGA'} {g.model ? `· ${g.model}` : ''}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-slate-500 tabular-nums">
                      {g.upc || g.model || '-'}
                    </td>

                    {platKeys.map((k) => {
                      const p = g.platforms[k];
                      if (!p || p.rating === null || p.rating === undefined) {
                        return (
                          <td key={k} className="py-3.5 px-2 text-center text-slate-300 font-light">
                            —
                          </td>
                        );
                      }

                      const isBelow = p.rating < threshold;
                      return (
                        <td
                          key={k}
                          onClick={() => onSelectProduct(p)}
                          className="py-3.5 px-2 text-center tabular-nums cursor-pointer group"
                        >
                          <div className="inline-flex flex-col items-center justify-center transition-all">
                            <span
                              className={`text-xs font-mono ${
                                isBelow
                                  ? 'text-rose-600 font-bold'
                                  : 'text-[#0071e3] font-semibold'
                              }`}
                            >
                              {p.rating.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({p.reviewCount})
                            </span>
                          </div>
                        </td>
                      );
                    })}

                    <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                      <span
                        className={`inline-block text-xs font-semibold ${
                          belowCount > 0
                            ? 'text-rose-600 font-bold'
                            : 'text-[#0071e3]'
                        }`}
                      >
                        {belowCount}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Key Findings Section - Apple Editorial Card */}
      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-900">
          <AlertCircle className="w-4 h-4 text-amber-600 fill-amber-100" />
          <span>{t.keyFindingsTitle}</span>
        </div>
        <div className="space-y-2.5">
          {displayedGroups.map((g) => {
            const platformRatings: { platformName: string; rating: number }[] = [];
            const allReviews: any[] = [];

            platKeys.forEach(k => {
              const p = g.platforms[k];
              if (p) {
                platformRatings.push({ platformName: PLATFORMS[k].name, rating: p.rating });
                allReviews.push(...p.reviews);
              }
            });

            const findingText = generateKeyFindings(g.name, threshold, platformRatings, allReviews, language);
            const hasAlert = platformRatings.some(p => p.rating < threshold);

            if (onlyBelow && !hasAlert) return null;

            return (
              <div
                key={g.name}
                className={`text-xs p-4 rounded-2xl border leading-relaxed ${
                  hasAlert
                    ? 'bg-white border-rose-200/80 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                    : 'bg-white border-slate-200/60 text-slate-600'
                }`}
              >
                {findingText}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
