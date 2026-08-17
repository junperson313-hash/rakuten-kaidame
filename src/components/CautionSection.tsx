const points = [
  { icon: "📦", text: "収納スペース：置き場所がないと結局邪魔になります" },
  { icon: "⏰", text: "使用期限・賞味期限：安くても期限内に使い切れる量だけに" },
  { icon: "👨‍👩‍👧", text: "家族人数：人数に見合わない量は在庫過多のもとです" },
  { icon: "🚚", text: "送料：送料を含めた実質価格で比較しましょう" },
  { icon: "💴", text: "単価：まとめ買いが必ず安いとは限りません" },
];

export default function CautionSection() {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <h2 className="mb-2 text-base font-bold text-amber-800">⚠️ 買いだめしすぎに注意</h2>
      <p className="mb-3 text-sm text-gray-700">
        安いからといって買いすぎると、かえって損をすることもあります。次のポイントを確認してから購入しましょう。
      </p>
      <ul className="space-y-2">
        {points.map((p) => (
          <li key={p.text} className="flex items-start gap-2 text-sm text-gray-700">
            <span aria-hidden>{p.icon}</span>
            <span>{p.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
