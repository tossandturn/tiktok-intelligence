"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Eye, Hash, ArrowUpRight, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import type { Hashtag } from "@prisma/client";

interface HashtagProfileProps {
  hashtag: Hashtag;
}

export function HashtagProfile({ hashtag }: HashtagProfileProps) {
  // Generate velocity data
  const velocityData = [
    { day: "-6d", velocity: hashtag.velocity * 0.3 },
    { day: "-5d", velocity: hashtag.velocity * 0.4 },
    { day: "-4d", velocity: hashtag.velocity * 0.55 },
    { day: "-3d", velocity: hashtag.velocity * 0.7 },
    { day: "-2d", velocity: hashtag.velocity * 0.85 },
    { day: "-1d", velocity: hashtag.velocity * 0.95 },
    { day: "Now", velocity: hashtag.velocity },
  ];

  const formatViews = (views: string) => {
    const num = parseInt(views.replace(/[^0-9]/g, ""));
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return views;
  };

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
            Hashtags
          </Link>
          <span>/</span>
          <span className="text-white">#{hashtag.name}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tiktok-cyan/20 to-tiktok-pink/20 flex items-center justify-center">
              <Hash className="w-8 h-8 text-tiktok-cyan" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                #{hashtag.name}
              </h1>
              {hashtag.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm text-white/70 mt-2">
                  {hashtag.category}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <Eye className="w-4 h-4" />
                  Total Views
                </div>
                <div className="text-2xl font-bold text-white">
                  {formatViews(hashtag.views)}
                </div>
                <div className="text-xs text-white/40">Cumulative</div>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <Activity className="w-4 h-4" />
                  Videos
                </div>
                <div className="text-2xl font-bold text-white">
                  {hashtag.videos.toLocaleString()}
                </div>
                <div className="text-xs text-white/40">Using this tag</div>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Growth
                </div>
                <div className={`text-2xl font-bold ${hashtag.growthRate > 0 ? "text-green-400" : "text-red-400"}`}>
                  {hashtag.growthRate > 0 ? "+" : ""}{hashtag.growthRate.toFixed(1)}%
                </div>
                <div className="text-xs text-white/40">Last 7 days</div>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Velocity
                </div>
                <div className="text-2xl font-bold text-tiktok-cyan">
                  {hashtag.velocity.toFixed(1)}
                </div>
                <div className="text-xs text-white/40">Score /100</div>
              </div>
            </div>

            {/* Velocity Chart */}
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Velocity Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={velocityData}>
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                    <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      itemStyle={{ color: "#00f2ea" }}
                      formatter={(v) => [(v as number).toFixed(1), "Velocity"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="velocity"
                      stroke="#00f2ea"
                      strokeWidth={2}
                      dot={{ fill: "#00f2ea", strokeWidth: 0, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Related Hashtags */}
            {hashtag.relatedHashtags && (
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Related Hashtags</h3>
                <div className="flex flex-wrap gap-2">
                  {(hashtag.relatedHashtags as string[]).map((tag) => (
                    <Link
                      key={tag}
                      href={`/hashtag/${encodeURIComponent(tag.replace("#", ""))}`}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
              <h3 className="text-sm font-semibold text-white/60 mb-3">AI Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Engagement Rate</span>
                  <span className="text-tiktok-cyan font-semibold">
                    {hashtag.engagementRate?.toFixed(1) || "N/A"}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Avg Views</span>
                  <span className="text-white font-semibold">
                    {hashtag.avgViews ? `${(hashtag.avgViews / 1000).toFixed(0)}K` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Viral Score</span>
                  <span className="text-tiktok-pink font-semibold">
                    {hashtag.viralScore?.toFixed(1) || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {hashtag.isRising && (
              <div className="p-5 bg-gradient-to-r from-tiktok-cyan/10 to-tiktok-pink/10 border border-tiktok-cyan/20 rounded-xl">
                <div className="flex items-center gap-2 text-tiktok-cyan font-semibold mb-2">
                  <TrendingUp className="w-5 h-5" />
                  Rising Trend
                </div>
                <p className="text-sm text-white/70">
                  This hashtag is gaining momentum fast. Consider using it in your next video.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
