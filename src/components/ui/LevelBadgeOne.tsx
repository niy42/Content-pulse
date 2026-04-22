import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type BadgeProps = {
  level: number;
};

export function LevelBadgeOne({ level }: BadgeProps) {
  const [animatedStars, setAnimatedStars] = useState(0);
  const MAX_STARS = 5;

  const tier = useMemo(() => {
    if (level < 3) return "Initiate";
    if (level < 6) return "Builder";
    if (level < 10) return "Operator";
    if (level < 15) return "Accelerator";
    if (level < 20) return "Architect";
    return "Sovereign";
  }, [level]);

  const starCount = useMemo(() => {
    if (level < 3) return 1;
    if (level < 6) return 2;
    if (level < 10) return 3;
    if (level < 15) return 4;
    return 5;
  }, [level]);

  // ----------------------------
  // STAR UNLOCK ANIMATION
  // ----------------------------
  useEffect(() => {
    setAnimatedStars(0);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setAnimatedStars(i);

      if (i >= starCount) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [starCount, level]);

  // ----------------------------
  // AURA PER TIER
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
          "0 0 12px rgba(99,102,241,0.25)",
          "0 0 0px rgba(0,0,0,0)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* STAR RENDER */}

      <div className="flex items-center gap-0.5">
        {Array.from({ length: MAX_STARS }).map((_, i) => {
          const unlocked = i < animatedStars;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
            >
              <Star
                className={`w-3.5 h-3.5 transition-colors ${
                  i < starCount
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }`}
              />
            </motion.div>
          );
        })}
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
