"use client";

import {
  Package,
  Shield,
  TrendingUp,
  Briefcase,
  Frown,
  Smile,
  ArrowRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { VPC } from "../../types";

interface VPCSectionProps {
  data: VPC;
  appName: string;
}

interface CardConfig {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  border: string;
  dotColor: string;
}

const VALUE_MAP_CARDS: CardConfig[] = [
  {
    icon: Package,
    title: "製品・サービス",
    subtitle: "Products & Services",
    color: "text-indigo-400",
    bg: "bg-indigo-500/5",
    border: "border-indigo-500/15",
    dotColor: "bg-indigo-400",
  },
  {
    icon: Shield,
    title: "ペインリリーバー",
    subtitle: "Pain Relievers",
    color: "text-rose-400",
    bg: "bg-rose-500/5",
    border: "border-rose-500/15",
    dotColor: "bg-rose-400",
  },
  {
    icon: TrendingUp,
    title: "ゲインクリエイター",
    subtitle: "Gain Creators",
    color: "text-emerald-400",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/15",
    dotColor: "bg-emerald-400",
  },
];

const CUSTOMER_PROFILE_CARDS: CardConfig[] = [
  {
    icon: Briefcase,
    title: "顧客ジョブ",
    subtitle: "Customer Jobs",
    color: "text-sky-400",
    bg: "bg-sky-500/5",
    border: "border-sky-500/15",
    dotColor: "bg-sky-400",
  },
  {
    icon: Frown,
    title: "ペイン（苦痛）",
    subtitle: "Pains",
    color: "text-orange-400",
    bg: "bg-orange-500/5",
    border: "border-orange-500/15",
    dotColor: "bg-orange-400",
  },
  {
    icon: Smile,
    title: "ゲイン（利得）",
    subtitle: "Gains",
    color: "text-violet-400",
    bg: "bg-violet-500/5",
    border: "border-violet-500/15",
    dotColor: "bg-violet-400",
  },
];

function VPCCard({
  config,
  items,
}: {
  config: CardConfig;
  items: string[];
}) {
  const Icon = config.icon;
  return (
    <div className={cn("border rounded-xl p-4 flex flex-col gap-3", config.bg, config.border)}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center border",
            config.bg,
            config.border
          )}
        >
          <Icon size={14} className={config.color} />
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-200 leading-none">{config.title}</p>
          <p className="text-[9px] text-zinc-600 mt-0.5">{config.subtitle}</p>
        </div>
      </div>
      <ul className="space-y-2 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
            <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", config.dotColor)} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VPCSection({ data, appName }: VPCSectionProps) {
  const valueMapItems = [
    data.valueMap.products,
    data.valueMap.painRelievers,
    data.valueMap.gainCreators,
  ];
  const customerProfileItems = [
    data.customerProfile.jobs,
    data.customerProfile.pains,
    data.customerProfile.gains,
  ];

  const totalItems = [
    ...data.valueMap.products,
    ...data.valueMap.painRelievers,
    ...data.valueMap.gainCreators,
    ...data.customerProfile.jobs,
    ...data.customerProfile.pains,
    ...data.customerProfile.gains,
  ].filter((s) => s && s.length > 5).length;
  const fitScore = Math.min(60 + Math.round((totalItems / 25) * 35), 95);
  const fitLabel = fitScore >= 85 ? "Excellent Fit" : fitScore >= 75 ? "Strong Fit" : "Good Fit";
  const fitColor = fitScore >= 85 ? "text-emerald-300" : fitScore >= 75 ? "text-emerald-400" : "text-amber-400";
  const fitBarColor = fitScore >= 85 ? "from-emerald-500 to-emerald-300" : fitScore >= 75 ? "from-emerald-600 to-emerald-400" : "from-amber-600 to-amber-400";
  const topPainReliever = data.valueMap.painRelievers[0] ?? "主要ペインへの対応";
  const topJob = data.customerProfile.jobs[0] ?? "顧客の主要ジョブ";

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Step 5 / 6
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              生成完了
            </span>
          </div>
          <h1 className="text-xl font-bold text-zinc-100">バリュープロポジションキャンバス</h1>
          <p className="text-sm text-zinc-500 mt-1">
            自社の提供価値と顧客ニーズの対応関係を可視化したフレームワーク
          </p>
        </div>

        {/* Main layout */}
        <div className="flex items-stretch gap-5">
          {/* Value Map (left) */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-indigo-400">V</span>
              </div>
              <p className="text-xs font-semibold text-zinc-300">Value Map（提供価値）</p>
            </div>
            <div className="flex flex-col gap-3">
              {VALUE_MAP_CARDS.map((config, i) => (
                <VPCCard key={config.title} config={config} items={valueMapItems[i]} />
              ))}
            </div>
          </div>

          {/* Center arrow */}
          <div className="flex items-center justify-center px-2 shrink-0">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
              <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <ArrowRight size={16} className="text-zinc-500" />
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest writing-mode-vertical rotate-0 text-center">
                フィット
              </p>
            </div>
          </div>

          {/* Customer Profile (right) */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-5 h-5 rounded-md bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-sky-400">C</span>
              </div>
              <p className="text-xs font-semibold text-zinc-300">Customer Profile（顧客像）</p>
            </div>
            <div className="flex flex-col gap-3">
              {CUSTOMER_PROFILE_CARDS.map((config, i) => (
                <VPCCard key={config.title} config={config} items={customerProfileItems[i]} />
              ))}
            </div>
          </div>
        </div>

        {/* Fit score */}
        <div className="mt-6 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-200 mb-1">フィット スコア</p>
              <p className="text-xs text-zinc-500">
                提供価値と顧客ニーズの対応度（VPC充足率から算出）
              </p>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${fitColor}`}>{fitScore}%</p>
              <p className="text-xs text-zinc-500 mt-0.5">{fitLabel}</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${fitBarColor} rounded-full transition-all duration-700`}
              style={{ width: `${fitScore}%` }}
            />
          </div>
          <div className="mt-3 flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              {appName} のペインリリーバー（{topPainReliever.slice(0, 30)}...）が
              顧客ジョブ（{topJob.slice(0, 30)}...）に直接対応しています。
              VPCの充足率が高いほど、プロダクトマーケットフィットの可能性が高まります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
