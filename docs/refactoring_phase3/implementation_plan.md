# コンポーネント設計改善計画（フェーズ3）

## 目的 (Goal)
フェーズ2に続き、商品・棚卸し・報告書に関連する画面群のリファクタリングを実施します。
UI部品の共通化、ドメイン特有コンポーネントの抽出、および Composable を用いたビジネスロジックの分離を行うことで、コードの可読性、変更容易性、テスト容易性をさらに向上させます。

## 対象コンポーネント
* **商品 (Product)**: [ProductCreate.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ProductCreate.vue), [ProductDetail.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ProductDetail.vue)
* **棚卸し (Inventory)**: [InventoryDetail.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/InventoryDetail.vue), [InventoryList.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/InventoryList.vue)
* **報告書 (Report)**: [ReportDetail.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ReportDetail.vue), [ReportList.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ReportList.vue)

---

## 提案する変更内容

### 1. 共通UIコンポーネントの適用
既存の共通コンポーネント（`BaseBackLink`, `BaseSection`, `BaseInput` など）を上記対象画面に適用し、ベタ書きされているマークアップを置き換えます。

### 2. ドメイン特有コンポーネントの抽出
各画面のリスト要素や行要素をコンポーネントとして抽出します。

* **[NEW] `src/components/domain/product/ProductPurchaseHistoryRow.vue`**: `ProductDetail.vue` 内の購入履歴の各行。
* **[NEW] `src/components/domain/product/ProductInventoryHistoryRow.vue`**: `ProductDetail.vue` 内の棚卸し履歴の各行。
* **[NEW] `src/components/domain/inventory/InventoryItemRow.vue`**: `InventoryDetail.vue` 内の棚卸し明細データの各行。
* **[NEW] `src/components/domain/inventory/InventoryListCard.vue`**: `InventoryList.vue` 内の各棚卸しカード。
* **[NEW] `src/components/domain/report/ReportListCard.vue`**: `ReportList.vue` 内の各報告書カード。

### 3. ロジックの抽出（Composable）
* **[NEW] `src/composables/useProductForm.js`**:
  `ProductCreate.vue` の入力フォーム状態（`name`, `price`）および保存時のバリデーション・API呼び出しロジックを切り出します。

---

## 変更対象ファイル詳細

### 商品 (Product)
* **[MODIFY] [ProductCreate.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ProductCreate.vue)**: `BaseBackLink`, `BaseSection`, `BaseInput` を適用し、`useProductForm` を導入。
* **[MODIFY] [ProductDetail.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ProductDetail.vue)**: `BaseBackLink`, `BaseSection` を適用し、各履歴の行をコンポーネント化。
* **[NEW] `src/components/domain/product/ProductPurchaseHistoryRow.vue`**
* **[NEW] `src/components/domain/product/ProductInventoryHistoryRow.vue`**
* **[NEW] `src/composables/useProductForm.js`**

### 棚卸し (Inventory)
* **[MODIFY] [InventoryDetail.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/InventoryDetail.vue)**: `BaseBackLink`, `BaseSection` を適用し、明細行をコンポーネント化。
* **[MODIFY] [InventoryList.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/InventoryList.vue)**: 各棚卸しカードをコンポーネント化。
* **[NEW] `src/components/domain/inventory/InventoryItemRow.vue`**
* **[NEW] `src/components/domain/inventory/InventoryListCard.vue`**

### 報告書 (Report)
* **[MODIFY] [ReportDetail.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ReportDetail.vue)**: `BaseBackLink`, `BaseSection` を適用。
* **[MODIFY] [ReportList.vue](file:///Users/horokusa/%E6%98%8E%E7%B4%B0%E3%80%80%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91UI/src/views/ReportList.vue)**: 各報告書カードをコンポーネント化。
* **[NEW] `src/components/domain/report/ReportListCard.vue`**

---

## 検証計画 (Verification Plan)
1. **動作確認**:
   - 各画面のレイアウト崩れがないこと。
   - データの取得・表示、および商品の新規登録が正常に行えること。
2. **分析**:
   - `npm run analyze` コマンドで依存関係の可視化が正しく更新されること。
3. **自動テスト**:
   - 既存のテストスクリプト（もしあれば）がパスすること。
