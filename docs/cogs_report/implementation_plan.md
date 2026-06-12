# 売上原価（レポート）機能の追加

## 概要
年度ごとの売上原価（Cost of Goods Sold: COGS）を確認できる「レポート」機能を追加する。
売上原価は「前期末の棚卸高 ＋ 今期の仕入れ高 － 今期末の棚卸高」で算出される。

## User Review Required
* 特に破壊的変更はありません。既存の `mockData.js` のデータを利用して算出します。

## Open Questions
* 特になし。

## Proposed Changes

### データアクセス層

#### [MODIFY] mockData.js
* **追加**: `getReports()` 関数
  * 既存の `purchases`（仕入）と `inventories`（棚卸）から存在する年度を抽出し、各年度の「前期末棚卸高」「当期仕入高」「当期末棚卸高」「売上原価」を算出する。
* **追加**: `getReportDetails(year)` 関数
  * 特定年度の売上原価算出の根拠となる詳細数値を取得する。

---

### ルーティング

#### [MODIFY] router.js
* **追加**: `/reports` -> `ReportList.vue` (レポート一覧)
* **追加**: `/reports/:year` -> `ReportDetail.vue` (レポート詳細)

---

### ユーザーインターフェース (UI)

#### [MODIFY] AppLayout.vue
* ナビゲーションメニュー（ヘッダー）に「レポート」へのリンク（`<router-link to="/reports">`）を追加する。

#### [NEW] ReportList.vue
* 年度ごとの売上原価を一覧表示する画面。
* 各行をクリックすると、その年度の詳細画面（`ReportDetail.vue`）へ遷移する。

#### [NEW] ReportDetail.vue
* 選択した年度の売上原価の計算過程を視覚的に分かりやすく表示する画面。
* 表示項目:
  * 前期末の棚卸高
  * 今期の仕入れ高
  * 今期末の棚卸高
  * 売上原価（計算結果）
* 計算式がUI上で直感的に理解できるデザイン（カードや＋/－の記号を用いたレイアウト）を適用する。

## Verification Plan

### Manual Verification
1. ローカル開発サーバーを起動する。
2. ナビゲーションメニューから「レポート」をクリックし、一覧画面が正しく表示されるか確認する。
3. 一覧から特定の年度を選択し、詳細画面で「前期末棚卸高 ＋ 今期仕入高 － 今期末棚卸高 ＝ 売上原価」の計算結果が `mockData.js` の内容と一致しているか確認する。
