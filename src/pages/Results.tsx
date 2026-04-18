// src/pages/Results.tsx
import ContrarianCard from "../components/cards/ContrarianCard";
import HooksCard from "../components/cards/HooksCard";
import InsightsCard from "../components/cards/InsightsCard";
import SummaryCard from "../components/cards/SummaryCard";
import Shell from "../components/layout/Shell";

export default function Results({
  data,
  onBack,
}: {
  data: any;
  onBack: () => void;
}) {
  if (!data) return null;

  return (
    <Shell>
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="text-sm text-purple-400"
        >
          ← Back
        </button>

        <HooksCard data={data.hooks} />
        <InsightsCard data={data.insights} />
        <ContrarianCard data={data.contrarian} />
        <SummaryCard text={data.summary} />
      </div>
    </Shell>
  );
}