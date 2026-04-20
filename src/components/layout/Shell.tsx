// src/components/layout/Shell.tsx
import { Menu } from "lucide-react";
import { useState } from "react";
import LibraryDrawer from "../library/LibraryDrawer";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="h-screen bg-linear-to-br from-black via-[#0a0a0a] to-[#111] text-white flex flex-col">
      <header className="px-4 py-3 border-b border-white/5 backdrop-blur-xl bg-white/5 flex justify-between">
        <h1 className="text-sm font-semibold">Content Pulse ✨</h1>

        <button
          onClick={() => setShowLibrary(true)}
          className="p-3 rounded-xl active:scale-95 transition bg-white/5 hover:bg-white/10"
        >
          <Menu size={18} />
        </button>
      </header>

      <main className="flex-1 overflow-hidden">{children}</main>

      {/* ONLY container, NO data */}
      <LibraryDrawer open={showLibrary} onClose={() => setShowLibrary(false)} />
    </div>
  );
}
