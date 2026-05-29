"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Eye, Flame } from "lucide-react";

interface Trend {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  viralScore: number;
  views?: string;
  growthRate?: number;
  isViral?: boolean;
}

interface TrendingGridProps {
  trends: Trend[];
}

export function TrendingGrid({ trends }: TrendingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trends.map((trend, i) => (
        <motion.div
          key={trend.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            href={`/trend/${trend.slug}`}
            className="group block p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-tiktok-cyan/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={trend.thumbnail || "/placeholder-trend.png"}
                  alt={trend.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {trend.isViral && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-tiktok-pink/90 text-white text-[10px] font-bold rounded flex items-center gap-0.5">
                    <Flame className="w-3 h-3" />
                    VIRAL
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white mb-1 truncate group-hover:text-tiktok-cyan transition-colors">
                  {trend.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-tiktok-cyan font-medium">
                      {trend.viralScore.toFixed(0)}
                    </span>
                  </div>
                  {trend.views && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {trend.views}
                    </div>
                  )}
                  {trend.growthRate !== undefined && trend.growthRate > 0 && (
                    <span className="text-green-400">+{trend.growthRate.toFixed(0)}%</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
