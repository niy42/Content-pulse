import { AnimatePresence, motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LevelBadge } from "./LevelBadge";
import { XPBar } from "./XpBar";

type User = {
  plan: string;
  level?: number;
  xp: number;
  next_level_xp: number;
  requests_used: number;
  requests_limit: number;
  streak?: number;
};

export default function UserStats({ user }: { user: User }) {
  // if (!user) return null;

  const safeLevel = user?.level ?? 0; // Handle undefined level gracefully

  // ----------------------------
  // SAFE CALCULATIONS
  // ----------------------------
  const usagePercent = useMemo(() => {
    if (!user?.requests_limit) return 0;
    return Math.min(100, (user.requests_used / user.requests_limit) * 100);
  }, [user?.requests_used, user?.requests_limit]);

  // const xpPercent = useMemo(() => {
  //   if (!user.next_level_xp) return 0;
  //   return Math.min(100, (user.xp / user.next_level_xp) * 100);
  // }, [user.xp, user.next_level_xp]);

  // ----------------------------
  // LEVEL UP DETECTION
  // ----------------------------
  const [prevLevel, setPrevLevel] = useState(safeLevel);
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    if (safeLevel > prevLevel) {
      setLevelUp(true);

      const t = setTimeout(() => setLevelUp(false), 1200);
      return () => clearTimeout(t);
    }

    setPrevLevel(safeLevel);
  }, [safeLevel, prevLevel]);

  // ----------------------------
  // SMOOTH XP ANIMATION (UX LAYER ONLY)
  // ----------------------------
  const [animatedXP, setAnimatedXP] = useState(user?.xp);
  const prevXPRef = useRef(user?.xp);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedXP(user?.xp);
      prevXPRef.current = user?.xp;
    }, 80);

    return () => clearTimeout(timeout);
  }, [user?.xp]);

  // ----------------------------
  // RANK SYSTEM
  // ----------------------------
  // const rankLabel = useMemo(() => {
  //   if (safeLevel < 3) return "Initiate";
  //   if (safeLevel < 6) return "Builder";
  //   if (safeLevel < 10) return "Operator";
  //   if (safeLevel < 15) return "Accelerator";
  //   if (safeLevel < 20) return "Architect";
  //   return "Sovereign";
  // }, [safeLevel]);

  return (
    <div className="relative space-y-4 min-w-65 overflow-hidden">
      {/* =======================
          LEVEL UP OVERLAY
      ======================= */}
      <AnimatePresence>
        {levelUp && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Flash */}
            <motion.div
              className="absolute inset-0 bg-indigo-500/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 border border-cyan-400 rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.35, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Particles */}
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() * 220 - 110)}%`,
                  y: `${50 + (Math.random() * 220 - 110)}%`,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================
          HEADER (PLAN + LEVEL)
      ======================= */}
      <div className="flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-full bg-white/10">
          {(user?.plan ?? "free").toUpperCase()}
        </span>

        <motion.span
          key={safeLevel}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-xs text-indigo-300"
        >
          Level {safeLevel}
        </motion.span>
      </div>

      {/* =======================
          XP BAR (PRIMARY SYSTEM)
      ======================= */}
      <XPBar
        currentXP={animatedXP}
        maxXP={user?.next_level_xp ?? 0}
        level={safeLevel}
      />

      {/* =======================
          USAGE BAR (SECONDARY)
      ======================= */}
      <div>
        <div className="flex justify-between text-[10px] text-white/60 mb-1">
          <span>Usage</span>
          <span>
            {user?.requests_used}/{user?.requests_limit}
          </span>
        </div>

        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-purple-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${usagePercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* =======================
          FOOTER (RANK + STREAK)
      ======================= */}
      <div className="flex items-center justify-between pt-1">
        {/* <span className="text-xs text-white/50">{rankLabel}</span> */}
        <LevelBadge level={safeLevel} />

        {/* {typeof user.streak === "number" && user.streak > 0 && (
          <span className="text-xs text-orange-400">🔥 {user.streak}d</span>
        )} */}
        <span className="text-xs text-orange-400 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" />
          {user?.streak}d
        </span>
      </div>
    </div>
  );
}
