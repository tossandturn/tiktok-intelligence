"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

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

interface CountryContextType {
  selected: Country;
  setSelected: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | null>(null);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Country>(countries[0]);

  const handleSet = useCallback((country: Country) => {
    setSelected(country);
    // Scroll to top when country changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <CountryContext.Provider value={{ selected, setSelected: handleSet }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
