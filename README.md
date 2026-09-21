# 車両ニュース(仮)

鉄道車両のニュースと車両ページをまとめる静的サイトです(Astro)。

## はじめかた(MacBook Pro)

```bash
npm install     # 部品の取得(初回のみ)
npm run dev     # 手元で表示。表示されたURL(通常 http://localhost:4321)をブラウザで開く
```

`npm run dev` では確認前の記事も表示されます(「確認前」の印つき)。

## 記事を足す

`src/content/news/` に、日付つきのファイルを1つ追加するだけです(例: `2026-09-28-xxxx.md`)。

```markdown
---
title: 見出し
date: 2026-09-28
operator: JR東日本
summary: 1〜2文の要約(自分の言葉で)
sourceName: 出典の名前
sourceUrl: https://出典の個別ページのURL
tags: [新型車両]
vehicles: [e723-5000]   # 関連する車両ページのID(ファイル名)
verified: false
---
本文(任意)
```

## 公開してよい記事の条件

- 公式リリースで日付・料金・車両名を確認したら、`verified: true` に変える。
- `npm run build`(公開版)には `verified: true` の記事だけが載ります。
- 公式リリース本文や記事本文の転載はしない。要約と出典リンクだけを載せる。
- 写真は自分で撮ったものだけを使う。

## 車両ページを足す

`src/content/vehicles/` にファイルを追加します。ファイル名が車両のID(URLとニュースとの紐づけに使う)です。`status` は「運行中」「導入予定」「引退予定」「引退済み」のどれかです。

## サイト名を変える

`src/config.ts` の `name` を書き換えるだけです。

## 公開する(Cloudflare Pages の場合)

1. GitHubにリポジトリを作ってpushする。
2. Cloudflare Pagesでそのリポジトリをつなぎ、Build command に `npm run build`、Build output directory に `dist` を指定する。
3. 公開URLが決まったら `astro.config.mjs` の `site` を書き換える。

## フォルダ構成

```
src/
  config.ts          サイト名など
  content.config.ts  記事・車両データの項目定義
  content/news/      ニュース記事(Markdown)
  content/vehicles/  車両ページ(Markdown)
  lib/content.ts     データの取得・日付表示
  layouts/           共通レイアウト
  components/        ニュース一覧・車両一覧
  pages/             各ページ
  styles/global.css  見た目
```
