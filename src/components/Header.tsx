import React, { useState } from 'react';
import { Play, Download, PlusCircle, Globe, FolderDown, Tv } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Mgalogo } from './Mgalogo';
import { DownloadPackageModal } from './DownloadPackageModal';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRunInspection: () => void;
  onExportExcel: () => void;
  onOpenWatchlist: () => void;
  onOpenPresentation?: () => void;
  isInspecting: boolean;
  alertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunInspection,
  onExportExcel,
  onOpenWatchlist,
  onOpenPresentation,
  isInspecting,
  alertCount
}) => {
  const { language, setLanguage, t } = useTranslation();
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const navItems = [
    { id: 'overview', label: t.navOverview },
    { id: 'matrix', label: t.navMatrix },
    { id: 'products', label: t.navProducts },
    { id: 'trends', label: t.navTrends },
    { id: 'schedule', label: t.navSchedule },
    { id: 'presentation', label: t.navPresentation }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: MGA Logo + Subtitle */}
          <div className="flex items-center gap-3.5 shrink-0">
            <Mgalogo size="md" />

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold tracking-tight text-slate-900 leading-tight">
                {language === 'en-US'
                  ? 'MGA Quality Department'
                  : language === 'zh-TW'
                  ? 'MGA 質量合規部 (Quality Department)'
                  : 'MGA 质量合规部 (Quality Department)'}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                {t.appSubtitle}
              </span>
            </div>
          </div>

          {/* Zone 2: Apple-grade Minimalist Navigation (rounded-full) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.04)] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'overview' && alertCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] bg-rose-600 text-white rounded-full font-mono font-bold leading-tight">
                      {alertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language & Action Affordances (rounded-full & rounded-2xl) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100/80 border border-slate-200/60 rounded-full px-3 py-1 text-xs text-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-600 fill-slate-200" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-700 text-xs font-medium focus:outline-none cursor-pointer pr-1"
                aria-label="Language selection"
              >
                <option value="zh-CN">简中</option>
                <option value="zh-TW">繁中</option>
                <option value="en-US">English</option>
              </select>
            </div>

            <button
              onClick={onOpenWatchlist}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              title={t.btnWatchlist}
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-800 fill-slate-200" />
              <span>{t.btnWatchlist}</span>
            </button>

            <button
              onClick={() => {
                if (onOpenPresentation) {
                  onOpenPresentation();
                } else {
                  setActiveTab('presentation');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              title={t.btnKeynote}
            >
              <Tv className="w-3.5 h-3.5 text-slate-700" />
              <span>{t.btnKeynote}</span>
            </button>

            <button
              onClick={() => setShowDownloadModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-full transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              title={language === 'en-US' ? 'Download Project / Dist ZIP' : language === 'zh-TW' ? '下載項目檔案 / 部署包' : '下载项目文件 / 部署包'}
            >
              <FolderDown className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'en-US' ? 'Get Files (ZIP)' : language === 'zh-TW' ? '獲取檔案 (ZIP)' : '获取文件 (ZIP)'}</span>
            </button>

            <button
              onClick={onExportExcel}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              title={t.btnExportExcel}
            >
              <Download className="w-3.5 h-3.5 text-slate-800" />
              <span className="hidden sm:inline">{t.btnExportExcel}</span>
            </button>

            <button
              onClick={onRunInspection}
              disabled={isInspecting}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isInspecting
                  ? 'bg-slate-100 text-slate-400 cursor-wait'
                  : 'bg-slate-900 hover:bg-black text-white active:scale-[0.98]'
              }`}
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isInspecting ? 'animate-spin' : ''}`} />
              <span>{isInspecting ? t.btnInspecting : t.btnRunInspection}</span>
            </button>
          </div>
        </div>
      </div>

      <DownloadPackageModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </header>
  );
};
