import { motion } from "framer-motion";

export default function UserMessage({ url }: { url: string }) {
  return (
    <div className="flex justify-end">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-xl max-w-md text-sm shadow-lg"
      >
        {url}
      </motion.div>
    </div>
  );
}
