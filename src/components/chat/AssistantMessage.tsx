import { motion } from "framer-motion";
import ContrarianCard from "../cards/ContrarianCard";
import ErrorCard from "../cards/ErrorCard";
import HooksCard from "../cards/HooksCard";
import InsightsCard from "../cards/InsightsCard";
import SummaryCard from "../cards/SummaryCard";
import TypingIndicator from "./TypingIndicator";

export default function AssistantMessage({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  return (
    <div className="flex justify-start">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111]/80 backdrop-blur border border-white/10 p-4 rounded-2xl w-full max-w-2xl space-y-4 shadow-lg"
      >
        {data.hooks && <HooksCard data={data.hooks} />}
        {loading && !data.hooks && <TypingIndicator label="Generating hooks" />}

        {data.insights && <InsightsCard data={data.insights} />}
        {loading && data.hooks && !data.insights && (
          <TypingIndicator label="Finding insights" />
        )}

        {data.contrarian && <ContrarianCard data={data.contrarian} />}
        {loading && data.insights && !data.contrarian && (
          <TypingIndicator label="Generating contrarian takes" />
        )}

        {data.summary && <SummaryCard text={data.summary} />}
        {loading && data.contrarian && !data.summary && (
          <TypingIndicator label="Writing summary" />
        )}
        {data.error && (
          <ErrorCard
            title="LIMIT REACHED"
            text={data.error}
            action="Upgrade Plan"
          />
        )}
      </motion.div>
    </div>
  );
}
