"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Loader2,
  ArrowRight,
  FileText,
  Users,
  AlertCircle,
  Lightbulb,
  Cpu,
  WifiOff,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { LOADING_STEPS } from "../../lib/mockData";
import { generateFromInput } from "../../lib/generateFromInput";
import type { ValidationData } from "../../types";

interface InputSectionProps {
  onComplete: (data: ValidationData) => void;
}

interface FormState {
  appName: string;
  target: string;
  problem: string;
  idea: string;
}

type LoadingMode = "ai" | "local" | null;

export default function InputSection({ onComplete }: InputSectionProps) {
  const [form, setForm] = useState<FormState>({
    appName: "",
    target: "",
    problem: "",
    idea: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMode, setLoadingMode] = useState<LoadingMode>(null);
  const [pendingData, setPendingData] = useState<ValidationData | null>(null);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.target.trim() || !form.problem.trim() || !form.idea.trim()) return;

    setIsLoading(true);
    setLoadingStep(0);
    setLoadingProgress(0);
    setPendingData(null);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data: ValidationData = await res.json();
        setLoadingMode("ai");
        setPendingData(data);
      } else {
        setLoadingMode("local");
        setPendingData(generateFromInput(form));
      }
    } catch {
      setLoadingMode("local");
      setPendingData(generateFromInput(form));
    }
  };

  useEffect(() => {
    if (!isLoading || pendingData === null) return;

    const totalDuration = 3200;
    const stepCount = LOADING_STEPS.length;
    const stepDuration = totalDuration / stepCount;

    const stepTimer = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, stepCount - 1));
    }, stepDuration);

    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + 2, 100));
    }, totalDuration / 50);

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      onComplete(pendingData);
    }, totalDuration);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [isLoading, pendingData, onComplete]);

  const isFormValid = form.target.trim() && form.problem.trim() && form.idea.trim();

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-8 px-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={28} className="text-indigo-400 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">AIがビジネスを検証中</h2>
          <div className="flex items-center justify-center gap-2">
            {loadingMode === "ai" ? (
              <>
                <Cpu size={13} className="text-indigo-400" />
                <p className="text-sm text-indigo-400">Claude AI で生成中</p>
              </>
            ) : (
              <>
                <WifiOff size={13} className="text-amber-400" />
                <p className="text-sm text-amber-400">ローカル生成モード</p>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500 font-mono">{loadingProgress}%</span>
            <span className="text-xs text-indigo-400 flex items-center gap-1.5">
              <Loader2 size={11} className="animate-spin" />
              処理中
            </span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>

        <div className="w-full max-w-md space-y-2">
          {LOADING_STEPS.map((step, index) => (
            <div
              key={step}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300",
                index === loadingStep
                  ? "bg-indigo-500/10 border border-indigo-500/20"
                  : index < loadingStep
                  ? "opacity-40"
                  : "opacity-20"
              )}
            >
              {index < loadingStep ? (
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              ) : index === loadingStep ? (
                <Loader2 size={16} className="text-indigo-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0" />
              )}
              <span
                className={cn(
                  "text-sm",
                  index === loadingStep ? "text-indigo-300 font-medium" : "text-zinc-500"
                )}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Step 1 / 6
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">アイデアを入力する</h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            あなたのビジネスアイデアを入力してください。AIがリーンキャンバス・ペルソナ・競合分析・
            バリュープロポジションを自動生成します。
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <FileText size={12} />
              アプリ・サービス名
              <span className="text-zinc-600 font-normal ml-1">（任意）</span>
            </label>
            <input
              type="text"
              value={form.appName}
              onChange={handleChange("appName")}
              placeholder="例：StudyFlow AI、FoodMatch、TaskMate..."
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <Users size={12} />
              ターゲット層
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={form.target}
              onChange={handleChange("target")}
              placeholder="例：地方在住の一人暮らし社会人、子育て中の共働き夫婦..."
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <AlertCircle size={12} />
              解決したい課題
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <textarea
              value={form.problem}
              onChange={handleChange("problem")}
              placeholder="例：スーパーに行くたびに何を買えばいいかわからず、毎回同じものを買って食材が余ってしまう問題を解決したい"
              rows={3}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <Lightbulb size={12} />
              コアアイデア
              <span className="text-red-500 ml-0.5">*</span>
            </label>
            <textarea
              value={form.idea}
              onChange={handleChange("idea")}
              placeholder="例：冷蔵庫の食材をスキャンするとAIが今週の献立と必要な買い物リストを自動生成し、近所のスーパーと価格比較もできるアプリ"
              rows={4}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Mode indicator */}
          <div className="flex gap-3 p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg">
            <Cpu size={15} className="text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-zinc-300 mb-1">
                入力内容に基づいてAIが検証を生成します
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                <code className="text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded text-[10px]">ANTHROPIC_API_KEY</code>
                が設定されている場合はClaude AIで本格生成、未設定の場合はローカルエンジンで生成します。
                どちらの場合も入力内容に応じた結果が出力されます。
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={cn(
              "w-full flex items-center justify-center gap-2.5 px-6 py-3.5 font-semibold text-sm rounded-lg transition-all duration-150 active:scale-[0.98] mt-2",
              isFormValid
                ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            )}
          >
            <Sparkles size={16} />
            AIビジネス検証を実行
            <ArrowRight size={15} className="ml-1" />
          </button>

          {!isFormValid && (
            <p className="text-center text-xs text-zinc-600">
              ターゲット・課題・アイデアを入力するとボタンが有効になります
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
