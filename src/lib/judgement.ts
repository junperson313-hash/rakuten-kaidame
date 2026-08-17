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

interface CompactJudgementInfo {
  label: string;
  icon: string;
  cardClass: string;
}

// カテゴリ一覧などスペースが限られる場所向けの3段階表示（買い / 条件次第 / 待ち）。
// アイコン・文字・色の3つで判定できるようにし、色だけに依存しないようにしている。
export function compactJudgement(level: JudgementLevel): CompactJudgementInfo {
  if (level === "buy_today" || level === "ok") {
    return {
      label: "買い",
      icon: "✅",
      cardClass: "border-red-200 bg-red-50 text-red-700",
    };
  }
  if (level === "depends") {
    return {
      label: "条件次第",
      icon: "⚠️",
      cardClass: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }
  return {
    label: "待ち",
    icon: "⏸️",
    cardClass: "border-blue-200 bg-blue-50 text-blue-700",
  };
}
