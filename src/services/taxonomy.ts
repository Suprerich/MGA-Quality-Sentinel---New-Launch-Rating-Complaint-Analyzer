import { DefectCategory, DefectSeverity, Sentiment, TaxonomyRule } from '../types/qa';
import { Language } from '../i18n/translations';

/**
 * Standardized QA Defect Taxonomy for MGA / Toy Products & General Merchandise
 * Preserves the exact priority and severity hierarchy from classification_v2.js
 */
export const QA_TAXONOMY: TaxonomyRule[] = [
  {
    issue: 'Safety',
    severity: 'Critical',
    description: '安全与合规风险（窒息危险、锐利边缘、刺鼻化学气味、烫伤发热等）',
    words: [
      'unsafe', 'danger', 'dangerous', 'hazard', 'hazardous', 'hurt', 'injury', 'injured',
      'sharp edge', 'exposed sharp edge', 'choking hazard', 'choked', 'swallow', 'toxic',
      'chemical smell', 'strong smell', 'burn', 'burned', 'fire', 'overheat', 'electric shock',
      'caught fire', 'swallowed small part', 'allergic', 'rash', 'smoke'
    ]
  },
  {
    issue: 'Function issue',
    severity: 'Major',
    description: '核心功能失效（不工作、断电、按钮失灵、电机损坏、漏液）',
    words: [
      'not working', 'does not work', "doesn't work", "won't work", 'stopped working',
      'stops working', 'stop working', 'malfunction', 'defective', 'defect', "won't turn on",
      'does not turn on', 'no power', 'button not', 'sound not working', 'light not working',
      'motor', 'battery issue', 'battery drain', 'leak battery', 'dead on arrival', 'doa',
      'no sound', 'turns off', 'jammed', 'stuck'
    ]
  },
  {
    issue: 'Missing parts',
    severity: 'Major',
    description: '缺少配件或零件（包装内遗漏关键玩具配件、说明书或盲盒内容物）',
    words: [
      'missing', 'missing part', 'missing parts', 'parts missing', 'piece missing',
      'pieces missing', 'not included', 'accessory missing', 'incomplete', 'empty',
      'nothing inside', 'lost items inside', 'missing pieces', 'short one'
    ]
  },
  {
    issue: 'Damage',
    severity: 'Major',
    description: '物理破损（开箱即断裂、掉落碎裂、开裂、变形）',
    words: [
      'broken', 'broke', 'breaks', 'break easily', 'cracked', 'crack', 'shattered',
      'snapped', 'bent', 'ripped', 'torn', 'fell apart', 'falls apart', 'came apart',
      'damaged item', 'dent', 'dented', 'shattered in pieces'
    ]
  },
  {
    issue: 'Quality',
    severity: 'Major',
    description: '做工粗糙与材质劣质（脱漆、塑料感薄脆、毛刺、不耐用）',
    words: [
      'poor quality', 'bad quality', 'low quality', 'cheap', 'cheaply made', 'feels cheap',
      'flimsy', 'weak', 'poorly made', 'not durable', 'durability', 'falls off', "wont stay",
      "won't stay", 'slides off', 'paint', 'peeling', 'peel', 'scratches easily',
      'defective quality', 'terrible plastic'
    ]
  },
  {
    issue: 'Packaging',
    severity: 'Minor',
    description: '外包装损坏（彩盒压烂、开封、封口被撕）',
    words: [
      'packaging', 'poor packaging', 'box damaged', 'damaged box', 'crushed box',
      'arrived open', 'open box', 'no box', 'box was crushed', 'box torn'
    ]
  },
  {
    issue: 'Assembly / Instruction',
    severity: 'Minor',
    description: '组装困难 / 说明书指引不清',
    words: [
      'hard to assemble', 'difficult to assemble', 'assembly', 'instruction', 'instructions',
      'manual', 'hard to use', 'confusing', 'hard to put together', 'impossible to build'
    ]
  },
  {
    issue: 'Size / Appearance mismatch',
    severity: 'Minor',
    description: '实物与宣传不符（尺寸过小、货不对板、颜色偏差）',
    words: [
      'smaller than expected', 'too small', 'too big', 'not as pictured', 'not like picture',
      'looks different', 'color different', 'wrong color', 'wrong size', 'wrong item',
      'misleading', 'not as described', 'tiny compared to photo'
    ]
  },
  {
    issue: 'Delivery',
    severity: 'Minor',
    description: '物流延误或丢件',
    words: [
      'arrived late', 'never arrived', 'late delivery', 'delivery', 'shipping',
      'lost package', 'delayed'
    ]
  },
  {
    issue: 'Value',
    severity: 'Minor',
    description: '性价比低 / 价格虚高',
    words: [
      'overpriced', 'not worth', 'waste of money', 'too expensive', 'too costly',
      'not worth the price', 'rip off'
    ]
  }
];

const PRIORITY_MAP: Record<DefectCategory, number> = {} as any;
const SEVERITY_MAP: Record<DefectCategory, DefectSeverity> = {} as any;

QA_TAXONOMY.forEach((rule, idx) => {
  PRIORITY_MAP[rule.issue] = QA_TAXONOMY.length - idx;
  SEVERITY_MAP[rule.issue] = rule.severity;
});
PRIORITY_MAP['Other'] = 0;
SEVERITY_MAP['Other'] = 'Minor';

export function cleanText(s: string): string {
  return String(s || '').replace(/\s+/g, ' ').trim();
}

export function classifyDefect(text: string): { issue: DefectCategory; severity: DefectSeverity; matchedKeywords: string[] } {
  const t = cleanText(text).toLowerCase();
  if (!t) return { issue: 'Other', severity: 'Minor', matchedKeywords: [] };

  let bestIssue: DefectCategory = 'Other';
  let bestScore = 0;
  let bestPriority = -1;
  let allMatched: string[] = [];
  let bestCategoryMatched: string[] = [];

  for (const rule of QA_TAXONOMY) {
    let score = 0;
    const matchedForRule: string[] = [];
    for (const word of rule.words) {
      if (t.includes(word)) {
        score++;
        matchedForRule.push(word);
        if (!allMatched.includes(word)) allMatched.push(word);
      }
    }

    if (score > 0) {
      const pri = PRIORITY_MAP[rule.issue] || 0;
      if (score > bestScore || (score === bestScore && pri > bestPriority)) {
        bestIssue = rule.issue;
        bestScore = score;
        bestPriority = pri;
        bestCategoryMatched = matchedForRule;
      }
    }
  }

  return {
    issue: bestIssue,
    severity: SEVERITY_MAP[bestIssue] || 'Minor',
    matchedKeywords: bestCategoryMatched.length > 0 ? bestCategoryMatched : allMatched.slice(0, 5)
  };
}

export function detectSentiment(text: string, rating?: number): Sentiment {
  if (rating !== undefined && rating !== null) {
    if (rating <= 2) return 'NEGATIVE';
    if (rating >= 4) return 'POSITIVE';
  }
  const lo = cleanText(text).toLowerCase();
  const negWords = ['bad', 'broken', 'poor', 'terrible', 'disappointed', 'missing', 'damaged', 'defective', 'not working', 'waste', 'cheap', 'unsafe', 'burn', 'hate', 'awful'];
  const posWords = ['good', 'great', 'love', 'excellent', 'perfect', 'cute', 'nice', 'happy', 'amazing', 'super'];

  const hasNeg = negWords.some(w => lo.includes(w));
  const hasPos = posWords.some(w => lo.includes(w));

  if (hasNeg && !hasPos) return 'NEGATIVE';
  if (hasPos && !hasNeg) return 'POSITIVE';
  if (rating && rating <= 3) return 'NEGATIVE';
  return 'NEUTRAL';
}

const ISSUE_PHRASE: Record<Language, Record<string, string>> = {
  'zh-CN': {
    'Function issue': '功能失效 (Function issue)',
    'Damage': '结构破损 (Broken parts)',
    'Quality': '材质做工粗糙 (Quality concerns)',
    'Missing parts': '缺件漏件 (Missing parts)',
    'Safety': '安全隐患 (Safety concerns)',
    'Packaging': '包装受损 (Packaging damage)',
    'Assembly / Instruction': '组装困难 (Assembly difficulty)',
    'Size / Appearance mismatch': '实物不符 (Not as described)',
    'Delivery': '物流问题 (Delivery issues)',
    'Value': '性价比评价低 (Value-for-money concerns)'
  },
  'zh-TW': {
    'Function issue': '功能失效 (Function issue)',
    'Damage': '結構破損 (Broken parts)',
    'Quality': '材質做工粗糙 (Quality concerns)',
    'Missing parts': '缺件漏件 (Missing parts)',
    'Safety': '安全隱患 (Safety concerns)',
    'Packaging': '包裝受損 (Packaging damage)',
    'Assembly / Instruction': '組裝困難 (Assembly difficulty)',
    'Size / Appearance mismatch': '實物不符 (Not as described)',
    'Delivery': '物流問題 (Delivery issues)',
    'Value': '性價比評價低 (Value-for-money concerns)'
  },
  'en-US': {
    'Function issue': 'function issues',
    'Damage': 'broken parts',
    'Quality': 'quality concerns',
    'Missing parts': 'missing accessories',
    'Safety': 'safety hazards',
    'Packaging': 'packaging damage',
    'Assembly / Instruction': 'assembly difficulties',
    'Size / Appearance mismatch': 'item not as described',
    'Delivery': 'shipping issues',
    'Value': 'value-for-money concerns'
  }
};

const ISSUE_SIGNAL: Record<string, string[]> = {
  'Function issue': ['not working', 'stopped working', "doesn't work", "won't turn on"],
  'Damage': ['broken', 'cracked', 'fell apart'],
  'Quality': ['cheap', 'flimsy', 'peeling']
};

export function generateKeyFindings(
  productName: string,
  threshold: number,
  platformRatings: { platformName: string; rating: number }[],
  reviews: { comment: string; issueType: DefectCategory; rating: number }[],
  lang: Language = 'zh-CN'
): string {
  const belowPlatforms = platformRatings.filter(p => p.rating < threshold);
  if (belowPlatforms.length === 0) {
    if (lang === 'en-US') {
      return `${productName}: Ratings across all retail channels are maintaining above ${threshold.toFixed(1)}. Operating normally without QA compliance alerts.`;
    }
    if (lang === 'zh-TW') {
      return `${productName}：各渠道平均評分均保持在 ${threshold.toFixed(1)} 分及以上，運行良好，無觸發合規預警。`;
    }
    return `${productName}：各渠道平均评分均保持在 ${threshold.toFixed(1)} 分及以上，运行良好，无触发合规预警。`;
  }

  // Find lowest rating
  const sorted = [...belowPlatforms].sort((a, b) => a.rating - b.rating);
  const lowest = sorted[0];

  const issueCounts: Record<string, number> = {};
  const lowReviews = reviews.filter(r => r.rating <= 2 || r.rating < threshold);

  for (const r of (lowReviews.length > 0 ? lowReviews : reviews)) {
    if (r.issueType && r.issueType !== 'Other') {
      issueCounts[r.issueType] = (issueCounts[r.issueType] || 0) + 1;
    }
  }

  const sortedIssues = Object.keys(issueCounts).sort((a, b) => issueCounts[b] - issueCounts[a]);
  const phrases: string[] = [];
  const phraseDict = ISSUE_PHRASE[lang] || ISSUE_PHRASE['zh-CN'];

  for (const issue of sortedIssues.slice(0, 4)) {
    let p = phraseDict[issue] || issue;
    const signals = ISSUE_SIGNAL[issue];
    if (signals) {
      for (const sig of signals) {
        if (reviews.some(r => r.comment.toLowerCase().includes(sig))) {
          if (lang === 'en-US') {
            p += ` (e.g. "${sig}")`;
          } else {
            p += ` (高频词: "${sig}")`;
          }
          break;
        }
      }
    }
    phrases.push(p);
  }

  if (lang === 'en-US') {
    const platsStr = belowPlatforms.map(p => `${p.platformName} (${p.rating.toFixed(1)})`).join(', ');
    const issuesText = phrases.length > 0
      ? `Main complaints relate to: ${phrases.join(', ')}.`
      : 'No detailed complaint text captured yet; recommend running deep scan.';
    return `[COMPLIANCE ALERT] ${productName} is rated below ${threshold.toFixed(1)} on ${platsStr} (lowest ${lowest.rating.toFixed(1)} on ${lowest.platformName}). ${issuesText}`;
  }

  if (lang === 'zh-TW') {
    const platsStr = belowPlatforms.map(p => `${p.platformName} (${p.rating.toFixed(1)}分)`).join('、');
    const issuesText = phrases.length > 0
      ? `核心客訴主要集中在：${phrases.join('，')}。`
      : '暫未捕獲詳細缺陷長文本，建議深入抓取差評樣本。';
    return `【低分預警】${productName} 在 ${platsStr} 平均分低於 ${threshold.toFixed(1)} 分警戒線（最低評分為 ${lowest.platformName} 的 ${lowest.rating.toFixed(1)}分）。${issuesText}`;
  }

  const platsStr = belowPlatforms.map(p => `${p.platformName} (${p.rating.toFixed(1)}分)`).join('、');
  const issuesText = phrases.length > 0
    ? `核心客诉主要集中在：${phrases.join('，')}。`
    : '暂未捕获详细缺陷长文本，建议深入抓取差评样本。';

  return `【低分预警】${productName} 在 ${platsStr} 平均分低于 ${threshold.toFixed(1)} 分警戒线（最低评分为 ${lowest.platformName} 的 ${lowest.rating.toFixed(1)}分）。${issuesText}`;
}
