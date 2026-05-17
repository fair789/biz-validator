import Anthropic from "@anthropic-ai/sdk";
import type { ValidationData } from "../../types";

const SYSTEM_PROMPT = `あなたはスタートアップ・ビジネス検証の専門家です。
ユーザーが入力したビジネスアイデアを分析し、以下のJSONスキーマに完全に従った形式でビジネス検証データを生成してください。
必ず有効なJSONのみを返し、マークダウンのコードブロックや説明文は一切含めないでください。

JSONスキーマ:
{
  "appName": "string (サービス名、未入力なら適切な名前を生成)",
  "leanCanvas": {
    "problem": ["string", "string", "string"],
    "customerSegments": ["string", "string", "string"],
    "uvp": "string (独自価値提案、2〜3文)",
    "unfairAdvantage": "string (圧倒的優位性、2〜3文)",
    "solution": ["string", "string", "string"],
    "channels": ["string", "string", "string", "string"],
    "keyMetrics": ["string", "string", "string", "string"],
    "costStructure": ["string", "string", "string", "string"],
    "revenueStreams": ["string", "string", "string"]
  },
  "persona": {
    "name": "string (日本人の典型的な架空の名前)",
    "age": number,
    "occupation": "string",
    "income": "string",
    "location": "string (都市名)",
    "bio": "string (150文字程度のプロフィール)",
    "goals": ["string", "string", "string", "string"],
    "painPoints": ["string", "string", "string", "string"],
    "behaviors": ["string", "string", "string", "string"]
  },
  "competitors": [
    {
      "name": "string (ユーザーのビジネス領域に直接関連する実在する競合サービス名)",
      "target": "string",
      "strengths": "string",
      "weaknesses": "string",
      "pricing": "string (実際の料金体系)",
      "ourAdvantage": "string (ユーザーのサービスがこの競合に対して勝てる具体的な理由)"
    },
    { /* 同形式で2社目 */ },
    { /* 同形式で3社目 */ }
  ],
  "vpc": {
    "valueMap": {
      "products": ["string", "string", "string", "string", "string"],
      "painRelievers": ["string", "string", "string", "string"],
      "gainCreators": ["string", "string", "string", "string"]
    },
    "customerProfile": {
      "jobs": ["string", "string", "string", "string"],
      "pains": ["string", "string", "string", "string"],
      "gains": ["string", "string", "string", "string"]
    }
  }
}

重要な競合分析のルール:
- competitors の3社は、ユーザーが記述したビジネス領域（教育・フード・FinTech・EC・旅行・HR・不動産・ヘルスケア・SNS等）に直接関連する実在する競合サービスを選ぶこと
- NotionやAsanaなどの汎用生産性ツールは、ターゲットが明らかに業務効率化/タスク管理でない限り選ばないこと
- 各競合のpricingは実際の価格・料金体系を正確に記述すること
- ourAdvantageはユーザーのサービスが具体的にどう差別化できるかを記述すること

すべての文字列は日本語で記述してください。具体的・リアルな内容を心がけてください。`;

export async function POST(request: Request) {
  const body = await request.json();
  const { appName, target, problem, idea } = body as {
    appName: string;
    target: string;
    problem: string;
    idea: string;
  };

  const userPrompt = `以下のビジネスアイデアを検証してください。

【サービス名】${appName || "（未定）"}
【ターゲット層】${target}
【解決したい課題】${problem}
【コアアイデア】${idea}

上記をもとに、リアルで具体的なビジネス検証データをJSONで生成してください。`;

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY が設定されていません。.env.local に追加してください。" },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const rawText = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("");

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return Response.json({ error: "AIの応答からJSONを抽出できませんでした。" }, { status: 500 });
  }

  const data: ValidationData = JSON.parse(jsonMatch[0]);
  return Response.json(data);
}
