"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, Users, Eye, Flame, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface CreatorMomentum {
  id: string;
  username: string;
  displayName: string;
  avatar?: string | null;
  followers: number;
  niche?: string | null;
  momentumScore: number;
  engagementRate: number;
  avgViews: number;
  predictedGrowth7d?: number | null;
  isVerified: boolean;
  trendCount: number;
}

interface MomentumDashboardProps {
  creators: CreatorMomentum[];
}

function MomentumBar({ score }: { score: number }) {
  const width = Math.min(score, 100);
  const color = score >= 80 ? "bg-tiktok-cyan" : score >= 60 ? "bg-tiktok-pink" : score >= 40 ? "bg-amber-400" : "bg-white/20";

  return (
    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

function GrowthIndicator({ value }: { value: number | null | undefined }) {
  if (value == null) return <Minus className="w-3 h-3 text-white/20" />;
  if (value > 0) return <ArrowUpRight className="w-3 h-3 text-green-400" />;
  if (value < 0) return <ArrowDownRight className="w-3 h-3 text-red-400" />;
  return <Minus className="w-3 h-3 text-white/20" />;
}

export function MomentumDashboard({ creators }: MomentumDashboardProps) {
  const sorted = [...creators].sort((a, b) => b.momentumScore - a.momentumScore);
  const topCreators = sorted.slice(0, 8);

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-tiktok-pink" />
          Creator Momentum
        </h2>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Live Ranking</span>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-white/[0.04] text-[10px] font-medium text-white/30 uppercase tracking-wider">
          <div className="col-span-4">Creator</div>
          <div className="col-span-2 text-center">Momentum</div>
          <div className="col-span-2 text-center">Engagement</div>
          <div className="col-span-2 text-center">Avg Views</div>
          <div className="col-span-2 text-center">7d Forecast</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/[0.04]">
          {topCreators.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors items-center"
            >
              {/* Creator Info */}
              <div className="sm:col-span-4 flex items-center gap-3 min-w-0">
                <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {creator.avatar ? (
                    <Image src={creator.avatar} alt={creator.displayName} fill className="object-cover" />
                  ) : (
                    <Users className="w-4 h-4 text-white/30" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-white truncate">{creator.displayName}</span>
                    {creator.isVerified && (
                      <svg className="w-3 h-3 text-tiktok-cyan shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span>@{creator.username}</span>
                    {creator.niche && (
                      <span className="text-tiktok-cyan/70">{creator.niche}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Momentum */}
              <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-3">
                <span className="sm:hidden text-xs text-white/40">Momentum</span>
                <div className="flex items-center gap-2">
                  <MomentumBar score={creator.momentumScore} />
                  <span className="text-xs font-semibold text-white w-8 text-right">{creator.momentumScore.toFixed(0)}</span>
                </div>
              </div>

              {/* Engagement */}
              <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-3">
                <span className="sm:hidden text-xs text-white/40">Engagement</span>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-tiktok-pink" />
                  <span className="text-xs text-white">{creator.engagementRate.toFixed(1)}%</span>
                </div>
              </div>

              {/* Avg Views */}
              <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-3">
                <span className="sm:hidden text-xs text-white/40">Avg Views</span>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3 h-3 text-white/40" />
                  <span className="text-xs text-white">{(creator.avgViews / 1000).toFixed(0)}K</span>
                </div>
              </div>

              {/* Forecast */}
              <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-3">
                <span className="sm:hidden text-xs text-white/40">7d Forecast</span>
                <div className="flex items-center gap-1.5">
                  <GrowthIndicator value={creator.predictedGrowth7d} />
                  <span className={`text-xs font-medium ${(creator.predictedGrowth7d || 0) > 0 ? "text-green-400" : "text-white/40"}`}>
                    {creator.predictedGrowth7d ? `+${creator.predictedGrowth7d.toFixed(1)}%` : "N/A"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
