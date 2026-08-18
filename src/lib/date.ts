const JST_TIME_ZONE = "Asia/Tokyo";
const GOTOBI_DAYS = [5, 10, 15, 20, 25, 30];

export interface JstDateParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface CalendarDate {
  year: number;
  month: number; // 1-12
  day: number;
}

// UTCサーバーで動いていても日本時間の年月日時分秒を正しく取得する。
// Intl.DateTimeFormat の timeZone 指定はサーバー/ブラウザの実行環境に依存しない。
export function getJstParts(date: Date = new Date()): JstDateParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: JST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour") % 24, // 環境によって深夜0時が "24" 表記になる対策
    minute: get("minute"),
    second: get("second"),
  };
}

export function formatJstFullDateLabel(date: Date = new Date()): string {
  const { year, month, day } = getJstParts(date);
  return `${year}年${month}月${day}日`;
}

export function formatJstShortDateLabel(date: Date = new Date()): string {
  const { month, day } = getJstParts(date);
  return `${month}月${day}日`;
}

// JSTのカレンダー日付(年月日・00:00)に対応する瞬間をDateで返す。
// JSTはUTC+9のため、UTC側では前日15:00に相当する。Date.UTCは範囲外の時刻引数を
// 自動的に繰り上げ/繰り下げてくれるため、month=0や負のhourをそのまま渡してよい。
export function jstDateToInstant(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day, -9, 0, 0));
}

export function isGotobiDay(day: number): boolean {
  return GOTOBI_DAYS.includes(day);
}

// 今日が5と0のつく日でない場合の「次の5と0のつく日」を計算する。
// 月末(30日/31日)から翌月への繰り上がり、12月から翌年1月への繰り上がりにも対応する。
export function getNextGotobiDate(today: CalendarDate): CalendarDate {
  const nextInSameMonth = GOTOBI_DAYS.find((d) => d > today.day);
  if (nextInSameMonth !== undefined) {
    return { year: today.year, month: today.month, day: nextInSameMonth };
  }
  const nextMonth = today.month === 12 ? 1 : today.month + 1;
  const nextYear = today.month === 12 ? today.year + 1 : today.year;
  return { year: nextYear, month: nextMonth, day: 5 };
}

// 9月1日「防災の日」前後(8/25〜9/7)かどうか。楽天のキャンペーンとは無関係の、
// 備蓄を見直すきっかけとして案内するための判定であり、買い時判定には影響させない。
export function isBousaiSeason(today: CalendarDate): boolean {
  return (today.month === 8 && today.day >= 25) || (today.month === 9 && today.day <= 7);
}
