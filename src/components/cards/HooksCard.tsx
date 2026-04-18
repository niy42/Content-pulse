// src/components/cards/HooksCard.tsx
import Card from "../ui/Card";

export default function HooksCard({ data }: { data: string[] }) {
  return (
    <Card
      title="🔥 Viral Hooks"
      actions={
        <>
          <button className="px-3 py-1 bg-white/10 rounded-md text-sm">
            Copy
          </button>
          <button className="px-3 py-1 bg-purple-600 rounded-md text-sm">
            Improve
          </button>
        </>
      }
    >
      <ul className="list-disc pl-4 space-y-1">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}