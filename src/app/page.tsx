"use client";

import { useMemo } from "react";
import { HeroSection } from "@/components/hero-section";
import { TrendCard } from "@/components/trend-card";
import { VideoSection } from "@/components/video-section";
import { AdSlot } from "@/components/ad-slot";
import { FloatingTags } from "@/components/floating-tags";
import { useCountry } from "@/components/country-context";
import { OpportunityHero } from "@/components/opportunity-hero";
import { TrendingTags } from "@/components/trending-tags";
import { ShortsSection } from "@/components/shorts-section";
import { MissedTrends } from "@/components/missed-trends";
import { UploadSuggestions } from "@/components/upload-suggestions";
import { RefreshIndicator } from "@/components/refresh-indicator";
import { AnalyticsCharts } from "@/components/analytics-charts";
import { trends, featuredCreators, trendingTagBubbles, uploadSuggestions, shortsData } from "@/lib/data";
import { Flame, Clock, Users, BarChart3, TrendingUp, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const sectionVideos = [
  { id: "v1", videoId: "7157280000000000000", thumbnail: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=400&h=700&fit=crop", views: "12.4M", likes: "2.1M", duration: "0:24" },
  { id: "v2", videoId: "7157280000000000001", thumbnail: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=700&fit=crop", views: "8.7M", likes: "1.4M", duration: "0:31" },
  { id: "v3", videoId: "7157280000000000002", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=700&fit=crop", views: "6.2M", likes: "890K", duration: "0:18" },
  { id: "v4", videoId: "7157280000000000003", thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=700&fit=crop", views: "4.9M", likes: "720K", duration: "0:45" },
  { id: "v5", videoId: "7157280000000000004", thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=700&fit=crop", views: "3.8M", likes: "560K", duration: "0:22" },
];

export default function HomePage() {
  const { selected: selectedCountry } = useCountry();

  const filteredTrends = useMemo(() =>
    trends.filter((t) => t.country === selectedCountry.code),
    [selectedCountry]
  );

  const viralTrends = filteredTrends.filter((t) => t.isViral);
  const newTrends = filteredTrends.filter((t) => t.isNew);
  const missedTrends = filteredTrends.filter((t) => (t.saturation || 0) > 50).slice(0, 3);
  const topOpportunity = filteredTrends.reduce((prev, current) =>
    (current.opportunityScore || 0) > (prev.opportunityScore || 0) ? current : prev,
    filteredTrends[0]
  );

  const totalViews = filteredTrends.reduce((acc, t) => {
    const num = parseFloat(t.views.replace(/[^0-9.]/g, ""));
    const mult = t.views.includes("M") ? 1000000 : t.views.includes("K") ? 1000 : 1;
    return acc + num * mult;
  }, 0);

  const totalCreators = filteredTrends.reduce((acc, t) => acc + (t.creators || 0), 0);
  const avgViralScore = filteredTrends.length > 0
    ? Math.round(filteredTrends.reduce((acc, t) => acc + (t.viralScore || 0), 0) / filteredTrends.length)
    : 0;

  return (
    <div className="max-w-lg mx-auto">
      <HeroSection />

      <AdSlot position="below-hero" />

      {/* Market stats summary — psychology: social proof */}
      <section className="px-4 py-4"
      >
        <div className="grid grid-cols-3 gap-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-xl p-3 border border-white/5 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-1"
            >
              <Eye className="w-3.5 h-3.5 text-tiktok-cyan" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider"
              >Total Views</span>
            </div>
            <div className="text-lg font-bold text-white"
            >
              {(totalViews / 1000000).toFixed(0)}M+
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-xl p-3 border border-white/5 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-1"
            >
              <Users className="w-3.5 h-3.5 text-tiktok-red" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider"
              >Creators</span>
            </div>
            <div className="text-lg font-bold text-white"
            >
              {(totalCreators / 1000).toFixed(1)}K
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-xl p-3 border border-white/5 text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-1"
            >
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[10px] text-white/40 uppercase tracking-wider"
              >Avg Score</span>
            </div>
            <div className="text-lg font-bold text-white"
            >
              {avgViralScore}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Charts — professional data visualization */}
      <AnalyticsCharts trends={filteredTrends} />

      {/* Refresh indicator */}
      <div className="px-4"
      >
        <RefreshIndicator />
      </div>

      {/* Today's Biggest Opportunity */}
      {topOpportunity && <OpportunityHero trend={topOpportunity} />}

      <AdSlot position="between-sections" />

      {/* Viral Trends */}
      {viralTrends.length > 0 && (
        <section className="px-4 py-6"
        >
          <div className="flex items-center justify-between mb-4"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2"
            >
              <Flame className="w-5 h-5 text-tiktok-red" />
              Going Viral Now
              <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded-full"
              >{viralTrends.length}</span>
            </h2>
            <Link href="/explore" className="text-xs text-tiktok-cyan hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="space-y-4"
          >
            {viralTrends.map((trend, i) => (
              <TrendCard key={trend.id} trend={trend} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Tags */}
      <TrendingTags tags={trendingTagBubbles} />

      {/* Trending Videos with embed */}
      <VideoSection title="Trending Videos" videos={sectionVideos.slice(0, 4)} />

      {/* Shorts Gold */}
      <ShortsSection shorts={shortsData} />

      <AdSlot position="between-sections" />

      {/* New Signals */}
      {newTrends.length > 0 && (
        <section className="px-4 py-6"
        >
          <div className="flex items-center justify-between mb-4"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2"
            >
              <Clock className="w-5 h-5 text-tiktok-cyan" />
              Fresh Signals
              <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded-full"
              >{newTrends.length}</span>
            </h2>
          </div>
          <div className="space-y-4"
          >
            {newTrends.map((trend, i) => (
              <TrendCard key={trend.id} trend={trend} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* AI Upload Suggestions */}
      <UploadSuggestions suggestions={uploadSuggestions} />

      {/* Missed Trends FOMO */}
      {missedTrends.length > 0 && <MissedTrends trends={missedTrends} />}

      {/* Early Adopters Videos */}
      <VideoSection title="Early Adopters" videos={sectionVideos.slice(1, 5)} />

      {/* Featured Creators */}
      <section className="px-4 py-6"
      >
        <div className="flex items-center justify-between mb-4"
        >
          <h2 className="text-lg font-bold text-white flex items-center gap-2"
          >
            <Users className="w-5 h-5 text-tiktok-cyan" />
            Rising Creators
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        >
          {featuredCreators.map((creator) => (
            <div
              key={creator.id}
              className="flex-shrink-0 flex flex-col items-center gap-2 snap-start"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-tiktok-cyan/30 ring-offset-2 ring-offset-tiktok-black"
              >
                <Image src={creator.avatar} alt={creator.name} fill className="object-cover" sizes="64px" />
              </div>
              <span className="text-xs font-semibold text-white"
              >{creator.name}</span>
              <span className="text-[10px] text-white/40"
              >{creator.followers}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Category tags */}
      <section className="px-4 py-8"
      >
        <h2 className="text-lg font-bold text-white mb-4"
        >Explore by Category</h2>
        <FloatingTags
          tags={["Dance", "Tech", "Editing", "Lifestyle", "Food", "Social", "DIY", "Entertainment"]}
        />
      </section>

      {/* All trends */}
      <section className="px-4 py-6 pb-12"
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"
        >
          <BarChart3 className="w-5 h-5 text-white/60" />
          All Signals
          <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded-full"
          >{filteredTrends.length}</span>
        </h2>
        <div className="space-y-4"
        >
          {filteredTrends.map((trend, i) => (
            <TrendCard key={trend.id} trend={trend} index={i} layout="horizontal" />
          ))}
        </div>
      </section>
    </div>
  );
}
