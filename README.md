# BizValidator — AIビジネス検証ツール

**アイデアを3行入力するだけで、30秒後に起業家向け事業検証ドキュメントが完成します。**

🔗 **デモ：** https://biz-validator.vercel.app

---

## できること

入力するのはたった3つ：
- ターゲット層
- 解決したい課題
- コアアイデア

Claude AIが以下の6つを自動生成します：

| セクション | 内容 |
|---|---|
| リーンキャンバス | UVP・収益モデル・KPI含む9項目 |
| ペルソナ設計 | 日本語・実名形式の顧客像 |
| 競合分析 | ジャンル自動判定 + 実在する競合3社 |
| バリュープロポジションキャンバス | 顧客課題と自社機能のマッピング |
| AIプロンプト集 | MVP定義・LP・ピッチ等6種のコピペ用プロンプト |
| AIアドバイザーチャット | 検証データをコンテキストに持ったビジネス相談AI |

---

## 技術スタック

- **フロントエンド：** Next.js 16 + TypeScript + Tailwind CSS v4
- **AI：** Claude Haiku 4.5（Anthropic SDK）
- **デプロイ：** Vercel
- **フォールバック：** APIキーなしでもローカルエンジンで動作

---

## セットアップ

```bash
git clone https://github.com/fair789/biz-validator.git
cd biz-validator
npm install
```

`.env.local` を作成：

```env
ANTHROPIC_API_KEY=your_api_key_here
```

APIキーは https://console.anthropic.com/settings/keys から取得。  
未設定でもローカルエンジンで動作します。

```bash
npm run dev
```

http://localhost:3000 にアクセス。

---

## 作者

**Fair** — 都内大学2年生・個人開発者  
X: [@fair789](https://x.com/fair789)
