import { ProductItem, WatchlistSKU, ReviewItem } from '../types/qa';
import { classifyDefect, detectSentiment } from './taxonomy';

function createReview(
  id: string,
  rating: number,
  author: string,
  date: string,
  title: string,
  comment: string
): ReviewItem {
  const { issue, severity, matchedKeywords } = classifyDefect(comment);
  const sentiment = detectSentiment(comment, rating);
  return {
    id,
    rating,
    author,
    date,
    title,
    comment,
    sentiment,
    issueType: issue,
    severity,
    keywords: matchedKeywords,
    verifiedPurchase: true
  };
}

export const INITIAL_WATCHLIST: WatchlistSKU[] = [
  {
    id: 'wl-1',
    name: 'Little Tikes Power Cuts Chainsaw 2-in-1',
    brand: 'Little Tikes',
    upc: '050743663189',
    model: '663189M',
    wm: '556192837',
    tcin: '89123456',
    asin: 'B0C7L9M123',
    costco: '1789234',
    isNewLaunch: true,
    notes: 'Q3 New launch item - motor durability complaint reported in field',
    addedAt: '2026-08-15'
  },
  {
    id: 'wl-2',
    name: 'Miniverse Make It Mini Diner Series 3 Mini Food Blind Ball',
    brand: 'Miniverse',
    upc: '035051593812',
    model: '593812',
    wm: '6000207908091',
    tcin: '89543210',
    asin: 'B0CX123ABC',
    costco: '1823901',
    isNewLaunch: true,
    notes: 'Resin packaging compliance and UV curing liquid safety check',
    addedAt: '2026-09-01'
  },
  {
    id: 'wl-3',
    name: 'L.O.L. Surprise! Tweens Series 4 Fashion Doll Flora Fluff',
    brand: 'L.O.L. Surprise!',
    upc: '035051588726',
    model: '588726',
    wm: '782910384',
    tcin: '87654321',
    asin: 'B0C9XYZ890',
    costco: '1654321',
    isNewLaunch: true,
    notes: 'New launch accessory verification and packaging integrity',
    addedAt: '2026-09-10'
  },
  {
    id: 'wl-4',
    name: 'Rainbow High Winter Wonderland Fashion Doll Sunny Madison',
    brand: 'Rainbow High',
    upc: '035051505389',
    model: '505389',
    wm: '901284712',
    tcin: '90123847',
    asin: 'B0CP987DEF',
    costco: '1902834',
    isNewLaunch: true,
    notes: 'Snow expansion mechanism and hair rooting quality check',
    addedAt: '2026-09-15'
  },
  {
    id: 'wl-5',
    name: 'Bratz Babyz First Edition Jade with Pet Acc',
    brand: 'Bratz',
    upc: '035051591825',
    model: '591825',
    wm: '849102938',
    tcin: '88765432',
    asin: 'B0D123GHIJ',
    costco: '1738492',
    isNewLaunch: false,
    notes: 'Collector series rerelease',
    addedAt: '2026-07-20'
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  // 1. Little Tikes Power Cuts Chainsaw - Low rating across platforms (ALERT < 3.0)
  {
    id: 'prod-lt-chainsaw-target',
    name: 'Little Tikes Power Cuts Chainsaw 2-in-1',
    brand: 'Little Tikes',
    series: 'Power Cuts Roleplay',
    upc: '050743663189',
    model: '663189M',
    isNewLaunch: true,
    launchDate: '2026-08-01',
    countryOfOrigin: 'China',
    platform: 'TARGET',
    platformId: '89123456',
    url: 'https://www.target.com/p/little-tikes-power-cuts-chainsaw/-/A-89123456',
    rating: 2.1,
    reviewCount: 38,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Function issue',
    issueBreakdown: { 'Function issue': 18, 'Damage': 8, 'Quality': 6, 'Safety': 2 },
    issueBreakdownText: 'Function issue(18), Damage(8), Quality(6), Safety(2)',
    ratingHistory: [
      { date: '2026-09-08', rating: 2.6, count: 14 },
      { date: '2026-09-22', rating: 2.3, count: 26 },
      { date: '2026-10-08', rating: 2.1, count: 38 }
    ],
    reviews: [
      createReview(
        'rev-lt-1',
        1,
        'Sarah M.',
        '2026-10-02',
        'Stopped working after 20 minutes',
        'Bought this for my 4 year old son for his birthday. He was so excited, but the saw stopped working after literally 20 minutes of play. Fresh batteries did not help. The motor makes a clicking sound but does not turn on anymore. Cheaply made and completely defective.'
      ),
      createReview(
        'rev-lt-2',
        1,
        'David K.',
        '2026-09-28',
        'Plastic chain broke right away',
        'The rubber/plastic rotating blade snapped and broke within an hour. It came apart and fell out. Very flimsy plastic. For a Little Tikes product, the durability is terrible and feels very cheap.'
      ),
      createReview(
        'rev-lt-3',
        2,
        'Amanda P.',
        '2026-09-24',
        'Battery issue and smoke smell',
        'The battery compartment got extremely hot and had a slight chemical smell. We took the batteries out immediately due to fire hazard. Not safe for small children if the battery compartment overheats.'
      ),
      createReview(
        'rev-lt-4',
        1,
        'Mike R.',
        '2026-09-18',
        'Button stuck and no sound',
        'The power trigger button got jammed and stuck inside the handle on day one. Won\'t turn on now. Definitely a malfunction in the spring mechanism.'
      ),
      createReview(
        'rev-lt-5',
        2,
        'Jennifer L.',
        '2026-09-15',
        'Missing safety goggles part',
        'Package was missing part of the goggles accessory inside. Incomplete set. The toy itself works intermittently but the sound keeps cutting off.'
      )
    ]
  },
  {
    id: 'prod-lt-chainsaw-wmus',
    name: 'Little Tikes Power Cuts Chainsaw 2-in-1',
    brand: 'Little Tikes',
    series: 'Power Cuts Roleplay',
    upc: '050743663189',
    model: '663189M',
    isNewLaunch: true,
    launchDate: '2026-08-01',
    countryOfOrigin: 'China',
    platform: 'WMUS',
    platformId: '556192837',
    url: 'https://www.walmart.com/ip/Little-Tikes-Power-Cuts-Chainsaw/556192837',
    rating: 2.4,
    reviewCount: 45,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Function issue',
    issueBreakdown: { 'Function issue': 21, 'Damage': 9, 'Quality': 7 },
    issueBreakdownText: 'Function issue(21), Damage(9), Quality(7)',
    ratingHistory: [
      { date: '2026-09-08', rating: 2.8, count: 18 },
      { date: '2026-09-22', rating: 2.5, count: 32 },
      { date: '2026-10-08', rating: 2.4, count: 45 }
    ],
    reviews: [
      createReview(
        'rev-lt-wm-1',
        1,
        'Jason T.',
        '2026-10-05',
        'Does not work right out of the box',
        'Inserted brand new Duracell AA batteries and it does not work. Dead on arrival. The red light turns on for a second then dies. Malfunction in the internal circuit board.'
      ),
      createReview(
        'rev-lt-wm-2',
        2,
        'Brittany C.',
        '2026-09-30',
        'Cracked handle',
        'The plastic handle cracked when my child dropped it on our carpet. Break easily, not durable at all.'
      )
    ]
  },
  {
    id: 'prod-lt-chainsaw-wmca',
    name: 'Little Tikes Power Cuts Chainsaw 2-in-1',
    brand: 'Little Tikes',
    series: 'Power Cuts Roleplay',
    upc: '050743663189',
    model: '663189M',
    isNewLaunch: true,
    launchDate: '2026-08-01',
    countryOfOrigin: 'China',
    platform: 'WMCA',
    platformId: '6000207881122',
    url: 'https://www.walmart.ca/en/ip/Little-Tikes-Power-Cuts-Chainsaw/6000207881122',
    rating: 2.3,
    reviewCount: 22,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Function issue',
    issueBreakdown: { 'Function issue': 11, 'Damage': 4, 'Quality': 3 },
    issueBreakdownText: 'Function issue(11), Damage(4), Quality(3)',
    ratingHistory: [
      { date: '2026-09-10', rating: 2.7, count: 8 },
      { date: '2026-10-08', rating: 2.3, count: 22 }
    ],
    reviews: [
      createReview(
        'rev-lt-wmca-1',
        1,
        'Marc B.',
        '2026-10-04',
        'Motor stopped after one day',
        'The motor stopped working after one day. Our grandson was crying. Very poor quality compared to older Little Tikes toys.'
      )
    ]
  },
  {
    id: 'prod-lt-chainsaw-amzus',
    name: 'Little Tikes Power Cuts Chainsaw 2-in-1',
    brand: 'Little Tikes',
    series: 'Power Cuts Roleplay',
    upc: '050743663189',
    model: '663189M',
    isNewLaunch: true,
    launchDate: '2026-08-01',
    countryOfOrigin: 'China',
    platform: 'AMZUS',
    platformId: 'B0C7L9M123',
    url: 'https://www.amazon.com/dp/B0C7L9M123',
    rating: 2.7,
    reviewCount: 64,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Function issue',
    issueBreakdown: { 'Function issue': 26, 'Damage': 12, 'Quality': 9, 'Safety': 3 },
    issueBreakdownText: 'Function issue(26), Damage(12), Quality(9), Safety(3)',
    ratingHistory: [
      { date: '2026-09-01', rating: 3.2, count: 20 },
      { date: '2026-09-20', rating: 2.9, count: 42 },
      { date: '2026-10-08', rating: 2.7, count: 64 }
    ],
    reviews: [
      createReview(
        'rev-lt-amz-1',
        1,
        'Robert G.',
        '2026-10-01',
        'Battery drain and stopped spinning',
        'Drains batteries in 15 minutes, then stops working completely. Doesn\'t work as described. Do not buy!'
      )
    ]
  },
  {
    id: 'prod-lt-chainsaw-costcous',
    name: 'Little Tikes Power Cuts Chainsaw 2-in-1 Bundle',
    brand: 'Little Tikes',
    series: 'Power Cuts Roleplay',
    upc: '050743663189',
    model: '663189M',
    isNewLaunch: true,
    launchDate: '2026-08-15',
    countryOfOrigin: 'China',
    platform: 'COSTCOUS',
    platformId: '1789234',
    url: 'https://www.costco.com/p/little-tikes-chainsaw-1789234.product.html',
    rating: 2.8,
    reviewCount: 19,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Function issue',
    issueBreakdown: { 'Function issue': 9, 'Quality': 4, 'Packaging': 2 },
    issueBreakdownText: 'Function issue(9), Quality(4), Packaging(2)',
    ratingHistory: [
      { date: '2026-09-15', rating: 3.1, count: 6 },
      { date: '2026-10-08', rating: 2.8, count: 19 }
    ],
    reviews: [
      createReview(
        'rev-lt-costco-1',
        2,
        'Member 8812',
        '2026-09-29',
        'Returned to Costco warehouse',
        'Returned this because the sound not working and trigger broke. Usually Costco items are high quality, but this was a let down.'
      )
    ]
  },

  // 2. Miniverse Make It Mini Diner Series 3 - Rating ~2.6-2.9 (ALERT on Walmart & Target)
  {
    id: 'prod-mini-diner-target',
    name: 'Miniverse Make It Mini Diner Series 3 Mini Food Blind Ball',
    brand: 'Miniverse',
    series: 'Make It Mini Food',
    upc: '035051593812',
    model: '593812',
    isNewLaunch: true,
    launchDate: '2026-09-01',
    countryOfOrigin: 'China',
    platform: 'TARGET',
    platformId: '89543210',
    url: 'https://www.target.com/p/miniverse-make-it-mini-diner/-/A-89543210',
    rating: 2.6,
    reviewCount: 52,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Missing parts',
    issueBreakdown: { 'Missing parts': 22, 'Quality': 14, 'Safety': 6, 'Value': 4 },
    issueBreakdownText: 'Missing parts(22), Quality(14), Safety(6), Value(4)',
    ratingHistory: [
      { date: '2026-09-12', rating: 3.0, count: 15 },
      { date: '2026-09-25', rating: 2.8, count: 32 },
      { date: '2026-10-08', rating: 2.6, count: 52 }
    ],
    reviews: [
      createReview(
        'rev-mv-1',
        1,
        'Emily W.',
        '2026-10-04',
        'Missing resin bottle inside ball',
        'Opened the blind ball and the resin bottle was completely missing! Nothing inside to make the burger craft. Pieces missing, totally empty bottle packet. Waste of money!'
      ),
      createReview(
        'rev-mv-2',
        2,
        'Chloe S.',
        '2026-09-29',
        'Strong chemical smell from resin',
        'The curing liquid had a very strong smell and toxic odor. My 8-year-old said it smelled like nail glue or chemical fumes. Definitely make sure there is ventilation. Unsafe for kids without gloves.'
      ),
      createReview(
        'rev-mv-3',
        2,
        'Jessica B.',
        '2026-09-20',
        'Resin bottle arrived open and leaked',
        'Arrived open in the package. The liquid leaked all over the tiny accessories and ruined the plate. Terrible packaging and poor quality control.'
      )
    ]
  },
  {
    id: 'prod-mini-diner-wmus',
    name: 'Miniverse Make It Mini Diner Series 3 Mini Food Blind Ball',
    brand: 'Miniverse',
    series: 'Make It Mini Food',
    upc: '035051593812',
    model: '593812',
    isNewLaunch: true,
    launchDate: '2026-09-01',
    countryOfOrigin: 'China',
    platform: 'WMUS',
    platformId: '6000207908091',
    url: 'https://www.walmart.com/ip/Miniverse-Make-It-Mini-Diner-Series-3/6000207908091',
    rating: 2.9,
    reviewCount: 47,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'ALERT',
    mainIssue: 'Missing parts',
    issueBreakdown: { 'Missing parts': 18, 'Quality': 11, 'Packaging': 5 },
    issueBreakdownText: 'Missing parts(18), Quality(11), Packaging(5)',
    ratingHistory: [
      { date: '2026-09-15', rating: 3.3, count: 18 },
      { date: '2026-10-08', rating: 2.9, count: 47 }
    ],
    reviews: [
      createReview(
        'rev-mv-wm-1',
        1,
        'Katie D.',
        '2026-10-03',
        'Missing straw and spoon',
        'Part missing from the milkshake kit. Couldn\'t assemble without the main straw piece. Disappointed.'
      )
    ]
  },
  {
    id: 'prod-mini-diner-amzus',
    name: 'Miniverse Make It Mini Diner Series 3 Mini Food Blind Ball',
    brand: 'Miniverse',
    series: 'Make It Mini Food',
    upc: '035051593812',
    model: '593812',
    isNewLaunch: true,
    launchDate: '2026-09-01',
    countryOfOrigin: 'China',
    platform: 'AMZUS',
    platformId: 'B0CX123ABC',
    url: 'https://www.amazon.com/dp/B0CX123ABC',
    rating: 3.2,
    reviewCount: 88,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'OK',
    mainIssue: 'Missing parts',
    issueBreakdown: { 'Missing parts': 16, 'Quality': 12, 'Value': 8 },
    issueBreakdownText: 'Missing parts(16), Quality(12), Value(8)',
    ratingHistory: [
      { date: '2026-09-10', rating: 3.5, count: 30 },
      { date: '2026-10-08', rating: 3.2, count: 88 }
    ],
    reviews: [
      createReview(
        'rev-mv-amz-1',
        3,
        'Samantha H.',
        '2026-10-02',
        'Cute but tiny and pieces missing sometimes',
        'Very cute result when finished, but smaller than expected. In one of our three balls, the utensil was missing.'
      )
    ]
  },

  // 3. L.O.L. Surprise! Tweens Series 4 Flora Fluff - Good rating (> 4.0), contrast item
  {
    id: 'prod-lol-tweens-target',
    name: 'L.O.L. Surprise! Tweens Series 4 Fashion Doll Flora Fluff',
    brand: 'L.O.L. Surprise!',
    series: 'Tweens Fashion Dolls',
    upc: '035051588726',
    model: '588726',
    isNewLaunch: true,
    launchDate: '2026-09-10',
    countryOfOrigin: 'China',
    platform: 'TARGET',
    platformId: '87654321',
    url: 'https://www.target.com/p/lol-surprise-tweens-flora-fluff/-/A-87654321',
    rating: 4.6,
    reviewCount: 94,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'OK',
    mainIssue: 'Quality',
    issueBreakdown: { 'Quality': 4, 'Packaging': 2 },
    issueBreakdownText: 'Quality(4), Packaging(2)',
    ratingHistory: [
      { date: '2026-09-15', rating: 4.7, count: 32 },
      { date: '2026-10-08', rating: 4.6, count: 94 }
    ],
    reviews: [
      createReview(
        'rev-lol-1',
        5,
        'Melissa G.',
        '2026-10-05',
        'Adorable doll and perfect quality',
        'My daughter loves Flora Fluff! Hair is super soft and outfits are high quality. No issues at all.'
      )
    ]
  },
  {
    id: 'prod-lol-tweens-wmus',
    name: 'L.O.L. Surprise! Tweens Series 4 Fashion Doll Flora Fluff',
    brand: 'L.O.L. Surprise!',
    series: 'Tweens Fashion Dolls',
    upc: '035051588726',
    model: '588726',
    isNewLaunch: true,
    launchDate: '2026-09-10',
    countryOfOrigin: 'China',
    platform: 'WMUS',
    platformId: '782910384',
    url: 'https://www.walmart.com/ip/LOL-Surprise-Tweens-Flora-Fluff/782910384',
    rating: 4.5,
    reviewCount: 76,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'OK',
    mainIssue: 'Packaging',
    issueBreakdown: { 'Packaging': 3, 'Quality': 2 },
    issueBreakdownText: 'Packaging(3), Quality(2)',
    ratingHistory: [
      { date: '2026-09-18', rating: 4.5, count: 28 },
      { date: '2026-10-08', rating: 4.5, count: 76 }
    ],
    reviews: [
      createReview(
        'rev-lol-wm-1',
        4,
        'Taylor K.',
        '2026-09-28',
        'Box slightly damaged during delivery',
        'Toy was safe inside, but the box arrived with a dent. Beautiful doll otherwise.'
      )
    ]
  },

  // 4. Rainbow High Winter Wonderland Sunny Madison - Genuinely sold on US platforms (Target, Amazon US); unlisted as individual SKU on Walmart Canada

  {
    id: 'prod-rh-winter-wmus',
    name: 'Rainbow High Winter Wonderland Fashion Doll Sunny Madison',
    brand: 'Rainbow High',
    series: 'Winter Wonderland',
    upc: '035051505389',
    model: '505389',
    isNewLaunch: true,
    launchDate: '2024-07-26',
    countryOfOrigin: 'China',
    platform: 'WMUS',
    platformId: '901284712',
    url: 'https://www.walmart.com/ip/Rainbow-High-Fashion-Doll-11-Sunny-Winter-Wonderland-Yellow/901284712',
    rating: 4.8,
    reviewCount: 93,
    lastCheckedAt: '2026-10-12T19:00:00Z',
    status: 'OK',
    mainIssue: 'Function issue',
    issueBreakdown: { 'Function issue': 4, 'Quality': 3, 'Assembly / Instruction': 2 },
    issueBreakdownText: 'Function issue(4), Quality(3), Assembly / Instruction(2)',
    ratingHistory: [
      { date: '2026-09-15', rating: 4.9, count: 48 },
      { date: '2026-10-12', rating: 4.8, count: 93 }
    ],
    reviews: [
      createReview(
        'rev-rh-wm-1',
        5,
        'GrandparentBuyer',
        '2024-09-18',
        'Granddaughter loved Sunny!',
        'Bought this for my 9-year-old granddaughter and she loved the bright yellow winter coat and accessories. The crimped hair is very pretty and long.'
      ),
      createReview(
        'rev-rh-wm-2',
        4,
        'ToyReviewMom',
        '2024-08-22',
        'Snow expansion takes practice',
        'The magic snow mechanism inside the jacket puffs up when you add water with the dropper, but it can be a bit messy. Definitely need adult supervision so the water does not leak everywhere.'
      ),
      createReview(
        'rev-rh-wm-3',
        3,
        'DollCollector_CA',
        '2024-08-10',
        'A lot of tinsel in the hair',
        'Beautiful face sculpt and glass eyes, but the hair has a lot of crunchy styling gel and metallic tinsel. The thick coat also makes posing her arms a little stiff.'
      )
    ]
  },
  {
    id: 'prod-rh-winter-target',
    name: 'Rainbow High Winter Wonderland Fashion Doll Sunny Madison',
    brand: 'Rainbow High',
    series: 'Winter Wonderland',
    upc: '035051505389',
    model: '505389',
    isNewLaunch: true,
    launchDate: '2024-07-26',
    countryOfOrigin: 'China',
    platform: 'TARGET',
    platformId: '90123847',
    url: 'https://www.target.com/p/rainbow-high-winter-wonderland-sunny/-/A-90123847',
    rating: 4.7,
    reviewCount: 78,
    lastCheckedAt: '2026-10-12T19:00:00Z',
    status: 'OK',
    mainIssue: 'Quality',
    issueBreakdown: { 'Quality': 5, 'Function issue': 3, 'Assembly / Instruction': 2 },
    issueBreakdownText: 'Quality(5), Function issue(3), Assembly / Instruction(2)',
    ratingHistory: [
      { date: '2026-09-10', rating: 4.8, count: 35 },
      { date: '2026-10-12', rating: 4.7, count: 78 }
    ],
    reviews: [
      createReview(
        'rev-rh-tgt-1',
        5,
        'Brianna K.',
        '2024-09-05',
        'Gorgeous fashion doll and moldable snowman',
        'Sunny Madison is stunning in yellow! The snowman mold and moldable sand kit kept my daughter entertained for hours. Doll stand included is a plus.'
      ),
      createReview(
        'rev-rh-tgt-2',
        3,
        'Rachel V.',
        '2024-08-29',
        'Hair requires wash out of box',
        'The doll base is pretty and articulated, but her yellow curls were quite stiff with product out of the box. Had to wash the hair before styling.'
      )
    ]
  },
  {
    id: 'prod-rh-winter-amzus',
    name: 'Rainbow High Winter Wonderland Fashion Doll Sunny Madison',
    brand: 'Rainbow High',
    series: 'Winter Wonderland',
    upc: '035051505389',
    model: '505389',
    isNewLaunch: true,
    launchDate: '2024-07-26',
    countryOfOrigin: 'China',
    platform: 'AMZUS',
    platformId: 'B0CP987DEF',
    url: 'https://www.amazon.com/dp/B0CP987DEF',
    rating: 4.6,
    reviewCount: 112,
    lastCheckedAt: '2026-10-12T19:00:00Z',
    status: 'OK',
    mainIssue: 'Quality',
    issueBreakdown: { 'Quality': 6, 'Function issue': 4, 'Packaging': 2 },
    issueBreakdownText: 'Quality(6), Function issue(4), Packaging(2)',
    ratingHistory: [
      { date: '2026-09-15', rating: 4.7, count: 60 },
      { date: '2026-10-12', rating: 4.6, count: 112 }
    ],
    reviews: [
      createReview(
        'rev-rh-amz-1',
        5,
        'Samantha J.',
        '2024-09-22',
        'Super detailed winter outfit',
        'Great gift! The long jacket, wrap skirt, earmuffs, and hot cocoa cup accessories are so cute. Fast shipping from Amazon.'
      ),
      createReview(
        'rev-rh-amz-2',
        4,
        'Collector_Mark',
        '2024-09-02',
        'Fun gimmick, coat is very bulky',
        'The water-activated magic snow works as advertised. The coat is quite thick which limits elbow movement, but overall a solid addition to Rainbow High.'
      )
    ]
  },

  // 5. Bratz Babyz Jade - Stable collector item
  {
    id: 'prod-bratz-target',
    name: 'Bratz Babyz First Edition Jade with Pet Acc',
    brand: 'Bratz',
    series: 'Bratz Babyz',
    upc: '035051591825',
    model: '591825',
    isNewLaunch: false,
    countryOfOrigin: 'China',
    platform: 'TARGET',
    platformId: '88765432',
    url: 'https://www.target.com/p/bratz-babyz-jade/-/A-88765432',
    rating: 4.8,
    reviewCount: 62,
    lastCheckedAt: '2026-10-08T14:30:00Z',
    status: 'OK',
    mainIssue: 'Packaging',
    issueBreakdown: { 'Packaging': 2 },
    issueBreakdownText: 'Packaging(2)',
    ratingHistory: [
      { date: '2026-08-15', rating: 4.8, count: 20 },
      { date: '2026-10-08', rating: 4.8, count: 62 }
    ],
    reviews: []
  }
];
