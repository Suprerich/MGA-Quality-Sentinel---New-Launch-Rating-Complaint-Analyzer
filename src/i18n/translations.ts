export type Language = 'zh-CN' | 'zh-TW' | 'en-US';

export interface Translations {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  navOverview: string;
  navMatrix: string;
  navProducts: string;
  navTrends: string;
  navSchedule: string;
  navPresentation: string;
  btnWatchlist: string;
  btnExportExcel: string;
  btnKeynote: string;
  btnRunInspection: string;
  btnInspecting: string;

  // Dashboard Stats
  alertThresholdLabel: string;
  alertThresholdDesc: string;
  inspectPeriodLabel: string;
  nextRunLabel: string;
  statBelowThreshold: string;
  statBelowThresholdSub: string;
  statBelowThresholdUrgent: string;
  statBelowThresholdOk: string;
  statSafetyTitle: string;
  statSafetySub: string;
  statSafetyDesc: string;
  statSkusTitle: string;
  statSkusSub: string;
  statSkusDesc: string;
  statReviewsTitle: string;
  statReviewsSub: string;
  statReviewsDesc: string;

  // Matrix View
  matrixTitle: string;
  matrixSubtitle: string;
  matrixOnlyBelow: string;
  btnCopyEmail: string;
  btnCopiedEmail: string;
  btnExportMatrixExcel: string;
  thProduct: string;
  thUpcModel: string;
  thBelowCount: string;
  tagNewLaunch: string;
  keyFindingsTitle: string;
  noMatchingProducts: string;

  // Product List Table
  searchPlaceholder: string;
  filterAllRetailers: string;
  filterAllStatus: string;
  filterOnlyAlert: string;
  filterOnlyOk: string;
  filterAllDefects: string;
  foundRecords: string;
  clickRowHint: string;
  thRetailer: string;
  thAvgRating: string;
  thReviewsCount: string;
  thStatus: string;
  thMainDefect: string;
  thActions: string;
  statusAlert: string;
  statusOk: string;

  // Complaint Analysis Modal
  modalSubtitle: string;
  ratingAlert: string;
  ratingOk: string;
  capaTitle: string;
  probableRootCause: string;
  recommendedActions: string;
  defectTaxonomyTitle: string;
  topKeywordsTitle: string;
  keywordsDisclaimer: string;
  reviewsHeader: string;
  filterAllReviews: string;
  filterLowStars: string;
  filterSafety: string;
  filterFunction: string;
  btnExportProductExcel: string;
  btnClose: string;
  triggerKeywordsLabel: string;

  // Watchlist Modal
  watchlistTitle: string;
  watchlistSubtitle: string;
  tabExistingList: string;
  tabBatchImport: string;
  addSingleTitle: string;
  lblProductName: string;
  lblBrand: string;
  lblUpc: string;
  lblModel: string;
  lblTcin: string;
  lblAsin: string;
  lblWm: string;
  lblCostco: string;
  chkMarkNewLaunch: string;
  btnAddWatchlist: string;
  batchInstructions: string;
  batchPlaceholder: string;
  btnParseSave: string;
  btnFinish: string;

  // Inspection Runner Modal
  runnerTitle: string;
  runnerSubtitle: string;
  runnerSelectRetailers: string;
  runnerOnlyNewLaunch: string;
  runnerHint: string;
  runnerRunning: string;
  btnCancel: string;
  btnStartInspection: string;
  runnerWindowWarning: string;

  // Schedule Panel
  scheduleTitle: string;
  scheduleSubtitle: string;
  statusEngineActive: string;
  statusEnginePaused: string;
  enableAutoInspect: string;
  enableAutoInspectDesc: string;
  frequencyLabel: string;
  thresholdSettingLabel: string;
  emailAlertLabel: string;
  emailPlaceholder: string;
  lastRunLabel: string;
  btnSavePolicy: string;
  savedSuccess: string;
  historyTitle: string;
  historyCountDesc: string;
  thRunTime: string;
  thDuration: string;
  thScannedCount: string;
  thAlertCount: string;
  thSummary: string;
  statusSuccess: string;

  // Trend Tracking
  trendsTitle: string;
  trendsSubtitle: string;
  btnExportTrendCsv: string;
  thEvolution: string;
  thLatestRating: string;
  thTrendJudgment: string;
  trendWorsening: string;
  trendImproving: string;
  trendStable: string;
  trendsFooterNote: string;

  // Export Modal
  exportModalTitle: string;
  exportModalSubtitle: string;
  exportScopeLabel: string;
  exportAllScope: string;
  exportAlertScope: string;
  exportIncludedSheets: string;
  sheet1Desc: string;
  sheet2Desc: string;
  sheet3Desc: string;
  sheet4Desc: string;
  btnDownloadExcel: string;
  btnCopyEmailWeekly: string;

  // Footer
  footerDept: string;
  footerCoverage: string;
  footerEngine: string;
  footerFormats: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  'zh-CN': {
    appTitle: 'MGA Quality Sentinel',
    appSubtitle: '新品低分巡检与差评合规系统',
    navOverview: '预警看板',
    navMatrix: '跨平台矩阵',
    navProducts: '商品清单与差评',
    navTrends: '趋势追踪',
    navSchedule: '定时巡检配置',
    navPresentation: 'Keynote 演示',
    btnWatchlist: 'SKU监控库',
    btnExportExcel: '导出Excel',
    btnKeynote: 'Keynote 介绍',
    btnRunInspection: '立即核查',
    btnInspecting: '巡检执行中...',

    alertThresholdLabel: '评分预警警戒线:',
    alertThresholdDesc: '（当前设定低于 {t} 星触发质量合规红色警报）',
    inspectPeriodLabel: '巡检周期: 每 {h} 小时自动核查',
    nextRunLabel: '下次核查:',
    statBelowThreshold: '低分预警商品 (< {t}分)',
    statBelowThresholdSub: '/ {total} 渠道商品',
    statBelowThresholdUrgent: '需合规团队优先介入核查原因',
    statBelowThresholdOk: '全部商品评分合规',
    statSafetyTitle: '安全与法规隐患 (Critical)',
    statSafetySub: '条客诉提及',
    statSafetyDesc: '包含电池过热、异味、锐利边缘或误吞风险',
    statSkusTitle: '监控新品 SKU 数量',
    statSkusSub: '款新品 (覆盖 7 个美加渠道)',
    statSkusDesc: '涵盖 Walmart, Amazon, Target, Costco 美加站点',
    statReviewsTitle: '已核查买家评价总数',
    statReviewsSub: '条真实评论',
    statReviewsDesc: '自动匹配标准QA 10项缺陷分类模型',

    matrixTitle: '美加全渠道跨平台评分对比矩阵 (Cross-Platform Matrix)',
    matrixSubtitle: '涵盖 Walmart US/CA、Amazon US/CA、Target、Costco US/CA，自动对齐UPC/型号',
    matrixOnlyBelow: '仅看评分 < {t} 分的商品',
    btnCopyEmail: '复制为邮件表格',
    btnCopiedEmail: '已复制邮件表格!',
    btnExportMatrixExcel: '导出矩阵Excel',
    thProduct: '新品 / 商品名称 (Product)',
    thUpcModel: 'UPC / 型号',
    thBelowCount: '低于{t}分渠道数',
    tagNewLaunch: '新品',
    keyFindingsTitle: '合规发现与核心客诉总结 (Key Findings & Defect Insights):',
    noMatchingProducts: '没有找到符合条件的商品。',

    searchPlaceholder: '搜索商品名称 / UPC / 型号 / TCIN / ASIN / WM#...',
    filterAllRetailers: '全部渠道 (美加7大平台)',
    filterAllStatus: '全部预警状态',
    filterOnlyAlert: '仅看低分预警 (< {t}分)',
    filterOnlyOk: '仅看合格商品 (>= {t}分)',
    filterAllDefects: '全部缺陷分类',
    foundRecords: '共找到 {n} 条渠道商品数据',
    clickRowHint: '点击任意商品行即可展开买家差评明细与根因分析',
    thRetailer: '渠道平台',
    thAvgRating: '平均评分',
    thReviewsCount: '评论数',
    thStatus: '状态判定',
    thMainDefect: '主要客诉缺陷',
    thActions: '操作',
    statusAlert: 'ALERT <{t}',
    statusOk: 'OK',

    modalSubtitle: '质量缺陷下钻分析',
    ratingAlert: '低于3分预警',
    ratingOk: '合规正常',
    capaTitle: '质量合规初步根因诊断与纠正预防建议 (Preliminary QA Root Cause & CAPA)',
    probableRootCause: '疑似根本原因 (Probable Root Cause):',
    recommendedActions: '工程与质检行动措施 (Action Items):',
    defectTaxonomyTitle: '客诉缺陷分类分布 (Defect Taxonomy Breakdown):',
    topKeywordsTitle: '高频客诉触发词 (Top Complaint Keywords):',
    keywordsDisclaimer: '注：高频词来自标准 QA 词库自动打标，已过滤免责警告词。',
    reviewsHeader: '抓取评价样本与缺陷定级',
    filterAllReviews: '全部',
    filterLowStars: '仅看 1-2 星差评',
    filterSafety: '安全隐患',
    filterFunction: '功能失效',
    btnExportProductExcel: '导出单品客诉Excel',
    btnClose: '关闭',
    triggerKeywordsLabel: '触发词:',

    watchlistTitle: '新品监控名单库 (Tracked SKUs & Watchlist)',
    watchlistSubtitle: '精确维护产品 UPC / TCIN / ASIN / WM# 编号，杜绝同品牌跨系列误匹配',
    tabExistingList: '已录入清单',
    tabBatchImport: 'Excel 批量导入',
    addSingleTitle: '添加单款监控新品',
    lblProductName: '商品全名 *',
    lblBrand: '品牌 (Brand)',
    lblUpc: 'UPC 码 (12位)',
    lblModel: '工厂型号 (Model #)',
    lblTcin: 'Target TCIN',
    lblAsin: 'Amazon ASIN',
    lblWm: 'Walmart Item #',
    lblCostco: 'Costco Item #',
    chkMarkNewLaunch: '标为本季度 New Launch 新品 (高优巡检)',
    btnAddWatchlist: '确认加入监控库',
    batchInstructions: 'Excel 粘贴批量导入说明：支持从 Excel 直接复制粘贴多行数据（制表符 TAB 分隔），或使用竖线 |、英文逗号、中文逗号分隔。每行字段顺序：商品名称 | UPC码 | 型号 | Walmart编号 | Target TCIN | Amazon ASIN | Costco编号',
    batchPlaceholder: '示例 (直接从Excel复制多行并粘贴到此处):\nMake It Mini Lord of the Rings | 035051593812 | 593812 | 6000207908091 | 89543210 | B0CX123ABC | 1823901\nLittle Tikes Power Cuts 2-in-1 | 050743663189 | 663189M | 556192837 | 89123456 | B0C7L9M123 | 1789234',
    btnParseSave: '解析并保存至监控名单',
    btnFinish: '完成',

    runnerTitle: '执行全网新品质量评分巡检 (Run Inspection)',
    runnerSubtitle: '核查各零售商上新产品的评分、差评与客诉质量问题',
    runnerSelectRetailers: '选择需要核查的渠道站点 (美加共 7 大零售平台):',
    runnerOnlyNewLaunch: '仅核查近期 New Launch 新品 (排除老款已稳定款)',
    runnerHint: '提示：系统将根据已保存的 Watchlist (UPC/TCIN/ASIN/WM#) 进行并发核查，同步抽取最新买家评价，并自动运行分类器解析出安全、功能失效、缺件、破损等缺陷。',
    runnerRunning: '正在执行自动化质量合规巡检...',
    btnCancel: '取消',
    btnStartInspection: '开始巡检',
    runnerWindowWarning: '巡检中，请勿关闭窗口...',

    scheduleTitle: '定时自动巡检调度策略 (Automated Periodic Inspection)',
    scheduleSubtitle: '配置后台定时核查周期，针对 Walmart/Amazon/Target/Costco 美加站点新品实时预警',
    statusEngineActive: '● 定时引擎运行中',
    statusEnginePaused: '○ 已暂停',
    enableAutoInspect: '启用全自动周期性低分巡检',
    enableAutoInspectDesc: '开启后，系统将按设定频率自动爬取 7 大渠道新品评价，命中 < 3.0 分将自动归档并触发通知',
    frequencyLabel: '巡检执行频率 (Inspection Frequency):',
    thresholdSettingLabel: '合规警戒阈值 (Alert Star Rating Threshold):',
    emailAlertLabel: '巡检发现低于 3.0 评分时自动发送通知邮件',
    emailPlaceholder: '请输入通知接收邮箱，例如: qa-compliance@mgae.com',
    lastRunLabel: '上次巡检时间:',
    btnSavePolicy: '保存策略',
    savedSuccess: '策略配置已保存!',
    historyTitle: '历次定时巡检审计日志 (Historical Execution Logs)',
    historyCountDesc: '共记录最近 {n} 次巡检结果',
    thRunTime: '核查时间',
    thDuration: '耗时',
    thScannedCount: '扫描商品数',
    thAlertCount: '< 3.0 预警数',
    thSummary: '总结摘要',
    statusSuccess: '成功',

    trendsTitle: '历次巡检评分趋势演变 (Rating Trend Tracking)',
    trendsSubtitle: '监控新品上市后的评分变化轨迹，在评分跌破 3.0 前提早发现加速恶化趋势 (▼) 并采取干预',
    btnExportTrendCsv: '导出趋势 CSV',
    thEvolution: '评分演变轨迹 (从早期到最新)',
    thLatestRating: '最新评分',
    thTrendJudgment: '走势判定',
    trendWorsening: '加速恶化',
    trendImproving: '逐步回升',
    trendStable: '平稳',
    trendsFooterNote: '系统在每次巡检时自动存档快照（每个商品 / 每个零售渠道 / 每天保留一个记录），生成长效质量合规趋势。',

    exportModalTitle: '质量合规巡检数据导出中心',
    exportModalSubtitle: '支持完整多工作表 Excel (.xlsx) 及 Outlook 邮件富文本表格',
    exportScopeLabel: '导出范围筛选:',
    exportAllScope: '导出全部已监控商品 ({n} 个渠道记录)',
    exportAlertScope: '仅导出评分 < {t} 的警戒商品 ({n} 个记录)',
    exportIncludedSheets: '包含的 Excel 工作表 (Sheets):',
    sheet1Desc: 'Sheet 1. 低分预警汇总 (商品、UPC、渠道、评分、差评数、主客诉)',
    sheet2Desc: 'Sheet 2. 跨平台对比矩阵 (Walmart/Amazon/Target/Costco 美加站点并排比对)',
    sheet3Desc: 'Sheet 3. 差评客诉明细 (逐条包含买家原文、打星、严重等级、分类与触发词)',
    sheet4Desc: 'Sheet 4. QA缺陷统计分析 (各缺陷频次、百分比占比与合规等级)',
    btnDownloadExcel: '下载 Excel (.xlsx)',
    btnCopyEmailWeekly: '复制为邮件周报表格',

    footerDept: 'MGA 质量合规部 (Quality Department)',
    footerCoverage: '巡检覆盖 Walmart / Amazon / Target / Costco (US & CA)',
    footerEngine: '标准缺陷分类引擎 v2.0 (Scored Classifier)',
    footerFormats: '导出支持 .xlsx / CSV / Outlook 邮件格式'
  },

  'zh-TW': {
    appTitle: 'MGA Quality Sentinel',
    appSubtitle: '新品低分巡檢與客訴合規系統',
    navOverview: '預警看板',
    navMatrix: '跨平臺矩陣',
    navProducts: '商品清單與差評',
    navTrends: '趨勢追蹤',
    navSchedule: '定時巡檢配置',
    navPresentation: 'Keynote 演示',
    btnWatchlist: 'SKU監控庫',
    btnExportExcel: '匯出Excel',
    btnKeynote: 'Keynote 介紹',
    btnRunInspection: '立即核查',
    btnInspecting: '巡檢執行中...',

    alertThresholdLabel: '評分預警警戒線:',
    alertThresholdDesc: '（當前設定低於 {t} 星觸發品質合規紅色警報）',
    inspectPeriodLabel: '巡檢週期: 每 {h} 小時自動核查',
    nextRunLabel: '下次核查:',
    statBelowThreshold: '低分預警商品 (< {t}分)',
    statBelowThresholdSub: '/ {total} 渠道商品',
    statBelowThresholdUrgent: '需合規團隊優先介入核查原因',
    statBelowThresholdOk: '全部商品評分合規',
    statSafetyTitle: '安全與法規隱患 (Critical)',
    statSafetySub: '條客訴提及',
    statSafetyDesc: '包含電池過熱、異味、銳利邊緣或誤吞風險',
    statSkusTitle: '監控新品 SKU 數量',
    statSkusSub: '款新品 (覆蓋 7 個美加渠道)',
    statSkusDesc: '涵蓋 Walmart, Amazon, Target, Costco 美加站點',
    statReviewsTitle: '已核查買家評價總數',
    statReviewsSub: '條真實評論',
    statReviewsDesc: '自動匹配標準QA 10項缺陷分類模型',

    matrixTitle: '美加全渠道跨平臺評分對比矩陣 (Cross-Platform Matrix)',
    matrixSubtitle: '涵蓋 Walmart US/CA、Amazon US/CA、Target、Costco US/CA，自動對齊UPC/型號',
    matrixOnlyBelow: '僅看評分 < {t} 分的商品',
    btnCopyEmail: '複製為郵件表格',
    btnCopiedEmail: '已複製郵件表格!',
    btnExportMatrixExcel: '匯出矩陣Excel',
    thProduct: '新品 / 商品名稱 (Product)',
    thUpcModel: 'UPC / 型號',
    thBelowCount: '低於{t}分渠道數',
    tagNewLaunch: '新品',
    keyFindingsTitle: '合規發現與核心客訴總結 (Key Findings & Defect Insights):',
    noMatchingProducts: '沒有找到符合條件的商品。',

    searchPlaceholder: '搜尋商品名稱 / UPC / 型號 / TCIN / ASIN / WM#...',
    filterAllRetailers: '全部渠道 (美加7大平臺)',
    filterAllStatus: '全部預警狀態',
    filterOnlyAlert: '僅看低分預警 (< {t}分)',
    filterOnlyOk: '僅看合格商品 (>= {t}分)',
    filterAllDefects: '全部缺陷分類',
    foundRecords: '共找到 {n} 條渠道商品數據',
    clickRowHint: '點選任意商品行即可展開買家差評明細與根因分析',
    thRetailer: '渠道平臺',
    thAvgRating: '平均評分',
    thReviewsCount: '評論數',
    thStatus: '狀態判定',
    thMainDefect: '主要客訴缺陷',
    thActions: '操作',
    statusAlert: 'ALERT <{t}',
    statusOk: 'OK',

    modalSubtitle: '品質缺陷下鑽分析',
    ratingAlert: '低於3分預警',
    ratingOk: '合規正常',
    capaTitle: '品質合規初步根因診斷與糾正預防建議 (Preliminary QA Root Cause & CAPA)',
    probableRootCause: '疑似根本原因 (Probable Root Cause):',
    recommendedActions: '工程與質檢行動措施 (Action Items):',
    defectTaxonomyTitle: '客訴缺陷分類分佈 (Defect Taxonomy Breakdown):',
    topKeywordsTitle: '高頻客訴觸發詞 (Top Complaint Keywords):',
    keywordsDisclaimer: '註：高頻詞來自標準 QA 詞庫自動打標，已過濾免責警告詞。',
    reviewsHeader: '抓取評價樣本與缺陷定級',
    filterAllReviews: '全部',
    filterLowStars: '僅看 1-2 星差評',
    filterSafety: '安全隱患',
    filterFunction: '功能失效',
    btnExportProductExcel: '匯出單品客訴Excel',
    btnClose: '關閉',
    triggerKeywordsLabel: '觸發詞:',

    watchlistTitle: '新品監控名單庫 (Tracked SKUs & Watchlist)',
    watchlistSubtitle: '精確維護產品 UPC / TCIN / ASIN / WM# 編號，杜絕同品牌跨系列誤匹配',
    tabExistingList: '已錄入清單',
    tabBatchImport: 'Excel 批量匯入',
    addSingleTitle: '添加單款監控新品',
    lblProductName: '商品全名 *',
    lblBrand: '品牌 (Brand)',
    lblUpc: 'UPC 碼 (12位)',
    lblModel: '工廠型號 (Model #)',
    lblTcin: 'Target TCIN',
    lblAsin: 'Amazon ASIN',
    lblWm: 'Walmart Item #',
    lblCostco: 'Costco Item #',
    chkMarkNewLaunch: '標為本季度 New Launch 新品 (高優巡檢)',
    btnAddWatchlist: '確認加入監控庫',
    batchInstructions: 'Excel 貼上批量匯入說明：支援從 Excel 直接複製貼上多行數據（製表符 TAB 分隔），或使用豎線 |、英文逗號、中文逗號分隔。每行欄位順序：商品名稱 | UPC碼 | 型號 | Walmart編號 | Target TCIN | Amazon ASIN | Costco編號',
    batchPlaceholder: '範例 (直接從Excel複製多行並貼上到此處):\nMake It Mini Lord of the Rings | 035051593812 | 593812 | 6000207908091 | 89543210 | B0CX123ABC | 1823901\nLittle Tikes Power Cuts 2-in-1 | 050743663189 | 663189M | 556192837 | 89123456 | B0C7L9M123 | 1789234',
    btnParseSave: '解析並儲存至監控名單',
    btnFinish: '完成',

    runnerTitle: '執行全網新品品質評分巡檢 (Run Inspection)',
    runnerSubtitle: '核查各零售商上新產品的評分、差評與客訴品質問題',
    runnerSelectRetailers: '選擇需要核查的渠道站點 (美加共 7 大零售平臺):',
    runnerOnlyNewLaunch: '僅核查近期 New Launch 新品 (排除老款已穩定款)',
    runnerHint: '提示：系統將根據已儲存的 Watchlist (UPC/TCIN/ASIN/WM#) 進行併發核查，同步抽取最新買家評價，並自動運行分類器解析出安全、功能失效、缺件、破損等缺陷。',
    runnerRunning: '正在執行自動化品質合規巡檢...',
    btnCancel: '取消',
    btnStartInspection: '開始巡檢',
    runnerWindowWarning: '巡檢中，請勿關閉視窗...',

    scheduleTitle: '定時自動巡檢排程策略 (Automated Periodic Inspection)',
    scheduleSubtitle: '配置後台定時核查週期，針對 Walmart/Amazon/Target/Costco 美加站點新品即時預警',
    statusEngineActive: '● 定時引擎運行中',
    statusEnginePaused: '○ 已暫停',
    enableAutoInspect: '啟用全自動週期性低分巡檢',
    enableAutoInspectDesc: '開啟後，系統將按設定頻率自動爬取 7 大渠道新品評價，命中 < 3.0 分將自動歸檔並觸發通知',
    frequencyLabel: '巡檢執行頻率 (Inspection Frequency):',
    thresholdSettingLabel: '合規警戒閾值 (Alert Star Rating Threshold):',
    emailAlertLabel: '巡檢發現低於 3.0 評分時自動發送通知郵件',
    emailPlaceholder: '請輸入通知接收郵箱，例如: qa-compliance@mgae.com',
    lastRunLabel: '上次巡檢時間:',
    btnSavePolicy: '儲存策略',
    savedSuccess: '策略配置已儲存!',
    historyTitle: '歷次定時巡檢審計日誌 (Historical Execution Logs)',
    historyCountDesc: '共記錄最近 {n} 次巡檢結果',
    thRunTime: '核查時間',
    thDuration: '耗時',
    thScannedCount: '掃描商品數',
    thAlertCount: '< 3.0 預警數',
    thSummary: '總結摘要',
    statusSuccess: '成功',

    trendsTitle: '歷次巡檢評分趨勢演變 (Rating Trend Tracking)',
    trendsSubtitle: '監控新品上市後的評分變化軌跡，在評分跌破 3.0 前提早發現加速惡化趨勢 (▼) 並採取干預',
    btnExportTrendCsv: '匯出趨勢 CSV',
    thEvolution: '評分演變軌跡 (從早期到最新)',
    thLatestRating: '最新評分',
    thTrendJudgment: '走勢判定',
    trendWorsening: '加速惡化',
    trendImproving: '逐步回升',
    trendStable: '平穩',
    trendsFooterNote: '系統在每次巡檢時自動存檔快照（每個商品 / 每個零售渠道 / 每天保留一個記錄），生成長效品質合規趨勢。',

    exportModalTitle: '品質合規巡檢數據匯出中心',
    exportModalSubtitle: '支援完整多工作表 Excel (.xlsx) 及 Outlook 郵件富文本表格',
    exportScopeLabel: '匯出範圍篩選:',
    exportAllScope: '匯出全部已監控商品 ({n} 個渠道記錄)',
    exportAlertScope: '僅匯出評分 < {t} 的警戒商品 ({n} 個記錄)',
    exportIncludedSheets: '包含的 Excel 工作表 (Sheets):',
    sheet1Desc: 'Sheet 1. 低分預警彙總 (商品、UPC、渠道、評分、差評數、主客訴)',
    sheet2Desc: 'Sheet 2. 跨平臺對比矩陣 (Walmart/Amazon/Target/Costco 美加站點並排比對)',
    sheet3Desc: 'Sheet 3. 差評客訴明細 (逐條包含買家原文、評分、嚴重等級、分類與觸發詞)',
    sheet4Desc: 'Sheet 4. QA缺陷統計分析 (各缺陷頻次、百分比佔比與合規等級)',
    btnDownloadExcel: '下載 Excel (.xlsx)',
    btnCopyEmailWeekly: '複製為郵件週報表格',

    footerDept: 'MGA 品質合規部 (Quality Department)',
    footerCoverage: '巡檢覆蓋 Walmart / Amazon / Target / Costco (US & CA)',
    footerEngine: '標準缺陷分類引擎 v2.0 (Scored Classifier)',
    footerFormats: '匯出支援 .xlsx / CSV / Outlook 郵件格式'
  },

  'en-US': {
    appTitle: 'MGA Quality Sentinel',
    appSubtitle: 'New Launch Rating Audit & QA Compliance',
    navOverview: 'Alert Overview',
    navMatrix: 'Retailer Matrix',
    navProducts: 'Products & Complaints',
    navTrends: 'Rating Trends',
    navSchedule: 'Inspection Schedule',
    navPresentation: 'Keynote Deck',
    btnWatchlist: 'SKU Watchlist',
    btnExportExcel: 'Export Excel',
    btnKeynote: 'Keynote Deck',
    btnRunInspection: 'Run Inspection',
    btnInspecting: 'Scanning...',

    alertThresholdLabel: 'Rating Alert Threshold:',
    alertThresholdDesc: '(Currently alerting for ratings below {t} stars)',
    inspectPeriodLabel: 'Schedule: Auto-audit every {h} hrs',
    nextRunLabel: 'Next Audit:',
    statBelowThreshold: 'Low-Rating Alerts (< {t})',
    statBelowThresholdSub: '/ {total} Channel Listings',
    statBelowThresholdUrgent: 'Immediate QA compliance review required',
    statBelowThresholdOk: 'All products currently compliant',
    statSafetyTitle: 'Critical Safety Alerts',
    statSafetySub: 'complaint references',
    statSafetyDesc: 'Overheating batteries, toxic odor, sharp edges or choking risks',
    statSkusTitle: 'Monitored Launch SKUs',
    statSkusSub: 'new launches across 7 channels',
    statSkusDesc: 'Walmart, Amazon, Target, Costco (US & Canada)',
    statReviewsTitle: 'Verified Reviews Analyzed',
    statReviewsSub: 'customer reviews',
    statReviewsDesc: 'Classified using Standard 10-category QA Defect Taxonomy',

    matrixTitle: 'Cross-Retailer Rating Comparison Matrix',
    matrixSubtitle: 'Walmart US/CA, Amazon US/CA, Target, and Costco US/CA aligned by UPC and Model #',
    matrixOnlyBelow: 'Show only items with rating < {t}',
    btnCopyEmail: 'Copy as Email Table',
    btnCopiedEmail: 'Email Table Copied!',
    btnExportMatrixExcel: 'Export Matrix Excel',
    thProduct: 'Product Name',
    thUpcModel: 'UPC / Model #',
    thBelowCount: 'Below {t} Channels',
    tagNewLaunch: 'NEW',
    keyFindingsTitle: 'Key Findings & Defect Insights:',
    noMatchingProducts: 'No matching products found.',

    searchPlaceholder: 'Search product name / UPC / Model / TCIN / ASIN / WM#...',
    filterAllRetailers: 'All Retailers (7 US/CA Channels)',
    filterAllStatus: 'All Statuses',
    filterOnlyAlert: 'Alerts Only (< {t})',
    filterOnlyOk: 'Compliant Only (>= {t})',
    filterAllDefects: 'All Defect Categories',
    foundRecords: 'Found {n} channel product records',
    clickRowHint: 'Click any row to drill down into customer complaints and root-cause analysis',
    thRetailer: 'Retailer',
    thAvgRating: 'Avg Rating',
    thReviewsCount: 'Reviews',
    thStatus: 'Compliance Status',
    thMainDefect: 'Primary QA Defect',
    thActions: 'Actions',
    statusAlert: 'ALERT <{t}',
    statusOk: 'OK',

    modalSubtitle: 'Quality Defect & Complaint Drill-Down',
    ratingAlert: 'Rating Below 3.0 Alert',
    ratingOk: 'Compliant',
    capaTitle: 'Preliminary QA Root Cause & CAPA Recommendations',
    probableRootCause: 'Probable Root Cause:',
    recommendedActions: 'Recommended QA / Engineering Action Items:',
    defectTaxonomyTitle: 'Defect Taxonomy Breakdown:',
    topKeywordsTitle: 'Top Complaint Keywords:',
    keywordsDisclaimer: 'Note: Extracted automatically via standard QA dictionary; boilerplate disclaimers excluded.',
    reviewsHeader: 'Customer Reviews Log & Defect Classification',
    filterAllReviews: 'All Reviews',
    filterLowStars: '1-2 Star Reviews Only',
    filterSafety: 'Safety Concerns',
    filterFunction: 'Function Issues',
    btnExportProductExcel: 'Export SKU Excel',
    btnClose: 'Close',
    triggerKeywordsLabel: 'Keywords:',

    watchlistTitle: 'Tracked SKUs & Watchlist Database',
    watchlistSubtitle: 'Maintain UPC, TCIN, ASIN, and WM# mappings with series-safe variant isolation',
    tabExistingList: 'Active Watchlist',
    tabBatchImport: 'Excel Batch Import',
    addSingleTitle: 'Add Single Monitored SKU',
    lblProductName: 'Full Product Name *',
    lblBrand: 'Brand',
    lblUpc: 'UPC Barcode (12 digits)',
    lblModel: 'Factory Model #',
    lblTcin: 'Target TCIN',
    lblAsin: 'Amazon ASIN',
    lblWm: 'Walmart Item #',
    lblCostco: 'Costco Item #',
    chkMarkNewLaunch: 'Mark as Current Quarter New Launch (High Priority)',
    btnAddWatchlist: 'Add to Watchlist',
    batchInstructions: 'Paste multiple rows copied from Excel (tab-separated), or separated by pipe (|), comma. Column order: Product Name | UPC | Model # | Walmart # | Target TCIN | Amazon ASIN | Costco #',
    batchPlaceholder: 'Example (copy & paste from Excel):\nMake It Mini Lord of the Rings | 035051593812 | 593812 | 6000207908091 | 89543210 | B0CX123ABC | 1823901\nLittle Tikes Power Cuts 2-in-1 | 050743663189 | 663189M | 556192837 | 89123456 | B0C7L9M123 | 1789234',
    btnParseSave: 'Parse & Save to Watchlist',
    btnFinish: 'Done',

    runnerTitle: 'Run Multi-Channel Quality Audit',
    runnerSubtitle: 'Scan new launches across retailer sites for rating drops, critical defects, and customer complaints',
    runnerSelectRetailers: 'Select Retail Channels (7 US & Canadian platforms):',
    runnerOnlyNewLaunch: 'Audit New Launches Only (exclude mature stable catalog)',
    runnerHint: 'Notice: Concurrent audits will scrape ratings, extract negative review bodies, and classify defects against the standard QA taxonomy.',
    runnerRunning: 'Executing automated quality compliance scan...',
    btnCancel: 'Cancel',
    btnStartInspection: 'Start Audit',
    runnerWindowWarning: 'Audit in progress. Please do not close this window...',

    scheduleTitle: 'Automated Inspection Scheduling & Policy',
    scheduleSubtitle: 'Configure automated background audits and instant alerts across Walmart, Amazon, Target, and Costco',
    statusEngineActive: '● Engine Active',
    statusEnginePaused: '○ Paused',
    enableAutoInspect: 'Enable Automated Periodic Auditing',
    enableAutoInspectDesc: 'When enabled, the system automatically checks ratings across 7 channels and alerts when ratings fall below 3.0',
    frequencyLabel: 'Inspection Frequency:',
    thresholdSettingLabel: 'Compliance Star Rating Alert Threshold:',
    emailAlertLabel: 'Send email notification when rating drops below threshold',
    emailPlaceholder: 'Enter recipient email, e.g., qa-compliance@mgae.com',
    lastRunLabel: 'Last Audited:',
    btnSavePolicy: 'Save Policy',
    savedSuccess: 'Policy configuration saved!',
    historyTitle: 'Historical Execution Audit Logs',
    historyCountDesc: 'Showing last {n} audit runs',
    thRunTime: 'Execution Time',
    thDuration: 'Duration',
    thScannedCount: 'Items Scanned',
    thAlertCount: '< 3.0 Alerts',
    thSummary: 'Summary Log',
    statusSuccess: 'Success',

    trendsTitle: 'Historical Rating Evolution & Trend Tracking',
    trendsSubtitle: 'Track rating trajectories after launch to detect worsening trends (▼) before falling below 3.0',
    btnExportTrendCsv: 'Export Trend CSV',
    thEvolution: 'Rating Trajectory (Oldest → Latest)',
    thLatestRating: 'Latest Rating',
    thTrendJudgment: 'Trend Judgment',
    trendWorsening: 'Worsening',
    trendImproving: 'Improving',
    trendStable: 'Stable',
    trendsFooterNote: 'Snapshots are archived per product/platform daily to produce historical quality trend curves.',

    exportModalTitle: 'Quality Compliance Export Center',
    exportModalSubtitle: 'Export comprehensive multi-sheet Excel (.xlsx) workbooks and Outlook email tables',
    exportScopeLabel: 'Export Scope Filter:',
    exportAllScope: 'Export all monitored products ({n} channel records)',
    exportAlertScope: 'Export only low-rated alert products < {t} ({n} records)',
    exportIncludedSheets: 'Included Excel Worksheets:',
    sheet1Desc: 'Sheet 1. Rating Overview & Alerts (Product, UPC, Retailer, Rating, Reviews, Main Issue)',
    sheet2Desc: 'Sheet 2. Cross-Platform Matrix (Walmart, Amazon, Target, Costco US/CA side-by-side)',
    sheet3Desc: 'Sheet 3. Detailed Complaint Log (Review text, stars, severity, issue category, keywords)',
    sheet4Desc: 'Sheet 4. QA Defect Statistics (Category counts, percentage share, severity breakdown)',
    btnDownloadExcel: 'Download Excel (.xlsx)',
    btnCopyEmailWeekly: 'Copy as Email Report Table',

    footerDept: 'MGA Quality Department',
    footerCoverage: 'Monitoring Walmart / Amazon / Target / Costco (US & CA)',
    footerEngine: 'Standard QA Defect Taxonomy Classifier v2.0',
    footerFormats: 'Exports supported: .xlsx / CSV / Outlook HTML table'
  }
};
