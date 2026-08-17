import type { JudgementLevel, OverallJudgementLevel, ProductPriority } from "@/types";

// 商品の本来の買いだめ向き度(priority)と、その日の総合判定(overall)を掛け合わせて
// 実際に表示する判定(JudgementLevel)を決める。総合判定が "wait" のときに
// "buy_today" の商品が出てこないようにするための対応表。
const MATRIX: Record<OverallJudgementLevel, Record<ProductPriority, JudgementLevel>> = {
  buy: { high: "buy_today", medium: "ok", low: "depends" },
  depends: { high: "ok", medium: "depends", low: "depends" },
  wait: { high: "depends", medium: "wait", low: "wait" },
};

export function getProductJudgement(
  priority: ProductPriority,
  overall: OverallJudgementLevel,
): JudgementLevel {
  return MATRIX[overall][priority];
}
