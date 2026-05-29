"use client";

import { motion } from "framer-motion";
import { Users, GitMerge, Target, Percent } from "lucide-react";

interface OverlapNode {
  id: string;
  name: string;
  followers: number;
  category: string;
  x: number;
  y: number;
  r: number;
}

interface OverlapLink {
  source: string;
  target: string;
  strength: number;
}

interface AudienceOverlapProps {
  creators: Array<{
    id: string;
    username: string;
    displayName: string;
    followers: number;
    niche?: string | null;
    momentumScore: number;
  }>;
}

export function AudienceOverlap({ creators }: AudienceOverlapProps) {
  const topCreators = [...creators].sort((a, b) => b.followers - a.followers).slice(0, 6);

  // Generate overlap data
  const nodes: OverlapNode[] = topCreators.map((c, i) => ({
    id: c.id,
    name: c.displayName,
    followers: c.followers,
    category: c.niche || "General",
    x: 50 + 35 * Math.cos((i * 2 * Math.PI) / topCreators.length),
    y: 50 + 35 * Math.sin((i * 2 * Math.PI) / topCreators.length),
    r: Math.max(8, Math.min(20, (c.followers / 1000000) * 2)),
  }));

  const links: OverlapLink[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const strength = Math.random() * 0.6 + 0.1;
      if (strength > 0.3) {
        links.push({ source: nodes[i].id, target: nodes[j].id, strength });
      }
    }
  }

  const categoryGroups = nodes.reduce((acc, n) => {
    acc[n.category] = (acc[n.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <GitMerge className="w-5 h-5 text-tiktok-pink" />
          Audience Overlap
        </h2>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Top 6</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Network Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Creator Network</span>
            <span className="text-[10px] text-white/30">Line thickness = overlap strength</span>
          </div>
          <div className="relative h-64 sm:h-72">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Links */}
              {links.map((link, i) => {
                const source = nodes.find((n) => n.id === link.source);
                const target = nodes.find((n) => n.id === link.target);
                if (!source || !target) return null;
                return (
                  <line
                    key={i}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="rgba(0,242,234,0.15)"
                    strokeWidth={link.strength * 3}
                    className="transition-opacity"
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node, i) => (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={i === 0 ? "#00f2ea" : i === 1 ? "#ff0050" : "rgba(255,255,255,0.08)"}
                    stroke={i < 2 ? "none" : "rgba(255,255,255,0.15)"}
                    strokeWidth={0.5}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="cursor-pointer hover:opacity-80"
                  />
                  <text
                    x={node.x}
                    y={node.y + node.r + 6}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.5)"
                    fontSize="3"
                    fontWeight="500"
                  >
                    {node.name.length > 8 ? node.name.slice(0, 8) + "..." : node.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="space-y-3">
          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-tiktok-cyan" />
              <span className="text-sm font-semibold text-white">Niche Distribution</span>
            </div>
            <div className="space-y-2">
              {Object.entries(categoryGroups).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-xs text-white/50">{cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-tiktok-cyan"
                        style={{ width: `${(count / nodes.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white w-4">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Overlap Score */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-tiktok-pink" />
              <span className="text-sm font-semibold text-white">Overlap Insights</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Total Connections</span>
                <span className="text-sm font-semibold text-white">{links.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Avg Overlap</span>
                <span className="text-sm font-semibold text-tiktok-cyan">
                  {(links.reduce((s, l) => s + l.strength, 0) / (links.length || 1) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Total Reach</span>
                <span className="text-sm font-semibold text-white">
                  {(nodes.reduce((s, n) => s + n.followers, 0) / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top Connector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-tiktok-cyan/5 to-tiktok-pink/5 border border-tiktok-cyan/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-tiktok-cyan" />
              <span className="text-sm font-semibold text-white">Top Connector</span>
            </div>
            <p className="text-xs text-white/60">
              Creators in the <span className="text-tiktok-cyan">{nodes[0]?.category}</span> niche show the highest audience overlap. Consider collaboration opportunities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
