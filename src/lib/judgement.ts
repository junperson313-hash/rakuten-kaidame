import type { JudgementLevel } from "@/types";

interface JudgementInfo {
  label: string;
  emoji: string;
  badgeClass: string;
  bannerClass: string;
}

export const judgementMap: Record<JudgementLevel, JudgementInfo> = {
  buy_today: {
    label: "今日買い",
    emoji: "🔥",
    badgeClass: "bg-red-100 text-red-700 border-red-300",
    bannerClass: "bg-red-600 text-white",
  },
  ok: {
    label: "買ってOK",
    emoji: "○",
    badgeClass: "bg-green-100 text-green-700 border-green-300",
    bannerClass: "bg-green-600 text-white",
  },
  depends: {
    label: "価格次第",
    emoji: "△",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-300",
    bannerClass: "bg-amber-500 text-white",
  },
  wait: {
    label: "今日は待ち",
    emoji: "⏳",
    badgeClass: "bg-gray-100 text-gray-600 border-gray-300",
    bannerClass: "bg-gray-500 text-white",
  },
};

export function stars(score: number): string {
  const filled = "★".repeat(score);
  const empty = "☆".repeat(5 - score);
  return filled + empty;
}
