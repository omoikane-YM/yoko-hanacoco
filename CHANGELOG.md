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
