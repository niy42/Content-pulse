export default function UserStats({ user }: { user: any }) {
  if (!user) return null;

  const percent = (user.requests_used / user.requests_limit) * 100;

  return (
    <div className="space-y-2">
      {/* Plan badge */}
      <div className="flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-full bg-white/10">
          {user.plan.toUpperCase()}
        </span>

        <span className="text-xs text-white/60">
          {user.requests_used}/{user.requests_limit}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-purple-500 to-indigo-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
