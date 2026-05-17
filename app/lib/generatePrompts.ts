import type { ValidationData, PromptItem } from "../types";

export function generatePrompts(data: ValidationData): PromptItem[] {
  const { appName, leanCanvas, persona, competitors, vpc } = data;

  const competitorNames = competitors.map((c) => c.name).join("、");
  const topPain = persona.painPoints[0] ?? "課題";
  const topGain = persona.goals[0] ?? "ゴール";
  const topJob = vpc.customerProfile.jobs[0] ?? "顧客ジョブ";
  const coreProduct = vpc.valueMap.products[0] ?? "コア機能";
  const painReliever = vpc.valueMap.painRelievers[0] ?? "ペインリリーバー";
  const revenueStream = leanCanvas.revenueStreams[0] ?? "収益モデル";
  const keyMetric = leanCanvas.keyMetrics[0] ?? "主要KPI";

  return [
    {
      category: "MVP設計",
      title: "MVP機能の優先度定義",
      useCase: "開発を始める前に「何を作るか」を明確にしたいとき",
      prompt: `あなたはプロダクトマネージャーです。以下の情報をもとに、${appName}のMVP（Minimum Viable Product）として最初にリリースすべき機能を優先度付きで定義してください。

【サービス名】${appName}
【ターゲット】${persona.occupation}（代表ペルソナ: ${persona.name}、${persona.age}歳）
【解決する課題】${topPain}
【コア機能候補】${coreProduct}
【独自価値提案（UVP）】${leanCanvas.uvp}
【競合】${competitorNames}

以下の形式で出力してください：
1. Must Have（絶対に必要な機能）: 3つ
2. Should Have（あると良い機能）: 3つ
3. Could Have（将来対応で良い機能）: 3つ
4. 各機能の開発工数見積もり（S/M/L）
5. MVP判断の理由

競合との差別化を意識し、ユーザーが「これがなければ使わない」と思う機能に絞ってください。`,
    },
    {
      category: "技術設計",
      title: "技術スタック & アーキテクチャ設計",
      useCase: "どの技術を使うか決める前に最適な構成を相談したいとき",
      prompt: `あなたはシニアエンジニアです。以下のサービスを構築するための最適な技術スタックとアーキテクチャを提案してください。

【サービス名】${appName}
【主なユーザー】${persona.occupation}（${persona.age}歳前後、${persona.location}在住）
【コア機能】${coreProduct}
【ペインリリーバー機能】${painReliever}
【想定規模】初期ユーザー〜1万人のスモールスタート

以下の観点で提案してください：
1. フロントエンド（フレームワーク・言語）
2. バックエンド（フレームワーク・言語）
3. データベース（種類・選定理由）
4. AI/ML機能の実装方法（使用するAPI・モデル）
5. インフラ・ホスティング（コスト最小化を考慮）
6. 認証・決済の実装方法
7. 開発者1〜2人でのスモールスタートに最適な構成

個人開発・スモールチームでのスピード重視の観点でまとめてください。`,
    },
    {
      category: "マーケティング",
      title: "ランディングページ（LP）コピーライティング",
      useCase: "サービスの最初のLPを作るとき・SNS発信の文章を作るとき",
      prompt: `あなたは優秀なコピーライターです。以下の情報をもとに、${appName}のランディングページ（LP）の全文コピーを作成してください。

【サービス名】${appName}
【ターゲット】${persona.name}のような${persona.occupation}
【最大のペイン】${topPain}
【解決後のゲイン】${topGain}
【独自価値提案】${leanCanvas.uvp}
【競合との違い】${competitors[0]?.name ?? "競合"}と比べ、${competitors[0]?.ourAdvantage ?? "より特化した体験"}

以下の構成でLPコピーを作成してください：
1. ファーストビュー（キャッチコピー + サブコピー）
2. 課題提示セクション（ユーザーの「あるある」を3つ）
3. ソリューション紹介（機能を3つ、ベネフィット訴求で）
4. 社会的証明（ユーザーの声・数値）のダミー文
5. 料金セクション（${revenueStream}）
6. CTA（クロージングコピー）

感情に訴えかけるUXライティングのトーンで書いてください。`,
    },
    {
      category: "ユーザー調査",
      title: "ユーザーインタビュー設計",
      useCase: "PMF（プロダクトマーケットフィット）を検証するためのインタビューをしたいとき",
      prompt: `あなたはUXリサーチャーです。${appName}のProduct-Market Fitを検証するためのユーザーインタビューを設計してください。

【インタビュー対象】${persona.name}のような${persona.occupation}（${persona.age}歳前後）
【検証したい課題仮説】${topPain}
【検証したいジョブ】${topJob}
【現在の代替手段（競合）】${competitorNames}

以下を含むインタビューガイドを作成してください：
1. アイスブレイク質問（2問）
2. 現在の行動・習慣を探る質問（3問）
3. 課題の深さを測る質問（4問）
4. 既存の解決策への不満を探る質問（3問）
5. ソリューションへの反応を見る質問（3問）
6. 支払い意欲を測る質問（2問）
7. インタビューのNGな質問・バイアスの注意点

各質問に「この質問で検証したい仮説」を添えてください。`,
    },
    {
      category: "資金調達",
      title: "投資家向けエレベーターピッチ",
      useCase: "投資家・メンター・コンテストでピッチするとき",
      prompt: `あなたはベンチャーキャピタリストの視点を持つアドバイザーです。以下の情報をもとに、${appName}の投資家向けエレベーターピッチ（60秒版・3分版）を作成してください。

【サービス名】${appName}
【市場課題】${topPain}
【ソリューション】${coreProduct}
【ターゲット市場】${persona.occupation}層
【収益モデル】${revenueStream}
【競合優位性】${leanCanvas.unfairAdvantage}
【主要KPI目標】${keyMetric}
【競合】${competitorNames}

以下の形式で作成してください：

【60秒版エレベーターピッチ】
（約150〜200文字、口頭で言いやすい文章で）

【3分版ピッチスクリプト】
1. 問題提起（Why Now?）
2. ソリューション（How?）
3. 市場規模（TAM/SAM/SOM推定）
4. ビジネスモデル
5. 競合との差別化
6. チームとトラクション
7. 資金使途・今後の計画

YCombinator流の「We do X for Y」フォーマットも含めてください。`,
    },
    {
      category: "ロードマップ",
      title: "6ヶ月プロダクトロードマップ",
      useCase: "開発の全体計画を立てるとき・チームや投資家に共有するとき",
      prompt: `あなたはスタートアップの経験豊富なCTOです。${appName}の今後6ヶ月のプロダクトロードマップを作成してください。

【サービス名】${appName}
【現フェーズ】アイデア検証〜MVP開発開始
【コアペルソナ】${persona.name}（${persona.occupation}、${persona.age}歳）
【MVP機能】${coreProduct}
【収益目標】${revenueStream}
【成功KPI】${keyMetric}

以下の形式でロードマップを作成してください：

【Month 1〜2: Discovery & Foundation】
- 開発タスク（3〜5項目）
- ユーザーリサーチ・検証タスク
- 成功指標

【Month 3〜4: MVP Launch & Iterate】
- 開発タスク（3〜5項目）
- グロース施策
- 成功指標

【Month 5〜6: Growth & Monetization】
- 開発タスク（3〜5項目）
- 収益化施策
- 成功指標

各フェーズで「やらないこと（Not to do）」も明記してください。`,
    },
  ];
}
