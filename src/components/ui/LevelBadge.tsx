import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useMemo } from "react";

type BadgeProps = {
  level: number;
};

const MAX_STARS = 5;

// ----------------------------
// STAR FILL COMPONENT
// ----------------------------
function StarFill({ fill }: { fill: number }) {
  return (
    <div className="relative w-3.5 h-3.5">
      {/* base (empty star) */}
      <Star className="absolute w-3.5 h-3.5 text-gray-600" />

      {/* filled layer (clipped) */}
      <div
        className="absolute overflow-hidden transition-all duration-300 ease-out"
        style={{ width: `${fill * 100}%` }}
      >
        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
      </div>
    </div>
  );
}

// ----------------------------
// MAIN COMPONENT
// ----------------------------
export function LevelBadge({ level }: BadgeProps) {
  // Smooth continuous progression (critical fix)
  const rawProgress = useMemo(() => {
    // tweak divisor to control pacing of star filling
    return Math.min(MAX_STARS, level / 3.5);
  }, [level]);

  // Convert into per-star fractional fill
  const stars = useMemo(() => {
    return Array.from({ length: MAX_STARS }).map((_, i) => {
      const fill = rawProgress - i;
      return Math.max(0, Math.min(1, fill));
    });
  }, [rawProgress]);

  // ----------------------------
  // TIER SYSTEM
  // ----------------------------
  const tier = useMemo(() => {
    if (level < 3) return "Initiate";
    if (level < 6) return "Builder";
    if (level < 10) return "Operator";
    if (level < 15) return "Accelerator";
    if (level < 20) return "Architect";
    return "Sovereign";
  }, [level]);

  // ----------------------------
  // AURA SYSTEM
  // ----------------------------
  const auraClass = useMemo(() => {
    if (level < 3) return "shadow-gray-500/10";
    if (level < 6) return "shadow-indigo-500/20";
    if (level < 10) return "shadow-blue-500/30";
    if (level < 15) return "shadow-cyan-500/30";
    if (level < 20) return "shadow-purple-500/40";
    return "shadow-yellow-400/40";
  }, [level]);

  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-700 ${auraClass}`}
      animate={{
        boxShadow: [
          "0 0 0px rgba(0,0,0,0)",
          "0 0 10px rgba(99,102,241,0.25)",
          "0 0 0px rgba(0,0,0,0)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* STAR RENDER (CONTINUOUS FILL SYSTEM) */}
      <div className="flex items-center gap-0.5">
        {stars.map((fill, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 18,
            }}
          >
            <StarFill fill={fill} />
          </motion.div>
        ))}
      </div>

      {/* LABEL */}
      <motion.span
        key={tier}
        initial={{ opacity: 0.5, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-gray-200"
      >
        {tier}
      </motion.span>
    </motion.div>
  );
}
