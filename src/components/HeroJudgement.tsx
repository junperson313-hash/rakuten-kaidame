import type { NextBuyCandidate, OverallJudgementLevel, OverallJudgementResult } from "@/types";

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

interface Props {
  result: OverallJudgementResult;
  candidates: NextBuyCandidate[];
  dateLabel: string | null;
}

export default function HeroJudgement({ result, candidates, dateLabel }: Props) {
  const style = LEVEL_STYLE[result.level];

  return (
    <section className={`rounded-2xl p-5 text-center text-white shadow ${style.className}`}>
      {dateLabel && <p className="mb-1 text-xs font-bold opacity-80">{dateLabel}の判定</p>}
      <p className="text-sm font-bold opacity-90">今日、楽天で買いだめするべき？</p>
      <p className="mt-1.5 text-3xl font-extrabold leading-tight">
        {style.emoji} {style.label}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed opacity-95">{result.reason}</p>
      {result.level === "wait" && candidates.length > 0 && (
        <div className="mt-3 rounded-xl bg-white/15 px-3 py-2 text-left text-sm">
          <p className="font-bold">📅 次の買い時候補</p>
          <ul className="mt-1 space-y-0.5">
            {candidates.map((c) => (
              <li key={`${c.label}-${c.dateLabel}`}>
                ・{c.dateLabel}：{c.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
