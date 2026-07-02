# その他のコンポーネントの分析と改善計画（フェーズ2）

## 対象コンポーネント
* **詳細画面 (Detail)**: `PurchaseDetail.vue`, `ProductDetail.vue`, `InventoryDetail.vue`, `ReportDetail.vue`
* **作成画面 (Create/Form)**: `PurchaseCreate.vue`, `ProductCreate.vue`
* **一覧画面 (List)**: `InventoryList.vue`, `ReportList.vue`
* **その他**: `Settings.vue`, `AppLayout.vue`

---

## 課題分析

### 1. 保守性 (Maintainability) の課題
* **詳細画面の構造の重複**: 「戻るリンク」「ヘッダー情報（IDや金額の強調表示）」「関連データの一覧（購入履歴や構成商品など）」という3つのセクション構造が、すべての Detail コンポーネントにコピー＆ペーストで実装されています。
* **フォーム画面のマークアップの重複**: `PurchaseCreate.vue` 等にある `<input>` や `<select>`、`<label>` のデザインクラス（Tailwind）が毎回ベタ書きされており、記述が冗長になっています。

### 2. 変更容易性 (Modifiability) の課題
* **UIデザインの一貫性維持が困難**: 入力フォームのフォーカス時の色（リングの色）や、セクションごとの境界線（ボーダー）の色を変更する際、全画面のフォームと詳細画面を一つずつ修正しなければならず、変更の手間と漏れのリスクがあります。

### 3. テスト設計 (Testability) の課題
* **ビジネスロジックの密結合**: `PurchaseCreate.vue` の「明細行の追加・削除機能（`addItem`, `removeItem`）」や「選択可能な商品のフィルタリング（`getAvailableProducts`）」といった純粋なロジックが、UIコンポーネント（Vue）の中に直接書かれています。これにより、このロジックだけを単体テストすることが難しくなっています。
* **ルーティングへの直接依存**: `const route = useRoute(); getPurchaseDetails(route.params.id)` といった形で、コンポーネントがルーター（URLパラメータ）に直接依存しているため、テスト時にルーターのモックが必要になります。

---

## 改善計画（提案する変更）

### Step 1: 共通UIコンポーネントの拡充（Form / Layout）
既存の `BaseCard`、`BaseButton` に加え、詳細画面や入力画面で頻出するUI部品を共通化します。

* **新規作成するファイル例**:
  * `[NEW] src/components/ui/BaseBackLink.vue` (一覧へ戻るリンク)
  * `[NEW] src/components/ui/BaseSection.vue` (詳細画面の各ブロックを囲う白背景パネル)
  * `[NEW] src/components/ui/form/BaseInput.vue` (共通スタイルを当てた入力欄)
  * `[NEW] src/components/ui/form/BaseSelect.vue` (共通スタイルを当てたセレクトボックス)

### Step 2: ドメイン特有部品の抽出（Detail / Form用）
詳細画面のテーブル行や、作成画面の明細入力行をコンポーネントとして切り出します。

* **新規作成するファイル例**:
  * `[NEW] src/components/domain/purchase/PurchaseItemRow.vue` (詳細画面の1行)
  * `[NEW] src/components/domain/purchase/PurchaseItemFormRow.vue` (作成画面の明細追加行)

### Step 3: ロジックの抽出（Composablesの導入）
状態管理とビジネスロジックをコンポーネントから切り離し、単体テストが可能な形（Composable）にリファクタリングします。

* **新規作成するファイル例**:
  * `[NEW] src/composables/usePurchaseForm.js`
    * ここに `addItem`, `removeItem`, `getAvailableProducts` などのロジックと状態（`selectedItems`）を移譲し、コンポーネントはそれを呼び出すだけにします。

---

## User Review Required

> [!IMPORTANT]
> 上記の分析と改善方針（フォーム部品の共通化、Composablesによるロジックの分離）でよろしいでしょうか？
> この方針に沿って進める場合、影響範囲が大きいため、まずは **`PurchaseCreate.vue`（フォーム画面）** と **`PurchaseDetail.vue`（詳細画面）** に絞って、Step 1〜3 を実施することを提案します。

## 完了条件と検証方法 (Verification Plan)
1. 提案したコンポーネントとComposableが実装され、`PurchaseCreate.vue` と `PurchaseDetail.vue` のコード行数が削減されること。
2. 画面の見た目やフォームの挙動（明細の追加・削除、保存）がリファクタリング前と変わらず動作すること。
3. `npm run analyze` によって、新たに作成した部品やComposableへの依存関係がネットワーク図上で正しく可視化されること。
