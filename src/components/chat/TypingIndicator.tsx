import { motion } from "framer-motion";

export default function TypingIndicator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      <span>{label}</span>

      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
