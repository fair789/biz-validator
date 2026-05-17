"use client";

import {
  AlertTriangle,
  Users,
  Star,
  Shield,
  Lightbulb,
  Radio,
  BarChart2,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { LeanCanvas } from "../../types";

interface LeanCanvasSectionProps {
  data: LeanCanvas;
}

interface CanvasBlock {
  key: keyof LeanCanvas;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accent: string;
  gridClass: string;
  isList: boolean;
}

const BLOCKS: CanvasBlock[] = [
  {
    key: "problem",
    title: "課題",
    subtitle: "Problem",
    icon: AlertTriangle,
    accent: "text-rose-400",
    gridClass: "row-span-2",
    isList: true,
  },
  {
    key: "solution",
    title: "ソリューション",
    subtitle: "Solution",
    icon: Lightbulb,
    accent: "text-amber-400",
    gridClass: "",
    isList: true,
  },
  {
    key: "uvp",
    title: "独自の価値提案",
    subtitle: "Unique Value Proposition",
    icon: Star,
    accent: "text-indigo-400",
    gridClass: "row-span-2",
    isList: false,
  },
  {
    key: "unfairAdvantage",
    title: "圧倒的優位性",
    subtitle: "Unfair Advantage",
    icon: Shield,
    accent: "text-violet-400",
    gridClass: "",
    isList: false,
  },
  {
    key: "customerSegments",
    title: "顧客セグメント",
    subtitle: "Customer Segments",
    icon: Users,
    accent: "text-sky-400",
    gridClass: "row-span-2",
    isList: true,
  },
  {
    key: "channels",
    title: "チャネル",
    subtitle: "Channels",
    icon: Radio,
    accent: "text-emerald-400",
    gridClass: "",
    isList: true,
  },
  {
    key: "keyMetrics",
    title: "主要指標",
    subtitle: "Key Metrics",
    icon: BarChart2,
    accent: "text-cyan-400",
    gridClass: "",
    isList: true,
  },
];

function CanvasCard({
  block,
  data,
}: {
  block: CanvasBlock;
  data: LeanCanvas;
}) {
  const Icon = block.icon;
  const value = data[block.key];

  return (
    <div
      className={cn(
        "bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3",
        block.gridClass
      )}
    >
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
        <Icon size={14} className={block.accent} />
        <div>
          <p className="text-xs font-semibold text-zinc-200 leading-none">{block.title}</p>
          <p className="text-[9px] text-zinc-600 mt-0.5">{block.subtitle}</p>
        </div>
      </div>
      {block.isList && Array.isArray(value) ? (
        <ul className="space-y-1.5 flex-1">
          {value.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
              <span className={cn("w-1 h-1 rounded-full mt-1.5 shrink-0", block.accent.replace("text-", "bg-"))} />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-300 leading-relaxed flex-1">{value as string}</p>
      )}
    </div>
  );
}

function BottomCard({
  title,
  subtitle,
  icon: Icon,
  accent,
  items,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accent: string;
  items: string[];
}) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
        <Icon size={14} className={accent} />
        <div>
          <p className="text-xs font-semibold text-zinc-200 leading-none">{title}</p>
          <p className="text-[9px] text-zinc-600 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
            <span className={cn("w-1 h-1 rounded-full mt-1.5 shrink-0", accent.replace("text-", "bg-"))} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LeanCanvasSection({ data }: LeanCanvasSectionProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Step 2 / 6
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              生成完了
            </span>
          </div>
          <h1 className="text-xl font-bold text-zinc-100">リーンキャンバス</h1>
          <p className="text-sm text-zinc-500 mt-1">ビジネスモデルの9要素を構造化した概要図</p>
        </div>

        {/* Main 5-column grid */}
        <div className="grid grid-cols-5 gap-3 mb-3">
          {/* Problem (rows 1-2) */}
          <CanvasCard block={BLOCKS[0]} data={data} />
          {/* Solution (row 1) */}
          <CanvasCard block={BLOCKS[1]} data={data} />
          {/* UVP (rows 1-2) */}
          <CanvasCard block={BLOCKS[2]} data={data} />
          {/* Unfair Advantage (row 1) */}
          <CanvasCard block={BLOCKS[3]} data={data} />
          {/* Customer Segments (rows 1-2) */}
          <CanvasCard block={BLOCKS[4]} data={data} />
          {/* Channels (row 2) */}
          <CanvasCard block={BLOCKS[5]} data={data} />
          {/* Key Metrics (row 2) */}
          <CanvasCard block={BLOCKS[6]} data={data} />
        </div>

        {/* Bottom row: Cost & Revenue */}
        <div className="grid grid-cols-2 gap-3">
          <BottomCard
            title="コスト構造"
            subtitle="Cost Structure"
            icon={CreditCard}
            accent="text-orange-400"
            items={data.costStructure}
          />
          <BottomCard
            title="収益の流れ"
            subtitle="Revenue Streams"
            icon={TrendingUp}
            accent="text-green-400"
            items={data.revenueStreams}
          />
        </div>
      </div>
    </div>
  );
}
