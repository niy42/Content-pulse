// src/components/cards/SummaryCard.tsx
import Card from "../ui/Card";

export default function SummaryCard({ text }: { text: string }) {
  return (
    <Card
      title="📌 Summary"
      actions={<button className="px-3 py-1 bg-white/10 rounded-md text-sm">Copy</button>}
    >
      <p>{text}</p>
    </Card>
  );
}