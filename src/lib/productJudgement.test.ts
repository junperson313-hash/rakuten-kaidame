import { describe, expect, it } from "vitest";
import { getProductJudgement } from "./productJudgement";
import type { OverallJudgementLevel, ProductPriority } from "@/types";

const PRIORITIES: ProductPriority[] = ["high", "medium", "low"];
const LEVELS: OverallJudgementLevel[] = ["buy", "depends", "wait"];

describe("getProductJudgement", () => {
  it("総合判定が『待ち』のとき、どの商品も『今日買い』にはならない(矛盾防止)", () => {
    for (const priority of PRIORITIES) {
      expect(getProductJudgement(priority, "wait")).not.toBe("buy_today");
    }
  });

  it("総合判定が『買い』のときは、最も買いだめ向きの商品(high)だけが『今日買い』になる", () => {
    expect(getProductJudgement("high", "buy")).toBe("buy_today");
    expect(getProductJudgement("medium", "buy")).not.toBe("buy_today");
    expect(getProductJudgement("low", "buy")).not.toBe("buy_today");
  });

  it("すべての組み合わせで有効なJudgementLevelを返す", () => {
    for (const level of LEVELS) {
      for (const priority of PRIORITIES) {
        expect(["buy_today", "ok", "depends", "wait"]).toContain(
          getProductJudgement(priority, level),
        );
      }
    }
  });
});
