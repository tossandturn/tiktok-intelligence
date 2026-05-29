"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Clock } from "lucide-react";

interface ViralPrediction {
  id: string;
  title: string;
  slug: string;
  category: string;
  viralProbability: number;
  momentumDirection: string;
  riskLevel: string;
  opportunityWindow: string;
  forecast7d: number;
  engagement: number;
  velocity: number;
}

interface ViralPredictionProps {
  predictions: ViralPrediction[];
}

function ProbabilityRing({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? "#00f2ea" : value >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <span className="absolute text-xs font-bold text-white">{Math.round(value)}%</span>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    low: "bg-green-400/10 text-green-400 border-green-400/20",
    medium: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    high: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors[level.toLowerCase()] || colors.medium}`}>
      {level}
    </span>
  );
}

export function ViralPredictionEngine({ predictions }: ViralPredictionProps) {
  const sorted = [...predictions].sort((a, b) => b.viralProbability - a.viralProbability);
  const topPicks = sorted.slice(0, 5);

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-tiktok-cyan" />
          AI Viral Predictor
        </h2>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Top 5</span>
      </div>

      <div className="space-y-3">
        {topPicks.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-4">
              <ProbabilityRing value={p.viralProbability} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">{p.title}</h3>
                  <RiskBadge level={p.riskLevel} />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-white/40">
                  <span className="text-white/60">{p.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {p.opportunityWindow || "7d window"}
                  </span>
                  <span className={`flex items-center gap-1 ${p.momentumDirection === "accelerating" ? "text-green-400" : "text-white/40"}`}>
                    {p.momentumDirection === "accelerating" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {p.momentumDirection}
                  </span>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-tiktok-cyan">+{p.forecast7d?.toFixed(0) || 0}%</div>
                <div className="text-[10px] text-white/30">7d forecast</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
