import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { CrossPlatformMatrixView } from './components/CrossPlatformMatrixView';
import { ProductListTable } from './components/ProductListTable';
import { TrendTrackingView } from './components/TrendTrackingView';
import { SchedulePanel } from './components/SchedulePanel';
import { ComplaintAnalysisModal } from './components/ComplaintAnalysisModal';
import { WatchlistManagerModal } from './components/WatchlistManagerModal';
import { InspectionRunnerModal } from './components/InspectionRunnerModal';
import { ExportModal } from './components/ExportModal';
import { KeynotePresentation } from './components/KeynotePresentation';

import { ProductItem, WatchlistSKU, InspectionScheduleConfig, InspectionRunLog } from './types/qa';
import { StorageService } from './services/storage';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { Mgalogo } from './components/Mgalogo';

function MainApp() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductItem[]>(() => StorageService.getProducts());
  const [watchlist, setWatchlist] = useState<WatchlistSKU[]>(() => StorageService.getWatchlist());
  const [schedule, setSchedule] = useState<InspectionScheduleConfig>(() => StorageService.getScheduleConfig());
  const [logs, setLogs] = useState<InspectionRunLog[]>(() => StorageService.getLogs());

  // Default threshold is 3.0 as specifically requested by user ("平均分低于三分的产品和评论")
  const [threshold, setThreshold] = useState<number>(3.0);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    StorageService.saveProducts(products);
  }, [products]);

  useEffect(() => {
    StorageService.saveWatchlist(watchlist);
  }, [watchlist]);

  useEffect(() => {
    StorageService.saveScheduleConfig(schedule);
  }, [schedule]);

  const alertCount = products.filter(p => p.rating < threshold).length;

  // Complete an inspection run
  const handleCompleteInspection = (updatedProducts: ProductItem[], newLog: InspectionRunLog) => {
    setProducts(updatedProducts);
    const newLogs = [newLog, ...logs];
    setLogs(newLogs);
    StorageService.saveLogs(newLogs);

    // Update schedule last & next run
    const nextRun = schedule.enabled
      ? new Date(Date.now() + schedule.intervalMinutes * 60 * 1000).toISOString()
      : null;
    const updatedSchedule = {
      ...schedule,
      lastRunAt: newLog.runAt,
      nextRunAt: nextRun
    };
    setSchedule(updatedSchedule);

    setIsInspectionModalOpen(false);
  };

  const handleSaveWatchlist = (items: WatchlistSKU[]) => {
    setWatchlist(items);
  };

  const handleSaveSchedule = (cfg: InspectionScheduleConfig) => {
    setSchedule(cfg);
    if (cfg.threshold) {
      setThreshold(cfg.threshold);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] flex flex-col font-sans selection:bg-slate-200">
      {/* Apple-grade Minimalist Top Header with MGA Logo */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunInspection={() => setIsInspectionModalOpen(true)}
        onExportExcel={() => setIsExportModalOpen(true)}
        onOpenWatchlist={() => setIsWatchlistModalOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        isInspecting={false}
        alertCount={alertCount}
      />

      {/* Main Content Viewport with Apple Breathing Room */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Dashboard */}
        <DashboardStats
          products={products}
          schedule={schedule}
          threshold={threshold}
          onSetThreshold={setThreshold}
          onFilterAlerts={() => setActiveTab('products')}
        />

        {/* Tab 1: Overview Dashboard (Matrix + Products) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <CrossPlatformMatrixView
              products={products}
              threshold={threshold}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-semibold tracking-tight text-slate-900">
                  {t.navProducts}
                </h3>
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                >
                  {t.clickRowHint} →
                </button>
              </div>
              <ProductListTable
                products={products}
                threshold={threshold}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Cross Platform Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <CrossPlatformMatrixView
              products={products}
              threshold={threshold}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {/* Tab 3: Detailed Product & Reviews Table */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <ProductListTable
              products={products}
              threshold={threshold}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {/* Tab 4: Trend Tracking */}
        {activeTab === 'trends' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <TrendTrackingView
              products={products}
              threshold={threshold}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {/* Tab 5: Scheduled Periodic Inspection */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <SchedulePanel
              schedule={schedule}
              onSaveSchedule={handleSaveSchedule}
              logs={logs}
              threshold={threshold}
            />
          </div>
        )}
      </main>

      {/* Quiet, Elegant Apple-Style Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mgalogo size="sm" />
            <span className="font-medium text-slate-600">{t.footerDept}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400">{t.footerCoverage}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{t.footerEngine}</span>
            <span className="text-slate-300">·</span>
            <span>{t.footerFormats}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ComplaintAnalysisModal
        product={selectedProduct}
        threshold={threshold}
        onClose={() => setSelectedProduct(null)}
      />

      <WatchlistManagerModal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        watchlist={watchlist}
        onSaveWatchlist={handleSaveWatchlist}
      />

      <InspectionRunnerModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
        products={products}
        threshold={threshold}
        onCompleteInspection={handleCompleteInspection}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        products={products}
        threshold={threshold}
      />

      <KeynotePresentation
        isOpen={isPresentationOpen || activeTab === 'presentation'}
        onClose={() => {
          setIsPresentationOpen(false);
          if (activeTab === 'presentation') {
            setActiveTab('overview');
          }
        }}
        products={products}
        schedule={schedule}
        logs={logs}
        threshold={threshold}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
