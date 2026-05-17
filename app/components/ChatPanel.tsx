"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Loader2,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { ValidationData } from "../types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  validationData: ValidationData;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "このサービスの最大のリスクは何ですか？",
  "最初の100人ユーザーをどう獲得しますか？",
  "MVPとして最初に作るべき機能は？",
  "このビジネスモデルの収益性は高いですか？",
  "競合に勝つための差別化戦略を教えてください",
  "PMF（プロダクトマーケットフィット）の検証方法は？",
];

export default function ChatPanel({ validationData, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, validationData }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...next, { role: "assistant", content: data.text }]);
      } else {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              "ANTHROPIC_API_KEY が設定されていないため、AIチャットが利用できません。.env.local にAPIキーを設定してください。",
          },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "通信エラーが発生しました。もう一度お試しください。" },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLoading, messages, validationData]);

  return (
    <div className="flex flex-col h-full bg-[#0c0c0e] border-l border-zinc-800 w-[360px] shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Bot size={14} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">AIアドバイザー</p>
            <p className="text-[10px] text-zinc-500 truncate max-w-[180px]">
              {validationData.appName} について質問
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              title="会話をリセット"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 transition-all"
            >
              <RotateCcw size={13} />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            {/* Welcome bubble */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={11} className="text-indigo-400" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl rounded-tl-sm px-3.5 py-3 max-w-[260px]">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  こんにちは！{" "}
                  <span className="text-indigo-300 font-medium">{validationData.appName}</span>{" "}
                  の検証データをもとに、ビジネスに関する質問になんでも答えます。
                </p>
              </div>
            </div>

            {/* Suggested questions */}
            <div className="space-y-1.5">
              <p className="text-[10px] text-zinc-600 font-semibold uppercase tracking-widest px-0.5 mb-2">
                おすすめの質問
              </p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group"
                >
                  <ChevronRight
                    size={11}
                    className="text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0"
                  />
                  <span className="text-[11px] text-zinc-400 group-hover:text-zinc-200 transition-colors leading-relaxed">
                    {q}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2",
                  msg.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    msg.role === "user"
                      ? "bg-zinc-700 border border-zinc-600"
                      : "bg-indigo-500/20 border border-indigo-500/30"
                  )}
                >
                  {msg.role === "user" ? (
                    <User size={11} className="text-zinc-300" />
                  ) : (
                    <Bot size={11} className="text-indigo-400" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-xl px-3.5 py-2.5 max-w-[260px]",
                    msg.role === "user"
                      ? "bg-indigo-500/15 border border-indigo-500/20 rounded-tr-sm"
                      : "bg-zinc-900 border border-zinc-800 rounded-tl-sm"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs leading-relaxed whitespace-pre-wrap",
                      msg.role === "user" ? "text-indigo-100" : "text-zinc-300"
                    )}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={11} className="text-indigo-400" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl rounded-tl-sm px-3.5 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-3 pb-3 pt-2 border-t border-zinc-800">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="質問を入力... (Enter で送信)"
            className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0",
              input.trim() && !isLoading
                ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Send size={13} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-zinc-700 mt-1.5 text-center">
          Claude AI powered · APIキー必要
        </p>
      </div>
    </div>
  );
}
