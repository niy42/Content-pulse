// src/components/cards/ErrorCard.tsx
import Card from "../ui/Card";

export default function ErrorCard({
  title = "Error",
  text,
  action,
}: {
  title: string;
  text: string;
  action: string;
}) {
  return (
    <Card
      title={title}
      actions={
        <button className="px-3 py-1 bg-white/10 rounded-md text-sm">
          {action}
        </button>
      }
    >
      <p>{text}</p>
    </Card>
  );
}
