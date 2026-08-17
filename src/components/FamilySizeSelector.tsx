"use client";

import { familySizeOptions } from "@/lib/familySize";
import type { FamilySize } from "@/types";

interface Props {
  value: FamilySize;
  onChange: (value: FamilySize) => void;
}

export default function FamilySizeSelector({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-base font-bold text-gray-800">何人暮らしですか？</h2>
      <div className="grid grid-cols-4 gap-1.5">
        {familySizeOptions.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`rounded-xl border px-1 py-3.5 text-sm font-bold transition ${
                active
                  ? "border-red-500 bg-red-500 text-white shadow"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
