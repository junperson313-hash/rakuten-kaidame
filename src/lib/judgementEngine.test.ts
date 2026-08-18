import { describe, expect, it } from "vitest";
import { jstDateToInstant } from "./date";
import { computeOverallJudgement, getActiveCampaigns, getNextBuyCandidates } from "./judgementEngine";
import type { RakutenCampaign } from "@/types";

const NO_CAMPAIGNS: RakutenCampaign[] = [];

function jst(year: number, month: number, day: number): Date {
  return jstDateToInstant(year, month, day);
}

describe("computeOverallJudgement（確認済みキャンペーン未登録時）", () => {
  const cases: {
    label: string;
    date: [number, number, number];
    expectGotobi: boolean;
    expectKansha: boolean;
    expectWonderful: boolean;
    expectLevel: "buy" | "depends" | "wait";
  }[] = [
    { label: "8/17", date: [2026, 8, 17], expectGotobi: false, expectKansha: false, expectWonderful: false, expectLevel: "wait" },
    { label: "8/18", date: [2026, 8, 18], expectGotobi: false, expectKansha: true, expectWonderful: false, expectLevel: "depends" },
    { label: "8/20", date: [2026, 8, 20], expectGotobi: true, expectKansha: false, expectWonderful: false, expectLevel: "depends" },
    { label: "8/25", date: [2026, 8, 25], expectGotobi: true, expectKansha: false, expectWonderful: false, expectLevel: "depends" },
    { label: "8/30", date: [2026, 8, 30], expectGotobi: true, expectKansha: false, expectWonderful: false, expectLevel: "depends" },
    { label: "8/31", date: [2026, 8, 31], expectGotobi: false, expectKansha: false, expectWonderful: false, expectLevel: "wait" },
    { label: "9/1", date: [2026, 9, 1], expectGotobi: false, expectKansha: false, expectWonderful: true, expectLevel: "depends" },
    { label: "9/2", date: [2026, 9, 2], expectGotobi: false, expectKansha: false, expectWonderful: false, expectLevel: "wait" },
    { label: "9/5", date: [2026, 9, 5], expectGotobi: true, expectKansha: false, expectWonderful: false, expectLevel: "depends" },
  ];

  for (const c of cases) {
    it(`${c.label} を正しく判定する`, () => {
      const result = computeOverallJudgement(jst(...c.date), NO_CAMPAIGNS);
      expect(result.isGotobi).toBe(c.expectGotobi);
      expect(result.isKanshaDay).toBe(c.expectKansha);
      expect(result.isWonderfulDay).toBe(c.expectWonderful);
      expect(result.level).toBe(c.expectLevel);
    });
  }

  it("【最重要】8月17日は5と0のつく日として扱われない", () => {
    const result = computeOverallJudgement(jst(2026, 8, 17), NO_CAMPAIGNS);
    expect(result.isGotobi).toBe(false);
  });

  it("キャンペーン・特別日が何もない日はactiveCampaignsが空でwait判定になる", () => {
    const result = computeOverallJudgement(jst(2026, 8, 17), NO_CAMPAIGNS);
    expect(result.activeCampaigns).toHaveLength(0);
    expect(result.level).toBe("wait");
  });

  it("18日は単独では『買い』にならず、会員ランク条件を含む理由文になる", () => {
    const result = computeOverallJudgement(jst(2026, 8, 18), NO_CAMPAIGNS);
    expect(result.level).toBe("depends");
    expect(result.reason).toContain("ゴールド");
  });

  it("1日は単独では『買い』にならず、エントリー条件を含む理由文になる", () => {
    const result = computeOverallJudgement(jst(2026, 9, 1), NO_CAMPAIGNS);
    expect(result.level).toBe("depends");
    expect(result.reason).toContain("3,000円");
  });
});

describe("getActiveCampaigns / computeOverallJudgement（キャンペーンあり）", () => {
  it("verified:falseのキャンペーンは無視される", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "unverified",
        name: "未確認キャンペーン",
        start: "2026-08-17T00:00:00+09:00",
        end: "2026-08-17T23:59:59+09:00",
        verified: false,
      },
    ];
    const active = getActiveCampaigns(campaigns, jst(2026, 8, 17));
    expect(active).toHaveLength(0);

    const result = computeOverallJudgement(jst(2026, 8, 17), campaigns);
    expect(result.level).toBe("wait");
  });

  it("期間外のキャンペーンはactiveCampaignsに含まれない", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "marathon",
        name: "お買い物マラソン",
        start: "2026-08-20T00:00:00+09:00",
        end: "2026-08-21T23:59:59+09:00",
        verified: true,
      },
    ];
    const result = computeOverallJudgement(jst(2026, 8, 17), campaigns);
    expect(result.activeCampaigns).toHaveLength(0);
    expect(result.level).toBe("wait");
  });

  it("確認済みキャンペーン開催中のみ(5と0のつく日と重ならない)なら『条件次第』", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "marathon",
        name: "お買い物マラソン",
        start: "2026-08-16T00:00:00+09:00",
        end: "2026-08-18T23:59:59+09:00",
        verified: true,
      },
    ];
    const result = computeOverallJudgement(jst(2026, 8, 17), campaigns);
    expect(result.activeCampaigns).toHaveLength(1);
    expect(result.level).toBe("depends");
  });

  it("確認済みキャンペーン開催中 かつ 5と0のつく日 が重なると『買い』になる", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "marathon",
        name: "お買い物マラソン",
        start: "2026-08-19T00:00:00+09:00",
        end: "2026-08-21T23:59:59+09:00",
        verified: true,
      },
    ];
    const result = computeOverallJudgement(jst(2026, 8, 20), campaigns);
    expect(result.level).toBe("buy");
  });

  it("確認済みキャンペーン開催中 かつ 18日(ご愛顧感謝デー) が重なると『買い』になる", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "marathon",
        name: "お買い物マラソン",
        start: "2026-08-16T00:00:00+09:00",
        end: "2026-08-20T23:59:59+09:00",
        verified: true,
      },
    ];
    const result = computeOverallJudgement(jst(2026, 8, 18), campaigns);
    expect(result.level).toBe("buy");
  });

  it("確認済みキャンペーン開催中 かつ 1日(ワンダフルデー) が重なると『買い』になる", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "marathon",
        name: "お買い物マラソン",
        start: "2026-08-30T00:00:00+09:00",
        end: "2026-09-02T23:59:59+09:00",
        verified: true,
      },
    ];
    const result = computeOverallJudgement(jst(2026, 9, 1), campaigns);
    expect(result.level).toBe("buy");
  });
});

describe("getNextBuyCandidates", () => {
  it("8月17日の次の買い時候補の先頭は8月20日の『5と0のつく日』", () => {
    const candidates = getNextBuyCandidates(jst(2026, 8, 17), NO_CAMPAIGNS);
    expect(candidates[0]).toEqual({ label: "5と0のつく日", dateLabel: "8月20日" });
  });

  it("8月31日の次の買い時候補は9月5日になる(月またぎ)", () => {
    const candidates = getNextBuyCandidates(jst(2026, 8, 31), NO_CAMPAIGNS);
    expect(candidates[0]).toEqual({ label: "5と0のつく日", dateLabel: "9月5日" });
  });

  it("開始前の確認済みキャンペーンも候補に含まれ、日付順に並ぶ", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "marathon",
        name: "お買い物マラソン",
        start: "2026-08-22T20:00:00+09:00",
        end: "2026-08-27T01:59:59+09:00",
        verified: true,
      },
    ];
    const candidates = getNextBuyCandidates(jst(2026, 8, 17), campaigns, 3);
    expect(candidates.map((c) => c.label)).toEqual(["5と0のつく日", "お買い物マラソン"]);
  });

  it("未確認(verified:false)のキャンペーンは候補に含まれない", () => {
    const campaigns: RakutenCampaign[] = [
      {
        id: "unverified",
        name: "未確認キャンペーン",
        start: "2026-08-18T00:00:00+09:00",
        end: "2026-08-19T00:00:00+09:00",
        verified: false,
      },
    ];
    const candidates = getNextBuyCandidates(jst(2026, 8, 17), campaigns, 3);
    expect(candidates.some((c) => c.label === "未確認キャンペーン")).toBe(false);
  });
});
