import type { ValidationData } from "../types";
import { detectDomain, getCompetitorsByDomain } from "./domainCompetitors";

interface FormInput {
  appName: string;
  target: string;
  problem: string;
  idea: string;
}

function splitToItems(text: string, fallback: string[]): string[] {
  if (!text.trim()) return fallback;
  const lines = text
    .split(/[\n。、,，]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
  return lines.length >= 2 ? lines.slice(0, 4) : fallback;
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

const PERSONA_NAMES = [
  "田中 陽菜（Hana Tanaka）",
  "鈴木 健太（Kenta Suzuki）",
  "佐藤 みか（Mika Sato）",
  "山田 拓海（Takumi Yamada）",
  "伊藤 さくら（Sakura Ito）",
];

const PERSONA_LOCATIONS = [
  "東京都 渋谷区",
  "大阪府 梅田",
  "愛知県 名古屋市",
  "福岡県 天神",
  "東京都 新宿区",
];


export function generateFromInput(form: FormInput): ValidationData {
  const appName = form.appName.trim() || "あなたのサービス";
  const target = form.target.trim() || "ターゲットユーザー";
  const problemText = form.problem.trim() || "課題が未入力です。";
  const ideaText = form.idea.trim() || "アイデアが未入力です。";

  const seed = hashStr(form.target + form.problem + form.idea);

  const problemItems = splitToItems(problemText, [
    `${target}が抱える情報管理の課題`,
    `既存ソリューションでは解決しきれない${target}の悩み`,
    "手動作業・属人化による非効率が発生している",
  ]);

  const solutionItems = splitToItems(ideaText, [
    `${appName}による${target}向け課題解決機能`,
    "AIを活用した自動化・パーソナライズ機能",
    "直感的なUXで誰でも5分以内に使いこなせる設計",
  ]);

  const personaName = pick(PERSONA_NAMES, seed);
  const personaLocation = pick(PERSONA_LOCATIONS, seed + 1);
  const domain = detectDomain(target + " " + problemText + " " + ideaText);
  const competitorSet = getCompetitorsByDomain(domain);

  const targetSegments = splitToItems(target, [
    target,
    `${target}（コアユーザー層）`,
    `${target}に関わるステークホルダー`,
  ]);

  return {
    appName,

    leanCanvas: {
      problem: problemItems.slice(0, 3),
      customerSegments: targetSegments.slice(0, 3),
      uvp: `${ideaText.slice(0, 80)}...の課題を、${appName}が解決します。${target}が本来やりたいことに集中できる環境を提供します。`,
      unfairAdvantage: `${appName}は${target}の行動データを蓄積することで、時間とともに精度が上がる独自のパーソナライズエンジンを持ちます。この学習データは競合が短期間では模倣できない参入障壁となります。`,
      solution: solutionItems.slice(0, 3),
      channels: [
        `${target}が集まるSNS・コミュニティへのオーガニック投稿`,
        "インフルエンサー・KOLとのコラボレーション",
        "App Store / Google Play のキーワード最適化（ASO）",
        "既存ユーザーの口コミ・紹介プログラム（Referral）",
      ],
      keyMetrics: [
        "DAU / MAU比率（エンゲージメント健全性）",
        "30日継続率（リテンション）",
        "コア機能利用率（プロダクト価値検証）",
        "有料転換率 & NPS（収益・推奨度）",
      ],
      costStructure: [
        "AIモデルAPI利用料（OpenAI / Anthropic）",
        "クラウドインフラ費（AWS / GCP / Vercel）",
        "マーケティング・ユーザー獲得コスト（CAC）",
        "カスタマーサポート・運営人件費",
      ],
      revenueStreams: [
        `フリーミアムPro版 月額¥${pick([480, 680, 980, 1200], seed + 3)}（高度AI機能解放）`,
        "法人・チームプラン 年額ライセンス",
        "データインサイト・レポートAPIの外部提供",
      ],
    },

    persona: {
      name: personaName,
      age: pick([22, 27, 33, 38, 45], seed + 4),
      occupation: `${target}（主要セグメント）`,
      income: pick(["月収 25〜35万円", "月収 35〜50万円", "月収 15〜25万円", "年収 400〜600万円"], seed + 5),
      location: personaLocation,
      bio: `${target}として日々${problemText.slice(0, 40)}という課題に直面している。効率的な解決策を探しているが、既存ツールでは満足できていない状況。${appName}のようなソリューションに強い関心を持つ層の代表例。`,
      goals: [
        `${problemText.slice(0, 40)}...を根本的に解決したい`,
        "本来やりたいコア業務・活動に集中できる時間を確保したい",
        `同じ${target}の中で「デキる人」として差別化したい`,
        "ストレスなく日々のタスクを管理・完了したい",
      ],
      painPoints: [
        problemItems[0] || "情報が散在しており全体像が掴めない",
        "一度使い始めたツールが継続できず何度もやり直している",
        "「今何をすべきか」の判断に時間を取られて本業が進まない",
        `既存の${competitorSet[0]?.name ?? "競合サービス"}等では痒いところに手が届かない`,
      ],
      behaviors: [
        `${target}向けのSNSグループ・コミュニティを複数フォロー`,
        "新しいアプリは無料プランで試し、価値を感じたら課金を検討",
        "「おすすめアプリ」系のYouTube・ブログコンテンツをよく見る",
        "友人・同僚の口コミを最も信頼する情報源としている",
      ],
    },

    competitors: competitorSet.map((c, i) => ({
      ...c,
      ourAdvantage: i === 0
        ? `${appName}は${target}特化の設計で、初期設定ゼロ・即使えるオンボーディング体験`
        : i === 1
        ? `AIが${problemText.slice(0, 25)}を自動解決する専用機能で差別化`
        : `${target}の行動データに基づくパーソナライズで継続率・満足度が高い`,
    })),

    vpc: {
      valueMap: {
        products: [
          `${ideaText.slice(0, 40)}...を実現するコア機能`,
          "AI駆動のパーソナライズ・レコメンデーションエンジン",
          "ワンクリックでセットアップ完了のオンボーディング",
          "進捗・成果を可視化するリアルタイムダッシュボード",
          "外部ツール・既存ワークフローとのシームレス連携",
        ],
        painRelievers: [
          `${problemItems[0] || "主要課題"}を自動解決し手動作業をゼロに`,
          "「今何をすべきか」をAIが提示 → 意思決定コストを排除",
          "計画が崩れても自動リスケ → 挫折しにくい継続の仕組み",
          "スマートな通知設計でリマインドを最適なタイミングで配信",
        ],
        gainCreators: [
          "達成の可視化・バッジ・ストリーク機能で継続モチベーション維持",
          `同じ${target}との進捗シェアで健全な競争心を刺激`,
          "AIが「あなたの生産性パターン」を分析し改善提案",
          "使えば使うほど自分に最適化されるパーソナルAIアシスタント体験",
        ],
      },
      customerProfile: {
        jobs: [
          `${problemText.slice(0, 30)}...を効率よく解決したい`,
          "本来注力すべきコア活動・業務に集中したい",
          "全体の進捗を把握し計画的に目標達成したい",
          "周囲より「先を行っている」という自己効力感を持ちたい",
        ],
        pains: [
          problemItems[0] || "情報・タスクが散在して管理しきれない",
          "自分で立てた計画が崩れると立て直すモチベーションがなくなる",
          "既存ツールは機能が多すぎるか少なすぎるかで「ちょうどいい」がない",
          "続けても成果が見えず、努力が報われている実感が得られない",
        ],
        gains: [
          `${problemText.slice(0, 30)}...が解消された状態で毎日をスタートしたい`,
          "少ない時間でも「効率よくできている」という実感が欲しい",
          `同じ${target}の中で一歩先を行く存在になりたい`,
          "ツールを信頼して任せ、自分はより重要なことだけ考えたい",
        ],
      },
    },
  };
}
