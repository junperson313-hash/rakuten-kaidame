import { products } from "@/data/products";
import type { FamilySize } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  familySize: FamilySize;
}

export default function TopThree({ familySize }: Props) {
  const top3 = [...products]
    .filter((p) => p.topRank)
    .sort((a, b) => (a.topRank ?? 99) - (b.topRank ?? 99));

  if (top3.length === 0) return null;

  return (
    <section className="rounded-2xl border-2 border-red-200 bg-red-50/50 p-3">
      <h2 className="mb-3 px-1 text-xl font-extrabold text-red-700">
        🏆 今日の買いだめTOP3
      </h2>
      <div className="space-y-3">
        {top3.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            familySize={familySize}
            rank={product.topRank}
          />
        ))}
      </div>
    </section>
  );
}
