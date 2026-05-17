"use client";

import { CheckCircle2, XCircle, Swords } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Competitor, LeanCanvas } from "../../types";

interface CompetitorSectionProps {
  data: Competitor[];
  appName: string;
  leanCanvas: LeanCanvas;
}

const COMPETITOR_COLORS = [
  { dot: "bg-rose-400", badge: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
  { dot: "bg-amber-400", badge: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  { dot: "bg-sky-400", badge: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
];

export default function CompetitorSection({ data, appName, leanCanvas }: CompetitorSectionProps) {
  const ourTarget = leanCanvas.customerSegments[0] ?? "コアターゲット層";
  const ourStrengths = leanCanvas.solution.slice(0, 3).join("・");
  const ourWeaknesses = "初期フェーズ・ブランド認知度構築中・ユーザーデータ蓄積前";
  const ourPricing = leanCanvas.revenueStreams[0]?.split("（")[0] ?? "フリーミアム";
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Step 4 / 6
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              生成完了
            </span>
          </div>
          <h1 className="text-xl font-bold text-zinc-100">競合分析</h1>
          <p className="text-sm text-zinc-500 mt-1">競合サービスとの機能・ポジショニング比較マトリクス</p>
        </div>

        {/* Table */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-600 w-32">
                    比較軸
                  </th>
                  {data.map((c, i) => (
                    <th key={c.name} className="px-5 py-3.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className={cn("w-2 h-2 rounded-full shrink-0", COMPETITOR_COLORS[i].dot)} />
                        <span className="text-xs font-semibold text-zinc-300">{c.name}</span>
                      </div>
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                      <span className="text-xs font-semibold text-indigo-300">{appName}</span>
                      <span className="text-[9px] text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded-full border border-indigo-500/20">
                        自社
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Target row */}
                <tr className="border-b border-zinc-800/60">
                  <td className="px-5 py-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
                      ターゲット
                    </span>
                  </td>
                  {data.map((c) => (
                    <td key={c.name} className="px-5 py-4">
                      <p className="text-xs text-zinc-400 leading-relaxed">{c.target}</p>
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <p className="text-xs text-indigo-300 leading-relaxed font-medium">
                      {ourTarget}
                    </p>
                  </td>
                </tr>

                {/* Strengths row */}
                <tr className="border-b border-zinc-800/60 bg-emerald-500/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
                        強み
                      </span>
                    </div>
                  </td>
                  {data.map((c) => (
                    <td key={c.name} className="px-5 py-4">
                      <p className="text-xs text-zinc-400 leading-relaxed">{c.strengths}</p>
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <p className="text-xs text-emerald-300 leading-relaxed">{ourStrengths}</p>
                  </td>
                </tr>

                {/* Weaknesses row */}
                <tr className="border-b border-zinc-800/60 bg-rose-500/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <XCircle size={12} className="text-rose-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
                        弱み
                      </span>
                    </div>
                  </td>
                  {data.map((c) => (
                    <td key={c.name} className="px-5 py-4">
                      <p className="text-xs text-zinc-400 leading-relaxed">{c.weaknesses}</p>
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <p className="text-xs text-rose-300 leading-relaxed">{ourWeaknesses}</p>
                  </td>
                </tr>

                {/* Pricing row */}
                <tr className="border-b border-zinc-800/60">
                  <td className="px-5 py-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
                      価格帯
                    </span>
                  </td>
                  {data.map((c) => (
                    <td key={c.name} className="px-5 py-4">
                      <span className="text-xs font-mono text-zinc-300">{c.pricing}</span>
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-indigo-300">{ourPricing}</span>
                  </td>
                </tr>

                {/* Our advantage row */}
                <tr>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Swords size={12} className="text-violet-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600">
                        自社優位点
                      </span>
                    </div>
                  </td>
                  {data.map((c) => (
                    <td key={c.name} className="px-5 py-4">
                      <span className="inline-block text-[11px] text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full leading-relaxed">
                        {c.ourAdvantage}
                      </span>
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <span className="text-xs text-zinc-500 italic">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {data.map((c, i) => (
            <div key={c.name} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("w-2 h-2 rounded-full shrink-0", COMPETITOR_COLORS[i].dot)} />
                <p className="text-sm font-semibold text-zinc-200">{c.name}</p>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                <span className="text-zinc-400 font-medium">差別化ポイント：</span>
                {c.ourAdvantage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
