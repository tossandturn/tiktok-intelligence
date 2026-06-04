"use client";

import { Suspense, useState, useEffect } from "react";
import { Metadata } from "next";
import ExploreContent from "./explore-content";
import { DailyInsightsSection } from "@/components/daily-insights-section";
import { useCountry } from "@/components/country-context";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Creators, Hashtags & Sounds | TikTok Intelligence",
  description: "Discover top TikTok creators, trending hashtags, and viral sounds. Analytics and insights for TikTok content strategy.",
};

interface ExploreData {
  creators: Array<Record<string, unknown>>;
  hashtags: Array<Record<string, unknown>>;
  sounds: Array<Record<string, unknown>>;
}

function ExploreLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 text-tiktok-cyan animate-spin" />
      <p className="text-white/60 text-sm">Loading explore data...</p>
    </div>
  );
}

export default function ExplorePage() {
  const { selected: selectedCountry } = useCountry();
  const [data, setData] = useState<ExploreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExploreData() {
      setLoading(true);
      try {
        const [creatorsRes, hashtagsRes, soundsRes] = await Promise.all([
          fetch(`/api/creators?country=${selectedCountry.code}&limit=50`),
          fetch(`/api/hashtags?country=${selectedCountry.code}&limit=50`),
          fetch(`/api/sounds?country=${selectedCountry.code}&limit=50`),
        ]);

        const creators = creatorsRes.ok ? await creatorsRes.json() : [];
        const hashtags = hashtagsRes.ok ? await hashtagsRes.json() : [];
        const sounds = soundsRes.ok ? await soundsRes.json() : [];

        setData({
          creators: creators.data || [],
          hashtags: hashtags.data || [],
          sounds: sounds.data || [],
        });
      } catch (err) {
        console.error("Failed to fetch explore data:", err);
        setData({ creators: [], hashtags: [], sounds: [] });
      } finally {
        setLoading(false);
      }
    }

    fetchExploreData();
  }, [selectedCountry.code]);

  return (
    <div className="min-h-screen bg-black">
      {/* Daily Insights Section */}
      <DailyInsightsSection />

      {/* Main Explore Content */}
      <div className="pt-20">
        <Suspense fallback={<ExploreLoading />}>
          {loading || !data ? (
            <ExploreLoading />
          ) : (
            <ExploreContent initialData={data} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
