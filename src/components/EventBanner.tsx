import { eventsLastUpdated, kanshaDayInfo, wonderfulDayInfo } from "@/data/rakuten-events";
import type { OverallJudgementResult } from "@/types";

interface Props {
  result: OverallJudgementResult;
}

export default function EventBanner({ result }: Props) {
  const hasAnything =
    result.activeCampaigns.length > 0 ||
    result.isGotobi ||
    result.isKanshaDay ||
    result.isWonderfulDay;

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-red-700">今日の楽天イベント</h2>
        <span className="shrink-0 text-[11px] text-gray-400">情報更新：{eventsLastUpdated}</span>
      </div>

      {hasAnything ? (
        <ul className="space-y-2.5">
          {result.activeCampaigns.map((c) => (
            <li key={c.id} className="text-base font-medium text-gray-800">
              🔥 {c.name}開催中
              {c.description && <span className="text-sm text-gray-600">：{c.description}</span>}
              {c.officialUrl && (
                <a
                  href={c.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-sm text-red-600 underline"
                >
                  公式ページ
                </a>
              )}
            </li>
          ))}
          {result.isGotobi && (
            <li className="text-base font-medium text-gray-800">⭐ 5と0のつく日</li>
          )}
          {result.isWonderfulDay && (
            <li className="text-base text-gray-800">
              <span className="font-medium">🎁 {wonderfulDayInfo.name}</span>
              <p className="mt-0.5 text-sm text-gray-600">
                {wonderfulDayInfo.conditionSummary}
                <a
                  href={wonderfulDayInfo.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-red-600 underline"
                >
                  公式ページ
                </a>
              </p>
            </li>
          )}
          {result.isKanshaDay && (
            <li className="text-base text-gray-800">
              <span className="font-medium">💳 {kanshaDayInfo.name}</span>
              <p className="mt-0.5 text-sm text-gray-600">
                {kanshaDayInfo.conditionSummary}
                <a
                  href={kanshaDayInfo.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-red-600 underline"
                >
                  公式ページ
                </a>
              </p>
            </li>
          )}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">現在確認できる大型キャンペーンはありません。</p>
      )}
    </section>
  );
}
