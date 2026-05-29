"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  Eye,
  Video,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CreatorAnalyticsProps {
  creator: {
    id: string;
    username: string;
    displayName: string;
    followers: number;
    following: number;
    likes: number;
    videos: number;
    engagementRate?: number;
    avgViews?: number;
    momentumScore?: number;
    viralVideoRate?: number;
    predictedGrowth7d?: number;
    niche?: string;
    bio?: string;
    isVerified?: boolean;
  };
}

export function CreatorAnalytics({ creator }: CreatorAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "engagement" | "content">("overview");

  // Generate sample historical data
  const historicalData = [
    { day: "Mon", followers: creator.followers * 0.92, views: creator.avgViews ? creator.avgViews * 0.8 : 0 },
    { day: "Tue", followers: creator.followers * 0.94, views: creator.avgViews ? creator.avgViews * 0.85 : 0 },
    { day: "Wed", followers: creator.followers * 0.96, views: creator.avgViews ? creator.avgViews * 0.9 : 0 },
    { day: "Thu", followers: creator.followers * 0.97, views: creator.avgViews ? creator.avgViews * 0.95 : 0 },
    { day: "Fri", followers: creator.followers * 0.98, views: creator.avgViews || 0 },
    { day: "Sat", followers: creator.followers * 0.99, views: creator.avgViews ? creator.avgViews * 1.1 : 0 },
    { day: "Sun", followers: creator.followers, views: creator.avgViews ? creator.avgViews * 1.15 : 0 },
  ];

  // Engagement breakdown data
  const engagementData = [
    { name: "Likes", value: 45, color: "#00f2ea" },
    { name: "Comments", value: 25, color: "#ff0050" },
    { name: "Shares", value: 20, color: "#fbbf24" },
    { name: "Saves", value: 10, color: "#8b5cf6" },
  ];

  // Content type performance
  const contentData = [
    { type: "Dance", count: 45, avgViews: 125000 },
    { type: "Trend", count: 32, avgViews: 89000 },
    { type: "Tutorial", count: 28, avgViews: 156000 },
    { type: "Behind", count: 18, avgViews: 67000 },
    { type: "Collab", count: 12, avgViews: 210000 },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const growthIndicator = (value: number) => {
    if (value > 0) return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (value < 0) return <ArrowDownRight className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-white/40" />;
  };

  return (
    <section className="px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-tiktok-cyan" />
          Creator Analytics
        </h2>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
          @{creator.username}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 mb-5">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "engagement", label: "Engagement", icon: Heart },
          { id: "content", label: "Content", icon: Video },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-white" : "text-white/50 hover:text-white/70"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="analyticsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-tiktok-cyan"
              />
            )}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                <Users className="w-3.5 h-3.5" />
                Followers
              </div>
              <div className="text-xl font-bold text-white">{formatNumber(creator.followers)}</div>
              <div className="flex items-center gap-1 mt-1">
                {growthIndicator(creator.predictedGrowth7d || 0)}
                <span className={`text-xs ${(creator.predictedGrowth7d || 0) > 0 ? "text-green-400" : "text-white/40"}`}>
                  {(creator.predictedGrowth7d || 0).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                <Eye className="w-3.5 h-3.5" />
                Avg Views
              </div>
              <div className="text-xl font-bold text-white">
                {formatNumber(creator.avgViews || 0)}
              </div>
              <div className="text-xs text-white/40 mt-1">Per video</div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                <Heart className="w-3.5 h-3.5" />
                Engagement
              </div>
              <div className="text-xl font-bold text-tiktok-pink">
                {(creator.engagementRate || 0).toFixed(1)}%
              </div>
              <div className="text-xs text-white/40 mt-1">Rate</div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                <Target className="w-3.5 h-3.5" />
                Momentum
              </div>
              <div className="text-xl font-bold text-tiktok-cyan">
                {(creator.momentumScore || 0).toFixed(1)}
              </div>
              <div className="text-xs text-white/40 mt-1">/100</div>
            </div>
          </div>

          {/* Growth Chart */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">7-Day Growth</span>
              <span className="text-xs text-white/30">Followers + Views</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                  <YAxis
                    yAxisId="left"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                    itemStyle={{ color: "#00f2ea" }}
                    formatter={(v) => [formatNumber(v as number), ""]}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="followers"
                    stroke="#00f2ea"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="views"
                    stroke="#ff0050"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* Engagement Tab */}
      {activeTab === "engagement" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <span className="text-sm font-semibold text-white mb-4 block">Engagement Breakdown</span>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(v) => [`${v}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {engagementData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-white/60">{item.name}</span>
                  <span className="text-xs text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <span className="text-sm font-semibold text-white mb-4 block">Performance Metrics</span>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-tiktok-pink" />
                  <span className="text-sm text-white/70">Total Likes</span>
                </div>
                <span className="text-sm font-semibold text-white">{formatNumber(creator.likes)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-tiktok-cyan" />
                  <span className="text-sm text-white/70">Total Videos</span>
                </div>
                <span className="text-sm font-semibold text-white">{creator.videos || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/70">Viral Rate</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {((creator.viralVideoRate || 0) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-white/70">Avg Post Time</span>
                </div>
                <span className="text-sm font-semibold text-white">8:00 PM</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
        >
          <span className="text-sm font-semibold text-white mb-4 block">Content Type Performance</span>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <YAxis
                  dataKey="type"
                  type="category"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                  itemStyle={{ color: "#00f2ea" }}
                  formatter={(v, n) => [
                    n === "avgViews" ? formatNumber(v as number) : v,
                    n === "avgViews" ? "Avg Views" : "Count",
                  ]}
                />
                <Bar dataKey="avgViews" fill="#00f2ea" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/[0.02] rounded-lg">
              <span className="text-xs text-white/40">Best Performing</span>
              <span className="text-sm font-semibold text-tiktok-cyan block">Collab Videos</span>
              <span className="text-xs text-white/60">210K avg views</span>
            </div>
            <div className="p-3 bg-white/[0.02] rounded-lg">
              <span className="text-xs text-white/40">Most Posted</span>
              <span className="text-sm font-semibold text-tiktok-pink block">Dance</span>
              <span className="text-xs text-white/60">45 videos</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
