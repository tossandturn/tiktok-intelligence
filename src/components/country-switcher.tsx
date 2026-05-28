"use client";

import { motion } from "framer-motion";

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const countries: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
];

interface CountrySwitcherProps {
  selected: Country;
  onSelect: (country: Country) => void;
}

export function CountrySwitcher({ selected, onSelect }: CountrySwitcherProps) {
  return (
    <section className="px-4 py-4 border-b border-white/5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Select Market</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {countries.map((country) => {
          const isActive = selected.code === country.code;
          return (
            <motion.button
              key={country.code}
              onClick={() => onSelect(country)}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-tiktok-black"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="whitespace-nowrap">{country.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCountry"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tiktok-cyan"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
