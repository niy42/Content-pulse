// src/components/layout/Shell.tsx
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#901c1c] text-white flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 border-b border-white/10 text-lg font-semibold">
        🚀 Content Engine
      </header>

      {/* Main */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="border-t border-white/10 p-2 flex justify-around text-sm">
        <button className="text-purple-400">Home</button>
        <button className="text-white/60">Library</button>
        <button className="text-white/60">Pro</button>
      </nav>
    </div>
  );
}