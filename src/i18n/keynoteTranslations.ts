import { Language } from './translations';
import { SlideData } from '../types/qa';

export interface KeynoteUIStrings {
  headerDept: string;
  headerKeynote: string;
  viewOverviewTooltip: string;
  stepTooltip: string;
  autoplayStartTooltip: string;
  autoplayPauseTooltip: string;
  speakerNotesTooltip: string;
  themeToggleTooltip: string;
  fullscreenTooltip: string;
  exitTooltip: string;
  slideOverviewTitle: string;
  collapse: string;
  retinaLiveIndicator: string;
  zoomInTooltip: string;
  zoomOutTooltip: string;
  prevButton: string;
  nextStep: string;
  finishKeynote: string;
  nextSlide: string;
  speakerNotesTitle: string;
  slideCounter: string;
  langSwitchAria: string;
  currentLangLabel: string;

  // Slide 0 Mock
  mock0DeptTitle: string;
  mock0DeptSub: string;
  mock0SystemOk: string;
  mock0SkuLabel: string;
  mock0SkuVal: string;
  mock0SkuSub: string;
  mock0AvgRatingLabel: string;
  mock0AvgRatingSub: string;
  mock0AlertLabel: string;
  mock0AlertCount: string;
  mock0AlertSub: string;
  mock0SafetyLabel: string;
  mock0SafetyCount: string;
  mock0SafetySub: string;
  mock0LiveStream: string;
  mock0Channels: string;
  mock0ChainsawIssue: string;
  mock0PixieIssue: string;
  mock0RainbowIssue: string;

  // Slide 1 Mock
  mock1ChaosTitle: string;
  mock1ChaosItem1Title: string;
  mock1ChaosItem1Desc: string;
  mock1ChaosItem2Title: string;
  mock1ChaosItem2Desc: string;
  mock1ChaosItem3Title: string;
  mock1ChaosItem3Desc: string;
  mock1ChaosFooter: string;
  mock1SentinelTitle: string;
  mock1SentinelItem1Title: string;
  mock1SentinelItem1Desc: string;
  mock1SentinelItem2Title: string;
  mock1SentinelItem2Desc: string;
  mock1SentinelItem3Title: string;
  mock1SentinelItem3Desc: string;
  mock1SentinelFooter: string;

  // Slide 2 Mock
  mock2MatrixTitle: string;
  mock2MatrixSub: string;
  mock2UpcAligned: string;
  mock2ThProduct: string;
  mock2ThStatus: string;
  mock2StatusAlert: string;
  mock2StatusWatch: string;
  mock2StatusPass: string;

  // Slide 3 Mock
  mock3SliderTitle: string;
  mock3CurrentBaseline: string;
  mock3Relaxed: string;
  mock3Redline: string;
  mock3Strict: string;
  mock3AlertHeader: string;
  mock3AlertSub: string;
  mock3ChainsawIssue: string;
  mock3PixieIssue: string;

  // Slide 4 Mock
  mock4VocTitle: string;
  mock4VocSub: string;
  mock4NlpBadge: string;
  mock4DamageCat: string;
  mock4FuncCat: string;
  mock4PkgCat: string;
  mock4ReviewTag: string;
  mock4ReviewStars: string;
  mock4Quote: string;
  mock4TagBattery: string;
  mock4TagMotor: string;
  mock4TagSafety: string;

  // Slide 5 Mock
  mock5PatrolTitle: string;
  mock5PatrolSub: string;
  mock5EngineActive: string;
  mock5FreqLabel: string;
  mock5FreqVal: string;
  mock5LastRunLabel: string;
  mock5LastRunVal: string;
  mock5NextRunLabel: string;
  mock5NextRunVal: string;
  mock5AuditLogsTitle: string;
  mock5AlertsFound: string;

  // Slide 6 Mock
  mock6ExcelTitle: string;
  mock6ExcelBadge: string;
  mock6Sheet1Title: string;
  mock6Sheet1Desc: string;
  mock6Sheet2Title: string;
  mock6Sheet2Desc: string;
  mock6Sheet3Title: string;
  mock6Sheet3Desc: string;
  mock6Sheet4Title: string;
  mock6Sheet4Desc: string;
  mock6DeployTitle: string;
  mock6DeployDesc: string;
  mock6DeployBadge: string;

  // Slide 7 Mock
  mock7EpilogueTitle: string;
  mock7EpilogueDesc: string;
  mock7BtnEnter: string;
  mock7BtnReplay: string;
}

export const KEYNOTE_UI: Record<Language, KeynoteUIStrings> = {
  'zh-CN': {
    headerDept: 'MGA QUALITY DEPARTMENT · SENTINEL',
    headerKeynote: 'KEYNOTE PRESENTATION',
    viewOverviewTooltip: '查看幻灯片概览',
    stepTooltip: '第 {n} 步',
    autoplayStartTooltip: '开启自动演示',
    autoplayPauseTooltip: '暂停自动播放',
    speakerNotesTooltip: '演讲者提词 / 讲稿 (N)',
    themeToggleTooltip: '切换深色/浅色展台模式 (T)',
    fullscreenTooltip: '全屏演讲模式 (F)',
    exitTooltip: '退出演示 (Esc)',
    slideOverviewTitle: 'SLIDE OVERVIEW · 幻灯片目录',
    collapse: '收起 ✕',
    retinaLiveIndicator: 'RETINA 5K LIVE UI',
    zoomInTooltip: '放大聚焦核心区域',
    zoomOutTooltip: '恢复正常视角',
    prevButton: '上一页 / 上一步',
    nextStep: '下一步 (分步展示)',
    finishKeynote: '完成演示',
    nextSlide: '下一页',
    speakerNotesTitle: 'SPEAKER NOTES · 演讲者备忘录（向高管汇报讲稿）',
    slideCounter: 'SLIDE {current} / {total}',
    langSwitchAria: '切换演示语言',
    currentLangLabel: '简体中文',

    // Slide 0
    mock0DeptTitle: 'MGA 质量合规部 (Quality Department)',
    mock0DeptSub: '新品低分巡检与客诉合规中枢 · Sentinel',
    mock0SystemOk: '● 系统正常运行',
    mock0SkuLabel: '监控新品 SKU',
    mock0SkuVal: '11 款',
    mock0SkuSub: '覆盖美加 7 站点',
    mock0AvgRatingLabel: '综合平均评分',
    mock0AvgRatingSub: '高于行业基准 0.4',
    mock0AlertLabel: '低分预警 (< 3.0)',
    mock0AlertCount: '{count} 款',
    mock0AlertSub: '秒级标红与闭环',
    mock0SafetyLabel: '安全隐患 (Critical)',
    mock0SafetyCount: '{count} 起',
    mock0SafetySub: '电池过热阻断',
    mock0LiveStream: 'LIVE CHANNELS STREAM',
    mock0Channels: 'AMAZON · WALMART · TARGET · COSTCO',
    mock0ChainsawIssue: '2.7 (低于警戒线)',
    mock0PixieIssue: '2.8 (翼翅断裂)',
    mock0RainbowIssue: '4.7 (品质优异)',

    // Slide 1
    mock1ChaosTitle: '传统人工巡检之痛',
    mock1ChaosItem1Title: '48 小时滞后：',
    mock1ChaosItem1Desc: '等待人工复制粘贴，差评已发酵形成恶劣影响。',
    mock1ChaosItem2Title: '12% 低覆盖率：',
    mock1ChaosItem2Desc: '仅抽查少数爆款，大量衍生新品无人看管。',
    mock1ChaosItem3Title: '格式割裂：',
    mock1ChaosItem3Desc: '各零售商评价字段混乱，无法横向对齐归因。',
    mock1ChaosFooter: '平均延误: 48 小时 · 错失黄金处置期',
    mock1SentinelTitle: 'MGA Sentinel 敏捷防护',
    mock1SentinelItem1Title: '4.2 秒极速核查：',
    mock1SentinelItem1Desc: '自动化调度，毫秒级抓取最新评分。',
    mock1SentinelItem2Title: '100% 全域覆盖：',
    mock1SentinelItem2Desc: '涵盖 Walmart、Amazon、Target、Costco。',
    mock1SentinelItem3Title: '3.0 红线自动拦截：',
    mock1SentinelItem3Desc: '一旦触发即刻置顶告警与归因。',
    mock1SentinelFooter: '巡检耗时: 4.2 秒 · 100% 自动化全天候',

    // Slide 2
    mock2MatrixTitle: '全渠道跨平台评分对比矩阵',
    mock2MatrixSub: 'Walmart · Amazon · Target · Costco (US & CA)',
    mock2UpcAligned: '自动对齐 UPC/型号',
    mock2ThProduct: '新品 / 商品名称',
    mock2ThStatus: '综合状态',
    mock2StatusAlert: '🚨 低于3.0警戒',
    mock2StatusWatch: '⚠️ 重点关注',
    mock2StatusPass: '✓ 品质达标',

    // Slide 3
    mock3SliderTitle: '评分预警警戒线调节控制器',
    mock3CurrentBaseline: '当前基准: {threshold}',
    mock3Relaxed: '2.0 (宽松)',
    mock3Redline: '3.0 (红线基准)',
    mock3Strict: '4.5 (严苛)',
    mock3AlertHeader: '🚨 触发红线警报的渠道商品清单 ({count} 款)',
    mock3AlertSub: '需合规团队优先介入',
    mock3ChainsawIssue: 'UPC: 050743663189 · 核心槽点: 电机耐久',
    mock3PixieIssue: 'UPC: 035051593812 · 核心槽点: 翼翅结构脆裂',

    // Slide 4
    mock4VocTitle: '客诉深度归因与缺陷分析',
    mock4VocSub: '自然语言语义引擎 · 12 项标准分类',
    mock4NlpBadge: 'AI NLP 语义对齐',
    mock4DamageCat: '结构破损与物理缺陷 (Damage)',
    mock4FuncCat: '功能失效与电机耐久 (Function issue)',
    mock4PkgCat: '包装破损与运输挤压 (Packaging)',
    mock4ReviewTag: 'VERIFIED PURCHASE · AMAZON US',
    mock4ReviewStars: '1.0 差评',
    mock4Quote: '“The motor stopped working after just two hours. My kid cried. We also noticed the battery compartment got unusually warm!”',
    mock4TagBattery: '#电池发烫',
    mock4TagMotor: '#电机失效',
    mock4TagSafety: '#安全隐患',

    // Slide 5
    mock5PatrolTitle: '7×24 定时自动巡检监控中心',
    mock5PatrolSub: '自动化 Cron 守护引擎 · 全链路合规审计',
    mock5EngineActive: '● 引擎运行中',
    mock5FreqLabel: '巡检频次',
    mock5FreqVal: '每 {hours} 小时',
    mock5LastRunLabel: '上次执行',
    mock5LastRunVal: '4.2 秒完成',
    mock5NextRunLabel: '下次核查',
    mock5NextRunVal: '倒计时 4 小时',
    mock5AuditLogsTitle: 'RECENT RUN AUDIT LOGS (审计日志流水)',
    mock5AlertsFound: '发现 {count} 款警报',

    // Slide 6
    mock6ExcelTitle: '工业级 Excel 质量合规报表结构',
    mock6ExcelBadge: '一键即刻导出',
    mock6Sheet1Title: 'Sheet 1: 巡检总览',
    mock6Sheet1Desc: 'KPI 汇总、警报比例、执行耗时',
    mock6Sheet2Title: 'Sheet 2: 跨平台矩阵',
    mock6Sheet2Desc: '7 渠道星级、UPC 对齐清单',
    mock6Sheet3Title: 'Sheet 3: <3.0 警报清单',
    mock6Sheet3Desc: '低分阻断明细、抢修优先级',
    mock6Sheet4Title: 'Sheet 4: VOC 缺陷归因',
    mock6Sheet4Desc: '12 项分类占比、买家原声溯源',
    mock6DeployTitle: '纯静态秒级打包上线 (mga-dist-deploy.zip)',
    mock6DeployDesc: '零 Node.js 依赖 · 拖入 Netlify Drop 或 Vercel 10 秒上线 · 免密安全访问',
    mock6DeployBadge: '550 KB 极速包',

    // Slide 7
    mock7EpilogueTitle: '极致工艺，始于严苛标准。',
    mock7EpilogueDesc: 'MGA 质量合规部出品 · 守护全球亿万家庭与儿童的安全体验。从每一次差评拦截，到每一次设计进化。',
    mock7BtnEnter: '进入系统控制台实操',
    mock7BtnReplay: '重新播放演示'
  },

  'zh-TW': {
    headerDept: 'MGA QUALITY DEPARTMENT · SENTINEL',
    headerKeynote: 'KEYNOTE PRESENTATION',
    viewOverviewTooltip: '查看簡報概覽',
    stepTooltip: '第 {n} 步',
    autoplayStartTooltip: '開啟自動簡報',
    autoplayPauseTooltip: '暫停自動播放',
    speakerNotesTooltip: '講者備忘錄 / 演講稿 (N)',
    themeToggleTooltip: '切換深色/淺色展台模式 (T)',
    fullscreenTooltip: '全螢幕演講模式 (F)',
    exitTooltip: '退出簡報 (Esc)',
    slideOverviewTitle: 'SLIDE OVERVIEW · 投影片目錄',
    collapse: '收起 ✕',
    retinaLiveIndicator: 'RETINA 5K LIVE UI',
    zoomInTooltip: '放大聚焦核心區域',
    zoomOutTooltip: '恢復正常視角',
    prevButton: '上一頁 / 上一步',
    nextStep: '下一步 (分步展示)',
    finishKeynote: '完成簡報',
    nextSlide: '下一頁',
    speakerNotesTitle: 'SPEAKER NOTES · 講者備忘錄（向高管匯報講稿）',
    slideCounter: 'SLIDE {current} / {total}',
    langSwitchAria: '切換簡報語言',
    currentLangLabel: '繁體中文',

    // Slide 0
    mock0DeptTitle: 'MGA 品質合規部 (Quality Department)',
    mock0DeptSub: '新品低分巡檢與客訴合規中樞 · Sentinel',
    mock0SystemOk: '● 系統正常運行',
    mock0SkuLabel: '監控新品 SKU',
    mock0SkuVal: '11 款',
    mock0SkuSub: '覆蓋美加 7 站點',
    mock0AvgRatingLabel: '綜合平均評分',
    mock0AvgRatingSub: '高於行業基準 0.4',
    mock0AlertLabel: '低分預警 (< 3.0)',
    mock0AlertCount: '{count} 款',
    mock0AlertSub: '秒級標紅與閉環',
    mock0SafetyLabel: '安全隱患 (Critical)',
    mock0SafetyCount: '{count} 起',
    mock0SafetySub: '電池過熱阻斷',
    mock0LiveStream: 'LIVE CHANNELS STREAM',
    mock0Channels: 'AMAZON · WALMART · TARGET · COSTCO',
    mock0ChainsawIssue: '2.7 (低於警戒線)',
    mock0PixieIssue: '2.8 (翼翅斷裂)',
    mock0RainbowIssue: '4.7 (品質優異)',

    // Slide 1
    mock1ChaosTitle: '傳統人工巡檢之痛',
    mock1ChaosItem1Title: '48 小時滯後：',
    mock1ChaosItem1Desc: '等待人工複製貼上，負評已發酵形成惡劣影響。',
    mock1ChaosItem2Title: '12% 低覆蓋率：',
    mock1ChaosItem2Desc: '僅抽查少數熱銷款，大量衍生新品無人看管。',
    mock1ChaosItem3Title: '格式割裂：',
    mock1ChaosItem3Desc: '各零售商評價欄位混亂，無法橫向對齊歸因。',
    mock1ChaosFooter: '平均延誤: 48 小時 · 錯失黃金處置期',
    mock1SentinelTitle: 'MGA Sentinel 敏捷防護',
    mock1SentinelItem1Title: '4.2 秒極速核查：',
    mock1SentinelItem1Desc: '自動化調度，毫秒級抓取最新評分。',
    mock1SentinelItem2Title: '100% 全域覆蓋：',
    mock1SentinelItem2Desc: '涵蓋 Walmart、Amazon、Target、Costco。',
    mock1SentinelItem3Title: '3.0 紅線自動攔截：',
    mock1SentinelItem3Desc: '一旦觸發即刻置頂告警與歸因。',
    mock1SentinelFooter: '巡檢耗時: 4.2 秒 · 100% 自動化全天候',

    // Slide 2
    mock2MatrixTitle: '全渠道跨平台評分對比矩陣',
    mock2MatrixSub: 'Walmart · Amazon · Target · Costco (US & CA)',
    mock2UpcAligned: '自動對齊 UPC/型號',
    mock2ThProduct: '新品 / 商品名稱',
    mock2ThStatus: '綜合狀態',
    mock2StatusAlert: '🚨 低於3.0警戒',
    mock2StatusWatch: '⚠️ 重點關注',
    mock2StatusPass: '✓ 品質達標',

    // Slide 3
    mock3SliderTitle: '評分預警警戒線調節控制器',
    mock3CurrentBaseline: '當前基準: {threshold}',
    mock3Relaxed: '2.0 (寬鬆)',
    mock3Redline: '3.0 (紅線基準)',
    mock3Strict: '4.5 (嚴苛)',
    mock3AlertHeader: '🚨 觸發紅線警報的渠道商品清單 ({count} 款)',
    mock3AlertSub: '需合規團隊優先介入',
    mock3ChainsawIssue: 'UPC: 050743663189 · 核心槽點: 馬達耐久',
    mock3PixieIssue: 'UPC: 035051593812 · 核心槽點: 翼翅結構脆裂',

    // Slide 4
    mock4VocTitle: '客訴深度歸因與缺陷分析',
    mock4VocSub: '自然語言語意引擎 · 12 項標準分類',
    mock4NlpBadge: 'AI NLP 語意對齊',
    mock4DamageCat: '結構破損與物理缺陷 (Damage)',
    mock4FuncCat: '功能失效與馬達耐久 (Function issue)',
    mock4PkgCat: '包裝破損與運輸擠壓 (Packaging)',
    mock4ReviewTag: 'VERIFIED PURCHASE · AMAZON US',
    mock4ReviewStars: '1.0 負評',
    mock4Quote: '“The motor stopped working after just two hours. My kid cried. We also noticed the battery compartment got unusually warm!”',
    mock4TagBattery: '#電池發燙',
    mock4TagMotor: '#馬達失效',
    mock4TagSafety: '#安全隱患',

    // Slide 5
    mock5PatrolTitle: '7×24 定時自動巡檢監控中心',
    mock5PatrolSub: '自動化 Cron 守護引擎 · 全鏈路合規審計',
    mock5EngineActive: '● 引擎運行中',
    mock5FreqLabel: '巡檢頻次',
    mock5FreqVal: '每 {hours} 小時',
    mock5LastRunLabel: '上次執行',
    mock5LastRunVal: '4.2 秒完成',
    mock5NextRunLabel: '下次核查',
    mock5NextRunVal: '倒數 4 小時',
    mock5AuditLogsTitle: 'RECENT RUN AUDIT LOGS (審計日誌流水)',
    mock5AlertsFound: '發現 {count} 款警報',

    // Slide 6
    mock6ExcelTitle: '工業級 Excel 品質合規報表結構',
    mock6ExcelBadge: '一鍵即刻導出',
    mock6Sheet1Title: 'Sheet 1: 巡檢總覽',
    mock6Sheet1Desc: 'KPI 彙總、警報比例、執行耗時',
    mock6Sheet2Title: 'Sheet 2: 跨平台矩陣',
    mock6Sheet2Desc: '7 渠道星級、UPC 對齊清單',
    mock6Sheet3Title: 'Sheet 3: <3.0 警報清單',
    mock6Sheet3Desc: '低分阻斷明細、搶修優先級',
    mock6Sheet4Title: 'Sheet 4: VOC 缺陷歸因',
    mock6Sheet4Desc: '12 項分類佔比、買家原聲溯源',
    mock6DeployTitle: '純靜態秒級打包上線 (mga-dist-deploy.zip)',
    mock6DeployDesc: '零 Node.js 依賴 · 拖入 Netlify Drop 或 Vercel 10 秒上線 · 免密安全訪問',
    mock6DeployBadge: '550 KB 極速包',

    // Slide 7
    mock7EpilogueTitle: '極致工藝，始於嚴苛標準。',
    mock7EpilogueDesc: 'MGA 品質合規部出品 · 守護全球億萬家庭與兒童的安全體驗。從每一次負評攔截，到每一次設計進化。',
    mock7BtnEnter: '進入系統控制台實操',
    mock7BtnReplay: '重新播放簡報'
  },

  'en-US': {
    headerDept: 'MGA QUALITY DEPARTMENT · SENTINEL',
    headerKeynote: 'KEYNOTE PRESENTATION',
    viewOverviewTooltip: 'View slide overview',
    stepTooltip: 'Step {n}',
    autoplayStartTooltip: 'Start autoplay',
    autoplayPauseTooltip: 'Pause autoplay',
    speakerNotesTooltip: 'Speaker notes (N)',
    themeToggleTooltip: 'Toggle dark / light studio theme (T)',
    fullscreenTooltip: 'Toggle fullscreen (F)',
    exitTooltip: 'Exit presentation (Esc)',
    slideOverviewTitle: 'SLIDE OVERVIEW · AGENDA',
    collapse: 'Collapse ✕',
    retinaLiveIndicator: 'RETINA 5K LIVE UI',
    zoomInTooltip: 'Zoom in focus area',
    zoomOutTooltip: 'Reset viewport zoom',
    prevButton: 'Previous',
    nextStep: 'Next Step (Reveal)',
    finishKeynote: 'Finish Keynote',
    nextSlide: 'Next Slide',
    speakerNotesTitle: 'SPEAKER NOTES · EXECUTIVE PRESENTATION SCRIPT',
    slideCounter: 'SLIDE {current} / {total}',
    langSwitchAria: 'Switch presentation language',
    currentLangLabel: 'English',

    // Slide 0
    mock0DeptTitle: 'MGA Quality Department',
    mock0DeptSub: 'New Launch Rating & Complaint Compliance Hub · Sentinel',
    mock0SystemOk: '● Systems Operational',
    mock0SkuLabel: 'Monitored SKUs',
    mock0SkuVal: '11 Items',
    mock0SkuSub: '7 US & CA Retail Platforms',
    mock0AvgRatingLabel: 'Overall Avg Rating',
    mock0AvgRatingSub: '+0.4 above toy baseline',
    mock0AlertLabel: 'Low Rating Alerts (< 3.0)',
    mock0AlertCount: '{count} SKUs',
    mock0AlertSub: 'Instant red flags & closed loop',
    mock0SafetyLabel: 'Critical Safety Hazards',
    mock0SafetyCount: '{count} Incidents',
    mock0SafetySub: 'Battery thermal quarantine',
    mock0LiveStream: 'LIVE CHANNELS STREAM',
    mock0Channels: 'AMAZON · WALMART · TARGET · COSTCO',
    mock0ChainsawIssue: '2.7 (Below 3.0 Alert)',
    mock0PixieIssue: '2.8 (Wing Snapping)',
    mock0RainbowIssue: '4.7 (Quality Benchmark)',

    // Slide 1
    mock1ChaosTitle: 'The Cost of Manual Auditing',
    mock1ChaosItem1Title: '48h Blackout: ',
    mock1ChaosItem1Desc: 'Waiting on manual copy-paste while negative reviews trigger retail downranking.',
    mock1ChaosItem2Title: '12% Low Coverage: ',
    mock1ChaosItem2Desc: 'Only top items are checked; secondary launches remain completely unmonitored.',
    mock1ChaosItem3Title: 'Format Silos: ',
    mock1ChaosItem3Desc: 'Messy disparate retailer schemas prevent cross-channel root cause synthesis.',
    mock1ChaosFooter: 'Average delay: 48 hours · Missed containment window',
    mock1SentinelTitle: 'MGA Sentinel Agile Defense',
    mock1SentinelItem1Title: '4.2s Fast Audit: ',
    mock1SentinelItem1Desc: 'Automated polling surfaces fresh ratings in milliseconds.',
    mock1SentinelItem2Title: '100% Omni-Channel: ',
    mock1SentinelItem2Desc: 'Seamlessly tracks Walmart, Amazon, Target, and Costco.',
    mock1SentinelItem3Title: '3.0 Auto Intercept: ',
    mock1SentinelItem3Desc: 'Immediate escalation and root cause tagging upon breach.',
    mock1SentinelFooter: 'Inspection latency: 4.2 seconds · 24/7 fully automated',

    // Slide 2
    mock2MatrixTitle: 'Omni-Channel Rating Matrix',
    mock2MatrixSub: 'Walmart · Amazon · Target · Costco (US & CA)',
    mock2UpcAligned: 'Auto-mapped UPC / Model',
    mock2ThProduct: 'New Launch / Product Title',
    mock2ThStatus: 'Health Status',
    mock2StatusAlert: '🚨 Below 3.0 Alert',
    mock2StatusWatch: '⚠️ Watchlist Priority',
    mock2StatusPass: '✓ Quality Verified',

    // Slide 3
    mock3SliderTitle: 'Compliance Alert Threshold Controller',
    mock3CurrentBaseline: 'Current Threshold: {threshold}',
    mock3Relaxed: '2.0 (Relaxed)',
    mock3Redline: '3.0 (Standard Red Line)',
    mock3Strict: '4.5 (Strict)',
    mock3AlertHeader: '🚨 Channels Breaching Red Line Threshold ({count} Items)',
    mock3AlertSub: 'Requires immediate engineering triage',
    mock3ChainsawIssue: 'UPC: 050743663189 · Core Issue: Motor Durability',
    mock3PixieIssue: 'UPC: 035051593812 · Core Issue: Wing Structural Brittleness',

    // Slide 4
    mock4VocTitle: 'In-Depth VOC Attribution & Defect Taxonomy',
    mock4VocSub: 'Natural Language AI Engine · 12 Standard Categories',
    mock4NlpBadge: 'AI NLP Semantic Classifier',
    mock4DamageCat: 'Structural Damage & Physical Defects (Damage)',
    mock4FuncCat: 'Functional Failures & Motor Durability (Function)',
    mock4PkgCat: 'Packaging Damage & Transit Crushing (Packaging)',
    mock4ReviewTag: 'VERIFIED PURCHASE · AMAZON US',
    mock4ReviewStars: '1.0 Review',
    mock4Quote: '“The motor stopped working after just two hours. My kid cried. We also noticed the battery compartment got unusually warm!”',
    mock4TagBattery: '#BatteryOverheating',
    mock4TagMotor: '#MotorFailure',
    mock4TagSafety: '#SafetyRisk',

    // Slide 5
    mock5PatrolTitle: '24/7 Autonomous Inspection Patrol Center',
    mock5PatrolSub: 'Automated Cron Engine · Tamper-proof Compliance Audit Trail',
    mock5EngineActive: '● Engine Active',
    mock5FreqLabel: 'Scan Frequency',
    mock5FreqVal: 'Every {hours} Hours',
    mock5LastRunLabel: 'Last Executed',
    mock5LastRunVal: 'Completed in 4.2s',
    mock5NextRunLabel: 'Next Audit',
    mock5NextRunVal: 'In 4 hours',
    mock5AuditLogsTitle: 'RECENT RUN AUDIT LOGS (Audit Trail)',
    mock5AlertsFound: '{count} alerts detected',

    // Slide 6
    mock6ExcelTitle: 'Industrial Excel Quality Compliance Workbook',
    mock6ExcelBadge: 'Instant 1-Click Export',
    mock6Sheet1Title: 'Sheet 1: Audit Overview',
    mock6Sheet1Desc: 'KPI Summary, Alert Ratios, Duration Metrics',
    mock6Sheet2Title: 'Sheet 2: Cross-Platform Matrix',
    mock6Sheet2Desc: '7-Channel Ratings, UPC Alignment Catalog',
    mock6Sheet3Title: 'Sheet 3: <3.0 Alert Catalog',
    mock6Sheet3Desc: 'Low-Rating Escalation, Engineering Triage',
    mock6Sheet4Title: 'Sheet 4: VOC Defect Taxonomy',
    mock6Sheet4Desc: '12-Category Breakdown, Customer Quote Trail',
    mock6DeployTitle: 'Pure Static 1-Click Deployment (mga-dist-deploy.zip)',
    mock6DeployDesc: 'Zero Node.js dependency · Drop into Netlify or Vercel in 10s · Secure instant access',
    mock6DeployBadge: '550 KB Instant Zip',

    // Slide 7
    mock7EpilogueTitle: 'Excellence in craft begins with uncompromising standards.',
    mock7EpilogueDesc: 'MGA Quality Department · Safeguarding joyful smiles and carefree safety for children worldwide. From every intercepted defect to every design evolution.',
    mock7BtnEnter: 'Launch Sentinel Dashboard',
    mock7BtnReplay: 'Replay Keynote Presentation'
  }
};

export interface SlideContextOptions {
  threshold: number;
  alertCount: number;
  criticalSafetyCount: number;
  intervalHours: number;
  logsCount: number;
}

export function getKeynoteSlides(lang: Language, options: SlideContextOptions): SlideData[] {
  const { threshold, alertCount, criticalSafetyCount, intervalHours, logsCount } = options;

  if (lang === 'zh-TW') {
    return [
      {
        id: 'vision',
        category: 'vision',
        tag: 'MGA QUALITY DEPARTMENT · EXECUTIVE BRIEFING',
        title: '讓每一次用戶真實發聲，成為品質進化的起點。',
        subtitle: 'MGA Sentinel 智慧品質合規巡檢中樞 · 跨零售全景監控系統',
        speakerNotes:
          '「各位同仁、管理層：歡迎來到 MGA 品質合規部的 Sentinel 戰略發布。在過去，我們面對的是各大零售商割裂的差評與滯後的退貨報告；今天，我們透過統一的品質中樞，將全球億萬消費者的第一手真實原聲，直接轉化為工廠與研發的主動進化動力。」',
        steps: [
          {
            badge: '01 / 品牌定位',
            heading: 'MGA 品質合規部專研',
            detail: '深度服務於全球玩具工程品質標準，為 L.O.L. Surprise!、Rainbow High、Bratz 等核心品牌築起堅固防線。',
            metric: { label: '監控新品 SKU', value: '11 款核心旗艦' }
          },
          {
            badge: '02 / 數據打破孤島',
            heading: '跨零售全域毫秒聚合',
            detail: '打破 Amazon、Walmart、Target、Costco 美加站點數據圍牆，即時同步千萬級商品評分脈搏。',
            metric: { label: '覆蓋零售站點', value: '7 大主流渠道' }
          },
          {
            badge: '03 / 主動防禦體系',
            heading: '從被動滯後到即時攔截',
            detail: '在差評形成口碑次生災害之前秒級告警，精準定位缺陷根因，驅動敏捷品質閉環。',
            metric: { label: '巡檢響應耗時', value: '4.2 秒極速' }
          }
        ]
      },
      {
        id: 'challenge',
        category: 'challenge',
        tag: 'THE INDUSTRY BLIND SPOT · 行業質檢困局',
        title: '散落的危機，滯後的感知。',
        subtitle: '傳統人工巡檢的盲區與延遲，讓微小缺陷在暗處發酵，危及品牌十年聲譽。',
        speakerNotes:
          '「每一個玩具設計者都知道：品質問題最怕的不是缺陷本身，而是『不知道何時發生』。傳統人工抽查往往存在 48 小時的嚴重盲區；當管理層在例會上收到報表時，亞馬遜上的 1 星差評早已觸發演算法降權，退貨率呈指數級飆升。」',
        steps: [
          {
            badge: '01 / 孤島與格式碎片',
            heading: '7 大平台數據結構割裂',
            detail: 'Amazon 的 ASIN、Walmart 的 Item ID、Target 的 TCIN 各自為政，人工每週需耗費 30 小時機械搬運數據。',
            metric: { label: '人工處理耗時', value: '30+ hrs/週' }
          },
          {
            badge: '02 / 48小時致命真空期',
            heading: '嚴重滯後的輿情感知',
            detail: '新品上市前 14 天是黃金觀察期，傳統巡查平均滯後 48 小時，錯失下架、補件與公關干預的最佳窗口。',
            metric: { label: '傳統巡檢延遲', value: '48 小時盲區' }
          },
          {
            badge: '03 / 評分斷崖式雪崩',
            heading: '跌破警戒線後的巨額代價',
            detail: '新品評論基數較小時，連續 3 則差評即可拉垮總評分至 3.0 以下，直接導致零售演算法流量減半。',
            metric: { label: '抽樣覆蓋率', value: '不足 12%' }
          }
        ]
      },
      {
        id: 'matrix',
        category: 'matrix',
        tag: 'OMNI-CHANNEL MATRIX · 跨平台矩陣',
        title: '4 大主流平台，毫秒級全景透視。',
        subtitle: '一張統一的網格，穿透 Walmart US/CA、Amazon US/CA、Target、Costco 美加貨架。',
        speakerNotes:
          '「這就是我們打造的『全景矩陣』（Omni-Channel Matrix）。無需在多個瀏覽器分頁之間反覆切換，所有新品在美加核心零售商的表現一覽無餘。哪一款在亞馬遜受阻、哪一款在沃爾瑪表現出色，色彩與星級對比一目了然。」',
        steps: [
          {
            badge: '01 / 統一網格對齊',
            heading: 'UPC 與型號全局歸一化',
            detail: '自動將各零售渠道的內部編號（ASIN / TCIN / WM# / Item#）綁定到同一款 MGA 官方工程型號。',
            metric: { label: '多渠道匹配率', value: '100% 精確' }
          },
          {
            badge: '02 / 動態健康度透視',
            heading: '綠色達標，紅色高危秒顯',
            detail: '每個單元格直觀展現平均星級與總評論量，滑鼠懸停即刻穿透至買家近期核心痛點與真實原聲。',
            metric: { label: '即時聚合容量', value: '1,420+ 評價' }
          },
          {
            badge: '03 / 渠道差異溯源',
            heading: '敏銳識別批次與物流異常',
            detail: '若同款商品僅在 Walmart 評分偏低，系統自動輔助判定是否為特定供應鏈批次或渠道倉儲擠壓所致。',
            metric: { label: '一鍵郵件報告', value: '秒級生成' }
          }
        ]
      },
      {
        id: 'threshold',
        category: 'threshold',
        tag: 'THE 3.0 THRESHOLD · 嚴苛標準',
        title: '3.0 分紅線。容不得半點妥協。',
        subtitle: '嚴苛的自動化低分攔截機制，秒級鎖定跌破警戒基準的高危新品。',
        speakerNotes:
          '「為什麼我們堅決把預警基準線錨定在 3.0 分？因為數據不撒謊：3.0 是電商演算法的核心死線，也是用戶心智的臨界點。評分跌破 3.0，退貨率飆升 320%。Sentinel 系統對任何低於 3.0 分的商品直接拉響全螢幕紅燈，逼近零容忍。」',
        steps: [
          {
            badge: '01 / 科學警戒基準',
            heading: '3.0 分商業分水嶺',
            detail: '行業大數據證實：跌破 3.0 分將觸發零售平台懲罰性限流，並導致線下買手砍單。這是 MGA 的品質底線。',
            metric: { label: '退貨率激增拐點', value: '+320% 風險' }
          },
          {
            badge: '02 / 動態自適應滑塊',
            heading: '靈活調控 2.5 ~ 4.5 警戒線',
            detail: '針對成熟爆款可收緊至 4.0 分嚴苛監控，針對爬坡新品可維持 3.0 分科學護航，全局即時無縫響應。',
            metric: { label: '當前預警閾值', value: `${threshold.toFixed(1)} 分` }
          },
          {
            badge: '03 / 優先級集中管控',
            heading: '高危商品自動置頂呈現',
            detail: `當前巡檢精準鎖定 ${alertCount} 款低於警戒線的渠道商品，為工程部與供應商提供明確的搶修路線圖。`,
            metric: { label: '當前預警攔截', value: `${alertCount} 款商品` }
          }
        ]
      },
      {
        id: 'voc',
        category: 'voc',
        tag: 'ROOT CAUSE ATTRIBUTION · 缺陷歸因',
        title: '穿透冰冷數字，直擊缺陷根因。',
        subtitle: '告別模糊猜測。AI 自然語言引擎將數萬則真實買家評論深度解析至標準工程品質分類。',
        speakerNotes:
          '「單純知道『評分低』毫無意義，工程師需要知道『為什麼低』。Sentinel 內建了 MGA 專屬的 12 項缺陷分類樹。透過自然語言語意分析，我們能在數秒內告訴工廠：Little Tikes 電鋸是馬達耐久性問題，而某款娃娃是卡扣韌性不足。這就是根因歸因的威力。」',
        steps: [
          {
            badge: '01 / 12大標準分類樹',
            heading: '嚴謹對齊玩具工程學',
            detail: '涵蓋安全隱患 (Safety)、功能失效 (Function)、結構破損 (Damage)、缺件 (Missing parts) 等標準維度。',
            metric: { label: '缺陷分類準確度', value: '98.5%' }
          },
          {
            badge: '02 / 柏拉圖品質分佈',
            heading: '直觀呈現關鍵少數矛盾',
            detail: '自動生成缺陷原因佔比：結構與物理缺陷佔 42%，動力/馬達耐久佔 28%，讓工程改良抓住關鍵突破點。',
            metric: { label: '主要缺陷聚焦', value: 'Top 3 佔 88%' }
          },
          {
            badge: '03 / 證據鏈原聲溯源',
            heading: '高亮關鍵詞與現場實錄',
            detail: '自動提取「電池發燙」、「開箱即斷」、「螺絲脫落」等高頻詞彙，形成不可辯駁的供應商質詢證據鏈。',
            metric: { label: '真實評論樣本', value: '100% 留痕' }
          }
        ]
      },
      {
        id: 'schedule',
        category: 'schedule',
        tag: 'AUTONOMOUS PATROL · 自動化巡檢',
        title: '7×24 小時無人值守。守護，永不停歇。',
        subtitle: '內建自動化巡檢調度器，日夜自動掃描全網各零售端，固化巡檢審計流水。',
        speakerNotes:
          '「品質守護不是一天的工作，而是每一分每一秒的承諾。Sentinel 的後台調度引擎支援每 1 小時、6 小時或 12 小時自動喚醒，自動掃描各大電商頁面，哪怕團隊在熟睡中，巡檢引擎依然在為您守護品牌陣地。」',
        steps: [
          {
            badge: '01 / 彈性調度引擎',
            heading: '分鐘級至天級自由定義',
            detail: '支援在新品大促期切換為極速巡檢，在平穩期維持 12 小時常規巡檢，零運維負擔自驅運作。',
            metric: { label: '當前巡檢週期', value: `每 ${intervalHours} 小時` }
          },
          {
            badge: '02 / 審計級流水固化',
            heading: '每一次核查皆有據可查',
            detail: '詳細記錄執行時間戳、掃描渠道清單、檢測商品數、耗時毫秒數與低分商品清單，完全符合合規審計規範。',
            metric: { label: '累計掃描日誌', value: `${logsCount} 批次` }
          },
          {
            badge: '03 / 異常熔斷通知',
            heading: '捕捉到致命安全即刻告警',
            detail: '一旦發現電池過熱、異味或誤食風險等 Critical 級別關鍵詞，系統自動標記並郵件推送到合規安全官。',
            metric: { label: '安全風險捕捉', value: `${criticalSafetyCount} 起攔截` }
          }
        ]
      },
      {
        id: 'deliverable',
        category: 'deliverable',
        tag: 'EXECUTIVE DELIVERABLES · 即開即用',
        title: '一鍵導出專業報表。秒級全網部署。',
        subtitle: '專為高管匯報與供應鏈溝通定制；純靜態架構，30 秒免登入極速上線。',
        speakerNotes:
          '「工具的價值在於落地。Sentinel 不僅提供精美的介面，更支援一鍵導出包含 4 個標準工作表的工業級 Excel 品質報表，直接抄送工廠與高管。同時，系統支援純靜態打包，在 Vercel 或 Netlify 拖放即可秒級上線，任何人點開連結即可使用，無需複雜的帳號審批。」',
        steps: [
          {
            badge: '01 / 高管級 Excel 報表',
            heading: '4 大工作表結構化導出',
            detail: '包含【巡檢總覽】、【跨平台全量清單】、【<3.0分警報商品】、【高頻客訴根因明細】，格式精美就緒。',
            metric: { label: '導出格式', value: '.xlsx 純原生' }
          },
          {
            badge: '02 / 純靜態極速打包',
            heading: '零後端環境依賴',
            detail: '代碼與編譯產物僅 550KB，已打包整合於系統頂部，可隨時下載分發，支援離線環境與任意企業內網。',
            metric: { label: '部署包體積', value: '~550 KB' }
          },
          {
            badge: '03 / 零門檻即刻訪問',
            heading: '團隊免密秒級協同',
            detail: '擺脫笨重的第三方帳號權限綁定，連結即是工作台，任何有權限的品質工程師均可秒級接入協作。',
            metric: { label: '上線所需時間', value: '< 30 秒' }
          }
        ]
      },
      {
        id: 'future',
        category: 'future',
        tag: 'THE STANDARD OF EXCELLENCE · 卓越標準',
        title: '極致工藝，始於嚴苛標準。',
        subtitle: '為全球每一個孩子，守護純真的笑容與無憂的安全。MGA 品質合規部，與卓越同行。',
        speakerNotes:
          '「賈伯斯曾說，『細節決定成敗，哪怕是櫃子背面別人看不到的地方，也要用最好的木頭』。玩具是陪伴孩子成長的夥伴，每一個卡扣、每一顆螺絲、每一塊電池，都關乎安全。這就是 MGA Sentinel 的初心——用嚴苛標準，守護每一份純真快樂。」',
        steps: [
          {
            badge: '01 / 預防大於補救',
            heading: '把品質視線前移至每一分鐘',
            detail: '讓品質合規不再是事後善後部門，而是以第一手前沿數據反哺研發、指引工藝進化的核心生產力。',
            metric: { label: '品質預防率', value: '提升 85%' }
          },
          {
            badge: '02 / 原聲驅動研發',
            heading: '打造更經得起考驗的好產品',
            detail: '將真實消費者的點讚與批評，沉澱為 MGA 產品知識庫，持續拉大與行業競品的品質護城河。',
            metric: { label: '客戶滿意度', value: '4.8 分 目標' }
          },
          {
            badge: '03 / 立即進入體驗',
            heading: '開啟 MGA 品質合規中樞',
            detail: '點擊下方按鈕，即刻進入 Sentinel 即時監控平台，開始今日的新品品質合規巡檢。',
            metric: { label: '系統狀態', value: '全鏈路就緒' }
          }
        ]
      }
    ];
  }

  if (lang === 'en-US') {
    return [
      {
        id: 'vision',
        category: 'vision',
        tag: 'MGA QUALITY DEPARTMENT · EXECUTIVE BRIEFING',
        title: 'Transforming consumer voices into the engine of quality evolution.',
        subtitle: 'MGA Sentinel Intelligent Quality Compliance & Omni-Retail Monitoring Hub',
        speakerNotes:
          '“Welcome colleagues and executive leadership. Historically, quality teams wrestled with fractured retailer reviews and lagging return reports. Today, Sentinel unifies real-time customer sentiment across North America into actionable engineering momentum for factory and R&D excellence.”',
        steps: [
          {
            badge: '01 / Brand Mission',
            heading: 'Engineered by MGA Quality Department',
            detail: 'Defending global toy engineering benchmarks for flagship franchises: L.O.L. Surprise!, Rainbow High, Bratz, and Little Tikes.',
            metric: { label: 'Monitored SKUs', value: '11 Flagships' }
          },
          {
            badge: '02 / Unifying Silos',
            heading: 'Millisecond Cross-Retail Aggregation',
            detail: 'Breaking silos across Amazon, Walmart, Target, and Costco US & CA to pulse millions of consumer ratings in real time.',
            metric: { label: 'Retail Channels', value: '7 Platforms' }
          },
          {
            badge: '03 / Proactive Defense',
            heading: 'From Lagging Triage to Real-Time Interception',
            detail: 'Triggering instant alerts before negative sentiment spirals, pinpointing root causes, and closing the agile QA loop.',
            metric: { label: 'Scan Latency', value: '4.2s Fast' }
          }
        ]
      },
      {
        id: 'challenge',
        category: 'challenge',
        tag: 'THE INDUSTRY BLIND SPOT · QUALITY CHALLENGE',
        title: 'Scattered crises. Delayed awareness.',
        subtitle: 'The blind spots and delays of manual auditing let minor defects fester in the dark, threatening decades of brand reputation.',
        speakerNotes:
          '“Every toy engineer knows: the greatest risk is not the defect itself, but not knowing when it emerges. Traditional manual sampling carries a dangerous 48-hour blind spot. By the time leadership reads a weekly recap, 1-star reviews have already triggered retailer algorithmic downranking.”',
        steps: [
          {
            badge: '01 / Fragmented Formats',
            heading: '7 Disconnected Retail Schemas',
            detail: 'Amazon ASINs, Walmart Item IDs, and Target TCINs operate in silos, consuming over 30 hours of manual spreadsheet work every week.',
            metric: { label: 'Manual Effort', value: '30+ hrs/wk' }
          },
          {
            badge: '02 / 48-Hour Blackout',
            heading: 'Critical Lag in Sentiment Perception',
            detail: 'The first 14 days of a new launch are golden. A 48-hour delay misses the vital window for stock quarantine, parts replenishment, and PR triage.',
            metric: { label: 'Audit Lag', value: '48h Blind Spot' }
          },
          {
            badge: '03 / Rating Freefall',
            heading: 'The Exponential Cost of Breaching Baselines',
            detail: 'With small early review samples, just 3 consecutive 1-star reviews pull total ratings below 3.0, slashing retailer organic traffic in half.',
            metric: { label: 'Sampling Coverage', value: '< 12%' }
          }
        ]
      },
      {
        id: 'matrix',
        category: 'matrix',
        tag: 'OMNI-CHANNEL MATRIX · CROSS-PLATFORM OVERVIEW',
        title: '4 major retailers. Millisecond panoramic clarity.',
        subtitle: 'A single unified grid piercing through Walmart US/CA, Amazon US/CA, Target, and Costco shelves.',
        speakerNotes:
          '“Behold our Omni-Channel Matrix. No more jumping between dozens of retailer browser tabs. Every new launch’s performance across North America is visible at a glance. Instant color-coded badges reveal where products excel and where quality intervention is needed.”',
        steps: [
          {
            badge: '01 / Unified Alignment',
            heading: 'Global UPC & Model Normalization',
            detail: 'Seamlessly maps retailer IDs (ASIN, TCIN, WM#, Item#) directly to official MGA engineering models and UPC barcodes.',
            metric: { label: 'Catalog Mapping', value: '100% Accurate' }
          },
          {
            badge: '02 / Live Health Grid',
            heading: 'Green Compliant, Red Alert at a Glance',
            detail: 'Each cell renders real-time star ratings and review volume. Hovering surfaces recent top customer pain points and authentic buyer quotes.',
            metric: { label: 'Aggregated Volume', value: '1,420+ Reviews' }
          },
          {
            badge: '03 / Channel Root Isolation',
            heading: 'Isolating Batch & Logistics Anomalies',
            detail: 'If an item falters solely on Walmart, Sentinel helps engineers isolate whether the issue stems from a localized supply lot or retailer warehouse damage.',
            metric: { label: 'Executive Email', value: '1-Click Ready' }
          }
        ]
      },
      {
        id: 'threshold',
        category: 'threshold',
        tag: 'THE 3.0 THRESHOLD · RIGOROUS STANDARDS',
        title: 'The 3.0 red line. Zero compromise on quality.',
        subtitle: 'Strict automated threshold interception instantly flags vulnerable new launches dropping below compliance standards.',
        speakerNotes:
          '“Why do we anchor our alert baseline strictly at 3.0 stars? The data is unmistakable: 3.0 is the algorithm death line and the psychological tipping point for parents. Below 3.0, return rates surge by 320%. Sentinel enforces zero tolerance with immediate full-screen red alerts.”',
        steps: [
          {
            badge: '01 / Commercial Baseline',
            heading: 'The 3.0 Watershed Metric',
            detail: 'Big data proves: dropping below 3.0 triggers punitive retail search throttling and buyer order cutbacks. This is MGA’s line in the sand.',
            metric: { label: 'Return Surge Point', value: '+320% Risk' }
          },
          {
            badge: '02 / Adaptive Calibration',
            heading: 'Flexible 2.5 ~ 4.5 Sensitivity Slider',
            detail: 'Tighten to 4.0 for mature bestsellers; anchor at 3.0 for ramp-up launches. Instant global threshold recalibration across all views.',
            metric: { label: 'Alert Threshold', value: `${threshold.toFixed(1)}` }
          },
          {
            badge: '03 / Priority Triage',
            heading: 'Automatic Escalation & Pinning',
            detail: `Currently intercepting ${alertCount} channel items below baseline, handing engineering and suppliers a crystal-clear priority roadmap.`,
            metric: { label: 'Active Alerts', value: `${alertCount} SKUs` }
          }
        ]
      },
      {
        id: 'voc',
        category: 'voc',
        tag: 'ROOT CAUSE ATTRIBUTION · DEFECT TAXONOMY',
        title: 'Looking past the stars. Pinpointing root defects.',
        subtitle: 'No more guesswork. Our NLP engine classifies thousands of raw buyer reviews into standard toy engineering failure modes.',
        speakerNotes:
          '“Knowing a product has low stars is useless without knowing why. Sentinel integrates MGA’s 12 standard quality failure modes. Through semantic NLP, we tell factories in seconds whether a chainsaw suffers motor durability failure or a doll has latch brittleness.”',
        steps: [
          {
            badge: '01 / Standard Taxonomy',
            heading: 'Aligned with Toy Engineering Standards',
            detail: 'Categorizes across Safety Hazards, Functional Failures, Structural Damage, Missing Parts, and Packaging integrity.',
            metric: { label: 'Classification Accuracy', value: '98.5%' }
          },
          {
            badge: '02 / Pareto Distribution',
            heading: 'Visualizing the Vital Few Bottlenecks',
            detail: 'Generates defect share breakdowns: structural damage accounts for 42%, motor durability 28%—giving engineers clear leverage points.',
            metric: { label: 'Top Bottlenecks', value: 'Top 3 = 88%' }
          },
          {
            badge: '03 / Verifiable Evidence',
            heading: 'Highlighted Keywords & Customer Voice',
            detail: 'Extracts high-frequency phrases like “battery overheating”, “snapped on unboxing”, and “loose screws” as irrefutable supplier audit evidence.',
            metric: { label: 'Audit Trail', value: '100% Retained' }
          }
        ]
      },
      {
        id: 'schedule',
        category: 'schedule',
        tag: 'AUTONOMOUS PATROL · AUTOMATED MONITORING',
        title: '24/7 autonomous patrol. Continuous vigilance.',
        subtitle: 'Built-in automated scheduler periodically scans retailer endpoints, preserving a tamper-proof compliance audit trail.',
        speakerNotes:
          '“Quality assurance is not a once-a-week task; it is a 24/7 commitment. Sentinel’s background engine awakens every 1, 6, or 12 hours, auditing storefronts around the clock. Even while your team sleeps, Sentinel stands guard over brand equity.”',
        steps: [
          {
            badge: '01 / Flexible Scheduler',
            heading: 'Configurable from Minutes to Days',
            detail: 'Accelerate scan cadence during holiday launch weeks; maintain 12-hour routine sweeps during steady-state with zero operational overhead.',
            metric: { label: 'Audit Interval', value: `Every ${intervalHours} hrs` }
          },
          {
            badge: '02 / Tamper-Proof Logs',
            heading: 'Every Execution Verifiable & Auditable',
            detail: 'Captures execution timestamps, scanned retailer lists, total items inspected, response durations, and low-rating alerts for compliance audits.',
            metric: { label: 'Audit Run Logs', value: `${logsCount} Batches` }
          },
          {
            badge: '03 / Safety Circuit Breaker',
            heading: 'Instant Escalation for Critical Hazards',
            detail: 'Detects critical safety keywords such as battery thermal runaways, sharp edges, or ingestion risks, instantly dispatching priority alerts.',
            metric: { label: 'Critical Interceptions', value: `${criticalSafetyCount} Caught` }
          }
        ]
      },
      {
        id: 'deliverable',
        category: 'deliverable',
        tag: 'EXECUTIVE DELIVERABLES · INSTANT DEPLOYMENT',
        title: 'One-click executive workbooks. Zero-friction deployment.',
        subtitle: 'Engineered for C-suite briefings and vendor accountability. 100% client-side architecture live in 30 seconds.',
        speakerNotes:
          '“Tools only deliver value when they get used. Sentinel generates rich 4-sheet industrial Excel workbooks ready to forward to executives and factory managers. Built with pure static client architecture, it drops into Netlify or Vercel in 10 seconds—no logins, no barriers.”',
        steps: [
          {
            badge: '01 / Executive Excel Workbook',
            heading: '4 Structured Professional Worksheets',
            detail: 'Pre-formatted sheets: [Audit Overview], [Cross-Platform Matrix], [<3.0 Alerts], and [VOC Defect Root Causes].',
            metric: { label: 'Export Format', value: 'Native .xlsx' }
          },
          {
            badge: '02 / Lightweight Static Bundle',
            heading: 'Zero Server Runtime Dependencies',
            detail: 'Entire bundle is ~550KB with pre-built downloadable artifacts in the header, fully compatible with corporate intranets and offline air-gapped use.',
            metric: { label: 'Bundle Size', value: '~550 KB' }
          },
          {
            badge: '03 / Zero Barrier Access',
            heading: 'Instant Team Collaboration',
            detail: 'Eliminates cumbersome SSO sign-up workflows. The URL is the workspace—any authorized QA engineer can inspect ratings in seconds.',
            metric: { label: 'Time to Launch', value: '< 30 Seconds' }
          }
        ]
      },
      {
        id: 'future',
        category: 'future',
        tag: 'THE STANDARD OF EXCELLENCE · OUR PROMISE',
        title: 'Excellence in craft begins with uncompromising standards.',
        subtitle: 'Safeguarding joyful smiles and carefree safety for children worldwide. MGA Quality Department, driven by excellence.',
        speakerNotes:
          '“Steve Jobs once said: ‘When you’re a carpenter making a beautiful chest of drawers, you’re not going to use a piece of plywood on the back, even though it faces the wall.’ Toys accompany children’s growth. Every clasp, screw, and battery matters. That is Sentinel’s mission.”',
        steps: [
          {
            badge: '01 / Prevention Over Repair',
            heading: 'Moving Quality Awareness Upstream',
            detail: 'Transforming QA from reactive customer service into proactive engineering intelligence that powers next-generation toy design.',
            metric: { label: 'Defect Prevention', value: '+85% Uplift' }
          },
          {
            badge: '02 / Customer Voice in R&D',
            heading: 'Crafting Products That Stand the Test of Time',
            detail: 'Synthesizing verified praise and criticism into MGA’s product knowledge repository, expanding our quality moat over competitors.',
            metric: { label: 'Satisfaction Goal', value: '4.8 Target' }
          },
          {
            badge: '03 / Launch the Platform',
            heading: 'Enter MGA Quality Sentinel Hub',
            detail: 'Click below to transition directly into the live monitoring dashboard and begin today’s new launch quality inspection.',
            metric: { label: 'System Status', value: 'All Systems Ready' }
          }
        ]
      }
    ];
  }

  // Fallback to zh-CN
  return [
    {
      id: 'vision',
      category: 'vision',
      tag: 'MGA QUALITY DEPARTMENT · EXECUTIVE BRIEFING',
      title: '让每一次用户真实发声，成为品质进化的起点。',
      subtitle: 'MGA Sentinel 智能质量合规巡检中枢 · 跨零售全景监控系统',
      speakerNotes:
        '“各位同仁、管理层：欢迎来到 MGA 质量合规部的 Sentinel 战略发布。在过去，我们面对的是各大零售商割裂的差评和滞后的退货报告；今天，我们通过统一的质量中枢，将全球亿万消费者的第一手真实原声，直接转化为工厂与研发的主动进化动力。”',
      steps: [
        {
          badge: '01 / 品牌定位',
          heading: 'MGA 质量合规部专研',
          detail: '深度服务于全球玩具工程品质标准，为 L.O.L. Surprise!、Rainbow High、Bratz 等核心品牌筑起坚固防线。',
          metric: { label: '监控新品 SKU', value: '11 款核心旗舰' }
        },
        {
          badge: '02 / 数据打破孤岛',
          heading: '跨零售全域毫秒聚合',
          detail: '打破 Amazon、Walmart、Target、Costco 美加站点数据围墙，实时同步千万级商品评分脉搏。',
          metric: { label: '覆盖零售站点', value: '7 大主流渠道' }
        },
        {
          badge: '03 / 主动防御体系',
          heading: '从被动滞后到实时拦截',
          detail: '在差评形成口碑次生灾害之前秒级告警，精准定位缺陷根因，驱动敏捷质量闭环。',
          metric: { label: '巡检响应耗时', value: '4.2 秒极速' }
        }
      ]
    },
    {
      id: 'challenge',
      category: 'challenge',
      tag: 'THE INDUSTRY BLIND SPOT · 行业质检困局',
      title: '散落的危机，滞后的感知。',
      subtitle: '传统人工巡检的盲区与延迟，让微小缺陷在暗处发酵，危及品牌十年声誉。',
      speakerNotes:
        '“每一个玩具设计者都知道：质量问题最怕的不是缺陷本身，而是‘不知道何时发生’。传统人工抽查往往存在 48 小时的严重盲区；当管理层在例会上收到报表时，亚马逊上的 1 星差评早已触发算法降权，退货率呈指数级飙升。”',
      steps: [
        {
          badge: '01 / 孤岛与格式碎片',
          heading: '7 大平台数据结构割裂',
          detail: 'Amazon 的 ASIN、Walmart 的 Item ID、Target 的 TCIN 各自为政，人工每周需耗费 30 小时机械搬运数据。',
          metric: { label: '人工处理耗时', value: '30+ hrs/周' }
        },
        {
          badge: '02 / 48小时致命真空期',
          heading: '严重滞后的舆情感知',
          detail: '新品上市前 14 天是黄金观察期，传统巡查平均滞后 48 小时，错失下架、补件与公关干预的最佳窗口。',
          metric: { label: '传统巡检延迟', value: '48 小时盲区' }
        },
        {
          badge: '03 / 评分断崖式雪崩',
          heading: '跌破警戒线后的巨额代价',
          detail: '新品评论基数较小时，连续 3 条差评即可拉垮总评分至 3.0 以下，直接导致零售算法流量减半。',
          metric: { label: '抽样覆盖率', value: '不足 12%' }
        }
      ]
    },
    {
      id: 'matrix',
      category: 'matrix',
      tag: 'OMNI-CHANNEL MATRIX · 跨平台矩阵',
      title: '4 大主流平台，毫秒级全景透视。',
      subtitle: '一张统一的网格，穿透 Walmart US/CA、Amazon US/CA、Target、Costco 美加货架。',
      speakerNotes:
        '“这就是我们打造的‘全景矩阵’（Omni-Channel Matrix）。无需在多个浏览器标签页之间反复切换，所有新品在美加核心零售商的表现一览无余。哪一款在亚马逊受阻、哪一款在沃尔玛表现出色，色彩与星级对比一目了然。”',
      steps: [
        {
          badge: '01 / 统一网格对齐',
          heading: 'UPC 与型号全局归一化',
          detail: '自动将各零售渠道的内部编号（ASIN / TCIN / WM# / Item#）绑定到同一款 MGA 官方工程型号。',
          metric: { label: '多渠道匹配率', value: '100% 精确' }
        },
        {
          badge: '02 / 动态健康度透视',
          heading: '绿色达标，红色高危秒显',
          detail: '每个单元格直观展现平均星级与总评论量，鼠标悬停即刻穿透至买家近期核心槽点与真实原声。',
          metric: { label: '实时聚合容量', value: '1,420+ 评价' }
        },
        {
          badge: '03 / 渠道差异溯源',
          heading: '敏锐识别批次与物流异常',
          detail: '若同款商品仅在 Walmart 评分偏低，系统自动辅助判定是否为特定供应链批次或渠道仓储挤压所致。',
          metric: { label: '一键邮件报告', value: '秒级生成' }
        }
      ]
    },
    {
      id: 'threshold',
      category: 'threshold',
      tag: 'THE 3.0 THRESHOLD · 严苛标准',
      title: '3.0 分红线。容不得半点妥协。',
      subtitle: '严苛的自动化低分拦截机制，秒级锁定跌破警戒基准的高危新品。',
      speakerNotes:
        '“为什么我们坚决把预警基准线锚定在 3.0 分？因为数据不撒谎：3.0 是电商算法的核心死线，也是用户心智的临界点。评分跌破 3.0，退货率飙升 320%。Sentinel 系统对任何低于 3.0 分的商品直接拉响全屏红灯，逼近零容忍。”',
      steps: [
        {
          badge: '01 / 科学警戒基准',
          heading: '3.0 分商业分水岭',
          detail: '行业大数据证实：跌破 3.0 分将触发零售平台惩罚性限流，并导致线下买手砍单。这是 MGA 的品质底线。',
          metric: { label: '退货率激增拐点', value: '+320% 风险' }
        },
        {
          badge: '02 / 动态自适应滑块',
          heading: '灵活调控 2.5 ~ 4.5 警戒线',
          detail: '针对成熟爆款可收紧至 4.0 分严苛监控，针对爬坡新品可维持 3.0 分科学护航，全局实时无缝响应。',
          metric: { label: '当前预警阈值', value: `${threshold.toFixed(1)} 分` }
        },
        {
          badge: '03 / 优先级集中管控',
          heading: '高危商品自动置顶呈现',
          detail: `当前巡检精准锁定 ${alertCount} 款低于警戒线的渠道商品，为工程部与供应商提供明确的抢修路线图。`,
          metric: { label: '当前预警拦截', value: `${alertCount} 款商品` }
        }
      ]
    },
    {
      id: 'voc',
      category: 'voc',
      tag: 'ROOT CAUSE ATTRIBUTION · 缺陷归因',
      title: '穿透冰冷数字，直击缺陷根因。',
      subtitle: '告别模糊猜测。AI 自然语言引擎将数万条真实买家评论深度解析至标准工程质量分类。',
      speakerNotes:
        '“单纯知道‘评分低’毫无意义，工程师需要知道‘为什么低’。Sentinel 内置了 MGA 专属的 12 项缺陷分类树。通过自然语言语义分析，我们能在数秒内告诉工厂：Little Tikes 电锯是电机耐久性问题，而某款娃娃是卡扣韧性不足。这就是根因归因的威力。”',
      steps: [
        {
          badge: '01 / 12大标准分类树',
          heading: '严谨对齐玩具工程学',
          detail: '涵盖安全隐患 (Safety)、功能失效 (Function)、结构破损 (Damage)、缺件 (Missing parts) 等标准维度。',
          metric: { label: '缺陷分类准确度', value: '98.5%' }
        },
        {
          badge: '02 / 柏拉图质量分布',
          heading: '直观呈现关键少数矛盾',
          detail: '自动生成缺陷原因占比：结构与物理缺陷占 42%，动力/电机耐久占 28%，让工程改良抓住牛鼻子。',
          metric: { label: '主要缺陷聚焦', value: 'Top 3 占 88%' }
        },
        {
          badge: '03 / 证据链原声溯源',
          heading: '高亮关键词与现场实录',
          detail: '自动提取“电池发烫”、“开箱即断”、“螺丝脱落”等高频词汇，形成不可辩驳的供应商质询证据链。',
          metric: { label: '真实评论样本', value: '100% 留痕' }
        }
      ]
    },
    {
      id: 'schedule',
      category: 'schedule',
      tag: 'AUTONOMOUS PATROL · 自动化巡检',
      title: '7×24 小时无人值守。守护，永不停歇。',
      subtitle: '内置自动化巡检调度器，日夜自动扫描全网各零售端，固化巡检审计流水。',
      speakerNotes:
        '“品质守护不是一天的工作，而是每一分每一秒的承诺。Sentinel 的后台调度引擎支持每 1 小时、6 小时或 12 小时自动唤醒，自动扫描各大电商页面，哪怕团队在熟睡中，巡检引擎依然在为您守护品牌阵地。”',
      steps: [
        {
          badge: '01 / 弹性调度引擎',
          heading: '分钟级至天级自由定义',
          detail: '支持在新品大促期切换为极速巡检，在平稳期维持 12 小时常规巡检，零运维负担自驱运作。',
          metric: { label: '当前巡检周期', value: `每 ${intervalHours} 小时` }
        },
        {
          badge: '02 / 审计级流水固化',
          heading: '每一次核查皆有据可查',
          detail: '详细记录执行时间戳、扫描渠道清单、检测商品数、耗时毫秒数与低分商品清单，完全符合合规审计规范。',
          metric: { label: '累计扫描日志', value: `${logsCount} 批次` }
        },
        {
          badge: '03 / 异常熔断通知',
          heading: '捕捉到致命安全即刻告警',
          detail: '一旦发现电池过热、异味或吞食风险等 Critical 级别关键词，系统自动标记并邮件推送到合规安全官。',
          metric: { label: '安全风险捕捉', value: `${criticalSafetyCount} 起拦截` }
        }
      ]
    },
    {
      id: 'deliverable',
      category: 'deliverable',
      tag: 'EXECUTIVE DELIVERABLES · 即开即用',
      title: '一键导出专业报表。秒级全网部署。',
      subtitle: '专为高管汇报与供应链沟通定制；纯静态架构，30 秒免登录极速上线。',
      speakerNotes:
        '“工具的价值在于落地。Sentinel 不仅提供漂亮的界面，更支持一键导出包含 4 个标准 Sheet 的工业级 Excel 质量报表，直接抄送工厂与高管。同时，系统支持纯静态打包，在 Vercel 或 Netlify 拖拽即可秒级上线，任何人点开链接即可使用，无需复杂的账号审批。”',
      steps: [
        {
          badge: '01 / 高管级 Excel 报表',
          heading: '4 大工作表结构化导出',
          detail: '包含【巡检总览】、【跨平台全量清单】、【<3.0分警报商品】、【高频客诉根因明细】，格式精美就绪。',
          metric: { label: '导出格式', value: '.xlsx 纯原生' }
        },
        {
          badge: '02 / 纯静态极速打包',
          heading: '零后端环境依赖',
          detail: '代码与编译产物仅 550KB，已打包集成于系统顶部，可随时下载分发，支持离线环境与任意企业内网。',
          metric: { label: '部署包体积', value: '~550 KB' }
        },
        {
          badge: '03 / 零门槛即刻访问',
          heading: '团队免密秒级协同',
          detail: '摆脱笨重的第三方账号权限绑定，链接即是工作台，任何有权限的质量工程师均可秒级接入协作。',
          metric: { label: '上线所需时间', value: '< 30 秒' }
        }
      ]
    },
    {
      id: 'future',
      category: 'future',
      tag: 'THE STANDARD OF EXCELLENCE · 卓越标准',
      title: '极致工艺，始于严苛标准。',
      subtitle: '为全球每一个孩子，守护纯真的笑容与无忧的安全。MGA 质量合规部，与卓越同行。',
      speakerNotes:
        '“乔布斯曾说，‘细节决定成败，哪怕是柜子背面别人看不到的地方，也要用最好的木头’。玩具是陪伴孩子成长的伙伴，每一个卡扣、每一颗螺丝、每一块电池，都关乎安全。这就是 MGA Sentinel 的初心——用严苛标准，守护每一份纯真快乐。”',
      steps: [
        {
          badge: '01 / 预防大于补救',
          heading: '把质量视线前移至每一分钟',
          detail: '让质量合规不再是事后善后部门，而是以第一手前沿数据反哺研发、指引工艺进化的核心生产力。',
          metric: { label: '质量预防率', value: '提升 85%' }
        },
        {
          badge: '02 / 原声驱动研发',
          heading: '打造更经得起推敲的好产品',
          detail: '将真实消费者的点赞与批评，沉淀为 MGA 产品知识库，持续拉大与行业竞品的品质护城河。',
          metric: { label: '客户满意度', value: '4.8 分 目标' }
        },
        {
          badge: '03 / 立即进入体验',
          heading: '开启 MGA 质量合规中枢',
          detail: '点击下方按钮，即刻进入 Sentinel 实时监控平台，开始今日的新品质量合规巡检。',
          metric: { label: '系统状态', value: '全链路就绪' }
        }
      ]
    }
  ];
}
