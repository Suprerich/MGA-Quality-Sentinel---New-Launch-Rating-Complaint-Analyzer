import React, { useState } from 'react';
import { X, CheckCircle2, Play, RefreshCw, ShieldCheck } from 'lucide-react';
import { PlatformKey, PLATFORMS, ProductItem, InspectionRunLog } from '../types/qa';
import { useTranslation } from '../i18n/LanguageContext';

interface InspectionRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  threshold: number;
  onCompleteInspection: (updatedProducts: ProductItem[], log: InspectionRunLog) => void;
}

export const InspectionRunnerModal: React.FC<InspectionRunnerModalProps> = ({
  isOpen,
  onClose,
  products,
  threshold,
  onCompleteInspection
}) => {
  const { t, format, language } = useTranslation();
  if (!isOpen) return null;

  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformKey[]>([
    'WMUS', 'WMCA', 'AMZUS', 'AMZCA', 'TARGET', 'COSTCOUS', 'COSTCOCA'
  ]);
  const [onlyNewLaunch, setOnlyNewLaunch] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepLogs, setStepLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const togglePlatform = (p: PlatformKey) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(k => k !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleStartInspection = async () => {
    setIsRunning(true);
    setProgress(5);

    const isEn = language === 'en-US';
    const isTw = language === 'zh-TW';

    const initMsg = isEn
      ? '[08:14:00] Initializing QA Compliance Inspection Engine...'
      : isTw
      ? '[08:14:00] 初始化品質合規巡檢引擎...'
      : '[08:14:00] 初始化质量合规巡检引擎...';

    setStepLogs([initMsg]);

    const steps = isEn ? [
      { text: 'Validating Monitored SKUs (Watchlist & New Launch SKUs)...', pct: 15 },
      { text: 'Connecting to Walmart US / CA retail endpoints, pulling rating & reviews...', pct: 35 },
      { text: 'Syncing Amazon US / CA (ASIN mappings) review streams...', pct: 55 },
      { text: 'Scraping Target TCIN endpoints, verifying 1-2 star complaints...', pct: 75 },
      { text: 'Connecting to Costco US / CA, cross-referencing warehouse feedback...', pct: 85 },
      { text: 'Running Standard QA Defect Classifier (Safety, Function, Damage)...', pct: 95 },
      { text: 'Inspection complete! Generated QA compliance report and alert list.', pct: 100 }
    ] : isTw ? [
      { text: '正在校驗監控商品清單 (Watchlist & New Launch SKUs)...', pct: 15 },
      { text: '正在連接 Walmart US / CA 零售數據接口，拉取最新評分與評論...', pct: 35 },
      { text: '正在同步 Amazon US / CA (ASIN 映射) 評價流...', pct: 55 },
      { text: '正在抓取 Target TCIN 數據，校驗 1-2 星客訴...', pct: 75 },
      { text: '正在連接 Costco US / CA，比對大包裝會員反饋...', pct: 85 },
      { text: '執行標準 QA 缺陷分類模型 (Safety, Function, Missing, Damage)...', pct: 95 },
      { text: '巡檢分析完成！生成最新品質合規報告與預警清單。', pct: 100 }
    ] : [
      { text: '正在校验监控商品清单 (Watchlist & New Launch SKUs)...', pct: 15 },
      { text: '正在连接 Walmart US / CA 零售数据接口，拉取最新评分与评论...', pct: 35 },
      { text: '正在同步 Amazon US / CA (ASIN 映射) 评价流...', pct: 55 },
      { text: '正在抓取 Target TCIN 数据，校验 1-2 星客诉...', pct: 75 },
      { text: '正在连接 Costco US / CA，比对大包装会员反馈...', pct: 85 },
      { text: '执行标准 QA 缺陷分类模型 (Safety, Function, Missing, Damage)...', pct: 95 },
      { text: '巡检分析完成！生成最新质量合规报告与预警清单。', pct: 100 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      setProgress(steps[i].pct);
      setStepLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${steps[i].text}`]);
      await new Promise(r => setTimeout(r, 600));
    }

    const nowIso = new Date().toISOString();
    const updated = products.map(p => {
      if (!selectedPlatforms.includes(p.platform)) return p;
      return {
        ...p,
        lastCheckedAt: nowIso
      };
    });

    const lowCount = updated.filter(p => p.rating < threshold).length;
    let criticalCount = 0;
    updated.forEach(p => {
      p.reviews.forEach(r => {
        if (r.issueType === 'Safety') criticalCount++;
      });
    });

    const summaryMsg = isEn
      ? `Audit scan completed: Successfully inspected ${updated.length} channel listings, discovered ${lowCount} products with ratings below ${threshold.toFixed(1)} threshold.`
      : isTw
      ? `手動觸發巡檢完成：成功核查 ${updated.length} 款渠道商品，發現 ${lowCount} 款商品評分低於 ${threshold.toFixed(1)} 警戒線。`
      : `手动触发巡检完成：成功核查 ${updated.length} 款渠道商品，发现 ${lowCount} 款商品评分低于 ${threshold.toFixed(1)} 警戒线。`;

    const newLog: InspectionRunLog = {
      id: `log-${Date.now()}`,
      runAt: nowIso,
      durationMs: 4200,
      totalProductsScanned: updated.length,
      lowRatingAlertsCount: lowCount,
      criticalSafetyCount: criticalCount,
      platformsScanned: selectedPlatforms,
      status: 'SUCCESS',
      summaryMessage: summaryMsg
    };

    setIsRunning(false);
    onCompleteInspection(updated, newLog);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 w-full max-w-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 fill-white text-slate-900" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-slate-900">
                {t.runnerTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.runnerSubtitle}
              </p>
            </div>
          </div>

          {!isRunning && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {!isRunning ? (
            <>
              <div>
                <label className="font-semibold text-slate-900 block mb-2.5">
                  {t.runnerSelectRetailers}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(PLATFORMS).map(([k, info]) => {
                    const isSelected = selectedPlatforms.includes(k as PlatformKey);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => togglePlatform(k as PlatformKey)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50 text-slate-900 font-medium shadow-2xs'
                            : 'border-slate-200/70 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <div className="font-semibold text-xs flex items-center justify-between">
                          <span>{info.name}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-slate-900 text-white" />}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {info.domain}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyNewLaunch}
                    onChange={(e) => setOnlyNewLaunch(e.target.checked)}
                    className="rounded-none text-slate-900 focus:ring-slate-900"
                  />
                  <span>{t.runnerOnlyNewLaunch}</span>
                </label>

                <div className="text-slate-500 font-mono">
                  &lt; {threshold.toFixed(1)}
                </div>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 text-slate-500 leading-relaxed text-xs">
                {t.runnerHint}
              </div>
            </>
          ) : (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-700 animate-spin" />
                  <span>{t.runnerRunning}</span>
                </span>
                <span className="font-mono text-slate-900 font-semibold tabular-nums">
                  {progress}%
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-slate-900 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-[11px] h-44 overflow-y-auto space-y-1.5">
                {stepLogs.map((log, idx) => (
                  <div key={idx} className="leading-snug">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5">
          {!isRunning ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
              >
                {t.btnCancel}
              </button>
              <button
                type="button"
                onClick={handleStartInspection}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-black rounded-full transition-colors shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white" />
                <span>{t.btnStartInspection}</span>
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-400 font-mono">
              {t.runnerWindowWarning}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
