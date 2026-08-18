import { describe, expect, it } from "vitest";
import { getJstParts, getNextGotobiDate, isBousaiSeason, isGotobiDay, jstDateToInstant } from "./date";

describe("isGotobiDay", () => {
  it("5と0のつく日(5,10,15,20,25,30)を正しくtrueと判定する", () => {
    expect(isGotobiDay(5)).toBe(true);
    expect(isGotobiDay(10)).toBe(true);
    expect(isGotobiDay(15)).toBe(true);
    expect(isGotobiDay(20)).toBe(true);
    expect(isGotobiDay(25)).toBe(true);
    expect(isGotobiDay(30)).toBe(true);
  });

  it("5と0のつく日以外はfalseになる(17日・18日・31日を含む)", () => {
    expect(isGotobiDay(1)).toBe(false);
    expect(isGotobiDay(17)).toBe(false);
    expect(isGotobiDay(18)).toBe(false);
    expect(isGotobiDay(31)).toBe(false);
  });
});

describe("getNextGotobiDate", () => {
  it("同月内に次の5と0のつく日がある場合はそれを返す(8/17→8/20)", () => {
    expect(getNextGotobiDate({ year: 2026, month: 8, day: 17 })).toEqual({
      year: 2026,
      month: 8,
      day: 20,
    });
  });

  it("月末(8/30, 8/31)をまたぐ場合は翌月5日になる", () => {
    expect(getNextGotobiDate({ year: 2026, month: 8, day: 30 })).toEqual({
      year: 2026,
      month: 9,
      day: 5,
    });
    expect(getNextGotobiDate({ year: 2026, month: 8, day: 31 })).toEqual({
      year: 2026,
      month: 9,
      day: 5,
    });
  });

  it("9/1の次は9/5、9/5自身は対象日なのでnext計算では9/10になる", () => {
    expect(getNextGotobiDate({ year: 2026, month: 9, day: 1 })).toEqual({
      year: 2026,
      month: 9,
      day: 5,
    });
    expect(getNextGotobiDate({ year: 2026, month: 9, day: 5 })).toEqual({
      year: 2026,
      month: 9,
      day: 10,
    });
  });

  it("12月から翌年1月への年またぎに対応する", () => {
    expect(getNextGotobiDate({ year: 2026, month: 12, day: 31 })).toEqual({
      year: 2027,
      month: 1,
      day: 5,
    });
  });
});

describe("getJstParts / jstDateToInstant", () => {
  it("UTC深夜(日本時間では翌日の朝)を正しくJSTの日付に変換する", () => {
    // 2026-08-16T15:30:00Z は JST では 2026-08-17 00:30
    const utcDate = new Date("2026-08-16T15:30:00Z");
    const parts = getJstParts(utcDate);
    expect(parts).toMatchObject({ year: 2026, month: 8, day: 17, hour: 0, minute: 30 });
  });

  it("jstDateToInstantで作った瞬間をgetJstPartsで戻すと同じ年月日になる", () => {
    const instant = jstDateToInstant(2026, 8, 17);
    const parts = getJstParts(instant);
    expect(parts.year).toBe(2026);
    expect(parts.month).toBe(8);
    expect(parts.day).toBe(17);
  });
});

describe("isBousaiSeason", () => {
  it("8/25〜8/31は防災の日シーズンと判定する", () => {
    expect(isBousaiSeason({ year: 2026, month: 8, day: 25 })).toBe(true);
    expect(isBousaiSeason({ year: 2026, month: 8, day: 31 })).toBe(true);
  });

  it("9/1〜9/7は防災の日シーズンと判定する", () => {
    expect(isBousaiSeason({ year: 2026, month: 9, day: 1 })).toBe(true);
    expect(isBousaiSeason({ year: 2026, month: 9, day: 2 })).toBe(true);
    expect(isBousaiSeason({ year: 2026, month: 9, day: 7 })).toBe(true);
  });

  it("シーズン外(8/17, 9/8)はfalseになる", () => {
    expect(isBousaiSeason({ year: 2026, month: 8, day: 17 })).toBe(false);
    expect(isBousaiSeason({ year: 2026, month: 9, day: 8 })).toBe(false);
  });
});
