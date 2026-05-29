import { Suspense } from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ExploreContent from "./explore-content";

export const metadata: Metadata = {
  title: "Explore Creators, Hashtags & Sounds | TikTok Intelligence",
  description: "Discover top TikTok creators, trending hashtags, and viral sounds. Analytics and insights for TikTok content strategy.",
};

// Generate static paths for SEO
export async function generateStaticParams() {
  return [{}]; // Single static page
}

async function getExploreData() {
  const creators = await prisma.creator.findMany({
    take: 50,
    orderBy: { followers: "desc" },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatar: true,
      followers: true,
      niche: true,
      momentumScore: true,
      isVerified: true,
    },
  });

  const hashtags = await prisma.hashtag.findMany({
    take: 50,
    orderBy: [
      { isRising: "desc" },
      { viralScore: "desc" },
    ],
    select: {
      id: true,
      name: true,
      views: true,
      videos: true,
      growthRate: true,
      category: true,
      isRising: true,
      viralScore: true,
    },
  });

  const sounds = await prisma.sound.findMany({
    take: 50,
    orderBy: [
      { isViral: "desc" },
      { uses: "desc" },
    ],
    select: {
      id: true,
      title: true,
      author: true,
      thumbnail: true,
      uses: true,
      growthRate: true,
      isViral: true,
      viralScore: true,
      trendingSince: true,
    },
  });

  return { creators, hashtags, sounds };
}

export default async function ExplorePage() {
  const data = await getExploreData();

  return (
    <div className="min-h-screen bg-black pt-20">
      <Suspense fallback={
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/5 rounded w-1/3" />
            <div className="h-10 bg-white/5 rounded w-full" />
            <div className="h-6 bg-white/5 rounded w-2/3" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-white/5 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }>
        <ExploreContent initialData={data} />
      </Suspense>
    </div>
  );
}
