// src/components/cards/ContrarianCard.tsx
import Card from "../ui/Card";

export default function ContrarianCard({ data }: { data: string[] }) {
  return (
    <Card
      title="⚔️ Contrarian Takes"
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