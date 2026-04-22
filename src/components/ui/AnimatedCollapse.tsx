import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

type AnimatedCollapseProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

export function AnimatedCollapse({
  isOpen,
  children,
  className = "",
}: AnimatedCollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="collapse"
          initial={{
            height: 0,
            opacity: 0,
            filter: "blur(6px)",
          }}
          animate={{
            height: "auto",
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            height: 0,
            opacity: 0,
            filter: "blur(6px)",
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
