# book-trailer

Remotion + Claude Code で作った、本の予告編動画（60秒）。

コードを1行も手書きせず、Claude Code への指示3往復だけで完成した。詳細は [Zenn記事](https://zenn.dev/utanutan/articles/remotion-book-trailer-claude-code) を参照。

## 完成動画

<!-- X投稿 or YouTube Shorts のURLに差し替え -->

1920x1080 / 30fps / 60秒 / H.264

## 動画の構成

| 時間 | シーン | 演出 |
|---|---|---|
| 0-5秒 | ColdOpen | 水の波紋アニメーション + フックテキスト |
| 3-10秒 | TitleReveal | spring() でタイトルをスケールイン |
| 9-27秒 | ChapterFlash | 全6章のタイトル + ポイントが左右交互にスライドイン |
| 26-43秒 | KeyQuotes | 4つの引用が一文字ずつ浮かび上がる |
| 41-51秒 | Climax | メインメッセージ + パーティクル演出 |
| 50-60秒 | Ending | 本の表紙 + タイトル + CTA |

## セットアップ

```bash
git clone https://github.com/utanutan/book-trailer.git
cd book-trailer
npm install
```

## プレビュー

```bash
npm run dev
```

Remotion Studio がブラウザで起動する（ヘッドレスサーバーでは利用不可）。

## レンダリング

```bash
npm run render
```

`out/trailer.mp4` に出力される（H.264、CRF 18）。

または直接：

```bash
npx remotion render src/index.ts BookTrailer out/trailer.mp4 --codec h264 --crf 18
```

## プロジェクト構成

```
src/
├── index.ts              # エントリーポイント（registerRoot）
├── Root.tsx              # Composition 定義（1800フレーム, 30fps, 1920x1080）
├── BookTrailer.tsx       # メインコンポーネント（Sequence 重ね配置）
└── scenes/
    ├── ColdOpen.tsx      # 水の波紋 + フックテキスト
    ├── TitleReveal.tsx   # タイトル登場（spring アニメーション）
    ├── ChapterFlash.tsx  # 章タイトル + ポイント（6章分）
    ├── KeyQuotes.tsx     # キーフレーズの文字送り表示
    ├── Climax.tsx        # クライマックス + パーティクル
    └── Ending.tsx        # 本の表紙 + CTA
public/
└── cover.png             # 本の表紙画像
remotion.config.ts        # Remotion 設定（JPEG 90%）
```

## 別の本のトレーラーを作る場合

1. `public/cover.png` を差し替える
2. `src/scenes/ChapterFlash.tsx` の `CHAPTERS` 配列を編集
3. `src/scenes/TitleReveal.tsx` のタイトル・サブタイトルを編集
4. `src/scenes/KeyQuotes.tsx` の `QUOTES` 配列を編集
5. `src/scenes/ColdOpen.tsx` のフックテキストを編集
6. `npm run render`

あるいは、Claude Code に「この構成で別の本のトレーラーを作って」と伝えれば、データの差し替えも自動でやってくれる。

## 日本語フォントの注意点

Linux 環境でレンダリングすると、CJK フォントのフォールバックで中国語の字形が表示されることがある。

- `AbsoluteFill` に `lang="ja"` を付ける
- `fontFamily` に `"Noto Serif CJK JP"` を明示指定する
- `fc-list :lang=ja` でインストール済みの日本語フォントを確認

## 技術スタック

- [Remotion](https://remotion.dev/) v4.0.438
- React 19
- TypeScript 5

## ライセンス

MIT
