export type JudgementLevel = "buy_today" | "ok" | "depends" | "wait";

export type FamilySize = "1" | "2" | "3-4" | "5plus";

export interface FamilySizeOption {
  value: FamilySize;
  label: string;
}

// サイト全体としての「今日、買いだめすべきか」の総合判定。
// isGotobi / isKanshaDay / isWonderfulDay / activeCampaigns は日付とキャンペーンデータから自動計算する。
export type OverallJudgementLevel = "buy" | "depends" | "wait";

export interface OverallJudgementResult {
  level: OverallJudgementLevel;
  reason: string; // 判定理由（1〜2行）
  isGotobi: boolean; // 今日が5と0のつく日か
  isKanshaDay: boolean; // 今日が18日(ご愛顧感謝デー)か
  isWonderfulDay: boolean; // 今日が1日(ワンダフルデー)か
  activeCampaigns: RakutenCampaign[]; // 現在開催中と確認できているキャンペーン
}

// 毎月固定の楽天イベント(ご愛顧感謝デー・ワンダフルデーなど)の参加条件情報。
// 楽天公式ページで確認できた事実のみを記載し、断定しすぎない文言にすること。
export interface FixedMonthlyEventInfo {
  name: string;
  conditionSummary: string; // 会員ランク等の条件・ポイント倍率の事実（断定しすぎない書き方）
  requiresEntry: boolean;
  officialUrl: string;
}

export interface NextBuyCandidate {
  label: string; // 例: "5と0のつく日" / "お買い物マラソン"
  dateLabel: string; // 例: "8月20日"
}

// 期間限定キャンペーン。verified: true のものだけが判定に使われる。
// start / end は日本時間(+09:00)のISO8601文字列で指定する。
export interface RakutenCampaign {
  id: string;
  name: string;
  start: string;
  end: string;
  verified: boolean;
  officialUrl?: string;
  description?: string;
}

// 商品自体の「買いだめ向き度」。日々の総合判定と掛け合わせて実際の判定(JudgementLevel)を決める。
// high: 長期保存でき消費頻度も高い / medium: 保存はできるが好みや条件が分かれる / low: 保存や価格変動の影響を受けやすい
export type ProductPriority = "high" | "medium" | "low";

export interface Product {
  id: string;
  name: string;
  category: string;
  icon: string;
  imageUrl?: string;
  stockScore: number; // 買いだめ度 1-5
  storability: number; // 保存しやすさ 1-5
  usageFrequency: number; // 消費頻度 1-5
  priceVolatility: number; // 価格変動 1-5
  priority: ProductPriority;
  reason: string; // なぜこの判定なのかの短い理由
  comment: string;
  stockPeriod: string; // 買いだめ目安（例: "2〜3か月分"）
  topRank?: number; // TOP3表示用の順位（未設定なら対象外）
  familyGuide: Record<FamilySize, string>;
  affiliateUrl: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
