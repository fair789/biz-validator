import Anthropic from "@anthropic-ai/sdk";
import type { ValidationData } from "../../types";

export async function POST(request: Request) {
  const body = await request.json();
  const { messages, validationData } = body as {
    messages: { role: "user" | "assistant"; content: string }[];
    validationData: ValidationData;
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY が設定されていません。" },
      { status: 500 }
    );
  }

  const { appName, leanCanvas, persona, competitors, vpc } = validationData;

  const systemPrompt = `あなたはスタートアップ・ビジネス戦略の専門家アドバイザーです。ユーザーが検証したビジネスアイデア「${appName}」について質問に答えてください。

【サービス名】${appName}

【課題・ソリューション】
課題: ${leanCanvas.problem.join("、")}
ソリューション: ${leanCanvas.solution.join("、")}
UVP: ${leanCanvas.uvp}
圧倒的優位性: ${leanCanvas.unfairAdvantage}

【市場・顧客】
顧客セグメント: ${leanCanvas.customerSegments.join("、")}
チャネル: ${leanCanvas.channels.join("、")}
主要指標: ${leanCanvas.keyMetrics.join("、")}
収益モデル: ${leanCanvas.revenueStreams.join("、")}
コスト構造: ${leanCanvas.costStructure.join("、")}

【ペルソナ: ${persona.name}】
${persona.age}歳、${persona.occupation}、${persona.location}在住、${persona.income}
ゴール: ${persona.goals.join("、")}
ペインポイント: ${persona.painPoints.join("、")}
行動特性: ${persona.behaviors.join("、")}

【競合分析】
${competitors.map((c) => `・${c.name}（${c.pricing}）: 強み「${c.strengths}」弱み「${c.weaknesses}」自社優位点「${c.ourAdvantage}」`).join("\n")}

【バリュープロポジション】
製品・機能: ${vpc.valueMap.products.join("、")}
ペインリリーバー: ${vpc.valueMap.painRelievers.join("、")}
ゲインクリエイター: ${vpc.valueMap.gainCreators.join("、")}
顧客ジョブ: ${vpc.customerProfile.jobs.join("、")}

この検証データをもとに、ユーザーの質問に対して具体的・実践的なアドバイスを日本語で回答してください。
回答は200〜400文字程度にコンパクトにまとめ、箇条書きを使うと読みやすいです。専門用語には簡単な説明を加えてください。`;

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("");

  return Response.json({ text });
}
