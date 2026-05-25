# AquaNote Prototype

水槽・池の管理、写真投稿、AI分析、飼育ガイド、収益化導線をまとめた静的プロトタイプです。

## 開き方

`index.html` をブラウザで開くと動きます。

## 本番保存の設計メモ

- [docs/cloud-storage-plan.md](docs/cloud-storage-plan.md) にクラウド保存の方針と移行順をまとめています。
- [supabase/schema.sql](supabase/schema.sql) に Supabase / Postgres 用のテーブルとRLSポリシー草案を置いています。
- `.env.example` に将来のSupabase接続で使う環境変数名を置いています。
- `supabase-config.example.js` を `supabase-config.js` にコピーして値を入れると、アカウント画面のAuth接続を試せます。

## 入っている機能

- 水槽・池の管理ダッシュボード
- 複数の水槽・池の登録と切り替え
- 水槽プロフィールの編集と削除
- 水温、pH、メンテナンス記録の入力とブラウザ保存
- 選択中の水槽・池ごとの管理ログ保存
- 最新ログに連動した水温、pH、水換え、AI状態の表示
- 今日の管理タスクのチェック状態保存
- 今日の管理タスクの時刻リマインダー
- リマインダーの曜日指定と何日ごと設定
- ブラウザ通知の許可と、アプリ起動中のリマインダー通知
- 通知チャンネル、メール通知準備、静音時間のアカウント設定
- PWA Push/メール配信用の次回通知予約
- 写真投稿風のコミュニティ画面
- 投稿といいね数のブラウザ保存
- 投稿コメントのブラウザ保存
- 投稿と水槽・池のひも付け
- コミュニティ投稿のタグ検索と人気順/コメント順ソート
- 人気投稿ランキング
- 投稿時の写真・動画選択、プレビュー、ブラウザ保存
- 動画の再生時間表示
- 動画サムネイル画像の自動生成
- 投稿メディアの差し替えと投稿削除
- 投稿タイトル、タグ、本文、水槽ひも付けの編集
- 水槽、投稿、ガイドの横断検索
- 水槽プロフィール内の関連投稿表示
- 水槽ごとの画像アルバム表示
- アルバム写真を水槽プロフィールの表紙に設定
- アルバムの月別フィルター、並び替え、件数表示
- アルバムの手動並び替え
- アルバム写真・動画の詳細表示
- 投稿画像からAI分析画面へ送る導線
- コミュニティ投稿の水槽別フィルター
- 状態選択からのAI分析デモ
- Netlify Function経由のAI画像/ログ分析API入口
- AI画面でのGateway/モデル検証ステータス表示
- AI分析プロンプトv4、信頼度、見える根拠、撮り直し観点の表示
- AI Gateway結果とローカル分析の比較ログ、評価メモ
- AI評価メモのSupabase `ai_evaluations` 同期
- AI比較ログの経路/状態フィルターとプロンプト改善メモ
- プロンプト改善メモ履歴のSupabase `ai_prompt_notes` 同期
- AI評価ログの良い例/要修正/保留分類と本番評価フロー
- AI評価分類の集計とプロンプト改善候補表示
- AI評価レビューのCSV/JSON書き出し
- AIレビューエクスポートの期間/分類ラベル指定
- 投稿写真のGateway実写真検証サマリー
- プロンプトv3撮り直し観点の評価ログ保存とCSV書き出し
- プロンプトv3評価サンプルの撮影条件タグ
- 撮影条件別のプロンプト弱点集計
- プロンプトv3改善候補のメモ反映
- プロンプトv3改善候補の自動履歴保存
- AI評価レビューからプロンプトv4草案表示
- プロンプトv4草案のCSV/JSON書き出し
- AI分析プロンプトv4の適用
- 実写真でのプロンプトv4評価サマリー
- プロンプトv4評価レビューの世代/検証ステータス付きCSV/JSON書き出し
- AI画面でのプロンプトv4本番チェックリスト
- プロンプトv4本番チェック結果のJSON書き出し
- 飼育ガイドとPR枠の表示
- スマホ幅対応のレスポンシブUI
- アカウントプロフィールのプロトタイプ
- 同期ステータス表示
- AquaNoteデータのJSON書き出し/読み込み
- 本番クラウド保存向けのデータ分割メモ
- Supabase向けのDBスキーマ草案
- `localStorage` からSupabaseへ差し替えるための永続化レイヤー入口
- Supabase Authのメールログイン/登録UI
- ログイン中ユーザーのSupabaseプロフィール読み込み/同期
- ローカル水槽プロフィールのSupabase `tanks` 同期
- 管理ログのSupabase `logs` 同期
- リマインダー設定のSupabase `reminders` 同期
- 投稿とコメントのSupabase `posts` / `comments` 同期
- いいねとランキングのSupabase `post_likes` / `post_stats` 同期
- 写真・動画・サムネイルのSupabase Storage / `media` 同期
- AI分析結果のSupabase `ai_results` 同期
- 通知設定のSupabase `profiles` 同期
- 次回通知配信予約のSupabase `notification_deliveries` 同期
- Netlify Scheduled Functionによる通知配信ワーカーの下準備
- PWA Push購読情報のSupabase `push_subscriptions` 同期
- VAPID署名つきWeb Push送信処理
- アカウント画面での通知配信ワーカー本番環境変数チェック
- 期限切れPush購読の自動無効化
- ホームのデザイン変更ボタンとアカウント画面での表示モード切り替え（ベーシックモード / かんたんモード / 一目モード / 大人モード）
- 表示モード別のホーム操作とカード視認性の調整
- アカウント画面でのPush/メール配信ログ表示
- 通知配信ログの状態絞り込みと失敗配信の再送予約
- 通知配信ログの詳細表示と運用メモ
- アカウント画面での通知本番検証チェックリスト
- アカウント画面での通知本番リハーサル手順
- PWA用の `manifest.webmanifest`、アプリアイコン、`sw.js`
- PWAインストールボタンとオフラインページ
- アカウント画面でのPWA公開前チェック
- アカウント画面でのPWA本番リハーサル手順
- PWA本番URLでの実機テスト結果メモとJSON書き出し
- PWA実機テスト結果のSupabase `pwa_device_tests` 同期
- PWA本番URLテスト結果のOK/要確認/NGレビューサマリー

## 次に作るとよいもの

- 本物のAI画像分析
- 実写真でのプロンプトv3評価
- プロンプトv3評価サンプルの拡充
- PWA本番URLでの最終リリース判定メモ

## 通知配信ワーカー

`netlify/functions/notification-delivery.mts` は15分ごとに `notification_deliveries` を確認するScheduled Functionです。既定では `NOTIFICATION_DELIVERY_DRY_RUN` が有効扱いになり、DB更新や送信は行いません。

本番送信に必要な環境変数:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NOTIFICATION_DELIVERY_DRY_RUN=false`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL_FROM`
- `WEB_PUSH_VAPID_SUBJECT`
- `WEB_PUSH_VAPID_PUBLIC_KEY`
- `WEB_PUSH_VAPID_PRIVATE_KEY`
- `WEB_PUSH_TTL_SECONDS`

外部のPush中継サービスを使う場合は、VAPID環境変数の代わりに `WEB_PUSH_ENDPOINT` と `WEB_PUSH_TOKEN` を設定できます。
`WEB_PUSH_VAPID_PUBLIC_KEY` は `supabase-config.js` の `window.AQUANOTE_PUSH_CONFIG.publicKey` と同じ値にします。
VAPID鍵は `node scripts/generate-vapid-keys.mjs` で生成できます。

本番前チェック:

- `supabase-config.js` にSupabase接続情報と `AQUANOTE_PUSH_CONFIG.publicKey` を設定
- Netlifyに `SUPABASE_SERVICE_ROLE_KEY` とVAPID秘密鍵を設定
- `NOTIFICATION_DELIVERY_DRY_RUN=false` で送信を有効化
- アカウント画面の通知本番チェックと配信ログで `sent` / `failed` / `skipped` を確認

本番リハーサル:

1. `node scripts/generate-vapid-keys.mjs` でVAPID鍵を生成する。
2. 公開鍵を `supabase-config.js`、秘密鍵をNetlify環境変数に設定する。
3. dry-runのまま通知予約が `notification_deliveries` に作られることを確認する。
4. `NOTIFICATION_DELIVERY_DRY_RUN=false` にして直近リマインダーを同期する。
5. アカウント画面の配信ログで `sent` / `failed` / `skipped` を確認し、失敗時は詳細を見て再送予約する。

## PWA公開前チェック

- `manifest.webmanifest` のアイコン、ショートカット、テーマカラーを確認
- HTTPS上でインストールボタンが表示されることを確認
- オフライン時に `offline.html` が表示されることを確認
- Service Worker更新後に古いキャッシュが削除されることを確認

## PWA本番リハーサル

1. 本番URLをiPhone SafariとAndroid Chromeで開き、ログインと初期表示を確認する。
2. インストールボタンまたはホーム画面追加から保存し、アプリアイコンで起動する。
3. 通知許可、Push購読、dry-run予約、dry-run解除後の受信を配信ログで確認する。
4. 機内モードで再読み込みし、キャッシュ画面または `offline.html` が出ることを確認する。
5. ベーシック、かんたん、一目、大人モードを切り替え、ホームで主要操作を試す。

アカウント画面の「PWA実機テスト結果」には、端末、ブラウザ、確認項目、OK/要確認/NG、メモを保存できます。
記録はローカル状態に保存され、JSONで書き出せます。Supabaseログイン中は `pwa_device_tests` に同期されます。
ログイン、ホーム追加、通知受信、オフライン復帰、4モード表示のOK状況はレビューサマリーで確認できます。

既存のSupabase環境へ反映する場合は、`supabase/schema.sql` の `pwa_device_tests` テーブル、インデックス、RLSポリシーを追加してください。

## AI分析API

`netlify/functions/ai-analysis.mts` は `/api/ai-analysis` で画像と水槽ログを受け取り、Netlify AI GatewayのOpenAI互換エンドポイントへ送ります。Gatewayが未設定、またはローカルで `index.html` を直接開いている場合は、アプリ側で既存のローカル分析にフォールバックします。
AI画面の「AI API検証」からGateway設定、モデル名、最後の分析経路を確認できます。
プロンプトv4では、写真に見える根拠、信頼度、撮り直しや追加確認のポイントを返すようにしています。
AI画面の「AI比較ログ」には、Gateway結果とローカル分析の差分、モデル、プロンプト版、評価メモをローカル保存します。
実写真検証サマリーでは、v4本番チェックとしてGateway設定、撮影条件カバー、分類済みレビュー、撮り直し観点を確認できます。

既存のSupabase環境へ反映する場合は、`profiles.ui_mode` を追加してからプロフィール同期を確認してください。

主な環境変数:

- `OPENAI_BASE_URL`
- `OPENAI_API_KEY` 任意
- `AI_ANALYSIS_MODEL=gpt-4o-mini`
