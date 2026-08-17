import type { Category } from "@/types";

// カテゴリを増やす場合はここに追加するだけでフィルターにも反映される。
export const categories: Category[] = [
  { id: "toilet-paper", name: "トイレットペーパー", icon: "🧻" },
  { id: "tissue", name: "ティッシュ", icon: "📦" },
  { id: "laundry-detergent", name: "洗濯洗剤", icon: "🧴" },
  { id: "dish-detergent", name: "食器用洗剤", icon: "🧽" },
  { id: "shampoo", name: "シャンプー", icon: "🧴" },
  { id: "body-soap", name: "ボディソープ", icon: "🧼" },
  { id: "water", name: "水", icon: "💧" },
  { id: "rice", name: "お米", icon: "🍚" },
  { id: "diaper", name: "おむつ", icon: "👶" },
  { id: "pet", name: "ペット用品", icon: "🐾" },
  { id: "snacks", name: "お菓子", icon: "🍪" },
  { id: "coffee", name: "コーヒー", icon: "☕" },
  { id: "alcohol", name: "お酒", icon: "🍶" },
  { id: "wine", name: "ワイン", icon: "🍷" },
];
