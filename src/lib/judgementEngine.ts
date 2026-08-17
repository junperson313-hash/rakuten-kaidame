import type { NextBuyCandidate, OverallJudgementResult, RakutenCampaign } from "@/types";
import {
  formatJstShortDateLabel,
  getJstParts,
  getNextGotobiDate,
  isGotobiDay,
  jstDateToInstant,
} from "@/lib/date";

const KANSHA_DAY = 18; // 毎月18日: ご愛顧感謝デー(会員ランク等の条件付き)

export function getActiveCampaigns(campaigns: RakutenCampaign[], now: Date): RakutenCampaign[] {
  const time = now.getTime();
  return campaigns.filter(
    (c) => c.verified && new Date(c.start).getTime() <= time && time <= new Date(c.end).getTime(),
  );
}

// 「今日、買いだめすべきか」の総合判定。
// 確認できていない情報からは「買い」と判定しない(不明な場合は depends/wait 側に倒す)。
export function computeOverallJudgement(
  now: Date,
  campaigns: RakutenCampaign[],
): OverallJudgementResult {
  const { day } = getJstParts(now);
  const isGotobi = isGotobiDay(day);
  const isKanshaDay = day === KANSHA_DAY;
  const activeCampaigns = getActiveCampaigns(campaigns, now);
  const campaignNames = activeCampaigns.map((c) => c.name).join("・");

  if (activeCampaigns.length > 0 && isGotobi) {
    return {
      level: "buy",
      reason: `${campaignNames}開催中で、5と0のつく日とも重なっています。ポイント倍率が上がりやすいタイミングです。`,
      isGotobi,
      isKanshaDay,
      activeCampaigns,
    };
  }

  if (activeCampaigns.length > 0) {
    return {
      level: "depends",
      reason: `${campaignNames}開催中です。他の条件と重なっていないため、ポイント条件を確認してから購入しましょう。`,
      isGotobi,
      isKanshaDay,
      activeCampaigns,
    };
  }

  if (isGotobi) {
    return {
      level: "depends",
      reason:
        "5と0のつく日です。大型キャンペーンとの重なりは確認できていないため、ポイント条件を確認してから購入しましょう。",
      isGotobi,
      isKanshaDay,
      activeCampaigns,
    };
  }

  if (isKanshaDay) {
    return {
      level: "depends",
      reason: "今日はご愛顧感謝デー。対象会員はキャンペーン条件を確認してください。",
      isGotobi,
      isKanshaDay,
      activeCampaigns,
    };
  }

  return {
    level: "wait",
    reason: "現在確認できているポイントアップイベントは特にありません。急ぎでなければ次の買い時まで待つのがおすすめです。",
    isGotobi,
    isKanshaDay,
    activeCampaigns,
  };
}

// 次の買い時候補を最大 max 件返す(5と0のつく日 + 開催予定の確認済みキャンペーン)。
export function getNextBuyCandidates(
  now: Date,
  campaigns: RakutenCampaign[],
  max = 3,
): NextBuyCandidate[] {
  const { year, month, day } = getJstParts(now);
  const nextGotobi = getNextGotobiDate({ year, month, day });
  const nextGotobiInstant = jstDateToInstant(nextGotobi.year, nextGotobi.month, nextGotobi.day);

  const entries: { time: number; label: string; dateLabel: string }[] = [
    {
      time: nextGotobiInstant.getTime(),
      label: "5と0のつく日",
      dateLabel: `${nextGotobi.month}月${nextGotobi.day}日`,
    },
  ];

  campaigns
    .filter((c) => c.verified && new Date(c.start).getTime() > now.getTime())
    .forEach((c) => {
      const start = new Date(c.start);
      entries.push({
        time: start.getTime(),
        label: c.name,
        dateLabel: formatJstShortDateLabel(start),
      });
    });

  return entries
    .sort((a, b) => a.time - b.time)
    .slice(0, max)
    .map(({ label, dateLabel }) => ({ label, dateLabel }));
}
