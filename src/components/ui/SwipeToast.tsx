import { useRef, useState } from "react";

type Props = {
  toast: {
    id: string;
    message: string;
    type: "success" | "error" | "info";
  };
  onRemove: () => void;
};

export function SwipeToast({ toast, onRemove }: Props) {
  const [x, setX] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  const handleStart = (clientX: number) => {
    startX.current = clientX;
    dragging.current = true;
  };

  const handleMove = (clientX: number) => {
    if (!dragging.current) return;
    const delta = clientX - startX.current;
    setX(delta);
  };

  const handleEnd = () => {
    dragging.current = false;

    // threshold to dismiss
    if (Math.abs(x) > 120) {
      setX(500); // animate out
      setTimeout(onRemove, 150);
    } else {
      setX(0); // snap back
    }
  };

  return (
    <div
      className={`
        px-4 py-3 rounded-xl text-sm shadow-lg max-w-[90%] text-white select-none touch-none transition-transform duration-150 ease-out animate-slideRight  transform-gpu will-change-transform
        ${
          toast.type === "error"
            ? "bg-red-600"
            : toast.type === "success"
              ? "bg-green-600"
              : "bg-gray-800"
        }
      `}
      style={{
        transform: `translateX(${x}px)`,
        opacity: Math.max(1 - Math.abs(x) / 200, 0.5),
      }}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => dragging.current && handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {toast.message}
    </div>
  );
}
