"use client";

import Link from "next/link";
import { TrendingUp, Flame, ArrowRight } from "lucide-react";

interface BoomingKeyword {
  name: string;
  growthRate: number;
  views: string;
  rank: number;
  previousRank?: number;
  category?: string;
}

interface BoomingKeywordsProps {
  keywords: BoomingKeyword[];
  country: string;
  maxItems?: number;
}

const FLAGS: Record<string, string> = {
  US: "🇺🇸",
  JP: "🇯🇵",
  KR: "🇰🇷",
  GB: "🇬🇧",
  HK: "🇭🇰",
  TW: "🇹🇼",
};

function formatGrowthRate(rate: number): string {
  if (rate >= 1000) return `${(rate / 1000).toFixed(1)}K%`;
  return `+${rate.toFixed(0)}%`;
}

function getRankChangeIcon(current: number, previous?: number) {
  if (!previous || current === previous) return null;
  if (current < previous) {
    return <span className="text-green-400 text-xs">↑{previous - current}</span>;
  }
  return <span className="text-red-400 text-xs">↓{current - previous}</span>;
}

export function BoomingKeywords({ keywords, country, maxItems = 10 }: BoomingKeywordsProps) {
  const displayKeywords = keywords.slice(0, maxItems);

  if (displayKeywords.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        No booming keywords available for {FLAGS[country] || "🌍"} {country}
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {displayKeywords.map((keyword, index) => (
        <Link
          key={keyword.name}
          href={`/hashtag/${encodeURIComponent(keyword.name)}`}
          className="group flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#ff0050]/50 hover:bg-zinc-800/50 transition-all duration-200"
        >
          {/* Rank */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 font-bold text-sm">
            {keyword.rank}
          </div>

          {/* Keyword Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white truncate group-hover:text-[#ff0050] transition-colors">
                #{keyword.name}
              </span>
              {index < 3 && (
                <Flame className="w-4 h-4 text-[#ff0050]" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>{keyword.views} views</span>
              {keyword.category && (
                <span className="px-1.5 py-0.5 rounded bg-zinc-800">{keyword.category}</span>
              )}
            </div>
          </div>

          {/* Growth */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="flex items-center gap-1 text-[#00f2ea]">
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold">{formatGrowthRate(keyword.growthRate)}</span>
            </div>
            {getRankChangeIcon(keyword.rank, keyword.previousRank)}
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </div>
        </Link>
      ))}

      <Link
        href="/trending"
        className="flex items-center justify-center gap-2 py-3 text-sm text-zinc-500 hover:text-white transition-colors"
      >
        View all trending hashtags
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// Skeleton loader
export function BoomingKeywordsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50">
          <div className="w-8 h-8 rounded-lg bg-zinc-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-zinc-800 rounded" />
            <div className="h-3 w-20 bg-zinc-800 rounded" />
          </div>
          <div className="h-6 w-16 bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}
