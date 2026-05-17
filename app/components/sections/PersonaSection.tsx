"use client";

import {
  MapPin,
  Briefcase,
  Wallet,
  Target,
  Frown,
  Activity,
  UserCircle2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { Persona } from "../../types";

interface PersonaSectionProps {
  data: Persona;
}

const BADGE_COLORS = [
  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  "bg-violet-500/10 text-violet-300 border-violet-500/20",
  "bg-sky-500/10 text-sky-300 border-sky-500/20",
  "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "bg-amber-500/10 text-amber-300 border-amber-500/20",
];

function Badge({ text, index }: { text: string; index: number }) {
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-medium px-2.5 py-1 rounded-full border",
        BADGE_COLORS[index % BADGE_COLORS.length]
      )}
    >
      {text}
    </span>
  );
}

function ListCard({
  icon: Icon,
  title,
  items,
  accent,
  dotColor,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  accent: string;
  dotColor: string;
}) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", accent + "/10 border " + accent.replace("text-", "border-") + "/20")}>
          <Icon size={14} className={accent} />
        </div>
        <p className="text-sm font-semibold text-zinc-200">{title}</p>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
            <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", dotColor)} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PersonaSection({ data }: PersonaSectionProps) {
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Step 3 / 6
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              生成完了
            </span>
          </div>
          <h1 className="text-xl font-bold text-zinc-100">ペルソナ設定</h1>
          <p className="text-sm text-zinc-500 mt-1">ターゲットユーザーの詳細プロフィールと行動特性</p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Left: Profile card */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Avatar & basic info */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/20 flex items-center justify-center mb-4 relative">
                <UserCircle2 size={40} className="text-indigo-300/60" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-zinc-900 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <p className="text-base font-bold text-zinc-100">{data.name}</p>
              <p className="text-xs text-zinc-500 mt-0.5">仮想ユーザー</p>

              {/* Stats */}
              <div className="w-full mt-5 space-y-3">
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                    <span className="text-zinc-400 font-bold text-[10px]">{data.age}</span>
                  </div>
                  <span className="text-zinc-500">歳</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                    <Briefcase size={11} className="text-zinc-400" />
                  </div>
                  <span className="text-zinc-400 text-left">{data.occupation}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                    <Wallet size={11} className="text-zinc-400" />
                  </div>
                  <span className="text-zinc-400">{data.income}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                    <MapPin size={11} className="text-zinc-400" />
                  </div>
                  <span className="text-zinc-400">{data.location}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-2">
                Profile
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">{data.bio}</p>
            </div>
          </div>

          {/* Right: Detail cards */}
          <div className="col-span-2 grid grid-rows-3 gap-4">
            <ListCard
              icon={Target}
              title="ゴール / ニーズ"
              items={data.goals}
              accent="text-emerald-400"
              dotColor="bg-emerald-400"
            />
            <ListCard
              icon={Frown}
              title="不満 / ペインポイント"
              items={data.painPoints}
              accent="text-rose-400"
              dotColor="bg-rose-400"
            />
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <Activity size={14} className="text-amber-400" />
                </div>
                <p className="text-sm font-semibold text-zinc-200">行動特性</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.behaviors.map((b, i) => (
                  <Badge key={i} text={b} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
