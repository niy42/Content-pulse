import AssistantMessage from "@/components/chat/AssistantMessage";
import UserMessage from "@/components/chat/UserMessage";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Shell from "../components/layout/Shell";

export default function Home({
  messages,
  loading,
  onGenerate,
}: {
  messages: any[];
  loading: boolean;
  onGenerate: (url: string) => void;
}) {
  const [url, setUrl] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Auto-scroll like ChatGPT
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Shell>
      <div className="flex flex-col h-[calc(100vh-60px)]">
        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-6 p-6">
          {messages.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 text-sm text-center mt-20"
            >
              Paste a YouTube link to start generating content ✨
            </motion.p>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.role === "user" && <UserMessage url={msg.url} />}

              {msg.role === "assistant" && (
                <AssistantMessage
                  data={msg.content}
                  loading={loading && i === messages.length - 1}
                />
              )}
            </motion.div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 backdrop-blur bg-black/40">
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL..."
              className="flex-1 p-3 rounded-xl bg-[#111] border border-white/10 focus:outline-none focus:border-purple-500 transition"
            />

            <button
              onClick={() => {
                if (!url) return;
                onGenerate(url);
                setUrl("");
              }}
              className="px-5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
