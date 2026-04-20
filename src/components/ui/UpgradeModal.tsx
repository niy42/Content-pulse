export default function UpgradeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] border border-white/10 p-6 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Upgrade to Pro 🚀</h2>

        <p className="text-sm text-white/60">
          Unlock more generations, faster processing, and premium features.
        </p>

        <div className="space-y-2 text-sm">
          <div>✅ 50 generations/day</div>
          <div>✅ Faster processing</div>
          <div>✅ Export content</div>
        </div>

        <button className="w-full bg-linear-to-r from-purple-600 to-indigo-600 p-3 rounded-lg">
          Upgrade Now
        </button>

        <button onClick={onClose} className="w-full text-sm text-white/50">
          Maybe later
        </button>
      </div>
    </div>
  );
}
