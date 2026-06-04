# AquaNote Prototype

水槽・池の管理、写真投稿、AI分析、飼育ガイド、収益化導線をまとめた静的プロトタイプです。

## 開き方

`index.html` をブラウザで開くと動きます。

## 本番保存の設計メモ

- [docs/cloud-storage-plan.md](docs/cloud-storage-plan.md) にクラウド保存の方針と移行順をまとめています。
- [supabase/schema.sql](supabase/schema.sql) に Supabase / Postgres 用のテーブルとRLSポリシー草案を置いています。
- `.env.example` にNetlify本番環境変数のサンプルを置いています。秘密キーはブラウザに置かず、Netlify側に設定します。
- `supabase-config.example.js` を `supabase-config.js` にコピーして、ブラウザで使う公開Supabase設定とVAPID公開鍵を入れます。
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
- ローカル水槽プロフィール、寸法・水量、フィルター管理のSupabase `tanks` 同期
- 管理ログのSupabase `logs` 同期
- 水槽ごとのリマインダー設定のSupabase `reminders` 同期
- ホームの水槽選択と、水槽ごとの今日の管理・リマインダー切り替え
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
- PWAショートカットから本番前チェックへ開く導線
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
- PWA実機テストでの水槽変更/4モード/画像カスタムQA補助表示
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
- PWA最終リリース判定の優先順位表示と本番前/レビューJSON書き出し
- モニター参加者へ送る案内文のコピー機能
- モニター参加者へ送る返信テンプレート付き案内文
- モニター配布セットJSONの書き出しと準備チェック
- モニターフィードバック入力への返信テンプレート挿入
- モニター返信テンプレートから端末/画面/分類をフォームへ反映
- モニターフィードバックの参加者数/端末数の回収状況表示
- モニターフィードバックの次対応候補表示とJSONトリアージ
- モニターフィードバックのCSV書き出し
- 今日の管理と今日のリマインダーへのフィルター管理追加
- フィルター管理リマインダーの365日間隔対応
- フィルター掃除ログ後の次回リマインダー起点更新
- ホーム状態カードへのフィルター管理ステータス表示
- ホームのフィルター状態カードから掃除ログを記録する導線
- 前回掃除日の手入力保存によるフィルターリマインダー起点更新

## 次に作るとよいもの

- 本番URLでのPWA実機QAを実データで保存する
- モニター参加者に案内文を送り、未対応フィードバックを0件にする
- PWA最終リリース判定で公開OK、確認者、レビューJSON、クラウド同期を揃える

## 通知配信ワーカー

`netlify/functions/notification-delivery.mts` は15分ごとに `notification_deliveries` を確認するScheduled Functionです。既定では `NOTIFICATION_DELIVERY_DRY_RUN` が有効扱いになり、DB更新や送信は行いません。

## Netlify本番設定チェックリスト

本番公開前にNetlifyで設定する環境変数は、AI分析用、Supabaseサーバー処理用、通知用に分けて確認します。

AI分析:

- `OPENAI_BASE_URL`
- `OPENAI_API_KEY` 任意
- `AI_ANALYSIS_MODEL=gpt-4o-mini`

Supabaseサーバー処理:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

通知配信:

- `NOTIFICATION_DELIVERY_DRY_RUN=true` から開始
- `RESEND_API_KEY` メール通知を使う場合
- `NOTIFICATION_EMAIL_FROM` メール通知を使う場合
- `WEB_PUSH_VAPID_SUBJECT`
- `WEB_PUSH_VAPID_PUBLIC_KEY`
- `WEB_PUSH_VAPID_PRIVATE_KEY`
- `WEB_PUSH_TTL_SECONDS` 任意

設定順:

1. Supabase SQLとStorageを先に確認する。
2. NetlifyにAI分析用の環境変数を入れ、AI画面の「AI API検証」でGateway経路を確認する。
3. `node scripts/generate-vapid-keys.mjs` でVAPID鍵を生成する。
4. 公開鍵を `supabase-config.js` の `AQUANOTE_PUSH_CONFIG.publicKey` に入れ、秘密鍵をNetlifyに入れる。
5. `NOTIFICATION_DELIVERY_DRY_RUN=true` または未設定のまま、通知予約が作られることを確認する。
6. 実機確認の最後に `NOTIFICATION_DELIVERY_DRY_RUN=false` へ切り替える。
7. アカウント画面の「本番前セットアップ」「通知本番チェック」「PWA実機テスト結果」に確認結果を保存する。

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
- HTTPS上でインストールボタンが表示され、ホーム追加とショートカット起動ができることを確認
- オフライン時に `offline.html` が表示されることを確認
- Service Worker更新後に古いキャッシュが削除されることを確認

## PWA本番リハーサル

1. 本番URLをiPhone SafariとAndroid Chromeで開き、ログインと初期表示を確認する。
2. 複数水槽を登録し、ホームの水槽変更で写真、状態カード、今日の管理が切り替わることを確認する。
3. インストールボタンまたはホーム画面追加から保存し、アプリアイコンとPWAショートカットで起動する。
4. 通知許可、Push購読、dry-run予約、dry-run解除後の受信を配信ログで確認する。
5. 機内モードで再読み込みし、キャッシュ画面または `offline.html` が出ることを確認する。
6. ベーシック、かんたん、管理重視、投稿重視モードを切り替え、ホームで主要操作を試す。
   投稿重視モードでは、トップ写真、投稿導線、横スクロールなし、端末の「動きを減らす」設定で過度な動きが止まることも確認します。
7. 背景画像とボタン背面画像を設定し、各モードで文字が読めることを確認する。

アカウント画面の「画像カスタム」では、ユーザーの画像を取り込んでアプリ背景や主要ボタンの背面に反映できます。
画像はローカル状態とJSON書き出しに保存されます。

アカウント画面の「PWA実機テスト結果」には、端末、ブラウザ、確認項目、OK/要確認/NG、メモを保存できます。
記録はローカル状態に保存され、JSONで書き出せます。Supabaseログイン中は `pwa_device_tests` に同期されます。
ログイン、水槽変更、ホーム追加とショートカット、通知受信、オフライン復帰、4モード表示、画像カスタムのOK状況はレビューサマリーで確認できます。
「PWA最終リリース判定」では、公開OK/確認中/保留、実機レビュー状態、結果確認、確認者、本番URL、残タスクを保存できます。Supabaseログイン中は `pwa_release_decisions` に同期されます。
最終実機レビューでは、実機記録、必須項目、NGなし、モニター指摘、公開判断、確認者、クラウド保存の証跡を一覧できます。
JSON書き出しには、必須項目カバレッジ、本番前セットアップ状態、リリース優先順位、最終リリース判定、公開OK保存時の警告、証跡サマリー、実機テスト結果、引き渡しメモ、モニターフィードバック集計が含まれます。
各必須項目の確認観点とメモ例も含まれるため、公開後にどの条件でOKにしたかを見返せます。
Supabase SQL確認、Storage確認、AI Gateway確認、通知確認は本番前セットアップの確認メモに保存でき、PWAレビューJSONにも確認状態として含まれます。
PWA実機テスト前でも、本番前セットアップだけを `aquanote-production-setup-YYYY-MM-DD.json` として書き出せます。書き出しにはモニター版チェック、モニター案内文、返信テンプレート、リリース優先順位、最終リリース判定メモも含まれます。モニター参加者へ渡す内容は `aquanote-monitor-launch-kit-YYYY-MM-DD.json` として別途書き出せます。
リリース優先順位に未完了項目がある場合は次アクションが表示され、すべて揃うと公開前レビュー完了として表示されます。
JSONを書き出すと、書き出し日時が最終リリース判定メモに保存されます。
最終QAでは、本番環境設定、本番URL、実機結果、最終判定、クラウド保存、レビューJSONが揃っているかを確認できます。
モニター感想・不具合メモでは、参加者、端末、画面名、分類、優先度、対応状況、対応日時、対応メモを保存し、未対応の対応順つきでCSV/JSONに書き出せます。

既存のSupabase環境へ反映する場合は、`supabase/migrations/20260603_release_schema_updates.sql` をSQL Editorで実行してください。水槽寸法、フィルター管理、水槽別リマインダー、`pwa_device_tests` と `pwa_release_decisions` のテーブル、インデックス、RLSポリシー、既存 `pwa_release_decisions` の追加カラムも含めて反映します。

公開前レビューの操作順:

1. 本番URLを実機で開き、ログイン、水槽変更、ホーム追加とショートカット、通知受信、オフライン復帰、4モード表示、画像カスタムを確認する。
2. アカウント画面の「PWA実機テスト結果」に端末、ブラウザ、確認項目、結果、メモを保存し、サマリーに出る次の確認項目を埋める。
3. 「PWA最終リリース判定」で優先順位つきの残タスクをメモに入れ、公開OK/確認中/保留、実機レビュー状態、結果確認、確認者、本番URLを保存する。
4. Supabaseログイン中の場合は同期状態を確認する。
5. JSONボタンで `aquanote-pwa-production-review-YYYY-MM-DD.json` を書き出す。

## モニター開始手順

1. アカウント画面の「モニター版チェック」で優先タスクを確認する。
2. PWA最終リリース判定に本番URLを入れてから「配布セットJSON」を書き出し、モニターURL、案内文、返信テンプレートを確認する。
3. 「案内文をコピー」で参加者へ送る文面をコピーし、3人以上に共有する。
4. 返信が来たら「返信テンプレートを入れる」または返信本文を貼り、「返信内容を反映」で端末、画面、分類、優先度を補完する。
5. 未対応、高優先度、不具合/UI指摘を上から確認し、対応済みにしたら対応メモを残す。
6. CSV/JSONを書き出し、モニター中に直す候補と対応済みの証跡を残す。

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
フィルター管理だけを先にSupabase同期する場合は、`supabase/migrations/20260602_add_filter_profile.sql` をSQL Editorで実行し、`tanks.filter_profile` に掃除日、交換目安、流量メモを保存できる状態にしてください。
リリース前の既存Supabase更新では、`supabase/migrations/20260603_release_schema_updates.sql` をSQL Editorで実行してください。水槽寸法 `tanks.dimensions`、フィルター管理 `tanks.filter_profile`、水槽ごとのリマインダー `reminders.tank_id`、水槽変更を含むPWA実機テスト `pwa_device_tests`、最終リリース判定 `pwa_release_decisions` を追加します。

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
