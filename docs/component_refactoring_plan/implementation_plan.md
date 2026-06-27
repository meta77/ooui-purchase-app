# コンポーネント設計改善計画

## 目的 (Goal)
現状の「各画面が単一の巨大コンポーネント（Fat Component）になっている状態」を解消し、コンポーネントの再利用性を高めることで、保守性、変更容易性、およびテスト容易性を向上させる。

## 課題分析
`PurchaseList.vue` などの現状のソースコードを分析した結果、以下の課題が確認されました。

### 1. 保守性 (Maintainability) の課題
* **コードの重複**: ボタン、カードレイアウト、アイコン、データフォーマットなどの共通するUI要素が各画面でハードコードされています。
* **認知負荷**: 1つのファイルにHTML、CSS（Tailwindクラス）、ロジックが混在し、ファイルが肥大化傾向にあります。

### 2. 変更容易性 (Modifiability) の課題
* **修正コストの増大**: 例えば「すべてのリスト表示のカードの角丸（`rounded-2xl`）を変更したい」場合、影響箇所を全体から検索し、個別に修正する必要があります。
* **一貫性の欠如**: 手動でのコピペ修正が主となるため、UIデザインや挙動のばらつき（デグレード）が発生しやすくなります。

### 3. テスト設計 (Testability) の課題
* **テスト境界の曖昧さ**: ルーティング、UI描画、データのフォーマットが密結合しているため、「UIのみ」や「ロジックのみ」を切り出した単体テストが困難です。

---

## 改善計画（提案する変更）

これらの課題を解決するため、以下のステップでリファクタリングを実施することを提案します。

### Step 1: 共通UIコンポーネント（Presentation Components）の抽出
アプリケーション全体で使い回す汎用的なUI部品を `src/components/ui/` に切り出します。これにより、デザインの変更を一箇所で管理できるようになります。

* **新規作成するファイル例**:
  * `[NEW] src/components/ui/BaseButton.vue` (汎用ボタン)
  * `[NEW] src/components/ui/BaseCard.vue` (リストなどで使うカードレイアウト)
  * `[NEW] src/components/ui/BaseIcon.vue` (SVGアイコン管理)

### Step 2: ドメイン依存コンポーネントの切り出し
画面（View）から、特定のドメイン（仕入れ、商品など）に依存するが、再利用可能な表示部品を `src/components/domain/` に切り出します。

* **新規作成するファイル例**:
  * `[NEW] src/components/domain/purchase/PurchaseListItem.vue` (PurchaseListの1行分)
  * `[NEW] src/components/domain/product/ProductListItem.vue`

### Step 3: View コンポーネントの責務の明確化
`src/views/` 配下のコンポーネントは、ルーティングの受け皿およびデータの取得・配信（状態のバインディング）のみを担当する「Container Component」として再構築します。

* **修正するファイル例**:
  * `[MODIFY] src/views/PurchaseList.vue`
  * `[MODIFY] src/views/ProductList.vue`
  * ※各Viewは `BaseCard` や `PurchaseListItem` などのコンポーネントをインポートし、`Props` でデータを渡す形に変更します。

---

## User Review Required

> [!IMPORTANT]
> 上記の設計方針（コンポーネントの3層構造：UI共通部品、ドメイン部品、Viewコンテナ）で進めてよろしいでしょうか？
> この方針に沿って進める場合、まずは `PurchaseList.vue` と `ProductList.vue` を対象として、Step 1 と Step 2 の切り出しを試験的に実装（PoC）することを提案します。

## 完了条件と検証方法 (Verification Plan)
1. 提案したコンポーネント構造が実装され、`npm run analyze` コマンドで生成される `vue-analyzer.html` のネットワーク図において、親子間の依存関係（利用関係とPropsの受け渡し）が正しく可視化されること。
2. 画面の見た目や挙動（ルーティングなど）がリファクタリング前と変わらず動作すること。
