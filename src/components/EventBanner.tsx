import { eventsLastUpdated } from "@/data/rakuten-events";
import type { OverallJudgementResult } from "@/types";

interface Props {
  result: OverallJudgementResult;
}

export default function EventBanner({ result }: Props) {
  const hasAnything = result.activeCampaigns.length > 0 || result.isGotobi || result.isKanshaDay;

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-red-700">今日の楽天イベント</h2>
        <span className="shrink-0 text-[11px] text-gray-400">情報更新：{eventsLastUpdated}</span>
      </div>

      {hasAnything ? (
        <ul className="space-y-1.5">
          {result.activeCampaigns.map((c) => (
            <li key={c.id} className="text-base font-medium text-gray-800">
              🔥 {c.name}開催中
              {c.description && <span className="text-sm text-gray-600">：{c.description}</span>}
            </li>
          ))}
          {result.isGotobi && (
            <li className="text-base font-medium text-gray-800">⭐ 5と0のつく日</li>
          )}
          {result.isKanshaDay && (
            <li className="text-base font-medium text-gray-800">
              💳 ご愛顧感謝デー
              <span className="text-sm text-gray-600">：対象会員はキャンペーン条件を確認してください</span>
            </li>
          )}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">現在確認できる大型キャンペーンはありません。</p>
      )}
    </section>
  );
}
