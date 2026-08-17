import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { compactJudgement } from "@/lib/judgement";

export default function TodayCategoryOverview() {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold text-gray-900">今日のおすすめ</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((cat) => {
          const product = products.find((p) => p.category === cat.id);
          if (!product) return null;
          const compact = compactJudgement(product.judgement);
          return (
            <div
              key={cat.id}
              className={`flex items-center gap-2 rounded-xl border p-3 ${compact.cardClass}`}
            >
              <span className="shrink-0 text-xl" aria-hidden>
                {cat.icon}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold opacity-80">{cat.name}</p>
                <p className="text-sm font-extrabold">
                  {compact.icon} {compact.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
