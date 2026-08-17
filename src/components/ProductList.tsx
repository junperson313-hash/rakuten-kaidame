import { products } from "@/data/products";
import type { FamilySize } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  familySize: FamilySize;
  categoryId: string | null;
}

export default function ProductList({ familySize, categoryId }: Props) {
  const filtered = categoryId
    ? products.filter((p) => p.category === categoryId)
    : products;

  return (
    <section>
      <h2 className="mb-3 text-xl font-bold text-gray-900">商品一覧</h2>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">該当する商品がありません。</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} familySize={familySize} />
          ))}
        </div>
      )}
    </section>
  );
}
