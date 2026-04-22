import { AnimatePresence, motion } from "framer-motion";

type LevelUpProps = {
  show: boolean;
  level: number;
  title: string;
};

export function LevelUpModal({ show, level, title }: LevelUpProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0B0F19] border border-gray-800 rounded-2xl p-8 text-center"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              LEVEL UP 🚀
            </h2>
            <p className="text-gray-400 mb-4">
              You are now <span className="text-indigo-400">{title}</span>
            </p>
            <div className="text-3xl font-bold text-white">Level {level}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
