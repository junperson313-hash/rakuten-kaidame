export type JudgementLevel = "buy_today" | "ok" | "depends" | "wait";

export type FamilySize = "1" | "2" | "3" | "4" | "5plus";

export interface FamilySizeOption {
  value: FamilySize;
  label: string;
}

export interface RakutenEvent {
  emoji: string;
  title: string;
}

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
  judgement: JudgementLevel;
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
