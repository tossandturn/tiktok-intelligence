"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Zap, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

interface TrendVelocity {
  id: string;
  title: string;
  slug: string;
  category: string;
  velocity: number;
  growthRate: number;
  engagement: number;
  saturation: number;
  viralScore: number;
  isViral: boolean;
  isNew: boolean;
  updatedAt: string;
}

interface VelocityChartsProps {
  trends: TrendVelocity[];
}

const COLORS = ["#00f2ea", "#ff0050", "#25f4ee", "#fe2c55", "#ffffff", "#f59e0b", "#8b5cf6", "#10b981"];

interface TooltipPayloadItem {
  name: string;
  value: number | string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((p: TooltipPayloadItem, i: number) => (
          <p key={i} className="text-white/70">
            {p.name}: <span className="text-tiktok-cyan font-bold">{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function VelocityAnalysis({ trends }: VelocityChartsProps) {
  const sortedByVelocity = [...trends].sort((a, b) => b.velocity - a.velocity).slice(0, 8);
  const sortedByGrowth = [...trends].sort((a, b) => b.growthRate - a.growthRate).slice(0, 8);

  const velocityData = sortedByVelocity.map((t) => ({
    name: t.title.length > 10 ? t.title.slice(0, 10) + "..." : t.title,
    velocity: t.velocity,
    saturation: t.saturation,
    engagement: t.engagement,
  }));

  const growthData = sortedByGrowth.map((t, i) => ({
    name: t.category,
    growth: t.growthRate,
    viral: t.viralScore,
    index: i,
  }));

  const stats = {
    avgVelocity: trends.reduce((s, t) => s + t.velocity, 0) / (trends.length || 1),
    avgGrowth: trends.reduce((s, t) => s + t.growthRate, 0) / (trends.length || 1),
    viralCount: trends.filter((t) => t.isViral).length,
    newCount: trends.filter((t) => t.isNew).length,
  };

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-tiktok-cyan" />
          Velocity Analysis
        </h2>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Real-time</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Avg Velocity", value: stats.avgVelocity.toFixed(1), icon: Zap, color: "text-tiktok-cyan" },
          { label: "Avg Growth", value: `+${stats.avgGrowth.toFixed(1)}%`, icon: TrendingUp, color: "text-green-400" },
          { label: "Viral Now", value: stats.viralCount.toString(), icon: Activity, color: "text-tiktok-pink" },
          { label: "New Today", value: stats.newCount.toString(), icon: Clock, color: "text-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-center"
          >
            <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1.5`} />
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-[10px] text-white/30">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Velocity vs Saturation Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Velocity vs Saturation</span>
            <span className="text-[10px] text-white/30">Top 8</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f2ea" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="satGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0050" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ff0050" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="velocity" stroke="#00f2ea" fill="url(#velGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="saturation" stroke="#ff0050" fill="url(#satGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Growth Rate Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Growth by Category</span>
            <span className="text-[10px] text-white/30">Top 8</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={70} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="growth" radius={[0, 4, 4, 0]} barSize={14}>
                  {growthData.map((entry) => (
                    <Cell key={entry.index} fill={COLORS[entry.index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
