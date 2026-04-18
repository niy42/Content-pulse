// src/components/ui/Card.tsx
export default function Card({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 space-y-3 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>

      <div className="text-sm text-white/80 space-y-2">
        {children}
      </div>

      {actions && (
        <div className="flex gap-2 pt-2 border-t border-white/10">
          {actions}
        </div>
      )}
    </div>
  );
}