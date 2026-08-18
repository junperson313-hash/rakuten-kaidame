"use client";

import { useState } from "react";
import HeroJudgement from "@/components/HeroJudgement";
import EventBanner from "@/components/EventBanner";
import BousaiNotice from "@/components/BousaiNotice";
import FamilySizeSelector from "@/components/FamilySizeSelector";
import TopThree from "@/components/TopThree";
import TodayCategoryOverview from "@/components/TodayCategoryOverview";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import CautionSection from "@/components/CautionSection";
import AffiliateNotice from "@/components/AffiliateNotice";
import { trackEvent } from "@/lib/analytics";
import { useTodayJudgement } from "@/lib/useTodayJudgement";
import type { FamilySize } from "@/types";

export default function Home() {
  const [familySize, setFamilySize] = useState<FamilySize>("2");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { result, candidates, dateLabel, isBousaiSeason } = useTodayJudgement();

  const handleFamilySizeChange = (value: FamilySize) => {
    setFamilySize(value);
    trackEvent("family_size_change", { family_size: value });
  };

  const handleCategoryChange = (value: string | null) => {
    setCategoryId(value);
    trackEvent("category_change", { category: value ?? "all" });
  };

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6">
      <header className="text-center">
        <p className="text-sm font-bold text-red-600">楽天 買いだめ判定</p>
        <h1 className="sr-only">今日、楽天で買いだめするべきか判定するサイト</h1>
      </header>

      <HeroJudgement result={result} candidates={candidates} dateLabel={dateLabel} />

      <EventBanner result={result} />

      {isBousaiSeason && <BousaiNotice />}

      <FamilySizeSelector value={familySize} onChange={handleFamilySizeChange} />

      <TopThree familySize={familySize} overallLevel={result.level} />

      <TodayCategoryOverview overallLevel={result.level} />

      <CategoryFilter value={categoryId} onChange={handleCategoryChange} />

      <ProductList familySize={familySize} categoryId={categoryId} overallLevel={result.level} />

      <CautionSection />

      <AffiliateNotice />

      <footer className="pb-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} 楽天 買いだめ判定
      </footer>
    </main>
  );
}
