import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { HashtagProfile } from "@/components/hashtag-profile";
import { TrendingGrid } from "@/components/trending-grid";

interface HashtagPageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({ params }: HashtagPageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const hashtag = await prisma.hashtag.findUnique({
    where: { name: decodedName },
    select: {
      name: true,
      views: true,
      videos: true,
      growthRate: true,
      category: true,
      velocity: true,
      viralScore: true,
    },
  });

  if (!hashtag) {
    return {
      title: "Hashtag Not Found | TikTok Intelligence",
    };
  }

  return {
    title: `#${hashtag.name} Hashtag Analytics | ${hashtag.views} Views | TikTok Intelligence`,
    description: `Analyze #${hashtag.name} hashtag performance. ${hashtag.views} views across ${hashtag.videos} videos. Growth rate: ${hashtag.growthRate.toFixed(1)}%. Discover trending content and viral potential.`,
    keywords: [
      `#${hashtag.name}`,
      hashtag.name,
      "TikTok hashtag",
      "hashtag analytics",
      "viral hashtag",
      "trending hashtag",
      hashtag.category || "TikTok",
      "hashtag strategy",
    ],
    openGraph: {
      title: `#${hashtag.name} - TikTok Hashtag Analytics`,
      description: `${hashtag.views} views · ${hashtag.videos} videos · ${hashtag.growthRate.toFixed(1)}% growth`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const hashtags = await prisma.hashtag.findMany({
    take: 100,
    select: { name: true },
    orderBy: [
      { viralScore: "desc" },
      { views: "desc" },
    ],
  });

  return hashtags.map((hashtag) => ({
    name: encodeURIComponent(hashtag.name),
  }));
}

export default async function HashtagPage({ params }: HashtagPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  const hashtag = await prisma.hashtag.findUnique({
    where: { name: decodedName },
  });

  if (!hashtag) {
    notFound();
  }

  // Find trends related to this hashtag through tags
  const relatedTrends = await prisma.trend.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: decodedName,
          },
        },
      },
    },
    take: 6,
    orderBy: { viralScore: "desc" },
  });

  return (
    <div className="min-h-screen bg-black">
      <HashtagProfile hashtag={hashtag} />

      {relatedTrends.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">
              Trends Using #{hashtag.name}
            </h2>
            <TrendingGrid trends={relatedTrends} />
          </div>
        </section>
      )}
    </div>
  );
}
