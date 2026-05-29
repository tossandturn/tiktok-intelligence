"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Heart, Video, ArrowUpRight, Target } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import type { Creator } from "@prisma/client";

interface CreatorProfileProps {
  creator: Creator & {
    trends: {
      trend: {
        id: string;
        title: string;
        slug: string;
        thumbnail: string | null;
        viralScore: number;
      };
    }[];
  };
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  // Generate sample growth data based on predictedGrowth
  const growthData = [
    { day: "Day 1", followers: creator.followers * 0.95 },
    { day: "Day 2", followers: creator.followers * 0.97 },
    { day: "Day 3", followers: creator.followers * 0.98 },
    { day: "Day 4", followers: creator.followers * 0.99 },
    { day: "Day 5", followers: creator.followers },
    { day: "Day 6", followers: creator.followers * (1 + (creator.predictedGrowth7d || 0) * 0.01) },
    { day: "Day 7", followers: creator.followers * (1 + (creator.predictedGrowth7d || 0) * 0.02) },
  ];

  return (
    <section className="pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-white/40 mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-white transition-colors">
            Creators
          </Link>
          <span>/</span>
          <span className="text-white">@{creator.username}</span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1"
          >
            <div className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={creator.avatar || "/placeholder-avatar.png"}
                  alt={creator.displayName}
                  fill
                  className="rounded-full object-cover"
                />
                {creator.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-tiktok-cyan rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white text-center mb-1">
                {creator.displayName}
              </h1>
              <p className="text-white/60 text-center mb-4">@{creator.username}</p>

              {creator.niche && (
                <div className="flex items-center justify-center gap-2 text-sm text-tiktok-cyan mb-4">
                  <Target className="w-4 h-4" />
                  <span>{creator.niche}</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {(creator.followers / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-white/50">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {(creator.following / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-white/50">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {(creator.likes / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-white/50">Likes</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {/* AI Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Momentum
                </div>
                <div className="text-2xl font-bold text-tiktok-cyan">
                  {creator.momentumScore?.toFixed(1) || "N/A"}
                </div>
                <div className="text-xs text-white/40">/100</div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <Heart className="w-4 h-4" />
                  Engagement
                </div>
                <div className="text-2xl font-bold text-tiktok-pink">
                  {creator.engagementRate?.toFixed(1) || "N/A"}%
                </div>
                <div className="text-xs text-white/40">Avg rate</div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <Video className="w-4 h-4" />
                  Avg Views
                </div>
                <div className="text-2xl font-bold text-white">
                  {(creator.avgViews / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-white/40">Per video</div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Viral Rate
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {(creator.viralVideoRate * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-white/40">Of videos</div>
              </div>
            </div>

            {/* Growth Prediction Chart */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">7-Day Growth Forecast</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                    <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.5)" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      itemStyle={{ color: "#00f2ea" }}
                      formatter={(v) => [`${((v as number) / 1000000).toFixed(2)}M`, "Followers"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="#00f2ea"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bio */}
            {creator.bio && (
              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                <p className="text-white/80">{creator.bio}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
