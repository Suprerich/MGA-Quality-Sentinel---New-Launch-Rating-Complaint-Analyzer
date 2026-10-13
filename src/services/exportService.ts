import * as XLSX from 'xlsx';
import { ProductItem, PLATFORMS, PlatformKey } from '../types/qa';
import { Language } from '../i18n/translations';

export class ExportService {
  /**
   * Generates and triggers download of a comprehensive multi-sheet Excel (.xlsx) workbook
   */
  static exportFullExcel(
    products: ProductItem[],
    threshold: number = 3.0,
    filenamePrefix: string = 'MGA_Quality_Compliance_Inspection',
    lang: Language = 'zh-CN'
  ): void {
    const wb = XLSX.utils.book_new();
    const nowStr = new Date().toISOString().slice(0, 10);

    // Sheet titles & headers based on language
    const isEn = lang === 'en-US';
    const isTw = lang === 'zh-TW';

    const sheet1Title = isEn ? '1.Rating_Overview' : isTw ? '1.低分預警彙總' : '1.低分预警汇总';
    const sheet2Title = isEn ? '2.Cross_Platform_Matrix' : isTw ? '2.跨平臺對比矩陣' : '2.跨平台对比矩阵';
    const sheet3Title = isEn ? '3.Complaint_Details' : isTw ? '3.差評客訴明細' : '3.差评客诉明细';
    const sheet4Title = isEn ? '4.QA_Defect_Statistics' : isTw ? '4.QA缺陷統計分析' : '4.QA缺陷统计分析';

    const overviewHeaders = isEn ? [
      'Retailer Channel',
      'Product Name',
      'Brand',
      'UPC Barcode',
      'Model #',
      'Retailer ID (TCIN/ASIN/WM#)',
      'New Launch',
      'Avg Rating',
      'Review Count',
      'Alert Status',
      'Main QA Defect',
      'Issue Breakdown',
      'Country of Origin',
      'Product URL',
      'Last Checked At'
    ] : isTw ? [
      '渠道平臺 (Retailer)',
      '商品名稱 (Product Name)',
      '品牌 (Brand)',
      'UPC 碼',
      '型號 (Model #)',
      '渠道編號 (Item / TCIN / ASIN)',
      '新品標識 (New Launch)',
      '平均評分 (Avg Rating)',
      '評價總數 (Review Count)',
      '預警狀態 (Alert Status < 3.0)',
      '主要客訴問題 (Main QA Issue)',
      '缺陷分類頻次 (Issue Breakdown)',
      '原產地 (Country of Origin)',
      '商品詳情連結 (Product URL)',
      '最新核查時間 (Last Checked)'
    ] : [
      '渠道平台 (Retailer)',
      '商品名称 (Product Name)',
      '品牌 (Brand)',
      'UPC 码',
      '型号 (Model #)',
      '渠道编号 (Item / TCIN / ASIN)',
      '新品标识 (New Launch)',
      '平均评分 (Avg Rating)',
      '评价总数 (Review Count)',
      '预警状态 (Alert Status < 3.0)',
      '主要客诉问题 (Main QA Issue)',
      '缺陷分类频次 (Issue Breakdown)',
      '原产地 (Country of Origin)',
      '商品详情链接 (Product URL)',
      '最新核查时间 (Last Checked)'
    ];

    const overviewRows = products.map(p => [
      PLATFORMS[p.platform]?.name || p.platform,
      p.name,
      p.brand || 'MGA',
      p.upc,
      p.model,
      p.platformId,
      p.isNewLaunch ? (isEn ? 'YES' : 'YES (新品)') : 'NO',
      p.rating,
      p.reviewCount,
      p.rating < threshold
        ? (isEn ? `ALERT (<${threshold.toFixed(1)})` : `ALERT (低于${threshold.toFixed(1)}分警戒)`)
        : 'OK',
      p.mainIssue,
      p.issueBreakdownText,
      p.countryOfOrigin,
      p.url,
      p.lastCheckedAt
    ]);

    const wsOverview = XLSX.utils.aoa_to_sheet([overviewHeaders, ...overviewRows]);
    wsOverview['!cols'] = [
      { wch: 16 }, { wch: 38 }, { wch: 14 }, { wch: 16 }, { wch: 14 },
      { wch: 16 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 20 },
      { wch: 20 }, { wch: 30 }, { wch: 12 }, { wch: 40 }, { wch: 20 }
    ];
    XLSX.utils.book_append_sheet(wb, wsOverview, sheet1Title);

    // -------------------------------------------------------------
    // Sheet 2: Cross-Platform Comparison Matrix
    // -------------------------------------------------------------
    const groupsMap = new Map<string, {
      name: string;
      upc: string;
      model: string;
      brand: string;
      isNewLaunch: boolean;
      platforms: Partial<Record<PlatformKey, { rating: number; count: number; url: string }>>;
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
      const g = groupsMap.get(key)!;
      g.platforms[p.platform] = { rating: p.rating, count: p.reviewCount, url: p.url };
    }

    const platKeys: PlatformKey[] = ['WMUS', 'WMCA', 'AMZUS', 'AMZCA', 'TARGET', 'COSTCOUS', 'COSTCOCA'];
    const matrixHeaders = isEn ? [
      'Product Name',
      'UPC Barcode',
      'Model #',
      'Brand',
      'Walmart US',
      'Walmart CA',
      'Amazon US',
      'Amazon CA',
      'Target',
      'Costco US',
      'Costco CA',
      `Below ${threshold.toFixed(1)} Channels`,
      'Lowest Rating',
      'Compliance Status'
    ] : isTw ? [
      '商品名稱 (Product)',
      'UPC 碼',
      '型號 (Model)',
      '品牌 (Brand)',
      'Walmart US',
      'Walmart CA',
      'Amazon US',
      'Amazon CA',
      'Target',
      'Costco US',
      'Costco CA',
      `低於 ${threshold.toFixed(1)} 分渠道數`,
      '全渠道最低評分',
      '整體合規判定'
    ] : [
      '商品名称 (Product)',
      'UPC 码',
      '型号 (Model)',
      '品牌 (Brand)',
      'Walmart US',
      'Walmart CA',
      'Amazon US',
      'Amazon CA',
      'Target',
      'Costco US',
      'Costco CA',
      `低于 ${threshold.toFixed(1)} 分渠道数`,
      '全渠道最低评分',
      '整体合规判定'
    ];

    const matrixRows = Array.from(groupsMap.values()).map(g => {
      let belowCount = 0;
      let minRating = 5.0;
      let hasRatings = false;

      const platCols = platKeys.map(k => {
        const item = g.platforms[k];
        if (!item || item.rating === null || item.rating === undefined) return 'N/A';
        hasRatings = true;
        if (item.rating < threshold) belowCount++;
        if (item.rating < minRating) minRating = item.rating;
        return `${item.rating.toFixed(1)} (${item.count})`;
      });

      return [
        g.name,
        g.upc,
        g.model,
        g.brand,
        ...platCols,
        belowCount,
        hasRatings ? minRating.toFixed(1) : 'N/A',
        belowCount > 0
          ? (isEn ? `ALERT (${belowCount} Low)` : `ALERT (${belowCount}渠道低分)`)
          : 'OK'
      ];
    });

    const wsMatrix = XLSX.utils.aoa_to_sheet([matrixHeaders, ...matrixRows]);
    wsMatrix['!cols'] = [
      { wch: 36 }, { wch: 16 }, { wch: 14 }, { wch: 14 },
      { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
      { wch: 18 }, { wch: 14 }, { wch: 16 }
    ];
    XLSX.utils.book_append_sheet(wb, wsMatrix, sheet2Title);

    // -------------------------------------------------------------
    // Sheet 3: Detailed Complaint Reviews Log
    // -------------------------------------------------------------
    const complaintHeaders = isEn ? [
      '#',
      'Product Name',
      'Retailer Channel',
      'Star Rating',
      'Defect Category',
      'Severity',
      'Sentiment',
      'Trigger Keywords',
      'Reviewer',
      'Review Date',
      'Review Title',
      'Review Comment Body',
      'Source Product URL'
    ] : isTw ? [
      '序號',
      '商品名稱 (Product)',
      '渠道平臺 (Retailer)',
      '買家評分 (Star Rating)',
      '缺陷分類 (Issue Type)',
      '嚴重等級 (Severity)',
      '情感傾向 (Sentiment)',
      '命中缺陷關鍵詞 (Keywords)',
      '評價人 (Reviewer)',
      '評價日期 (Date)',
      '評價標題 (Title)',
      '評價具體內容 (Review Comment)',
      '原商品連結 (URL)'
    ] : [
      '序号',
      '商品名称 (Product)',
      '渠道平台 (Retailer)',
      '买家评分 (Star Rating)',
      '缺陷分类 (Issue Type)',
      '严重等级 (Severity)',
      '情感倾向 (Sentiment)',
      '命中缺陷关键词 (Keywords)',
      '评价人 (Reviewer)',
      '评价日期 (Date)',
      '评价标题 (Title)',
      '评价具体内容 (Review Comment)',
      '原商品链接 (URL)'
    ];

    const complaintRows: any[] = [];
    let complaintIndex = 1;

    for (const p of products) {
      for (const rev of p.reviews) {
        complaintRows.push([
          complaintIndex++,
          p.name,
          PLATFORMS[p.platform]?.name || p.platform,
          `${rev.rating}.0 / 5.0`,
          rev.issueType,
          rev.severity,
          rev.sentiment,
          (rev.keywords || []).join(', '),
          rev.author,
          rev.date,
          rev.title || '',
          rev.comment,
          p.url
        ]);
      }
    }

    const wsComplaints = XLSX.utils.aoa_to_sheet([complaintHeaders, ...complaintRows]);
    wsComplaints['!cols'] = [
      { wch: 8 }, { wch: 32 }, { wch: 14 }, { wch: 12 }, { wch: 18 },
      { wch: 12 }, { wch: 12 }, { wch: 24 }, { wch: 16 }, { wch: 14 },
      { wch: 24 }, { wch: 60 }, { wch: 35 }
    ];
    XLSX.utils.book_append_sheet(wb, wsComplaints, sheet3Title);

    // -------------------------------------------------------------
    // Sheet 4: QA Defect Breakdown Statistics
    // -------------------------------------------------------------
    const defectCounts: Record<string, number> = {};
    const severityCounts: Record<string, number> = { Critical: 0, Major: 0, Minor: 0 };
    let totalComplaints = 0;

    for (const p of products) {
      for (const rev of p.reviews) {
        totalComplaints++;
        defectCounts[rev.issueType] = (defectCounts[rev.issueType] || 0) + 1;
        if (severityCounts[rev.severity] !== undefined) {
          severityCounts[rev.severity]++;
        }
      }
    }

    const defectStatHeaders = isEn
      ? ['Defect Category', 'Severity', 'Frequency', 'Percentage']
      : ['缺陷类型 (Issue Category)', '严重等级 (Severity)', '出现频次 (Frequency)', '占比 (Percentage)'];

    const defectStatRows = Object.entries(defectCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([issue, count]) => {
        let sev = 'Minor';
        if (issue === 'Safety') sev = 'Critical';
        else if (['Function issue', 'Missing parts', 'Damage', 'Quality'].includes(issue)) sev = 'Major';
        const pct = totalComplaints > 0 ? `${((count / totalComplaints) * 100).toFixed(1)}%` : '0%';
        return [issue, sev, count, pct];
      });

    const summarySection = [
      [],
      isEn
        ? ['Severity Distribution', 'Count', 'Share']
        : ['严重等级汇总 (Severity Distribution)', '数量 (Count)', '占比 (Percentage)'],
      [
        isEn ? 'Critical (Safety & Compliance)' : 'Critical (严重安全/合规问题)',
        severityCounts.Critical,
        totalComplaints > 0 ? `${((severityCounts.Critical / totalComplaints) * 100).toFixed(1)}%` : '0%'
      ],
      [
        isEn ? 'Major (Function / Missing / Broken)' : 'Major (主要功能/缺件/破损)',
        severityCounts.Major,
        totalComplaints > 0 ? `${((severityCounts.Major / totalComplaints) * 100).toFixed(1)}%` : '0%'
      ],
      [
        isEn ? 'Minor (Packaging / Assembly)' : 'Minor (轻微包装/组装/说明书)',
        severityCounts.Minor,
        totalComplaints > 0 ? `${((severityCounts.Minor / totalComplaints) * 100).toFixed(1)}%` : '0%'
      ],
      [],
      [isEn ? 'Audit Date' : '核查时间 (Inspection Date)', nowStr],
      [isEn ? 'Alert Threshold' : '设定的评分警戒阈值 (Alert Threshold)', `< ${threshold.toFixed(1)}`]
    ];

    const wsStats = XLSX.utils.aoa_to_sheet([defectStatHeaders, ...defectStatRows, ...summarySection]);
    wsStats['!cols'] = [{ wch: 30 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, wsStats, sheet4Title);

    XLSX.writeFile(wb, `${filenamePrefix}_${nowStr}.xlsx`);
  }

  /**
   * Generates formatted HTML email table for direct copy-paste into Outlook / Gmail
   */
  static buildEmailTableHtml(products: ProductItem[], threshold: number = 3.0, lang: Language = 'zh-CN'): string {
    const isEn = lang === 'en-US';
    const isTw = lang === 'zh-TW';
    const platKeys: PlatformKey[] = ['WMUS', 'WMCA', 'AMZUS', 'AMZCA', 'TARGET', 'COSTCOUS', 'COSTCOCA'];
    const groupsMap = new Map<string, {
      name: string;
      upc: string;
      platforms: Partial<Record<PlatformKey, { rating: number; count: number }>>;
    }>();

    for (const p of products) {
      const key = p.upc || p.name;
      if (!groupsMap.has(key)) {
        groupsMap.set(key, { name: p.name, upc: p.upc, platforms: {} });
      }
      groupsMap.get(key)!.platforms[p.platform] = { rating: p.rating, count: p.reviewCount };
    }

    const headers = isEn
      ? ['Product Name', 'UPC', 'Walmart US', 'Walmart CA', 'Amazon US', 'Amazon CA', 'Target', 'Costco US', 'Costco CA', `Below ${threshold.toFixed(1)} Channels`]
      : ['新品/商品名称', 'UPC', 'Walmart US', 'Walmart CA', 'Amazon US', 'Amazon CA', 'Target', 'Costco US', 'Costco CA', `低于${threshold.toFixed(1)}分渠道数`];

    let html = `<div style="font-family: Calibri, -apple-system, sans-serif; font-size: 13px; color: #1e293b;">`;
    html += `<h3 style="color: #0f172a; margin-bottom: 8px;">${
      isEn
        ? 'MGA Quality & Compliance Multi-Channel Rating Audit'
        : isTw
        ? 'MGA 品質合規跨渠道評分巡檢週報 / 日報'
        : 'MGA 质量合规跨渠道评分巡检周报 / 日报'
    }</h3>`;
    html += `<p style="color: #64748b; font-size: 12px; margin-top: 0;">${
      isEn
        ? `Audited: ${new Date().toLocaleString()} | Alert Threshold: < ${threshold.toFixed(1)} | Format: Avg (Review Count)`
        : `核查时间: ${new Date().toLocaleString()} | 警戒阈值: < ${threshold.toFixed(1)} 分 | 单元格格式: 平均分 (评价总数)`
    }</p>`;

    html += `<table border="1" cellspacing="0" cellpadding="6" style="border-collapse: collapse; font-size: 12px; width: 100%; border: 1px solid #cbd5e1;">`;
    html += `<tr style="background-color: #0f172a; color: #ffffff;">`;
    headers.forEach(h => {
      html += `<th style="padding: 6px 8px; text-align: left; font-weight: 600;">${h}</th>`;
    });
    html += `</tr>`;

    Array.from(groupsMap.values()).forEach((g, idx) => {
      let belowCount = 0;
      const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
      html += `<tr style="background-color: ${bg};">`;
      html += `<td style="padding: 6px 8px; font-weight: 500;">${g.name}</td>`;
      html += `<td style="padding: 6px 8px; font-family: Consolas, monospace; color: #64748b;">${g.upc || '-'}</td>`;

      platKeys.forEach(k => {
        const item = g.platforms[k];
        if (!item || item.rating === null || item.rating === undefined) {
          html += `<td style="padding: 6px 8px; text-align: center; color: #94a3b8;">N/A</td>`;
        } else {
          const isBelow = item.rating < threshold;
          if (isBelow) belowCount++;
          const colorStyle = isBelow ? 'color: #dc2626; font-weight: bold; background-color: #fee2e2;' : 'color: #0f172a;';
          html += `<td style="padding: 6px 8px; text-align: center; ${colorStyle}">${item.rating.toFixed(1)} (${item.count})</td>`;
        }
      });

      const countStyle = belowCount > 0 ? 'color: #dc2626; font-weight: bold; background-color: #fee2e2;' : 'color: #16a34a; font-weight: 600;';
      html += `<td style="padding: 6px 8px; text-align: center; ${countStyle}">${belowCount}</td>`;
      html += `</tr>`;
    });

    html += `</table>`;

    // Key findings bullet list
    html += `<div style="margin-top: 14px; padding: 12px; background-color: #f1f5f9; border-radius: 6px;">`;
    html += `<strong style="color: #0f172a; font-size: 13px;">${
      isEn ? 'Key Quality Findings:' : '关键质量合规发现 (Key Quality Findings):'
    }</strong>`;
    html += `<ul style="margin: 6px 0 0 16px; padding: 0; color: #334155; font-size: 12px; line-height: 1.6;">`;

    const alertProducts = products.filter(p => p.rating < threshold);
    if (alertProducts.length === 0) {
      html += `<li>${
        isEn
          ? `All ${products.length} channel listings are operating above ${threshold.toFixed(1)} without compliance alerts.`
          : `全部核查的 ${products.length} 个渠道商品平均分均在 ${threshold.toFixed(1)} 分及以上，运行良好。`
      }</li>`;
    } else {
      const alertMap = new Map<string, ProductItem[]>();
      alertProducts.forEach(p => {
        const arr = alertMap.get(p.name) || [];
        arr.push(p);
        alertMap.set(p.name, arr);
      });

      alertMap.forEach((prods, name) => {
        const platNames = prods.map(p => `${PLATFORMS[p.platform]?.name || p.platform} (${p.rating.toFixed(1)})`).join(', ');
        const mainIssues = Array.from(new Set(prods.map(p => p.mainIssue))).join(', ');
        html += `<li><b>${name}</b> ${
          isEn
            ? `triggered low-rating alerts on <b>${platNames}</b> (Main defect: <span style="color:#dc2626;">${mainIssues}</span>).`
            : `在 <b>${platNames}</b> 出现低分预警（主要客诉类别: <span style="color:#dc2626;">${mainIssues}</span>）。`
        }</li>`;
      });
    }

    html += `</ul>`;
    html += `</div>`;
    html += `</div>`;

    return html;
  }
}
