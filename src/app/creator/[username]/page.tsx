import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CreatorProfile } from "@/components/creator-profile";
import { TrendingGrid } from "@/components/trending-grid";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { username } = await params;
  const creator = await prisma.creator.findUnique({
    where: { username },
    select: {
      displayName: true,
      bio: true,
      niche: true,
      followers: true,
      momentumScore: true,
    },
  });

  if (!creator) {
    return {
      title: "Creator Not Found | TikTok Intelligence",
    };
  }

  return {
    title: `${creator.displayName} (@${username}) - TikTok Creator Analytics | TikTok Intelligence`,
    description: creator.bio || `Analyze ${creator.displayName}'s TikTok performance. ${creator.followers.toLocaleString()} followers, momentum score: ${creator.momentumScore?.toFixed(1) || 'N/A'}. Discover trending content and engagement metrics.`,
    keywords: [
      username,
      creator.displayName,
      "TikTok creator",
      "creator analytics",
      "TikTok stats",
      creator.niche || "TikTok",
      "viral content",
      "engagement rate",
    ],
    openGraph: {
      title: `${creator.displayName} (@${username}) - TikTok Analytics`,
      description: `Analytics and insights for @${username}`,
      type: "profile",
    },
  };
}

export async function generateStaticParams() {
  const creators = await prisma.creator.findMany({
    take: 100,
    select: { username: true },
    orderBy: { followers: "desc" },
  });

  return creators.map((creator) => ({
    username: creator.username,
  }));
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { username } = await params;
  const creator = await prisma.creator.findUnique({
    where: { username },
    include: {
      trends: {
        include: {
          trend: true,
        },
        take: 6,
        orderBy: {
          trend: {
            publishedAt: "desc",
          },
        },
      },
    },
  });

  if (!creator) {
    notFound();
  }

  const relatedTrends = creator.trends.map((tc) => tc.trend);

  return (
    <div className="min-h-screen bg-black">
      <CreatorProfile creator={creator} />

      {relatedTrends.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">
              Trends by {creator.displayName}
            </h2>
            <TrendingGrid trends={relatedTrends} />
          </div>
        </section>
      )}
    </div>
  );
}
