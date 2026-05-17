"use client";

import { useState } from "react";
import {
  Cpu,
  Code2,
  Megaphone,
  Users,
  TrendingUp,
  Map,
  Copy,
  Check,
  Bot,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { generatePrompts } from "../../lib/generatePrompts";
import type { ValidationData, PromptItem } from "../../types";

interface AIPromptsSectionProps {
  data: ValidationData;
}

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  MVP設計: { icon: Cpu, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  技術設計: { icon: Code2, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  マーケティング: { icon: Megaphone, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ユーザー調査: { icon: Users, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  資金調達: { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  ロードマップ: { icon: Map, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

function PromptCard({ item }: { item: PromptItem }) {
  const [copied, setCopied] = useState(false);
  const config = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG["MVP設計"];
  const Icon = config.icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 border-b border-zinc-800">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border shrink-0", config.bg, config.border)}>
              <Icon size={15} className={config.color} />
            </div>
            <div>
              <span className={cn("text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border", config.bg, config.color, config.border)}>
                {item.category}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 shrink-0",
              copied
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
            )}
          >
            {copied ? (
              <>
                <Check size={12} />
                コピー済み
              </>
            ) : (
              <>
                <Copy size={12} />
                コピー
              </>
            )}
          </button>
        </div>
        <h3 className="text-sm font-semibold text-zinc-100 mb-1">{item.title}</h3>
        <p className="text-[11px] text-zinc-500 leading-relaxed">{item.useCase}</p>
      </div>

      {/* Prompt body */}
      <div className="flex-1 p-4">
        <pre className="text-[11px] text-zinc-400 leading-relaxed whitespace-pre-wrap font-sans overflow-y-auto max-h-52 custom-scrollbar">
          {item.prompt}
        </pre>
      </div>
    </div>
  );
}

export default function AIPromptsSection({ data }: AIPromptsSectionProps) {
  const prompts = generatePrompts(data);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Step 6 / 6
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              生成完了
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Bot size={16} className="text-indigo-400" />
            </div>
            <h1 className="text-xl font-bold text-zinc-100">AIプロンプト集</h1>
          </div>
          <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
            {data.appName} を実際に構築する際にClaude・ChatGPTで使える、検証データを組み込んだ高品質プロンプト集です。
            コピーしてそのまま使えます。
          </p>
        </div>

        {/* Usage hint */}
        <div className="flex items-start gap-3 p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-xl mb-6">
          <Bot size={15} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-indigo-300 mb-1">使い方</p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              各プロンプトには{data.appName}・{data.persona.name}など、あなたのアイデアの具体的な情報が埋め込まれています。
              「コピー」ボタンでクリップボードにコピーし、Claude.ai または ChatGPT に貼り付けてください。
            </p>
          </div>
        </div>

        {/* Prompt grid */}
        <div className="grid grid-cols-2 gap-4">
          {prompts.map((item) => (
            <PromptCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
