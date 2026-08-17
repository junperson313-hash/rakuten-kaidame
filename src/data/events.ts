import type { RakutenEvent } from "@/types";

// MVP段階では手動更新。将来的に楽天のイベントAPI/スクレイピング結果に差し替える想定。
export const todaysEvents: RakutenEvent[] = [
  { emoji: "🔥", title: "お買い物マラソン開催中" },
  { emoji: "⭐", title: "5と0のつく日" },
  { emoji: "💰", title: "ポイント最大10倍" },
];
