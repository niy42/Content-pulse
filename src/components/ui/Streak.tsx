type StreakProps = {
  days: number;
};

export function Streak({ days }: StreakProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg">
      <span className="text-orange-400 text-lg">🔥</span>
      <span className="text-sm text-gray-300">{days} day streak</span>
    </div>
  );
}
