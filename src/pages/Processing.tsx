// src/pages/Processing.tsx
import Shell from "../components/layout/Shell";

export default function Processing() {
  return (
    <Shell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">⚙️ Processing Video</h2>

        <div className="space-y-2 text-white/80">
          <p>🧠 Extracting transcript...</p>
          <p>🔥 Generating hooks...</p>
          <p>💡 Building insights...</p>
          <p>⚔️ Creating contrarian takes...</p>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
        </div>
      </div>
    </Shell>
  );
}