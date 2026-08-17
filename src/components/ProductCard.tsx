"use client";

import { judgementMap, stars } from "@/lib/judgement";
import { trackEvent } from "@/lib/analytics";
import type { FamilySize, Product } from "@/types";

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

interface Props {
  product: Product;
  familySize: FamilySize;
  rank?: number;
}

export default function ProductCard({ product, familySize, rank }: Props) {
  const judgement = judgementMap[product.judgement];

  const handleCardClick = () => {
    trackEvent("product_click", { item_id: product.id, item_name: product.name });
  };

  const handleAffiliateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent("affiliate_click", { item_id: product.id, item_name: product.name });
  };

  return (
    <article
      onClick={handleCardClick}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div
        className={`flex items-center justify-between gap-2 px-4 py-2.5 text-base font-extrabold ${judgement.bannerClass}`}
      >
        <span>
          {judgement.emoji} {judgement.label}
        </span>
        {rank && <span className="text-xl leading-none">{RANK_MEDAL[rank]}</span>}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="shrink-0 text-3xl" aria-hidden>
            {product.icon}
          </span>
          <h3 className="min-w-0 break-words text-lg font-bold text-gray-900">
            {product.name}
          </h3>
        </div>

        <p className="mb-2 text-sm font-bold text-gray-500">
          買いだめ度：<span className="text-amber-500">{stars(product.stockScore)}</span>
        </p>

        <div className="mb-3 grid grid-cols-3 gap-1 text-xs text-gray-500">
          <span>保存 {stars(product.storability)}</span>
          <span>消費 {stars(product.usageFrequency)}</span>
          <span>変動 {stars(product.priceVolatility)}</span>
        </div>

        <p className="mb-2 text-sm font-bold leading-relaxed text-gray-800">
          💡 なぜ{judgement.label}？ {product.reason}
        </p>

        <p className="mb-3 rounded-xl bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
          {product.comment}
        </p>

        <div className="mb-3 flex flex-col gap-1 text-sm text-gray-600">
          <span>
            目安：<strong className="text-gray-900">{product.stockPeriod}</strong>
          </span>
          <span>
            おすすめ量：<strong className="text-gray-900">{product.familyGuide[familySize]}</strong>
          </span>
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleAffiliateClick}
          className="block w-full rounded-xl bg-red-600 py-3.5 text-center text-base font-bold text-white transition hover:bg-red-700 active:bg-red-800"
        >
          楽天で見る →
        </a>
      </div>
    </article>
  );
}
