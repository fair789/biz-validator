import type { Competitor } from "../types";

type Domain =
  | "education"
  | "productivity"
  | "food"
  | "health"
  | "finance"
  | "ecommerce"
  | "travel"
  | "realestate"
  | "hr"
  | "social"
  | "default";

const DOMAIN_KEYWORDS: Record<Domain, string[]> = {
  education: ["学習", "勉強", "授業", "資格", "大学", "教育", "スキル", "コース", "講座", "英語", "語学", "塾", "受験", "試験", "学校", "eラーニング"],
  productivity: ["タスク", "スケジュール", "管理", "効率", "todo", "仕事", "プロジェクト", "業務", "生産性", "ワーク", "ノート", "メモ", "習慣", "目標"],
  food: ["料理", "食事", "レシピ", "献立", "食材", "飲食", "グルメ", "レストラン", "デリバリー", "調理", "食べ物", "食品", "弁当", "栄養"],
  health: ["健康", "運動", "フィットネス", "睡眠", "医療", "ダイエット", "体重", "病院", "メンタル", "ウェルネス", "筋トレ", "ヨガ", "歩数", "カロリー"],
  finance: ["お金", "資産", "投資", "家計", "節約", "保険", "fintech", "貯金", "節税", "会計", "経費", "給付", "年金", "株", "仮想通貨", "マネー", "ファイナンス"],
  ecommerce: ["購入", "ec", "ショッピング", "販売", "フリマ", "転売", "商品", "出品", "買い物", "通販", "せどり", "オークション", "小売"],
  travel: ["旅行", "観光", "ホテル", "宿泊", "旅程", "トリップ", "航空", "飛行機", "海外", "国内旅行", "宿", "旅館"],
  realestate: ["不動産", "賃貸", "物件", "引越し", "住まい", "マンション", "売買", "土地", "リノベ", "内見", "家賃"],
  hr: ["採用", "転職", "就活", "求人", "キャリア", "hr", "人事", "面接", "履歴書", "スカウト", "インターン", "就職"],
  social: ["sns", "コミュニティ", "マッチング", "交流", "友達", "フォロワー", "投稿", "シェア", "ネットワーク", "出会い", "趣味"],
  default: [],
};

const DOMAIN_COMPETITORS: Record<Domain, Omit<Competitor, "ourAdvantage">[]> = {
  education: [
    { name: "スタディサプリ", target: "中高生・受験生・社会人学習者", strengths: "低価格・有名講師陣・幅広い科目対応・スマホ完結", weaknesses: "双方向性がない・モチベーション維持が難しい・質問機能が限定的", pricing: "月額2,178円〜" },
    { name: "Duolingo", target: "語学学習者（主に英語）", strengths: "ゲーミフィケーション・無料・習慣化設計・世界的ブランド", weaknesses: "会話力育成が弱い・体系的な文法学習に不向き・上級者向け機能が薄い", pricing: "無料〜 $6.99/月" },
    { name: "Udemy", target: "スキルアップを目指す社会人・エンジニア", strengths: "専門職向けコースが豊富・一度購入で永久視聴・実践的内容", weaknesses: "コース品質にばらつき・日本語コンテンツが限定的・進捗管理機能が弱い", pricing: "コース毎買い切り（¥2,000〜¥27,000）" },
  ],
  productivity: [
    { name: "Notion", target: "ビジネスパーソン・チーム・クリエイター", strengths: "高い自由度・豊富なテンプレート・DB連携・チーム共有", weaknesses: "初期設定が複雑・学習コストが高い・オフライン不可", pricing: "無料〜 $16/月" },
    { name: "Todoist", target: "個人のタスク管理・GTD実践者", strengths: "シンプルなUI・クロスプラットフォーム・Karma機能で習慣化", weaknesses: "プロジェクト管理機能が限定的・AI機能が後発・カスタマイズ性が低い", pricing: "無料〜 ¥600/月" },
    { name: "Asana", target: "チームプロジェクト管理・中規模組織", strengths: "ガントチャート・タイムライン・詳細なワークフロー自動化", weaknesses: "個人利用には機能過多・無料プランの制限が多い・習得に時間がかかる", pricing: "無料〜 $24.99/月" },
  ],
  food: [
    { name: "クックパッド", target: "自炊する主婦・料理好き全般", strengths: "国内最大レシピ数（450万+）・口コミ・主婦コミュニティが強い", weaknesses: "AI機能なし・献立提案が弱い・広告が多い・検索精度にムラ", pricing: "無料〜 月額320円" },
    { name: "Delish Kitchen", target: "料理初心者・若い女性・共働き世帯", strengths: "動画レシピ・スーパー連携・買い物リスト機能・見た目が良い", weaknesses: "レシピ数がクックパッド比で少ない・カスタマイズ性が低い", pricing: "無料（広告あり）〜 月額480円" },
    { name: "タベリー", target: "献立を考えるのが面倒な家庭", strengths: "週次献立自動生成・食材まとめ買いリスト・栄養バランス考慮", weaknesses: "知名度が低い・レシピ数がまだ少ない・対応スーパーが限定的", pricing: "無料〜 月額480円" },
  ],
  health: [
    { name: "MyFitnessPal", target: "ダイエット・カロリー管理をしたい人", strengths: "食品データベースの規模・バーコードスキャン・運動ログ連携", weaknesses: "UIが古い・日本食データが少ない・有料プランが高い", pricing: "無料〜 $19.99/月" },
    { name: "Fitbit / Google Fit", target: "健康意識の高いスマートウォッチユーザー", strengths: "ウェアラブル連携・睡眠分析・心拍数モニタリング・Googleエコシステム", weaknesses: "デバイス依存・専用端末が必要・アプリ単体では機能が限定的", pricing: "無料（デバイス ¥15,000〜）" },
    { name: "あすけん", target: "日本人の健康管理・ダイエット層", strengths: "日本食データ豊富・AI栄養士アドバイス・写真からカロリー計算", weaknesses: "UIが古め・メンタルヘルス機能が弱い・コミュニティ機能が限定", pricing: "無料〜 月額480円" },
  ],
  finance: [
    { name: "マネーフォワード ME", target: "家計管理・資産把握をしたい個人", strengths: "銀行・クレカ自動連携・資産一覧・グラフ可視化・知名度No.1", weaknesses: "無料プランの連携数制限・細かい予算設定が有料・UIが複雑", pricing: "無料〜 月額500円" },
    { name: "Zaim", target: "手動入力派・シンプル家計簿ユーザー", strengths: "レシート読取・手動入力のしやすさ・シンプルUI・無料範囲が広い", weaknesses: "自動連携の精度が低い・投資管理機能が弱い・AI機能なし", pricing: "無料〜 月額360円" },
    { name: "freee", target: "フリーランス・個人事業主・中小企業", strengths: "確定申告対応・会計と請求書の一元管理・税理士連携", weaknesses: "個人の家計管理には向かない・学習コストがある・費用が高め", pricing: "月額980円〜" },
  ],
  ecommerce: [
    { name: "メルカリ", target: "不用品を売りたい個人・CtoCユーザー", strengths: "国内最大のCtoCプラットフォーム・決済統合・知名度・ユーザー数", weaknesses: "手数料10%・偽物・詐欺リスク・価格競争が激しい", pricing: "販売手数料10%" },
    { name: "Yahoo!ショッピング", target: "幅広いBtoCショッピング層", strengths: "PayPayポイント・大手出店者多数・価格比較・集客力", weaknesses: "個人出品には不向き・UI古め・独自性が薄い", pricing: "出店無料・成約手数料3〜7%" },
    { name: "BUYMA", target: "ブランド品・海外商品を求めるユーザー", strengths: "海外ブランド特化・バイヤー制度・真贋保証サービス", weaknesses: "高価格帯に限定・配送が遅い・国内商品との比較検討が難しい", pricing: "成約手数料5.5〜11%" },
  ],
  travel: [
    { name: "じゃらん", target: "国内旅行を計画する日本人", strengths: "国内宿泊施設数No.1・ポンタ連携・口コミ数・知名度", weaknesses: "海外対応なし・UI古め・AIルート提案なし・比較機能が弱い", pricing: "無料（宿泊手数料は施設負担）" },
    { name: "Airbnb", target: "体験重視・ユニーク宿泊を求めるユーザー", strengths: "個性的な宿泊体験・世界規模・ホスト文化・体験プログラム", weaknesses: "品質にばらつき・キャンセルリスク・日本での規制問題", pricing: "手数料14〜16%" },
    { name: "Google Travel", target: "旅行情報を検索・比較するすべてのユーザー", strengths: "横断検索・価格アラート・マップ統合・フライト比較", weaknesses: "予約後のサポートなし・独自コンテンツなし・パーソナライズが弱い", pricing: "無料" },
  ],
  realestate: [
    { name: "SUUMO", target: "賃貸・売買物件を探す人全般", strengths: "国内最大物件数・TV CMブランド力・エリア検索精度", weaknesses: "情報が古い物件も多い・チャット連絡が少ない・AI提案機能なし", pricing: "無料（掲載側が費用負担）" },
    { name: "Chintai", target: "賃貸メインのユーザー・一人暮らし新社会人", strengths: "オンライン内見・電子契約・仲介手数料0円プラン", weaknesses: "物件数がSUUMO比で少ない・エリアが限定的", pricing: "無料" },
    { name: "ietty (イエッティ)", target: "チャットで気軽に探したい若年層", strengths: "LINE感覚のチャット接客・24h対応・オンライン完結", weaknesses: "対応エリアが首都圏限定・物件数が少ない・知名度が低い", pricing: "無料（仲介手数料1ヶ月分）" },
  ],
  hr: [
    { name: "リクナビNEXT", target: "転職を検討する社会人全般", strengths: "求人数No.1クラス・スカウト機能・グッドポイント診断", weaknesses: "応募数が多く埋もれやすい・エージェントサポートなし・受動的", pricing: "無料（企業側が掲載費）" },
    { name: "Wantedly", target: "スタートアップ・IT系への転職希望者", strengths: "ビジョンマッチング・カジュアル面談・会社の雰囲気重視", weaknesses: "給与情報が非公開・中小企業に偏る・大企業の掲載が少ない", pricing: "無料〜（企業側 月額3.5万〜）" },
    { name: "LinkedIn", target: "グローバル・外資系・ハイキャリア層", strengths: "世界規模・スキル可視化・リファラル採用・ブランディング", weaknesses: "日本語コンテンツが少ない・UIが複雑・日本のSMBには浸透不足", pricing: "無料〜 $39.99/月" },
  ],
  social: [
    { name: "Instagram", target: "15〜35歳のビジュアル重視ユーザー", strengths: "圧倒的DAU・リール・ショッピング機能・ブランドコラボ", weaknesses: "テキスト検索性が低い・アルゴリズム依存・炎上リスク", pricing: "無料（広告収益）" },
    { name: "Meetup", target: "趣味・スキルでつながりたい社会人", strengths: "オフラインイベント特化・海外発のコミュニティ文化", weaknesses: "日本での普及率が低い・日本語対応不足・UIが古め", pricing: "無料〜 $29.99/月（主催者）" },
    { name: "Peatix", target: "イベント主催・参加者", strengths: "国内イベントプラットフォームNo.1・コミュニティ機能・決済統合", weaknesses: "マッチング機能なし・継続的なコミュニティ維持が弱い", pricing: "無料〜 手数料3.5%+¥50" },
  ],
  default: [
    { name: "Notion", target: "ビジネス・クリエイター・上級ユーザー", strengths: "高い自由度・豊富なテンプレート・チーム連携・AI機能", weaknesses: "セットアップが複雑・学習コストが高い・オフライン不可", pricing: "無料〜 $16/月" },
    { name: "Zapier", target: "ノーコードで業務自動化したい事業者", strengths: "7,000+アプリ連携・ノーコード・豊富なテンプレート", weaknesses: "日本語対応が弱い・高額プラン・複雑なワークフローに限界", pricing: "無料〜 $69.99/月" },
    { name: "Airtable", target: "データ管理・業務効率化したいチーム", strengths: "スプレッドシート×DB・豊富なビュー・API連携・自動化", weaknesses: "大規模データに弱い・価格が高め・UIに慣れが必要", pricing: "無料〜 $24/月" },
  ],
};

export function detectDomain(text: string): Domain {
  const lower = text.toLowerCase();
  let maxCount = 0;
  let bestDomain: Domain = "default";

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS) as [Domain, string[]][]) {
    if (domain === "default") continue;
    const count = keywords.filter((kw) => lower.includes(kw)).length;
    if (count > maxCount) {
      maxCount = count;
      bestDomain = domain;
    }
  }
  return bestDomain;
}

export function getCompetitorsByDomain(domain: Domain): Omit<Competitor, "ourAdvantage">[] {
  return DOMAIN_COMPETITORS[domain] ?? DOMAIN_COMPETITORS.default;
}
