// src/pages/Home.tsx
import { useState } from "react";
import Shell from "../components/layout/Shell";

export default function Home({ onGenerate }: { onGenerate: (url: string) => void }) {
  const [url, setUrl] = useState("");

  return (
    <Shell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🔥 Create Content Pack</h2>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-white/10 focus:outline-none focus:border-purple-500"
        />

        <button
          onClick={() => onGenerate(url)}
          className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-lg font-medium"
        >
          🚀 Generate Content
        </button>

        <div>
          <p className="text-sm text-white/60 mb-2">Recent</p>
          <ul className="space-y-1 text-sm text-white/80">
            <li>• AI Productivity Video</li>
            <li>• Startup Growth Video</li>
          </ul>
        </div>
      </div>
    </Shell>
  );
}