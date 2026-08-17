import { todaysEvents } from "@/data/events";

export default function EventBanner() {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-4">
      <h2 className="mb-2 text-sm font-bold text-red-700">今日の楽天イベント</h2>
      <ul className="space-y-1.5">
        {todaysEvents.map((event) => (
          <li key={event.title} className="flex items-center gap-2 text-base font-medium text-gray-800">
            <span aria-hidden>{event.emoji}</span>
            <span>{event.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
