"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, FileJson, FileSpreadsheet, Check, Loader2 } from "lucide-react";

interface ExportData {
  id: string;
  title: string;
  category: string;
  growthRate: number;
  views: string;
  engagement?: number;
  viralScore?: number;
  velocity?: number;
  saturation?: number;
  opportunityScore?: number;
  updatedAt?: Date;
}

interface DataExportProps {
  data: ExportData[];
  filename?: string;
}

type ExportFormat = "csv" | "json";

export function DataExport({ data, filename = "tiktok-trends" }: DataExportProps) {
  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const [completed, setCompleted] = useState<ExportFormat | null>(null);

  const downloadFile = useCallback((content: string, extension: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split("T")[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filename]);

  const exportToCSV = useCallback(() => {
    setExporting("csv");

    // CSV headers
    const headers = [
      "ID",
      "Title",
      "Category",
      "Growth Rate (%)",
      "Views",
      "Engagement (%)",
      "Viral Score",
      "Velocity",
      "Saturation (%)",
      "Opportunity Score",
      "Last Updated"
    ];

    // Convert data to CSV rows
    const rows = data.map(item => [
      item.id,
      `"${item.title.replace(/"/g, '""')}"`, // Escape quotes
      item.category,
      item.growthRate.toFixed(2),
      item.views,
      (item.engagement || 0).toFixed(2),
      (item.viralScore || 0).toFixed(1),
      (item.velocity || 0).toFixed(1),
      (item.saturation || 0).toFixed(1),
      (item.opportunityScore || 0).toFixed(1),
      item.updatedAt ? new Date(item.updatedAt).toISOString() : ""
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    setTimeout(() => {
      downloadFile(csvContent, "csv", "text/csv;charset=utf-8;");
      setExporting(null);
      setCompleted("csv");
      setTimeout(() => setCompleted(null), 2000);
    }, 500);
  }, [data, downloadFile]);

  const exportToJSON = useCallback(() => {
    setExporting("json");

    // Format data for JSON export with metadata
    const exportPayload = {
      metadata: {
        exportedAt: new Date().toISOString(),
        totalCount: data.length,
        source: "TikTok Intelligence",
        version: "1.0"
      },
      trends: data.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        metrics: {
          growthRate: item.growthRate,
          views: item.views,
          engagement: item.engagement || 0,
          viralScore: item.viralScore || 0,
          velocity: item.velocity || 0,
          saturation: item.saturation || 0,
          opportunityScore: item.opportunityScore || 0
        },
        updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null
      }))
    };

    const jsonContent = JSON.stringify(exportPayload, null, 2);

    setTimeout(() => {
      downloadFile(jsonContent, "json", "application/json");
      setExporting(null);
      setCompleted("json");
      setTimeout(() => setCompleted(null), 2000);
    }, 500);
  }, [data, downloadFile]);

  const itemCount = data.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-tiktok-cyan" />
          <span className="text-sm font-semibold text-white">Export Data</span>
        </div>
        <span className="text-[10px] text-white/30 font-mono">{itemCount} items</span>
      </div>

      <p className="text-xs text-white/40 mb-4">
        Download trend data in your preferred format for analysis or reporting.
      </p>

      <div className="flex gap-2">
        <button
          onClick={exportToCSV}
          disabled={exporting !== null || itemCount === 0}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            completed === "csv"
              ? "bg-green-500/20 text-green-400"
              : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white disabled:opacity-30"
          }`}
        >
          {exporting === "csv" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : completed === "csv" ? (
            <Check className="w-4 h-4" />
          ) : (
            <FileSpreadsheet className="w-4 h-4" />
          )}
          {completed === "csv" ? "Downloaded" : "CSV"}
        </button>

        <button
          onClick={exportToJSON}
          disabled={exporting !== null || itemCount === 0}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            completed === "json"
              ? "bg-green-500/20 text-green-400"
              : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white disabled:opacity-30"
          }`}
        >
          {exporting === "json" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : completed === "json" ? (
            <Check className="w-4 h-4" />
          ) : (
            <FileJson className="w-4 h-4" />
          )}
          {completed === "json" ? "Downloaded" : "JSON"}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[10px] text-white/20">
        <span>Includes: trends, metrics, timestamps</span>
      </div>
    </motion.div>
  );
}

// Simple export button for inline use
interface ExportButtonProps {
  onExport: (format: ExportFormat) => void;
  loading?: boolean;
}

export function ExportButton({ onExport, loading }: ExportButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/70 hover:text-white transition-colors"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Export
      </button>

      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 top-full mt-1 bg-black/95 border border-white/10 rounded-lg shadow-xl z-50 min-w-[140px]"
        >
          <button
            onClick={() => {
              onExport("csv");
              setShowMenu(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 first:rounded-t-lg"
          >
            <FileSpreadsheet className="w-4 h-4 text-tiktok-cyan" />
            Export as CSV
          </button>
          <button
            onClick={() => {
              onExport("json");
              setShowMenu(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 last:rounded-b-lg"
          >
            <FileJson className="w-4 h-4 text-tiktok-pink" />
            Export as JSON
          </button>
        </motion.div>
      )}
    </div>
  );
}
