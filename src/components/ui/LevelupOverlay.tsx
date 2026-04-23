import { useUI } from "@/context/UIContext";
import { AnimatePresence, motion } from "framer-motion";

export function LevelUpOverlay() {
  const { levelUp } = useUI();

  return (
    <AnimatePresence>
      {levelUp && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white">LEVEL UP 🚀</h1>

            <p className="text-indigo-300 mt-2">You reached Level {levelUp}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
