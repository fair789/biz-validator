"use client";

import {
  Lightbulb,
  LayoutGrid,
  User,
  BarChart3,
  Zap,
  Bot,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { AppSection } from "../types";

interface NavItem {
  id: AppSection;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: "input", label: "アイデア入力", sublabel: "Input", icon: Lightbulb },
  { id: "lean-canvas", label: "リーンキャンバス", sublabel: "Lean Canvas", icon: LayoutGrid },
  { id: "persona", label: "ペルソナ設定", sublabel: "Persona", icon: User },
  { id: "competitor", label: "競合分析", sublabel: "Competitor Analysis", icon: BarChart3 },
  { id: "vpc", label: "バリュープロポジション", sublabel: "Value Proposition", icon: Zap },
  { id: "ai-prompts", label: "AIプロンプト集", sublabel: "AI Prompts", icon: Bot },
];

interface SidebarProps {
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
  hasData: boolean;
}

export default function Sidebar({ activeSection, onSectionChange, hasData }: SidebarProps) {
  const inputIndex = NAV_ITEMS.findIndex((i) => i.id === activeSection);

  return (
    <aside className="w-64 shrink-0 flex flex-col h-full border-r border-zinc-800 bg-[#111113]">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100 leading-none">BizValidator</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">AI Business Validation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
          Workflow
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isInput = item.id === "input";
            const isUnlocked = isInput || hasData;
            const isCompleted = hasData && !isActive && index < inputIndex;
            const isDone = hasData && index > 0;

            return (
              <li key={item.id}>
                <button
                  onClick={() => isUnlocked && onSectionChange(item.id)}
                  disabled={!isUnlocked}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : isUnlocked
                      ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                      : "text-zinc-700 cursor-not-allowed border border-transparent opacity-50"
                  )}
                >
                  <div className="relative shrink-0">
                    <Icon
                      size={16}
                      className={cn(
                        isActive ? "text-indigo-400" : isUnlocked ? "text-zinc-400" : "text-zinc-700"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium leading-none truncate",
                        isActive ? "text-indigo-300" : ""
                      )}
                    >
                      {item.label}
                    </p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{item.sublabel}</p>
                  </div>
                  <div className="shrink-0">
                    {isActive ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    ) : isDone && isCompleted ? (
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    ) : isUnlocked ? (
                      <Circle size={13} className="text-zinc-700" />
                    ) : null}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[11px] text-zinc-500">Powered by Claude AI</p>
        </div>
      </div>
    </aside>
  );
}
