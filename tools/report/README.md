# 月次レポート生成ツール

データ(JSON) → 1枚の自己完結HTML（スマホ/PC/印刷対応）。クライアントにはHTMLかPDF（ブラウザで印刷→PDF保存）をLINEで送る。

- 見本: `node tools/report/generate.mjs tools/report/sample-data.json`
- 本番運用（予定）: クライアントごとに `clients/<名前>.json`（GA4プロパティID・Search ConsoleのURL・目標値・手入力の数字）を置き、取得スクリプトがGA4/Search Console APIから自動で埋める → generate.mjs でHTML化
- 手入力項目（✍印）: 友だち追加・無料相談・体験・入会・生徒数（LINE公式の管理画面などから月1回）
- このフォルダはサイトのビルド対象外（src外）。鍵ファイル(service-account.json)は置かない・コミットしない
