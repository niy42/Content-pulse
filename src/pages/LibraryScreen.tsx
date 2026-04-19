export default function LibraryScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-white/10 flex items-center">
        <button onClick={onBack}>←</button>
        <span className="ml-3 font-semibold">Library</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="p-3 bg-white/5 rounded">Video 1</div>
      </div>
    </div>
  );
}
