# AquaNote Prototype

水槽・池の管理、写真投稿、AI分析、飼育ガイド、収益化導線をまとめた静的プロトタイプです。

## 開き方

`index.html` をブラウザで開くと動きます。

## 本番保存の設計メモ

- [docs/cloud-storage-plan.md](docs/cloud-storage-plan.md) にクラウド保存の方針と移行順をまとめています。
- [supabase/schema.sql](supabase/schema.sql) に Supabase / Postgres 用のテーブルとRLSポリシー草案を置いています。
- `.env.example` に将来のSupabase接続で使う環境変数名を置いています。
- `supabase-config.example.js` を `supabase-config.js` にコピーして値を入れると、アカウント画面のAuth接続を試せます。
- `supabase/schema.sql` は途中で失敗しても再実行しやすいように、型、テーブル、インデックス、ポリシーを冪等化しています。
- アカウント画面の「本番前セットアップ」で、Supabase SQL、Storage、AI Gateway、通知、PWA実機QAの残タスク、確認場所、現在の確認状態、次の作業を確認できます。

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
- AI Gateway実写真分析の画像入力強化
- AI実写真Gateway出力のサマリー内クイック分類
- AI実写真Gateway出力の条件タグ付けショートカット
- AI実写真Gateway条件別サンプル数の達成表示
- AI実写真Gateway要修正レビューの改善メモ化
- AI実写真要修正メモ反映のプロンプト草案
- AI実写真Gateway要修正メモの草案反映レビュー
- AI実写真Gateway要修正メモの再評価サイクル
- AI実写真Gateway再評価後の条件別改善サマリー
- AI実写真Gateway再評価結果の改善メモ戻し
- AI実写真Gateway再評価メモからの草案再強化
- AI実写真Gateway草案再強化後の再レビュー
- AI実写真Gateway再レビュー結果の最終判定
- AI実写真Gateway本番判定のJSON証跡強化
- AI実写真Gateway本番判定の画面サマリー強化
- AI実写真Gateway本番判定のリリース導線
- AI実写真Gateway本番判定とPWA最終QAの接続
- AI実写真Gateway本番判定のPWAレビューJSON統合
- AI実写真Gateway判定チェックリストの公開前レビュー表示
- AI実写真Gateway公開前レビューの未完了アクション強化
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
- 通知配信ワーカー本番チェックの確認メモ保存
- 通知配信ログからの本番送信結果反映
- 期限切れPush購読の自動無効化
- ホームのデザイン変更ボタンとアカウント画面での表示モード切り替え（ベーシックモード / かんたんモード / 管理重視モード / 投稿重視モード）
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
- PWA本番URLでの最終リリース判定メモ
- PWA最終リリース判定メモのSupabase `pwa_release_decisions` 同期
- PWA本番URLでの最終実機レビュー証跡サマリー
- PWA本番URLレビュー結果のJSON書き出し
- PWA公開前レビューの次アクション/完了表示
- PWA公開前レビューの操作ガイド
- PWA最終リリース判定メモへの本番URL保存
- PWA本番URLレビューJSONの書き出し日時保存
- PWA公開前レビューの最終QA表示
- PWA実機レビューの実行状態保存
- PWA公開前レビューの実行結果確認
- ユーザー画像による背景/ボタン背面カスタム
- 表示モード別のホーム文言とボタン背面カスタム範囲の強化
- かんたん/管理重視/投稿重視モードのホーム操作サイズと密度を差別化
- 投稿重視モードでトップ写真と投稿導線を前面に出す動的演出
- PWA実機テストでの4モード/画像カスタムQA補助表示
- 表示モード別のスマホ余白、文字量、ボタンサイズ調整
- PWA最終レビューでの表示モード/画像カスタム証跡表示
- PWA実機テスト項目ごとの記録観点ガイド
- PWA実機テスト項目ごとのメモ例入力
- PWA実機QAの要確認/NG対応メモ抽出
- PWA実機QA対応メモの後続OKによる解消判定
- PWAレビューJSONの必須項目ステータス最新化
- 初回ユーザー向けの空メトリクス表示
- 初回ユーザー向けにサンプル投稿・サンプル水槽を入れず、自分の水槽から始める本番初期状態
- TOPに自分の水槽写真を大きく表示するホームデザイン
- PWA公開前レビューの引き渡しチェックとJSON証跡
- PWA公開前レビューの引き渡しメモ表示とJSON書き出し
- PWA公開前レビューのテスター手順表示とJSON書き出し
- PWA公開前レビューのクラウド同期確認とJSON書き出し
- モニター参加者へ送る案内文のコピー機能

## 次に作るとよいもの

- 実写真でのプロンプトv3評価
- プロンプトv3評価サンプルの拡充
- PWA本番URL実機QA後の公開判定を実データで確認

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
- アカウント画面の通知本番チェックに環境変数、dry-run解除、送信結果の確認メモを保存
- 配信ログから本番送信結果を通知本番チェックへ反映

本番リハーサル:

1. `node scripts/generate-vapid-keys.mjs` でVAPID鍵を生成する。
2. 公開鍵を `supabase-config.js`、秘密鍵をNetlify環境変数に設定する。
3. dry-runのまま通知予約が `notification_deliveries` に作られることを確認する。
4. `NOTIFICATION_DELIVERY_DRY_RUN=false` にして直近リマインダーを同期する。
5. アカウント画面の配信ログで `sent` / `failed` / `skipped` を確認し、失敗時は詳細を見て再送予約する。
6. 「配信ログから送信結果を反映」で本番送信結果を確認メモに保存する。

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
5. ベーシック、かんたん、管理重視、投稿重視モードを切り替え、ホームで主要操作を試す。
   投稿重視モードでは、トップ写真、投稿導線、横スクロールなし、端末の「動きを減らす」設定で過度な動きが止まることも確認します。

アカウント画面の「画像カスタム」では、ユーザーの画像を取り込んでアプリ背景や主要ボタンの背面に反映できます。
画像はローカル状態とJSON書き出しに保存されます。

アカウント画面の「PWA実機テスト結果」には、端末、ブラウザ、確認項目、OK/要確認/NG、メモを保存できます。
記録はローカル状態に保存され、JSONで書き出せます。Supabaseログイン中は `pwa_device_tests` に同期されます。
ログイン、ホーム追加、通知受信、オフライン復帰、4モード表示、画像カスタムのOK状況はレビューサマリーで確認できます。
「PWA最終リリース判定」では、公開OK/確認中/保留、実機レビュー状態、結果確認、確認者、本番URL、残タスクを保存できます。Supabaseログイン中は `pwa_release_decisions` に同期されます。
最終実機レビューでは、実機記録、必須項目、NGなし、公開判断、確認者、クラウド保存の証跡を一覧できます。
JSON書き出しには、必須項目カバレッジ、本番前セットアップ状態、最終リリース判定、証跡サマリー、実機テスト結果が含まれます。
各必須項目の確認観点とメモ例も含まれるため、公開後にどの条件でOKにしたかを見返せます。
Supabase SQL確認、Storage確認、AI Gateway確認、通知確認は本番前セットアップの確認メモに保存でき、PWAレビューJSONにも確認状態として含まれます。
PWA実機テスト前でも、本番前セットアップだけを `aquanote-production-setup-YYYY-MM-DD.json` として書き出せます。
未完了の証跡がある場合は次アクションが表示され、すべて揃うと公開前レビュー完了として表示されます。
JSONを書き出すと、書き出し日時が最終リリース判定メモに保存されます。
最終QAでは、本番URL、実機結果、最終判定、クラウド保存、レビューJSONが揃っているかを確認できます。

既存のSupabase環境へ反映する場合は、`supabase/schema.sql` の `pwa_device_tests` と `pwa_release_decisions` のテーブル、インデックス、RLSポリシーを追加してください。既存の `pwa_release_decisions` には `review_status`、`result_status`、`production_url`、`review_exported_at` も追加してください。

公開前レビューの操作順:

1. 本番URLを実機で開き、ログイン、ホーム追加、通知受信、オフライン復帰、4モード表示、画像カスタムを確認する。
2. アカウント画面の「PWA実機テスト結果」に端末、ブラウザ、確認項目、結果、メモを保存する。
3. 「PWA最終リリース判定」で公開OK/確認中/保留、実機レビュー状態、結果確認、確認者、本番URL、残タスクを保存する。
4. Supabaseログイン中の場合は同期状態を確認する。
5. JSONボタンで `aquanote-pwa-production-review-YYYY-MM-DD.json` を書き出す。

## AI分析API

`netlify/functions/ai-analysis.mts` は `/api/ai-analysis` で画像と水槽ログを受け取り、Netlify AI GatewayのOpenAI互換エンドポイントへ送ります。Gatewayが未設定、またはローカルで `index.html` を直接開いている場合は、アプリ側で既存のローカル分析にフォールバックします。
AI画面の「AI API検証」からGateway設定、モデル名、最後の分析経路を確認できます。
プロンプトv4では、写真に見える根拠、信頼度、撮り直しや追加確認のポイントを返すようにしています。
投稿写真の分析では、Gatewayへ実写真を高詳細画像入力として送り、返却JSONから見える根拠、信頼度、撮り直し観点を表示します。
AI画面の「AI比較ログ」には、Gateway結果とローカル分析の差分、モデル、プロンプト版、評価メモをローカル保存します。
実写真検証サマリーでは、最新の未評価Gateway写真を良い例、要修正、保留に分類し、撮影条件タグもすぐ付けられます。
条件別サンプルは、暗い写真、魚が小さい写真、コケ多め、反射ありを各2件ずつ集める進捗として表示します。
要修正に分類したGateway写真は、条件、差分、撮り直し観点を改善メモ履歴へ変換できます。
実写真検証サマリーでは、v4本番チェックとしてGateway設定、撮影条件カバー、分類済みレビュー、撮り直し観点を確認できます。

既存のSupabase環境へ反映する場合は、`supabase/migrations/20260602_remove_glance_ui_mode.sql` をSQL Editorで実行し、古い一目モード値をベーシックへ戻してからプロフィール同期を確認してください。
UIモード保存時に既存制約が残っている場合は、アプリ上でもこのSQL実行が必要なことを案内します。
投稿重視モードは既存データ互換のため、DBには `live` として保存します。
フィルター管理をSupabase同期する場合は、`supabase/migrations/20260602_add_filter_profile.sql` をSQL Editorで実行し、`tanks.filter_profile` に掃除日、交換目安、流量メモを保存できる状態にしてください。

## 公開後の拡張メモ

名前つき生き物アルバムは、公開後に写真とログが集まってから追加する予定です。
写真に写った生き物や水草をAIが候補表示し、ユーザーが個体に名前をつけます。
次回以降の写真では、過去写真と照合して「この子かも」を候補表示します。

個体判別は似た個体や暗い写真では間違う可能性があるため、AIは候補表示までにし、最終確認はユーザーが行います。
サイズ推定は、水槽サイズや基準物がある場合だけ「約何cm」の目安として扱います。

広告は初回公開では入れず、ユーザー体験が安定してから検討します。
配置候補はおすすめ用品ページ、飼育ガイド下部、投稿詳細下部、検索結果の一部です。
ホーム、水槽登録、記録フォーム、AI診断結果のすぐ横、初回登録中には置かない方針です。
通常のバナー広告より、アクア用品の紹介、提携、アフィリエイトを優先します。

主な環境変数:

- `OPENAI_BASE_URL`
- `OPENAI_API_KEY` 任意
- `AI_ANALYSIS_MODEL=gpt-4o-mini`
