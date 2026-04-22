import { AnimatePresence, motion } from "framer-motion";

type XPToastProps = {
  xp: number;
  show: boolean;
};

export function XPToast({ xp, show }: XPToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-10 right-10 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          +{xp} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}
