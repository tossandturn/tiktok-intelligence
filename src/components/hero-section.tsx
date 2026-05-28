"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, ArrowRight, Clock, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end pb-8 pt-20 px-4 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-tiktok-black via-tiktok-dark to-tiktok-black" />

      {/* Floating orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[-80px] w-[300px] h-[300px] rounded-full bg-tiktok-cyan/10 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[-60px] w-[250px] h-[250px] rounded-full bg-tiktok-red/10 blur-[100px]"
      />

      <div className="relative z-10 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          {/* Live indicator */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tiktok-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tiktok-red" />
            </span>
            <span className="text-[11px] font-mono text-white/60 uppercase tracking-wider">
              Live Intelligence
            </span>
            <span className="text-[10px] text-white/30">|</span>
            <span className="text-[11px] font-mono text-tiktok-cyan uppercase tracking-wider">
              Updated 2m ago
            </span>
          </motion.div>

          {/* Headline — clear value prop */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white">
            Discover TikTok trends{" "}
            <span className="bg-gradient-to-r from-tiktok-cyan to-tiktok-red bg-clip-text text-transparent">
              before
            </span>{" "}
            they explode
          </h1>

          {/* Subtitle — what the user gets */}
          <p className="text-base text-white/50 leading-relaxed max-w-sm">
            Real-time viral detection, AI-powered opportunity scores, and creator intelligence —
            so you never miss the next big trend.
          </p>

          {/* Stats row — social proof */}
          <div className="flex items-center gap-5 py-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-tiktok-cyan" />
              <span className="text-sm font-semibold text-white">2,847</span>
              <span className="text-xs text-white/40">active trends</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-tiktok-red" />
              <span className="text-sm font-semibold text-white">48hrs</span>
              <span className="text-xs text-white/40">avg. early signal</span>
            </div>
          </div>

          {/* CTA — clear action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#opportunity"
              className="inline-flex items-center justify-center gap-2 bg-white text-tiktok-black px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors group"
            >
              <Zap className="w-4 h-4" />
              Find My Next Viral Video
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Explore Analytics
            </Link>
          </div>

          {/* Trust indicators — more social proof */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
              ].map((src, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-tiktok-black overflow-hidden relative">
                  <Image src={src} alt="" fill className="object-cover" sizes="28px" />
                </div>
              ))}
            </div>
            <div className="text-xs text-white/30">
              <span className="text-white/60 font-semibold">12,400+</span> creators using Intelligence daily
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
