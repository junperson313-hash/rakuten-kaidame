"use client";

import { categories } from "@/data/categories";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold text-gray-900">商品カテゴリ</h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
            value === null
              ? "border-red-500 bg-red-500 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          すべて
        </button>
        {categories.map((cat) => {
          const active = value === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                active
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
