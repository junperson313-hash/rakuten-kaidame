import { todaysOverallJudgement } from "@/data/events";
import type { OverallJudgementLevel } from "@/types";

const LEVEL_STYLE: Record<
  OverallJudgementLevel,
  { emoji: string; label: string; className: string }
> = {
  buy: {
    emoji: "🔴",
    label: "今日買うべき",
    className: "bg-red-600",
  },
  depends: {
    emoji: "🟡",
    label: "条件次第",
    className: "bg-amber-500",
  },
  wait: {
    emoji: "🔵",
    label: "今日は待ち",
    className: "bg-blue-600",
  },
};

export default function HeroJudgement() {
  const { level, reason, nextBuyHint } = todaysOverallJudgement;
  const style = LEVEL_STYLE[level];

  return (
    <section className={`rounded-2xl p-5 text-center text-white shadow ${style.className}`}>
      <p className="text-sm font-bold opacity-90">今日、楽天で買いだめするべき？</p>
      <p className="mt-1.5 text-3xl font-extrabold leading-tight">
        {style.emoji} {style.label}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed opacity-95">{reason}</p>
      {level === "wait" && nextBuyHint && (
        <p className="mt-3 rounded-xl bg-white/15 px-3 py-2 text-sm font-bold">
          📅 次の買い時：{nextBuyHint}
        </p>
      )}
    </section>
  );
}
