import type { RakutenCampaign } from "@/types";

// 期間限定キャンペーン(お買い物マラソン・スーパーSALE・ブラックフライデー等)をここに追加・削除する。
//
// 重要:
// - verified: true のものだけが「今日の楽天イベント」「今日の総合判定」に反映される。
// - 開催期間が未確定・未確認の場合は登録しない、または確認が取れるまで verified: false のままにする。
// - start / end は日本時間(+09:00)のISO8601で指定する。
// - 期間外になったキャンペーンは自動的に「開催中」から除外される(削除は任意)。
//
// 存在しないキャンペーンを「開催中」と表示するより、何も表示しない方を優先すること。
export const rakutenCampaigns: RakutenCampaign[] = [
  // 例（このまま本番データとして使わないこと。開催が確認できたら実際の日時に置き換えて追加する）:
  // {
  //   id: "shopping-marathon-202609",
  //   name: "お買い物マラソン",
  //   start: "2026-09-04T20:00:00+09:00",
  //   end: "2026-09-11T01:59:59+09:00",
  //   verified: true,
  //   officialUrl: "https://event.rakuten.co.jp/marathon/",
  //   description: "ショップ買いまわりでポイントアップ",
  // },
];

// キャンペーン情報を最後に確認・更新した日付（手動更新）
export const eventsLastUpdated = "2026-08-17";
