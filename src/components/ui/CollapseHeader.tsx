import { ChevronDown } from "lucide-react";
import { type ReactNode } from "react";

type CollapseHeaderProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  rightSlot?: ReactNode;
};

export function CollapseHeader({
  title,
  isOpen,
  onToggle,
  rightSlot,
}: CollapseHeaderProps) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center justify-between p-4 cursor-pointer"
    >
      <span className="text-xs text-white/50 uppercase tracking-wide">
        {title}
      </span>

      <div className="flex items-center gap-2">
        {rightSlot}

        <ChevronDown
          className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}
