"use client";

import Link from "next/link";
import { useMemo } from "react";

interface WordCloudItem {
  name: string;
  weight: number;
  viralScore?: number;
  trendDirection?: "up" | "down" | "stable";
}

interface WordCloudProps {
  data: WordCloudItem[];
  country: string;
  maxWords?: number;
}

// Country flags mapping
const FLAGS: Record<string, string> = {
  US: "🇺🇸",
  JP: "🇯🇵",
  KR: "🇰🇷",
  GB: "🇬🇧",
  HK: "🇭🇰",
  TW: "🇹🇼",
};

// Generate vibrant colors based on viral score
function getColorClass(viralScore: number): string {
  if (viralScore >= 90) return "bg-gradient-to-r from-[#ff0050] to-[#ff4080] text-white";
  if (viralScore >= 70) return "bg-gradient-to-r from-[#00f2ea] to-[#00d4c4] text-black";
  if (viralScore >= 50) return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
  return "bg-zinc-800 text-zinc-300 border border-zinc-700";
}

// Size based on weight
function getSizeClass(weight: number): string {
  if (weight >= 100) return "text-xl px-5 py-2.5";
  if (weight >= 70) return "text-lg px-4 py-2";
  if (weight >= 40) return "text-base px-3.5 py-1.5";
  return "text-sm px-3 py-1";
}

export function WordCloud({ data, country, maxWords = 30 }: WordCloudProps) {
  const displayWords = useMemo(() => {
    return data.slice(0, maxWords).sort(() => Math.random() - 0.5);
  }, [data, maxWords]);

  if (displayWords.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        No trending hashtags available for {FLAGS[country] || "🌍"} {country}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        {displayWords.map((word) => (
          <Link
            key={word.name}
            href={`/hashtag/${encodeURIComponent(word.name)}`}
            className={`
              inline-flex items-center rounded-full font-medium
              transition-all duration-200 hover:scale-105 hover:shadow-lg
              ${getSizeClass(word.weight)}
              ${getColorClass(word.viralScore || 50)}
            `}
          >
            #{word.name}
            {word.trendDirection === "up" && (
              <span className="ml-1.5 text-xs">↗</span>
            )}
            {word.trendDirection === "down" && (
              <span className="ml-1.5 text-xs">↘</span>
            )}
          </Link>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-500 mt-4">
        Click any hashtag to view ranking details
      </p>
    </div>
  );
}

// Skeleton loader for word cloud
export function WordCloudSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center animate-pulse">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="h-8 bg-zinc-800 rounded-full"
          style={{
            width: `${Math.random() * 100 + 60}px`,
          }}
        />
      ))}
    </div>
  );
}
