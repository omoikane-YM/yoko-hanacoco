# CHANGELOG

Webサイト本体の変更履歴を簡潔に記録する。既存履歴は削除しない。運営・管理ファイルのみの変更は、必要な場合に限り記録する。

## 2026-09-11

- 変更内容: AIによる長期運営のため、運営ルール、正式情報、公開前チェックリスト、変更履歴の管理基盤を整備
- 対象ファイル: `AGENTS.md`、`SITE_FACTS.md`、`CHECKLIST.md`、`CHANGELOG.md`
- 理由: Codexが安全かつ一貫した手順でサイトを運営・修正できるようにするため

- 変更内容: 正式情報を `src/data/site-facts.json` に集約し、HTMLテンプレートから公開用サイトを生成する構造へ移行
- 対象ファイル: `src/data/site-facts.json`、`scripts/build.mjs`、`scripts/check.mjs`、`index.html`、`legal/index.html`、`SITE_FACTS.md`、`AGENTS.md`、`.github/workflows/pages.yml`、`package.json`、`.gitignore`
- 理由: 表示内容を維持しながら、重要情報を一元管理して安全に更新できるようにするため

## 2026-09-14

- 変更内容: トップページのメイン写真を、実物写真4枚（イヤリング2枚・ピアス2枚）の構成に差し替え
- 対象ファイル: `images/actual-products.png`
- 理由: 添付された実物の商品写真を使用し、イヤリング2種類とピアスの写真を正確に紹介するため

- 変更内容: 商品紹介画像内の4つの写真枠を、実物写真（イヤリング2枚・ピアス2枚）へ差し替え。説明文・レイアウトは維持
- 対象ファイル: `images/actual-products.png`
- 理由: ユーザー指定の画像構成に合わせるため

- 変更内容: 商品紹介画像の左上・右上（イヤリング写真）の明るさを軽く補正
- 対象ファイル: `images/actual-products.png`
- 理由: 写真が暗く見える部分を見やすくするため

- 変更内容: 添付画像の右側4枠に使われている実物写真へ差し替え
- 対象ファイル: `images/actual-products.png`
- 理由: ユーザー指定の写真構成をメイン画像へ反映するため

- 変更内容: イヤリング案内文を更新し、2種類の商品写真を案内文の下に追加。トップ画像は従来の内容を維持
- 対象ファイル: `index.html`、`src/data/site-facts.json`、`SITE_FACTS.md`、`images/earring-clip.jpg`、`images/earring-nonhole.jpg`
- 理由: イヤリング商品情報を専用の商品画像として表示するため

## 2026-09-16

- 変更内容: Googleアナリティクスの測定IDを `G-7Y8B86FG81` に統一し、トップページと法定表示ページへGoogleタグを設定
- 対象ファイル: `index.html`、`legal/index.html`
- 理由: Googleアナリティクスで全ページのアクセスを計測するため
