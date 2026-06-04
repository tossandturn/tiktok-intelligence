import { prisma } from "@/lib/prisma";

const quickTrends = [
  {
    slug: "tiktok-dance-trends-2026",
    title: "TikTok Dance Trends 2026",
    description: "Latest viral dance trends taking over TikTok right now.",
    category: "Dance",
    country: "US",
    growthRate: 245,
    views: "120M",
    creators: 45000,
    isViral: true,
    isNew: true,
    viralScore: 95,
  },
  {
    slug: "viral-hashtag-challenge",
    title: "Viral Hashtag Challenge",
    description: "The hashtag challenge everyone's talking about.",
    category: "Challenge",
    country: "US",
    growthRate: 189,
    views: "85M",
    creators: 28000,
    isViral: true,
    isNew: false,
    viralScore: 88,
  },
  {
    slug: "tiktok-creator-growth",
    title: "TikTok Creator Growth Hacks",
    description: "Proven strategies to grow your TikTok following fast.",
    category: "Growth",
    country: "US",
    growthRate: 156,
    views: "45M",
    creators: 12000,
    isViral: false,
    isNew: false,
    viralScore: 72,
  },
  {
    slug: "trending-sounds-2026",
    title: "Trending Sounds 2026",
    description: "The hottest sounds that are trending right now.",
    category: "Music",
    country: "US",
    growthRate: 298,
    views: "200M",
    creators: 62000,
    isViral: true,
    isNew: true,
    viralScore: 96,
  },
  {
    slug: "tiktok-marketing-guide",
    title: "TikTok Marketing Guide",
    description: "Complete guide to marketing on TikTok for brands.",
    category: "Marketing",
    country: "US",
    growthRate: 134,
    views: "32M",
    creators: 8500,
    isViral: false,
    isNew: false,
    viralScore: 68,
  },
];

async function seed() {
  console.log("Seeding trends...");

  for (const trendData of quickTrends) {
    const trend = await prisma.trend.upsert({
      where: { slug: trendData.slug },
      update: trendData,
      create: trendData,
    });
    console.log(`Upserted trend: ${trend.title}`);
  }

  console.log("Seeding complete!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
