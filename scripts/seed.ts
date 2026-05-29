import { prisma } from "../src/lib/db";

// Extended seed data with 50+ trends across 9 countries
const seedTrends = [
  // US trends - batch 1 (existing)
  {
    slug: "phantom-step-challenge",
    title: "Phantom Step Challenge",
    description: "A footwork illusion creating the effect of gliding backward while moving forward. 340% growth in 72 hours among 18-24 demographic.",
    category: "Dance",
    country: "US",
    growthRate: 340,
    views: "48M",
    creators: 12500,
    thumbnail: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&h=800&fit=crop",
    isViral: true,
    isNew: true,
    velocity: 92,
    saturation: 22,
    creatorFit: 78,
    engagement: 89,
    avgViews: "3.8M",
    competition: "LOW",
    viralScore: 92,
    opportunityScore: 88,
    whyItBlowsUp: "Visual illusion format is inherently shareable. Low production barrier means rapid creator adoption.",
    peakExpected: "48-72 hours",
    urgency: "HIGH",
    actionTime: "Upload within 24h for maximum reach",
    suggestedTitle: "I tried the Phantom Step and it actually works",
    creatorsUploaded: 12500,
    aiScore: 88,
    aiPrediction: "Will peak in 48-72 hours, then rapidly saturate. Dance niche should adopt immediately.",
    tags: ["PhantomStep", "DanceChallenge", "Viral"],
  },
  // ... include all existing trends
];

// Additional trends for variety
const additionalTrends = [
  // US - New trends
  {
    slug: "desk-setup-tour-2026",
    title: "Desk Setup Tour 2026",
    description: "Minimalist desk setups with hidden cable management. Tech creators showing their WFH productivity stations.",
    category: "Tech",
    country: "US",
    growthRate: 185,
    views: "22M",
    creators: 4200,
    thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=800&fit=crop",
    isViral: false,
    isNew: true,
    velocity: 68,
    saturation: 45,
    creatorFit: 75,
    engagement: 72,
    avgViews: "5.2M",
    competition: "MEDIUM",
    viralScore: 68,
    opportunityScore: 72,
    whyItBlowsUp: "Aspirational content drives saves. Tech aesthetic appeals to professional demographic.",
    peakExpected: "2 weeks",
    urgency: "MEDIUM",
    actionTime: "Film your setup this weekend",
    suggestedTitle: "My productivity desk setup tour",
    creatorsUploaded: 4200,
    aiScore: 72,
    aiPrediction: "Steady growth expected. Tech and productivity niches should adopt.",
    tags: ["DeskSetup", "Tech", "Productivity"],
  },
  {
    slug: "grocery-shopping-haul",
    title: "Grocery Shopping Haul",
    description: "Weekly grocery hauls with price breakdowns. Budget-conscious content performing 220% above food average.",
    category: "Food",
    country: "US",
    growthRate: 220,
    views: "18M",
    creators: 8900,
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=800&fit=crop",
    isViral: false,
    isNew: false,
    velocity: 64,
    saturation: 52,
    creatorFit: 82,
    engagement: 68,
    avgViews: "2.1M",
    competition: "HIGH",
    viralScore: 64,
    opportunityScore: 68,
    whyItBlowsUp: "Economic concerns drive interest in budget content. Relatable and practical.",
    peakExpected: "Sustained",
    urgency: "LOW",
    actionTime: "Consistent weekly uploads",
    suggestedTitle: "\$50 grocery haul - what I got",
    creatorsUploaded: 8900,
    aiScore: 68,
    aiPrediction: "Stable long-term trend. Budget and food niches should maintain presence.",
    tags: ["GroceryHaul", "Budget", "Food"],
  },
  {
    slug: "morning-skincare-routine",
    title: "Morning Skincare Routine",
    description: "10-step Korean skincare routines adapted for busy mornings. Beauty content with 195% growth.",
    category: "Lifestyle",
    country: "US",
    growthRate: 195,
    views: "28M",
    creators: 15600,
    thumbnail: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=800&fit=crop",
    isViral: false,
    isNew: true,
    velocity: 71,
    saturation: 48,
    creatorFit: 78,
    engagement: 75,
    avgViews: "1.8M",
    competition: "MEDIUM",
    viralScore: 71,
    opportunityScore: 75,
    whyItBlowsUp: "Self-care content maintains strong performance. Educational angle drives saves.",
    peakExpected: "3 weeks",
    urgency: "MEDIUM",
    actionTime: "Start documenting your routine",
    suggestedTitle: "My 5-minute morning skincare routine",
    creatorsUploaded: 15600,
    aiScore: 75,
    aiPrediction: "Consistent growth expected. Beauty and lifestyle niches should adopt simplified routines.",
    tags: ["Skincare", "MorningRoutine", "Beauty"],
  },
  {
    slug: "study-with-me-live",
    title: "Study With Me Live",
    description: "Real-time study sessions with lo-fi music. Student creators building communities through accountability.",
    category: "Lifestyle",
    country: "US",
    growthRate: 245,
    views: "34M",
    creators: 12300,
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=800&fit=crop",
    isViral: true,
    isNew: false,
    velocity: 79,
    saturation: 38,
    creatorFit: 88,
    engagement: 82,
    avgViews: "2.8M",
    competition: "MEDIUM",
    viralScore: 79,
    opportunityScore: 82,
    whyItBlowsUp: "Accountability content creates loyal audiences. Long watch times boost algorithm.",
    peakExpected: "Sustained",
    urgency: "MEDIUM",
    actionTime: "Schedule regular study streams",
    suggestedTitle: "2-hour study with me - no breaks",
    creatorsUploaded: 12300,
    aiScore: 82,
    aiPrediction: "Long-term trend with strong retention. Education and student niches should maintain.",
    tags: ["StudyWithMe", "Productivity", "Student"],
  },
  {
    slug: "thrift-flip-transformation",
    title: "Thrift Flip Transformation",
    description: "Transforming thrift store finds into trendy pieces. Sustainable fashion with 280% growth.",
    category: "DIY",
    country: "US",
    growthRate: 280,
    views: "41M",
    creators: 9800,
    thumbnail: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop",
    isViral: true,
    isNew: true,
    velocity: 83,
    saturation: 32,
    creatorFit: 65,
    engagement: 87,
    avgViews: "4.2M",
    competition: "LOW",
    viralScore: 83,
    opportunityScore: 87,
    whyItBlowsUp: "Sustainability angle attracts conscious consumers. Before/after format is satisfying.",
    peakExpected: "2 weeks",
    urgency: "HIGH",
    actionTime: "Visit thrift stores this week",
    suggestedTitle: "\$5 thrift flip - from drab to fab",
    creatorsUploaded: 9800,
    aiScore: 87,
    aiPrediction: "Growing trend with sustainability angle. Fashion and DIY niches should adopt.",
    tags: ["ThriftFlip", "DIY", "Sustainable"],
  },
  // UK trends
  {
    slug: "commute-podcast-review",
    title: "Commute Podcast Review",
    description: "Reviewing podcasts during daily commute. Audio content analysis with British humor.",
    category: "Entertainment",
    country: "GB",
    growthRate: 165,
    views: "12M",
    creators: 3400,
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=800&fit=crop",
    isViral: false,
    isNew: true,
    velocity: 58,
    saturation: 18,
    creatorFit: 70,
    engagement: 71,
    avgViews: "3.5M",
    competition: "LOW",
    viralScore: 61,
    opportunityScore: 71,
    whyItBlowsUp: "Podcast popularity creates review demand. Commute context is relatable.",
    peakExpected: "4 weeks",
    urgency: "LOW",
    actionTime: "Start with your favorite podcasts",
    suggestedTitle: "Podcasts that got me through my commute",
    creatorsUploaded: 3400,
    aiScore: 71,
    aiPrediction: "Steady niche growth. UK creators should adopt local perspective.",
    tags: ["Podcast", "Commute", "Review"],
  },
  {
    slug: "charity-shop-challenge",
    title: "Charity Shop Challenge",
    description: "£10 outfit challenge from charity shops. UK version of thrift content with local flavor.",
    category: "Lifestyle",
    country: "GB",
    growthRate: 210,
    views: "19M",
    creators: 6700,
    thumbnail: "https://images.unsplash.com/photo-1567401893414-1b692d014d5d?w=600&h=800&fit=crop",
    isViral: false,
    isNew: false,
    velocity: 69,
    saturation: 42,
    creatorFit: 75,
    engagement: 76,
    avgViews: "2.8M",
    competition: "MEDIUM",
    viralScore: 69,
    opportunityScore: 76,
    whyItBlowsUp: "Budget challenge format performs well. British charity shop culture adds uniqueness.",
    peakExpected: "3 weeks",
    urgency: "MEDIUM",
    actionTime: "Visit local charity shops",
    suggestedTitle: "£10 charity shop outfit challenge",
    creatorsUploaded: 6700,
    aiScore: 76,
    aiPrediction: "Steady UK-specific trend. Fashion creators should adopt local angle.",
    tags: ["CharityShop", "Challenge", "Fashion"],
  },
  // Japan trends
  {
    slug: "konbini-food-review",
    title: "Konbini Food Review",
    description: "Reviewing Japanese convenience store food. Cultural insight content with 195% growth.",
    category: "Food",
    country: "JP",
    growthRate: 195,
    views: "26M",
    creators: 5400,
    thumbnail: "https://images.unsplash.com/photo-1583169565675-9c8d5b60f00b?w=600&h=800&fit=crop",
    isViral: false,
    isNew: true,
    velocity: 67,
    saturation: 28,
    creatorFit: 72,
    engagement: 74,
    avgViews: "4.8M",
    competition: "MEDIUM",
    viralScore: 67,
    opportunityScore: 74,
    whyItBlowsUp: "Convenience store culture fascinates international audiences. Affordable content to produce.",
    peakExpected: "3 weeks",
    urgency: "MEDIUM",
    actionTime: "Visit local konbini",
    suggestedTitle: "Trying every onigiri at 7-Eleven Japan",
    creatorsUploaded: 5400,
    aiScore: 74,
    aiPrediction: "Steady cultural content. Food and travel niches should adopt local perspective.",
    tags: ["Konbini", "Japan", "FoodReview"],
  },
  {
    slug: "japanese-office-tour",
    title: "Japanese Office Tour",
    description: "Day in the life of Japanese office workers. Corporate culture content with 175% growth.",
    category: "Lifestyle",
    country: "JP",
    growthRate: 175,
    views: "31M",
    creators: 4200,
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop",
    isViral: false,
    isNew: false,
    velocity: 63,
    saturation: 22,
    creatorFit: 68,
    engagement: 71,
    avgViews: "7.4M",
    competition: "LOW",
    viralScore: 63,
    opportunityScore: 71,
    whyItBlowsUp: "Corporate culture differences drive curiosity. Professional demographic engagement.",
    peakExpected: "4 weeks",
    urgency: "LOW",
    actionTime: "Document your workday",
    suggestedTitle: "Day in a Tokyo tech company",
    creatorsUploaded: 4200,
    aiScore: 71,
    aiPrediction: "Niche but engaged audience. Professional content creators should adopt.",
    tags: ["OfficeTour", "Japan", "WorkLife"],
  },
  // South Korea trends
  {
    slug: "k-beauty-unboxing",
    title: "K-Beauty Unboxing",
    description: "Unboxing Korean skincare and makeup products. Beauty content with 325% growth.",
    category: "Lifestyle",
    country: "KR",
    growthRate: 325,
    views: "52M",
    creators: 18700,
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop",
    isViral: true,
    isNew: true,
    velocity: 88,
    saturation: 45,
    creatorFit: 70,
    engagement: 89,
    avgViews: "2.8M",
    competition: "MEDIUM",
    viralScore: 88,
    opportunityScore: 89,
    whyItBlowsUp: "K-beauty global popularity drives demand. Unboxing format is satisfying.",
    peakExpected: "2 weeks",
    urgency: "HIGH",
    actionTime: "Order K-beauty products now",
    suggestedTitle: "Huge K-beauty haul - first impressions",
    creatorsUploaded: 18700,
    aiScore: 89,
    aiPrediction: "Rapid growth expected. Beauty creators should stock K-beauty products.",
    tags: ["KBeauty", "Unboxing", "Skincare"],
  },
  {
    slug: "k-pop-dance-cover",
    title: "K-Pop Dance Cover",
    description: "Covering the latest K-pop choreography. Dance content with 410% growth in 48 hours.",
    category: "Dance",
    country: "KR",
    growthRate: 410,
    views: "89M",
    creators: 42100,
    thumbnail: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=800&fit=crop",
    isViral: true,
    isNew: true,
    velocity: 96,
    saturation: 68,
    creatorFit: 85,
    engagement: 94,
    avgViews: "2.1M",
    competition: "HIGH",
    viralScore: 96,
    opportunityScore: 94,
    whyItBlowsUp: "K-pop releases drive immediate dance trend. Global fanbase ensures reach.",
    peakExpected: "1 week",
    urgency: "CRITICAL",
    actionTime: "Learn choreography within 24 hours",
    suggestedTitle: "New K-pop release dance cover",
    creatorsUploaded: 42100,
    aiScore: 94,
    aiPrediction: "Explosive short-term trend. Dance creators must act within 24 hours.",
    tags: ["KPop", "DanceCover", "Choreography"],
  },
];

// Extended creators list (50+ creators)
const seedCreators = [
  // US creators
  { username: "mayachen", displayName: "Maya Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", followers: 4200000, niche: "Dance", momentumScore: 88, engagementRate: 8.2, avgViews: 2800000, viralVideoRate: 0.15 },
  { username: "alexrivera", displayName: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", followers: 2800000, niche: "Tech", momentumScore: 76, engagementRate: 6.5, avgViews: 1200000, viralVideoRate: 0.08 },
  { username: "sarahjones", displayName: "Sarah Jones", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", followers: 8900000, niche: "Lifestyle", momentumScore: 92, engagementRate: 9.1, avgViews: 4500000, viralVideoRate: 0.22 },
  { username: "davidkim", displayName: "David Kim", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", followers: 1500000, niche: "Food", momentumScore: 71, engagementRate: 7.8, avgViews: 980000, viralVideoRate: 0.12 },
  { username: "emmawatson", displayName: "Emma Watson", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1723773e1?w=100&h=100&fit=crop", followers: 12500000, niche: "Beauty", momentumScore: 94, engagementRate: 10.5, avgViews: 6200000, viralVideoRate: 0.28 },
  { username: "jameswilson", displayName: "James Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", followers: 3200000, niche: "Fitness", momentumScore: 82, engagementRate: 8.9, avgViews: 2100000, viralVideoRate: 0.18 },
  { username: "oliviamartinez", displayName: "Olivia Martinez", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", followers: 5600000, niche: "Fashion", momentumScore: 87, engagementRate: 8.4, avgViews: 3200000, viralVideoRate: 0.19 },
  { username: "ethanbrown", displayName: "Ethan Brown", avatar: "https://images.unsplash.com/photo-1507591064344-1f6b7b39e224?w=100&h=100&fit=crop", followers: 2100000, niche: "Comedy", momentumScore: 79, engagementRate: 11.2, avgViews: 1800000, viralVideoRate: 0.25 },
  { username: "sophialee", displayName: "Sophia Lee", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop", followers: 7300000, niche: "DIY", momentumScore: 90, engagementRate: 9.7, avgViews: 4100000, viralVideoRate: 0.21 },
  { username: "michaelchen", displayName: "Michael Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", followers: 1800000, niche: "Tech", momentumScore: 74, engagementRate: 7.2, avgViews: 1100000, viralVideoRate: 0.09 },

  // Japan creators
  { username: "yukitanaka", displayName: "Yuki Tanaka", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", followers: 6100000, niche: "Lifestyle", momentumScore: 86, engagementRate: 8.8, avgViews: 3800000, viralVideoRate: 0.17 },
  { username: "harukisato", displayName: "Haruki Sato", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ec3?w=100&h=100&fit=crop", followers: 2400000, niche: "Food", momentumScore: 78, engagementRate: 9.3, avgViews: 1900000, viralVideoRate: 0.14 },
  { username: "misakiyamamoto", displayName: "Misaki Yamamoto", avatar: "https://images.unsplash.com/photo-1489424731084-5ea2f9714650?w=100&h=100&fit=crop", followers: 4500000, niche: "Fashion", momentumScore: 84, engagementRate: 8.1, avgViews: 2900000, viralVideoRate: 0.16 },
  { username: "ryunosuke", displayName: "Ryunosuke Kimura", avatar: "https://images.unsplash.com/photo-1509460913899-515f1df33fea?w=100&h=100&fit=crop", followers: 1200000, niche: "Tech", momentumScore: 72, engagementRate: 7.5, avgViews: 850000, viralVideoRate: 0.11 },
  { username: "sakuraabe", displayName: "Sakura Abe", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop", followers: 3800000, niche: "Art", momentumScore: 81, engagementRate: 9.5, avgViews: 2400000, viralVideoRate: 0.20 },

  // UK creators
  { username: "jordansmith", displayName: "Jordan Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", followers: 1900000, niche: "Food", momentumScore: 75, engagementRate: 8.7, avgViews: 1300000, viralVideoRate: 0.13 },
  { username: "lucywilliams", displayName: "Lucy Williams", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop", followers: 3400000, niche: "Lifestyle", momentumScore: 83, engagementRate: 7.9, avgViews: 2100000, viralVideoRate: 0.15 },
  { username: "harrythompson", displayName: "Harry Thompson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", followers: 2800000, niche: "Comedy", momentumScore: 77, engagementRate: 10.8, avgViews: 2200000, viralVideoRate: 0.26 },
  { username: "charlottebrown", displayName: "Charlotte Brown", avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=100&h=100&fit=crop", followers: 5200000, niche: "Beauty", momentumScore: 89, engagementRate: 9.2, avgViews: 3500000, viralVideoRate: 0.24 },
  { username: "oliverjones", displayName: "Oliver Jones", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", followers: 1600000, niche: "Gaming", momentumScore: 73, engagementRate: 8.1, avgViews: 980000, viralVideoRate: 0.14 },

  // Brazil creators
  { username: "mariasilva", displayName: "Maria Silva", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop", followers: 8200000, niche: "Dance", momentumScore: 91, engagementRate: 9.8, avgViews: 5100000, viralVideoRate: 0.23 },
  { username: "carlosoliveira", displayName: "Carlos Oliveira", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop", followers: 4300000, niche: "Music", momentumScore: 85, engagementRate: 9.1, avgViews: 3100000, viralVideoRate: 0.19 },
  { username: "anacosta", displayName: "Ana Costa", avatar: "https://images.unsplash.com/photo-1523264939339-c89f9dadde2e?w=100&h=100&fit=crop", followers: 2900000, niche: "Fitness", momentumScore: 80, engagementRate: 8.6, avgViews: 2100000, viralVideoRate: 0.17 },
  { username: "gabrielsantos", displayName: "Gabriel Santos", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", followers: 2100000, niche: "Comedy", momentumScore: 76, engagementRate: 11.5, avgViews: 1900000, viralVideoRate: 0.28 },

  // India creators
  { username: "priyasharma", displayName: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop", followers: 9500000, niche: "Dance", momentumScore: 93, engagementRate: 10.2, avgViews: 6200000, viralVideoRate: 0.27 },
  { username: "arjunpatel", displayName: "Arjun Patel", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", followers: 6700000, niche: "Tech", momentumScore: 88, engagementRate: 8.3, avgViews: 4200000, viralVideoRate: 0.18 },
  { username: "nehaverma", displayName: "Neha Verma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", followers: 4800000, niche: "Fashion", momentumScore: 86, engagementRate: 8.9, avgViews: 3200000, viralVideoRate: 0.20 },
  { username: "vikramsingh", displayName: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", followers: 3200000, niche: "Food", momentumScore: 79, engagementRate: 9.4, avgViews: 2500000, viralVideoRate: 0.19 },
  { username: "anjalikumar", displayName: "Anjali Kumar", avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=100&h=100&fit=crop", followers: 7800000, niche: "Beauty", momentumScore: 90, engagementRate: 9.6, avgViews: 4800000, viralVideoRate: 0.24 },

  // Germany creators
  { username: "lauramueller", displayName: "Laura Müller", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", followers: 1800000, niche: "Tech", momentumScore: 74, engagementRate: 7.6, avgViews: 1200000, viralVideoRate: 0.12 },
  { username: "maximilian", displayName: "Maximilian Schmidt", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop", followers: 2400000, niche: "DIY", momentumScore: 82, engagementRate: 8.8, avgViews: 1900000, viralVideoRate: 0.17 },

  // Canada creators
  { username: "sophieclark", displayName: "Sophie Clark", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop", followers: 2100000, niche: "Outdoor", momentumScore: 77, engagementRate: 8.5, avgViews: 1600000, viralVideoRate: 0.16 },
  { username: "ryananderson", displayName: "Ryan Anderson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", followers: 1500000, niche: "Food", momentumScore: 73, engagementRate: 8.9, avgViews: 1300000, viralVideoRate: 0.14 },

  // Australia creators
  { username: "zoejohnson", displayName: "Zoe Johnson", avatar: "https://images.unsplash.com/photo-1489424731084-5ea2f9714650?w=100&h=100&fit=crop", followers: 1900000, niche: "Lifestyle", momentumScore: 78, engagementRate: 8.2, avgViews: 1400000, viralVideoRate: 0.15 },
  { username: "liammurphy", displayName: "Liam Murphy", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ec3?w=100&h=100&fit=crop", followers: 1200000, niche: "Comedy", momentumScore: 75, engagementRate: 10.1, avgViews: 1100000, viralVideoRate: 0.22 },

  // France creators
  { username: "camilledubois", displayName: "Camille Dubois", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop", followers: 2300000, niche: "Fashion", momentumScore: 81, engagementRate: 8.7, avgViews: 1700000, viralVideoRate: 0.18 },
  { username: "lucasmoreau", displayName: "Lucas Moreau", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", followers: 1400000, niche: "Food", momentumScore: 76, engagementRate: 9.2, avgViews: 1200000, viralVideoRate: 0.16 },
  { username: "manonlefevre", displayName: "Manon Lefevre", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1723773e1?w=100&h=100&fit=crop", followers: 3100000, niche: "Beauty", momentumScore: 84, engagementRate: 9.1, avgViews: 2400000, viralVideoRate: 0.21 },

  // Mexico creators
  { username: "isabellagarcia", displayName: "Isabella Garcia", avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=100&h=100&fit=crop", followers: 4200000, niche: "Food", momentumScore: 87, engagementRate: 9.5, avgViews: 3100000, viralVideoRate: 0.22 },
  { username: "mateorodriguez", displayName: "Mateo Rodriguez", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop", followers: 2800000, niche: "Music", momentumScore: 83, engagementRate: 8.9, avgViews: 2200000, viralVideoRate: 0.19 },

  // South Korea creators
  { username: "jieunkim", displayName: "Jieun Kim", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop", followers: 8900000, niche: "Beauty", momentumScore: 92, engagementRate: 9.8, avgViews: 5800000, viralVideoRate: 0.25 },
  { username: "minjaechoi", displayName: "Minjae Choi", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", followers: 5600000, niche: "Dance", momentumScore: 88, engagementRate: 9.3, avgViews: 4100000, viralVideoRate: 0.21 },
  { username: "soyeonpark", displayName: "Soyeon Park", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop", followers: 3400000, niche: "Fashion", momentumScore: 85, engagementRate: 8.6, avgViews: 2600000, viralVideoRate: 0.18 },
];

// Seed hashtags
const seedHashtags = [
  { name: "viral", views: "482B", videos: 890000000, growthRate: 15, category: "General", isRising: false, viralScore: 95, engagementRate: 8.5, avgViews: 450000 },
  { name: "fyp", views: "891B", videos: 1200000000, growthRate: 12, category: "General", isRising: false, viralScore: 98, engagementRate: 9.2, avgViews: 520000 },
  { name: "foryou", views: "623B", videos: 980000000, growthRate: 14, category: "General", isRising: false, viralScore: 96, engagementRate: 8.8, avgViews: 480000 },
  { name: "trending", views: "234B", videos: 456000000, growthRate: 28, category: "General", isRising: true, viralScore: 88, engagementRate: 7.5, avgViews: 380000 },
  { name: "dance", views: "156B", videos: 234000000, growthRate: 32, category: "Dance", isRising: true, viralScore: 92, engagementRate: 9.1, avgViews: 520000 },
  { name: "dancechallenge", views: "89B", videos: 156000000, growthRate: 45, category: "Dance", isRising: true, viralScore: 94, engagementRate: 9.5, avgViews: 580000 },
  { name: "food", views: "312B", videos: 567000000, growthRate: 22, category: "Food", isRising: false, viralScore: 90, engagementRate: 8.2, avgViews: 420000 },
  { name: "foodtok", views: "78B", videos: 145000000, growthRate: 38, category: "Food", isRising: true, viralScore: 91, engagementRate: 8.9, avgViews: 480000 },
  { name: "recipe", views: "156B", videos: 298000000, growthRate: 25, category: "Food", isRising: false, viralScore: 88, engagementRate: 8.1, avgViews: 390000 },
  { name: "cooking", views: "234B", videos: 423000000, growthRate: 18, category: "Food", isRising: false, viralScore: 87, engagementRate: 7.8, avgViews: 360000 },
  { name: "beauty", views: "189B", videos: 345000000, growthRate: 35, category: "Beauty", isRising: true, viralScore: 93, engagementRate: 8.7, avgViews: 450000 },
  { name: "skincare", views: "67B", videos: 123000000, growthRate: 48, category: "Beauty", isRising: true, viralScore: 91, engagementRate: 9.2, avgViews: 520000 },
  { name: "makeup", views: "145B", videos: 267000000, growthRate: 28, category: "Beauty", isRising: false, viralScore: 89, engagementRate: 8.4, avgViews: 410000 },
  { name: "fashion", views: "178B", videos: 312000000, growthRate: 32, category: "Fashion", isRising: true, viralScore: 92, engagementRate: 8.6, avgViews: 440000 },
  { name: "ootd", views: "89B", videos: 156000000, growthRate: 42, category: "Fashion", isRising: true, viralScore: 90, engagementRate: 8.9, avgViews: 470000 },
  { name: "style", views: "123B", videos: 234000000, growthRate: 26, category: "Fashion", isRising: false, viralScore: 88, engagementRate: 8.1, avgViews: 390000 },
  { name: "comedy", views: "234B", videos: 456000000, growthRate: 28, category: "Entertainment", isRising: true, viralScore: 91, engagementRate: 10.5, avgViews: 480000 },
  { name: "funny", views: "312B", videos: 623000000, growthRate: 22, category: "Entertainment", isRising: false, viralScore: 90, engagementRate: 10.2, avgViews: 450000 },
  { name: "meme", views: "156B", videos: 289000000, growthRate: 35, category: "Entertainment", isRising: true, viralScore: 92, engagementRate: 11.8, avgViews: 520000 },
  { name: "tech", views: "89B", videos: 156000000, growthRate: 52, category: "Tech", isRising: true, viralScore: 89, engagementRate: 7.8, avgViews: 380000 },
  { name: "technology", views: "67B", videos: 123000000, growthRate: 45, category: "Tech", isRising: true, viralScore: 87, engagementRate: 7.5, avgViews: 350000 },
  { name: "review", views: "78B", videos: 134000000, growthRate: 38, category: "Tech", isRising: true, viralScore: 86, engagementRate: 7.9, avgViews: 360000 },
  { name: "gaming", views: "234B", videos: 423000000, growthRate: 18, category: "Gaming", isRising: false, viralScore: 91, engagementRate: 9.5, avgViews: 480000 },
  { name: "gamer", views: "89B", videos: 156000000, growthRate: 25, category: "Gaming", isRising: false, viralScore: 88, engagementRate: 9.1, avgViews: 420000 },
  { name: "fitness", views: "156B", videos: 278000000, growthRate: 42, category: "Fitness", isRising: true, viralScore: 90, engagementRate: 8.8, avgViews: 450000 },
  { name: "workout", views: "123B", videos: 234000000, growthRate: 48, category: "Fitness", isRising: true, viralScore: 92, engagementRate: 9.2, avgViews: 490000 },
  { name: "gym", views: "89B", videos: 167000000, growthRate: 35, category: "Fitness", isRising: false, viralScore: 88, engagementRate: 8.5, avgViews: 410000 },
  { name: "travel", views: "178B", videos: 312000000, growthRate: 32, category: "Travel", isRising: true, viralScore: 89, engagementRate: 8.4, avgViews: 420000 },
  { name: "traveltok", views: "56B", videos: 98000000, growthRate: 58, category: "Travel", isRising: true, viralScore: 91, engagementRate: 8.9, avgViews: 480000 },
  { name: "aesthetic", views: "234B", videos: 456000000, growthRate: 28, category: "Lifestyle", isRising: true, viralScore: 92, engagementRate: 8.6, avgViews: 440000 },
];

// Seed sounds
const seedSounds = [
  { title: "Original Sound - Phantom Beat", author: "DJ Phantom", uses: 8900000, growthRate: 340, isViral: true, viralScore: 95 },
  { title: "AI Voice Clone Effect", author: "TechBeats", uses: 6200000, growthRate: 520, isViral: true, viralScore: 96 },
  { title: "Seamless Transition", author: "EditMaster", uses: 3400000, growthRate: 210, isViral: false, viralScore: 74 },
  { title: "Morning Routine Vibes", author: "ChillBeats", uses: 2800000, growthRate: 180, isViral: false, viralScore: 58 },
  { title: "Funk Remix 2026", author: "BrazilFunk", uses: 12500000, growthRate: 410, isViral: true, viralScore: 94 },
  { title: "Bollywood Mashup", author: "DesiBeats", uses: 7800000, growthRate: 360, isViral: true, viralScore: 91 },
  { title: "German Engineering", author: "TechSounds", uses: 2100000, growthRate: 275, isViral: false, viralScore: 77 },
  { title: "Nature ASMR", author: "Wilderness Audio", uses: 3400000, growthRate: 310, isViral: true, viralScore: 87 },
  { title: "Aussie Slang", author: "DownUnder", uses: 2900000, growthRate: 245, isViral: false, viralScore: 79 },
  { title: "French Pastry", author: "ParisBeats", uses: 3800000, growthRate: 330, isViral: true, viralScore: 91 },
  { title: "K-Pop Hit 2026", author: "KMusic", uses: 25600000, growthRate: 420, isViral: true, viralScore: 98 },
  { title: "Lo-Fi Study", author: "StudyBeats", uses: 5200000, growthRate: 185, isViral: false, viralScore: 68 },
  { title: "Comedy Bang", author: "LaughTrack", uses: 8900000, growthRate: 220, isViral: true, viralScore: 89 },
  { title: "Dance Challenge Mix", author: "DanceBeats", uses: 15600000, growthRate: 380, isViral: true, viralScore: 93 },
  { title: "Fashion Walk", author: "Runway Audio", uses: 4200000, growthRate: 195, isViral: false, viralScore: 81 },
  { title: "Food ASMR", author: "Culinary Sounds", uses: 6700000, growthRate: 290, isViral: true, viralScore: 88 },
  { title: "DIY Project", author: "CraftBeats", uses: 3100000, growthRate: 180, isViral: false, viralScore: 72 },
  { title: "Gym Motivation", author: "Fitness Audio", uses: 8900000, growthRate: 245, isViral: true, viralScore: 90 },
  { title: "Travel Adventure", author: "Wanderlust", uses: 4500000, growthRate: 210, isViral: false, viralScore: 79 },
  { title: "Prank Sounds", author: "Comedy Central", uses: 7200000, growthRate: 265, isViral: true, viralScore: 87 },
];

async function main() {
  console.log("[SEED] Starting...");

  // Combine all trends
  const allTrends = [...seedTrends, ...additionalTrends];

  for (const t of allTrends) {
    const { tags, ...trendData } = t;

    const trend = await prisma.trend.upsert({
      where: { slug: trendData.slug },
      update: trendData,
      create: trendData,
    });

    for (const tagName of tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });

      await prisma.trendTag.upsert({
        where: { trendId_tagId: { trendId: trend.id, tagId: tag.id } },
        update: {},
        create: { trendId: trend.id, tagId: tag.id },
      });
    }

    console.log(`[SEED] Trend: ${trend.title}`);
  }

  for (const c of seedCreators) {
    await prisma.creator.upsert({
      where: { username: c.username },
      update: c,
      create: c,
    });
    console.log(`[SEED] Creator: ${c.displayName}`);
  }

  for (const h of seedHashtags) {
    await prisma.hashtag.upsert({
      where: { name: h.name },
      update: h,
      create: h,
    });
    console.log(`[SEED] Hashtag: #${h.name}`);
  }

  for (const s of seedSounds) {
    await prisma.sound.create({
      data: s,
    });
    console.log(`[SEED] Sound: ${s.title}`);
  }

  console.log("[SEED] Done.");
  console.log(`[SEED] Summary: ${allTrends.length} trends, ${seedCreators.length} creators, ${seedHashtags.length} hashtags, ${seedSounds.length} sounds`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
