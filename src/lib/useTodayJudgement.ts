"use client";

import { useSyncExternalStore } from "react";
import { rakutenCampaigns } from "@/data/rakuten-events";
import { computeOverallJudgement, getNextBuyCandidates } from "@/lib/judgementEngine";
import { formatJstFullDateLabel } from "@/lib/date";
import type { NextBuyCandidate, OverallJudgementResult } from "@/types";

interface TodayJudgementState {
  result: OverallJudgementResult;
  candidates: NextBuyCandidate[];
  dateLabel: string | null;
}

// このページは静的に生成されるため、ビルド時刻をそのまま「今日」として使うと日付がズレる。
// そのため実際の日付を使った判定はクライアントでのスナップショット取得時にのみ計算する。
// サーバー側(ビルド時)は「不明な場合は買いと判定しない」という安全側のデフォルトを返す。
const SAFE_DEFAULT_STATE: TodayJudgementState = {
  result: {
    level: "depends",
    reason: "情報を確認しています。少しお待ちください。",
    isGotobi: false,
    isKanshaDay: false,
    activeCampaigns: [],
  },
  candidates: [],
  dateLabel: null,
};

let cachedSnapshot: TodayJudgementState | null = null;

function subscribe(): () => void {
  return () => {};
}

function getSnapshot(): TodayJudgementState {
  if (!cachedSnapshot) {
    const now = new Date();
    cachedSnapshot = {
      result: computeOverallJudgement(now, rakutenCampaigns),
      candidates: getNextBuyCandidates(now, rakutenCampaigns),
      dateLabel: formatJstFullDateLabel(now),
    };
  }
  return cachedSnapshot;
}

function getServerSnapshot(): TodayJudgementState {
  return SAFE_DEFAULT_STATE;
}

export function useTodayJudgement(): TodayJudgementState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
