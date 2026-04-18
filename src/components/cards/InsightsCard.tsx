// src/components/cards/InsightsCard.tsx
import Card from "../ui/Card";

export default function InsightsCard({ data }: { data: string[] }) {
  return (
    <Card
      title="💡 Insights"
      actions={<button className="px-3 py-1 bg-white/10 rounded-md text-sm">Copy</button>}
    >
      <ul className="list-disc pl-4 space-y-1">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}