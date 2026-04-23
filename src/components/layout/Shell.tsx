// src/components/layout/Shell.tsx
import { useChatContext } from "@/context/ChatContext";
import { Menu } from "lucide-react";
import { useState } from "react";
import LibraryDrawer from "../library/LibraryDrawer";
import { LevelUpOverlay } from "../ui/LevelupOverlay";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [showLibrary, setShowLibrary] = useState(false);
  const { createChat } = useChatContext();

  return (
    <div className="h-screen bg-linear-to-br from-black via-[#0a0a0a] to-[#111] text-white flex flex-col">
      <header className="px-4 py-3 border-b border-white/5 backdrop-blur-xl bg-white/5 flex justify-between">
        <h1 className="text-sm font-semibold">QuiFlow</h1>

        <div className="flex gap-2">
          <button onClick={createChat} className="text-sm">
            New Flow
          </button>

          <button
            onClick={() => setShowLibrary(true)}
            className="p-3 rounded-xl active:scale-95 transition bg-white/5 hover:bg-white/10"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>
      <LevelUpOverlay />
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* ONLY container, NO data */}
      <LibraryDrawer open={showLibrary} onClose={() => setShowLibrary(false)} />
    </div>
  );
}
