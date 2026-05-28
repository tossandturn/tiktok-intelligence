"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, TrendingUp, Zap, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Feed", icon: Zap },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/trending", label: "Trending", icon: TrendingUp },
];

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-tiktok-black/90 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* TikTok-style note logo */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <path
                d="M24.5 8.5c-2.5 0-4.8-1.3-6.1-3.3v11.8c0 5.2-4.2 9.5-9.5 9.5S-.6 22.2-.6 17s4.2-9.5 9.5-9.5c.5 0 1 0 1.5.1v5.2c-.5-.1-1-.2-1.5-.2-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3V0h5.1c.7 3.2 3.2 5.7 6.4 6.4v2.1z"
                transform="translate(6, 4)"
                fill="url(#tiktok-gradient)"
              />
              <defs>
                <linearGradient id="tiktok-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#00f2ea" />
                  <stop offset="50%" stopColor="#00f2ea" />
                  <stop offset="50%" stopColor="#ff0050" />
                  <stop offset="100%" stopColor="#ff0050" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-tight text-white uppercase">
              TikTok
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-tiktok-cyan uppercase">
              Intelligence
            </span>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-white/60 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden bg-tiktok-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
