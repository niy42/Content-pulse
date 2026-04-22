// src/components/cards/ErrorCard.tsx
import Card from "../ui/Card";

export default function ErrorCard({
  title = "Error",
  subMessage,
  text,
  action,
}: {
  title: string;
  text: string;
  action: string;
  subMessage?: string;
}) {
  // const [showUpgrade, setShowUpgrade] = useState<boolean>(false);
  return (
    <div className="relative">
      {" "}
      <Card
        title={title}
        actions={
          <button
            className="px-3 py-1 bg-white/10 rounded-md text-sm"
            // onClick={() => setShowUpgrade(true)}
          >
            {action}
          </button>
        }
      >
        <p>{text}</p>
        <p>{subMessage}</p>
      </Card>
      {/* {showUpgrade && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#111]/90 border border-white/20 p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Upgrade to Pro 🚀</h2>
          </div>
        </div>
      )} */}
    </div>
  );
}
