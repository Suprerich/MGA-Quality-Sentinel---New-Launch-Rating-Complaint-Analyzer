import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert, Wrench, Download, Star, ExternalLink, Sparkles } from 'lucide-react';
import { ProductItem, PLATFORMS } from '../types/qa';
import { ExportService } from '../services/exportService';
import { useTranslation } from '../i18n/LanguageContext';

interface ComplaintAnalysisModalProps {
  product: ProductItem | null;
  threshold: number;
  onClose: () => void;
}

export const ComplaintAnalysisModal: React.FC<ComplaintAnalysisModalProps> = ({
  product,
  threshold,
  onClose
}) => {
  const { t, format, language } = useTranslation();
  if (!product) return null;

  const [activeFilter, setActiveFilter] = useState<'ALL' | '1-2' | 'Safety' | 'Function'>('ALL');
  const isAlert = product.rating < threshold;
  const platInfo = PLATFORMS[product.platform] || { name: product.platform };

  const filteredReviews = product.reviews.filter(r => {
    if (activeFilter === '1-2') return r.rating <= 2;
    if (activeFilter === 'Safety') return r.issueType === 'Safety';
    if (activeFilter === 'Function') return r.issueType === 'Function issue';
    return true;
  });

  const issueCounts: Record<string, number> = {};
  product.reviews.forEach(r => {
    issueCounts[r.issueType] = (issueCounts[r.issueType] || 0) + 1;
  });

  const keywordMap: Record<string, number> = {};
  product.reviews.forEach(r => {
    (r.keywords || []).forEach(k => {
      keywordMap[k] = (keywordMap[k] || 0) + 1;
    });
  });
  const topKeywords = Object.entries(keywordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const getEngineeringCAPA = () => {
    const isEn = language === 'en-US';
    const isTw = language === 'zh-TW';

    if (product.mainIssue === 'Safety') {
      return {
        rootCause: isEn
          ? 'Thermal anomaly detected in battery compartment or strong chemical off-gassing (VOCs); suspected insufficient PCB current-limiting or uncured bonding agents.'
          : isTw
          ? '檢測到電池倉過熱或刺鼻化學殘留（VOC），疑似內部PCB電路限流設計不足或原材料偶聯劑未充分固化。'
          : '检测到电池仓过热或刺鼻化学残留（VOC），疑似内部PCB电路限流设计不足或原材料偶联剂未充分固化。',
        action: isEn
          ? '1. Quarantine affected lot; repeat safety & temperature rise tests; 2. Audit OEM supplier battery contacts & PTC thermistors; 3. Issue safety guidance label.'
          : isTw
          ? '1. 緊急封存同批次庫存並安排溫升與安規重測；2. 聯絡代工廠核對電池彈片電阻及熱敏電阻配置；3. 補發產品警告標籤與使用指導。'
          : '1. 紧急封存同批次库存并安排温升与安规重测；2. 联系东莞/惠州代工厂核对电池弹片电阻及热敏电阻配置；3. 补发产品警告标签与使用指导。',
        riskLevel: isEn ? 'CRITICAL (Safety Risk)' : 'CRITICAL (合规红线)'
      };
    }
    if (product.mainIssue === 'Function issue') {
      return {
        rootCause: isEn
          ? 'Excessive motor load or micro-switch contact fatigue; tight gearbox mold tolerances causing gear jamming after 15-30 minutes of runtime.'
          : isTw
          ? '電機負載過大或微動開關觸點疲勞，齒輪箱模具公差過小導致機械卡阻（Jammed），運行15-30分鐘後斷路。'
          : '电机负载过大或微动开关触点疲劳，齿轮箱模具公差过小导致机械卡阻（Jammed），运行15-30分钟后断路。',
        action: isEn
          ? '1. Optimize plastic gear draft angle and lubricant grease specs; 2. Increase pre-shipment electrical burn-in test duration to 5 mins; 3. Upgrade to higher-rated switches.'
          : isTw
          ? '1. 優化注塑齒輪脫模斜度與潤滑脂塗覆標準；2. 強化出貨前 100% 通電磨合（Burn-in）測試時間至 5 分鐘；3. 評估替換高壽命微動開關。'
          : '1. 优化注塑齿轮脱模斜度与润滑脂涂覆标准；2. 强化出货前 100% 通电磨合（Burn-in）测试时间至 5 分钟；3. 评估替换高寿命微动开关。',
        riskLevel: isEn ? 'MAJOR (Functional Defect)' : 'MAJOR (功能缺陷)'
      };
    }
    if (product.mainIssue === 'Missing parts') {
      return {
        rootCause: isEn
          ? 'Packaging line missed accessory insertion; check-weigher tolerance window too wide to reject missing blind-bag components.'
          : isTw
          ? '盲盒/套裝組裝流水線人工漏放配件，包裝封口前稱重檢測（Check-weigher）公差閾值設置過寬未能剔除缺配件。'
          : '盲盒/套装组装流水线人工漏放配件，包装封口前称重检测（Check-weigher）公差阈值设置过宽未能剔除缺件件。',
        action: isEn
          ? '1. Calibrate inline dynamic check-weighers (±0.3g precision); 2. Improve blister tray retaining clip design to prevent parts shifting.'
          : isTw
          ? '1. 生產線加裝高精度動態檢重秤（±0.3g精度自動剔除）；2. 優化內襯泡殼卡扣設計，防止配件在吸塑托盤上位移滑脫。'
          : '1. 生产线加装高精度动态检重秤（±0.3g精度自动剔除）；2. 优化内衬泡壳卡扣设计，防止配件在吸塑托盘中位移滑脱。',
        riskLevel: isEn ? 'MAJOR (Missing Component)' : 'MAJOR (物料缺失)'
      };
    }
    if (product.mainIssue === 'Damage') {
      return {
        rootCause: isEn
          ? 'Joint/handle plastic wall thickness below nominal (<1.2mm); brittle resin lacking impact modifiers resulting in low drop-test resistance.'
          : isTw
          ? '關節與手柄連接壁厚不足（< 1.2mm），且使用的ABS/PP樹脂未添加抗衝改性劑，跌落衝擊試驗（ISTA 2A）承受力弱。'
          : '关节与手柄连接壁厚不足（< 1.2mm），且使用的ABS/PP树脂未添加抗冲改性剂，跌落冲击试验（ISTA 2A）承受力弱。',
        action: isEn
          ? '1. Add reinforcement ribs and generous corner radii in mold tooling; 2. Add impact modifiers to resin mix; 3. Upgrade master carton corrugated board flute rating.'
          : isTw
          ? '1. 結構工程加設加強筋（Ribs）並過渡圓角；2. 增加注塑原料衝擊強度配比；3. 升級運輸外箱瓦楞紙板克重。'
          : '1. 结构工程加设加强筋（Ribs）并过渡圆角；2. 增加注塑原料冲击强度配比；3. 升级运输外箱瓦楞纸板克重（从 B楞升级为 BC双楞）。',
        riskLevel: isEn ? 'MAJOR (Structural Breakage)' : 'MAJOR (结构强度)'
      };
    }
    return {
      rootCause: isEn
        ? 'Inadequate surface paint adhesion or ambiguous fold-out instruction diagram causing poor consumer experience.'
        : isTw
        ? '材質表面處理（噴油/移印）附著力不足，或說明書步驟折疊不夠直觀，導致消費者體驗受挫。'
        : '材质表面处理（喷油/移印）附着力不足，或说明书步骤折叠不够直观，导致消费者体验受挫。',
      action: isEn
        ? '1. Conduct cross-hatch adhesion tape testing; 2. Add QR code video instruction card inside retail packaging.'
        : isTw
        ? '1. 開展百格附著力測試（Cross-hatch test）；2. 製作二維碼視頻說明書附於彩盒內部。'
        : '1. 开展百格附着力测试（Cross-hatch test）；2. 制作二维码视频说明书附于彩盒内部。',
      riskLevel: isEn ? 'MODERATE (General Quality Improvement)' : 'MODERATE (常规质量改善)'
    };
  };

  const capa = getEngineeringCAPA();

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {platInfo.name}
              </span>
              {isAlert ? (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 fill-rose-600 text-white" />
                  {t.ratingAlert} ({product.rating.toFixed(1)} ★)
                </span>
              ) : (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  {t.ratingOk} ({product.rating.toFixed(1)} ★)
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 mt-2 leading-snug">
              {product.name}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1 font-mono">
              <span>UPC: <strong className="text-slate-700">{product.upc || 'N/A'}</strong></span>
              <span>Model: <strong className="text-slate-700">{product.model || 'N/A'}</strong></span>
              <span>ID: <strong className="text-slate-700">{product.platformId}</strong></span>
              <span>Origin: <strong className="text-slate-700">{product.countryOfOrigin}</strong></span>
              <span>Reviews: <strong className="text-slate-700">{product.reviewCount}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              title="Open Retailer Site"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Preliminary Quality Engineering Root Cause & Action Suggestions (CAPA) */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{t.capaTitle}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                {capa.riskLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-slate-800">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="font-medium text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 fill-amber-100" />
                  <span>{t.probableRootCause}</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {capa.rootCause}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="font-medium text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <Wrench className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                  <span>{t.recommendedActions}</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {capa.action}
                </p>
              </div>
            </div>
          </div>

          {/* QA Defect Breakdown & Keywords Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="font-semibold text-slate-900 mb-3">
                {t.defectTaxonomyTitle}
              </div>
              <div className="space-y-2">
                {Object.entries(issueCounts).length === 0 ? (
                  <div className="text-slate-400">N/A</div>
                ) : (
                  Object.entries(issueCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([issue, count]) => {
                      const pct = Math.round((count / (product.reviews.length || 1)) * 100);
                      const isSafety = issue === 'Safety';
                      return (
                        <div key={issue} className="flex items-center justify-between text-xs">
                          <span className={`font-medium ${isSafety ? 'text-amber-800 font-semibold' : 'text-slate-700'}`}>
                            {issue}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isSafety ? 'bg-amber-500' : 'bg-slate-700'}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-mono text-slate-500 w-8 text-right tabular-nums">
                              {count}
                            </span>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="font-semibold text-slate-900 mb-3">
                {t.topKeywordsTitle}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topKeywords.length === 0 ? (
                  <div className="text-slate-400">N/A</div>
                ) : (
                  topKeywords.map(([word, freq]) => (
                    <span
                      key={word}
                      className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono"
                    >
                      {word} <strong className="text-rose-600">({freq})</strong>
                    </span>
                  ))
                )}
              </div>
              <div className="mt-4 text-[11px] text-slate-400">
                {t.keywordsDisclaimer}
              </div>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="font-semibold text-slate-900 text-sm">
                {t.reviewsHeader} ({filteredReviews.length})
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
                <button
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    activeFilter === 'ALL' ? 'bg-white text-slate-900 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'text-slate-600'
                  }`}
                >
                  {t.filterAllReviews} ({product.reviews.length})
                </button>
                <button
                  onClick={() => setActiveFilter('1-2')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    activeFilter === '1-2' ? 'bg-white text-slate-900 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'text-slate-600'
                  }`}
                >
                  {t.filterLowStars}
                </button>
                <button
                  onClick={() => setActiveFilter('Safety')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    activeFilter === 'Safety' ? 'bg-white text-amber-800 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'text-slate-600'
                  }`}
                >
                  {t.filterSafety}
                </button>
                <button
                  onClick={() => setActiveFilter('Function')}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    activeFilter === 'Function' ? 'bg-white text-slate-900 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'text-slate-600'
                  }`}
                >
                  {t.filterFunction}
                </button>
              </div>
            </div>

            {filteredReviews.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-light">
                N/A
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReviews.map((rev) => {
                  const isNeg = rev.rating <= 2;
                  const isCritical = rev.severity === 'Critical';

                  return (
                    <div
                      key={rev.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCritical
                          ? 'bg-rose-50/40 border-rose-200/80'
                          : isNeg
                          ? 'bg-slate-50/60 border-slate-200/60'
                          : 'bg-white border-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-500 font-bold font-mono">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200 fill-slate-100'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-slate-700 text-xs font-mono">{rev.rating}.0</span>
                          </div>

                          <span className="text-slate-300">·</span>
                          <span className="font-medium text-slate-800">{rev.author}</span>
                          <span className="text-slate-400 font-mono text-[11px]">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              isCritical
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {rev.issueType}
                          </span>
                        </div>
                      </div>

                      {rev.title && (
                        <div className="font-semibold text-slate-900 mb-1">
                          {rev.title}
                        </div>
                      )}

                      <p className="text-slate-600 leading-relaxed font-normal">
                        "{rev.comment}"
                      </p>

                      {rev.keywords && rev.keywords.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <span>{t.triggerKeywordsLabel}</span>
                          <span className="text-rose-600 font-medium">
                            {rev.keywords.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            {format(t.reviewsHeader, {})}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => ExportService.exportFullExcel([product], threshold, `MGA_QC_${product.model || product.platformId}`, language)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-black rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 fill-current" />
              <span>{t.btnExportProductExcel}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            >
              {t.btnClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
