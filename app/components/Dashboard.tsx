"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import Sidebar from "./Sidebar";
import ChatPanel from "./ChatPanel";
import InputSection from "./sections/InputSection";
import LeanCanvasSection from "./sections/LeanCanvasSection";
import PersonaSection from "./sections/PersonaSection";
import CompetitorSection from "./sections/CompetitorSection";
import VPCSection from "./sections/VPCSection";
import AIPromptsSection from "./sections/AIPromptsSection";
import { cn } from "../lib/utils";
import type { AppSection, ValidationData } from "../types";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<AppSection>("input");
  const [validationData, setValidationData] = useState<ValidationData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleValidationComplete = (data: ValidationData) => {
    setValidationData(data);
    setActiveSection("lean-canvas");
  };

  return (
    <div className="flex h-full overflow-hidden bg-[#09090b]">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        hasData={validationData !== null}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="shrink-0 flex items-center justify-between px-8 py-3.5 border-b border-zinc-800 bg-[#09090b]">
          <div>
            <p className="text-xs font-semibold text-zinc-100">
              {validationData?.appName ?? "BizValidator"}
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">AIビジネス検証ダッシュボード</p>
          </div>
          <div className="flex items-center gap-3">
            {validationData && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-zinc-500">検証完了</span>
                </div>
                <button
                  onClick={() => setIsChatOpen((prev) => !prev)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                    isChatOpen
                      ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
                  )}
                >
                  {isChatOpen ? (
                    <>
                      <X size={12} />
                      チャットを閉じる
                    </>
                  ) : (
                    <>
                      <MessageSquare size={12} />
                      AIに質問する
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {activeSection === "input" && (
              <InputSection onComplete={handleValidationComplete} />
            )}
            {activeSection === "lean-canvas" && validationData && (
              <LeanCanvasSection data={validationData.leanCanvas} />
            )}
            {activeSection === "persona" && validationData && (
              <PersonaSection data={validationData.persona} />
            )}
            {activeSection === "competitor" && validationData && (
              <CompetitorSection
                data={validationData.competitors}
                appName={validationData.appName}
                leanCanvas={validationData.leanCanvas}
              />
            )}
            {activeSection === "vpc" && validationData && (
              <VPCSection data={validationData.vpc} appName={validationData.appName} />
            )}
            {activeSection === "ai-prompts" && validationData && (
              <AIPromptsSection data={validationData} />
            )}
          </div>

          {isChatOpen && validationData && (
            <ChatPanel
              validationData={validationData}
              onClose={() => setIsChatOpen(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
