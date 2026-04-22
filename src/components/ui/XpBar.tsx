import { motion } from "framer-motion";

type XPBarProps = {
  currentXP: number;
  maxXP: number;
  level: number;
};

export function XPBar({ currentXP, maxXP, level }: XPBarProps) {
  const progress = (currentXP / maxXP) * 100;
  const nextLevel = maxXP - currentXP;

  return (
    <div className="w-full bg-[#0B0F19] p-4 rounded-xl border border-gray-800">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Level {level}</span>
        <span>
          {currentXP} / {maxXP} XP
        </span>
      </div>

      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-indigo-600 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {!Number.isNaN(nextLevel) ? nextLevel : 0} XP to next level
      </p>
    </div>
  );
}
