import type { OverallJudgement, RakutenEvent } from "@/types";

// MVP段階では手動更新。将来的に楽天のイベントAPI/スクレイピング結果に差し替える想定。
export const todaysEvents: RakutenEvent[] = [
  { emoji: "🔥", title: "お買い物マラソン開催中" },
  { emoji: "⭐", title: "5と0のつく日" },
  { emoji: "💰", title: "ポイント最大10倍" },
];

// トップに表示する「今日、買いだめすべきか」の総合判定。
// todaysEvents の内容と連動させて手動で更新する。次の5と0のつく日・イベント終了日が
// 分かっている場合は nextBuyHint に入れておくと「待ち」判定のときに案内できる。
export const todaysOverallJudgement: OverallJudgement = {
  level: "buy",
  reason:
    "5と0のつく日＋お買い物マラソン開催中。ポイント倍率も上がっているので、日用品のまとめ買いに向いています。",
  nextBuyHint: "次の5と0のつく日、またはお買い物マラソン開催日まで待つのがおすすめ",
};
