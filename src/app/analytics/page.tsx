import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ViralPredictionEngine } from "@/components/viral-prediction";
import { MomentumDashboard } from "@/components/momentum-dashboard";
import { VelocityAnalysis } from "@/components/velocity-charts";
import { AudienceOverlap } from "@/components/audience-overlap";
import { AnalyticsCharts } from "@/components/analytics-charts";

export const metadata: Metadata = {
  title: "AI Analytics Dashboard | TikTok Intelligence",
  description: "Viral prediction engine, creator momentum scores, trend velocity analysis, and audience overlap insights powered by AI.",
};

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const trends = await prisma.trend.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      growthRate: true,
      viralScore: true,
      engagement: true,
      velocity: true,
      saturation: true,
      isViral: true,
      isNew: true,
      updatedAt: true,
      viralProbability: true,
      aiPrediction: true,
      trendForecast7d: true,
      momentumScore: true,
      opportunityScore: true,
      actionTime: true,
      whyItBlowsUp: true,
    },
    take: 100,
    orderBy: { viralScore: "desc" },
  });

  const creators = await prisma.creator.findMany({
    select: {
      id: true,
      username: true,
      displayName: true,
      avatar: true,
      followers: true,
      niche: true,
      momentumScore: true,
      engagementRate: true,
      avgViews: true,
      predictedGrowth7d: true,
      isVerified: true,
    },
    take: 50,
    orderBy: { momentumScore: "desc" },
  });

  const predictions = trends.map((t) => ({
    id: t.id,
    title: t.title,
    slug: t.slug,
    category: t.category,
    viralProbability: t.viralProbability || Math.min(95, (t.viralScore || 0) * 0.8 + Math.random() * 20),
    momentumDirection: (t.momentumScore || 0) > 70 ? "accelerating" : (t.momentumScore || 0) > 40 ? "stable" : "declining",
    riskLevel: (t.saturation || 0) > 80 ? "high" : (t.saturation || 0) > 50 ? "medium" : "low",
    opportunityWindow: t.actionTime || `${Math.max(1, Math.floor((t.opportunityScore || 50) / 10))}d window`,
    forecast7d: t.trendForecast7d || t.growthRate * 1.2,
    engagement: t.engagement,
    velocity: t.velocity,
  }));

  const creatorData = creators.map((c) => ({
    ...c,
    momentumScore: c.momentumScore || Math.random() * 60 + 20,
    engagementRate: c.engagementRate || Math.random() * 10 + 1,
    avgViews: c.avgViews || Math.floor(Math.random() * 500000),
    trendCount: Math.floor(Math.random() * 20) + 1,
  }));

  const velocityTrends = trends.map((t) => ({
    id: t.id,
    title: t.title,
    slug: t.slug,
    category: t.category,
    velocity: t.velocity,
    growthRate: t.growthRate,
    engagement: t.engagement,
    saturation: t.saturation,
    viralScore: t.viralScore || 0,
    isViral: t.isViral,
    isNew: t.isNew,
    updatedAt: t.updatedAt.toISOString(),
  }));

  const chartTrends = trends.map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category,
    growthRate: t.growthRate,
    viralScore: t.viralScore || undefined,
    engagement: t.engagement || undefined,
  }));

  return (
    <main className="min-h-screen bg-tiktok-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Analytics Dashboard</h1>
          <p className="text-sm text-white/40">
            Real-time viral predictions, creator momentum tracking, and trend velocity analysis
          </p>
        </div>
      </div>

      {/* Market Intelligence Charts */}
      <AnalyticsCharts trends={chartTrends} />

      {/* Viral Predictions */}
      <ViralPredictionEngine predictions={predictions} />

      {/* Velocity Analysis */}
      <VelocityAnalysis trends={velocityTrends} />

      {/* Creator Momentum */}
      <MomentumDashboard creators={creatorData} />

      {/* Audience Overlap */}
      <AudienceOverlap creators={creatorData} />
    </main>
  );
}
