import React, { useState } from 'react';
import { X, FileSpreadsheet, Download, Check, Copy } from 'lucide-react';
import { ProductItem } from '../types/qa';
import { ExportService } from '../services/exportService';
import { useTranslation } from '../i18n/LanguageContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  threshold: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  products,
  threshold
}) => {
  const { t, format, language } = useTranslation();
  if (!isOpen) return null;

  const [onlyBelow, setOnlyBelow] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const targetProducts = onlyBelow ? products.filter(p => p.rating < threshold) : products;

  const handleDownloadExcel = () => {
    ExportService.exportFullExcel(targetProducts, threshold, 'MGA_Quality_Compliance_Report', language);
    onClose();
  };

  const handleCopyEmail = () => {
    const html = ExportService.buildEmailTableHtml(targetProducts, threshold, language);
    const plain = targetProducts.map(p => `${p.name}\t${p.platform}\t${p.rating}`).join('\n');

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plain], { type: 'text/plain' })
          })
        ]).then(() => {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        });
      } else {
        navigator.clipboard.writeText(plain).then(() => {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
              <FileSpreadsheet className="w-5 h-5 fill-white text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-slate-900">
                {t.exportModalTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.exportModalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* Options */}
          <div className="space-y-3">
            <label className="font-semibold text-slate-900 block">{t.exportScopeLabel}</label>

            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="radio"
                  name="scope"
                  checked={!onlyBelow}
                  onChange={() => setOnlyBelow(false)}
                  className="rounded-none text-slate-900 focus:ring-slate-900"
                />
                <span>{format(t.exportAllScope, { n: products.length })}</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="radio"
                  name="scope"
                  checked={onlyBelow}
                  onChange={() => setOnlyBelow(true)}
                  className="rounded-none text-rose-600 focus:ring-rose-600"
                />
                <span className="font-medium text-rose-700">
                  {format(t.exportAlertScope, {
                    t: threshold.toFixed(1),
                    n: products.filter(p => p.rating < threshold).length
                  })}
                </span>
              </label>
            </div>
          </div>

          {/* Included Sheets Preview */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/70 space-y-2.5">
            <div className="font-semibold text-slate-900">
              {t.exportIncludedSheets}
            </div>
            <ul className="space-y-1.5 text-slate-600 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t.sheet1Desc}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t.sheet2Desc}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t.sheet3Desc}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t.sheet4Desc}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-colors cursor-pointer shadow-2xs"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 text-slate-600 fill-slate-200" />}
            <span>{copiedEmail ? t.btnCopiedEmail : t.btnCopyEmailWeekly}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            >
              {t.btnCancel}
            </button>
            <button
              onClick={handleDownloadExcel}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 fill-white text-white" />
              <span>{t.btnDownloadExcel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
