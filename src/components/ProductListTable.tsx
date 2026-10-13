import React, { useState } from 'react';
import { Search, ExternalLink, Filter, ArrowUpDown, Eye } from 'lucide-react';
import { ProductItem, PlatformKey, PLATFORMS, DefectCategory } from '../types/qa';
import { useTranslation } from '../i18n/LanguageContext';

interface ProductListTableProps {
  products: ProductItem[];
  threshold: number;
  onSelectProduct: (p: ProductItem) => void;
}

export const ProductListTable: React.FC<ProductListTableProps> = ({
  products,
  threshold,
  onSelectProduct
}) => {
  const { t, format } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedDefect, setSelectedDefect] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Filter products
  const filtered = products.filter(p => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.upc.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.platformId.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedPlatform !== 'ALL' && p.platform !== selectedPlatform) {
      return false;
    }

    if (selectedStatus === 'ALERT' && p.rating >= threshold) return false;
    if (selectedStatus === 'OK' && p.rating < threshold) return false;

    if (selectedDefect !== 'ALL' && p.mainIssue !== selectedDefect) return false;

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'rating') {
      return sortAsc ? a.rating - b.rating : b.rating - a.rating;
    }
    if (sortField === 'reviews') {
      return sortAsc ? a.reviewCount - b.reviewCount : b.reviewCount - a.reviewCount;
    }
    return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const toggleSort = (field: 'rating' | 'reviews' | 'name') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'rating');
    }
  };

  const defectCategories: DefectCategory[] = [
    'Safety',
    'Function issue',
    'Missing parts',
    'Damage',
    'Quality',
    'Packaging',
    'Assembly / Instruction',
    'Size / Appearance mismatch',
    'Value'
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Filtering Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-white space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar - Apple Style Rounded Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-100/70 border border-transparent rounded-full focus:bg-white focus:border-slate-300 focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Clean Segmented Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500 fill-slate-200" />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-slate-100/70 border-0 rounded-full px-3.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="ALL">{t.filterAllRetailers}</option>
                {Object.entries(PLATFORMS).map(([k, info]) => (
                  <option key={k} value={k}>
                    {info.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-100/70 border-0 rounded-full px-3.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">{t.filterAllStatus}</option>
              <option value="ALERT">{format(t.filterOnlyAlert, { t: threshold.toFixed(1) })}</option>
              <option value="OK">{format(t.filterOnlyOk, { t: threshold.toFixed(1) })}</option>
            </select>

            <select
              value={selectedDefect}
              onChange={(e) => setSelectedDefect(e.target.value)}
              className="bg-slate-100/70 border-0 rounded-full px-3.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">{t.filterAllDefects}</option>
              {defectCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>{format(t.foundRecords, { n: sorted.length })}</span>
          <span>{t.clickRowHint}</span>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/60 text-slate-500 font-medium">
              <th className="py-3 px-4 w-28">{t.thRetailer}</th>
              <th
                onClick={() => toggleSort('name')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>{t.thProduct}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 w-32 font-mono">UPC / ID</th>
              <th
                onClick={() => toggleSort('rating')}
                className="py-3 px-3 w-24 text-center cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{t.thAvgRating}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('reviews')}
                className="py-3 px-3 w-20 text-center cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{t.thReviewsCount}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 w-28 text-center">{t.thStatus}</th>
              <th className="py-3 px-4 w-40">{t.thMainDefect}</th>
              <th className="py-3 px-3 w-20 text-center">{t.thActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 font-light">
                  {t.noMatchingProducts}
                </td>
              </tr>
            ) : (
              sorted.map((p) => {
                const isAlert = p.rating < threshold;
                const platInfo = PLATFORMS[p.platform as PlatformKey] || { name: p.platform };

                return (
                  <tr
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                  >
                    {/* Retailer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {platInfo.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {p.countryOfOrigin}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="relative inline-flex items-start">
                        {p.isNewLaunch && (
                          <sup className="text-[9.5px] font-bold text-[#F37021] select-none leading-none mr-1 -top-0.5 relative tracking-tight shrink-0">
                            {t.tagNewLaunch}
                          </sup>
                        )}
                        <span className="font-medium text-slate-900 hover:text-[#F37021] transition-colors leading-snug">
                          {p.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                        {p.brand} {p.series ? `· ${p.series}` : ''}
                      </div>
                    </td>

                    {/* UPC & ID */}
                    <td className="py-3.5 px-3 font-mono text-slate-500 tabular-nums">
                      <div>{p.upc}</div>
                      <div className="text-[11px] text-slate-400">#{p.platformId}</div>
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-3 text-center tabular-nums">
                      <div
                        className={`text-sm font-mono ${
                          isAlert ? 'text-rose-600 font-bold' : 'text-[#0071e3] font-semibold'
                        }`}
                      >
                        {p.rating.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        / 5.0
                      </div>
                    </td>

                    {/* Review Count */}
                    <td className="py-3.5 px-3 text-center font-mono tabular-nums text-slate-600">
                      {p.reviewCount}
                    </td>

                    {/* Alert Status */}
                    <td className="py-3.5 px-3 text-center">
                      {isAlert ? (
                        <span className="inline-block text-xs font-semibold text-rose-600">
                          {format(t.statusAlert, { t: threshold.toFixed(1) })}
                        </span>
                      ) : (
                        <span className="inline-block text-xs font-semibold text-[#0071e3]">
                          {t.statusOk}
                        </span>
                      )}
                    </td>

                    {/* Main Issue */}
                    <td className="py-3.5 px-4">
                      <div
                        className={`font-semibold ${
                          p.mainIssue === 'Safety'
                            ? 'text-amber-700'
                            : isAlert
                            ? 'text-slate-800'
                            : 'text-slate-600'
                        }`}
                      >
                        {p.mainIssue}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[160px]" title={p.issueBreakdownText}>
                        {p.issueBreakdownText}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                          title="View reviews"
                        >
                          <Eye className="w-3.5 h-3.5 fill-slate-200 text-slate-600" />
                        </button>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                          title="Open retailer URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
