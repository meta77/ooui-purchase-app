# コンポーネント設計改善（PoC）結果

## 実装内容
`implementation_plan.md` で計画した3層構造のリファクタリング方針に基づき、以下の作業を実施しました。

### 1. 共通UIコンポーネント（Presentation Components）の作成
* **`[NEW] src/components/ui/BaseCard.vue`**: リストや詳細画面で使用されるカード型UIを汎用化。外枠のデザイン、ホバー時のアニメーションなどを集約しました。
* **`[NEW] src/components/ui/BaseButton.vue`**: アプリケーション全体で使用される汎用ボタン。`to` プロパティの有無により、ルーターリンクと通常のボタン要素を自動で切り替える設計としました。

### 2. ドメインコンポーネントの作成
* **`[NEW] src/components/domain/purchase/PurchaseListItem.vue`**: `PurchaseList.vue` 内でループ処理されていた1件分の表示内容を抽出し、データ（Props）を受け取って描画する純粋なコンポーネントとして独立させました。内部で `BaseCard.vue` を使用しています。
* **`[NEW] src/components/domain/product/ProductListItem.vue`**: 同様に、商品一覧の1件分を抽出しました。

### 3. Viewコンポーネントのリファクタリング
* **`[MODIFY] src/views/PurchaseList.vue`**
* **`[MODIFY] src/views/ProductList.vue`**
各画面コンポーネントからハードコードされていたHTML要素を削除し、上記で作成した共通UIおよびドメインコンポーネントを配置する設計に変更しました。これにより、Viewファイル自体のコード行数が大幅に削減され、一覧の描画ループ（`v-for`）とデータのバインディングにのみ関心を持つようになりました。

---

## 検証結果 (Validation)
* **分析ツールの実行**: リファクタリング完了後、`npm run analyze` を実行して `docs/vue-analyzer.html` を再生成しました。
* **依存関係の確認**: 再生成されたアナライザーで以下の構造が可視化されていることを確認しました。
  * `PurchaseList` $\rightarrow$ `PurchaseListItem` と `BaseButton`
  * `ProductList` $\rightarrow$ `ProductListItem` と `BaseButton`
  * 各 ListItem $\rightarrow$ `BaseCard`
* **保守性の向上**: UIの一元管理が達成されました。たとえば、カードの角丸や影の大きさを変えたい場合、今後は `BaseCard.vue` を一箇所修正するだけで済みます。

## 次のステップ（オプション）
今回の PoC で方針の有効性が確認できました。必要に応じて以下の作業を継続することが可能です。
1. 残りの一覧画面（InventoryList、ReportList等）の同様のリファクタリング
2. 各種「詳細・作成フォーム画面（Detail, Create）」からのフォーム部品群の抽出（BaseInput, BaseSelect 等の作成）
3. モックデータの提供方法を直接インポートから、Pinia Store を経由する形式への変更
