import { SwipeToast } from "@/components/ui/SwipeToast";
import { createContext, type ReactNode, useContext, useState } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now().toString();

    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // auto remove after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-50 right-0 sm:right-5 left-0 sm:left-auto flex flex-col gap-2 z-50 items-center sm:items-end px-4 sm:px-0">
        {toasts.map((toast) => (
          //           <div
          //             key={toast.id}
          //             className={`
          //     px-4 py-3 rounded-xl text-sm shadow-lg max-w-[90%]
          //     text-white animate-slideRight
          //     transform-gpu will-change-transform
          //     ${
          //       toast.type === "error"
          //         ? "bg-red-600"
          //         : toast.type === "success"
          //           ? "bg-green-600"
          //           : "bg-gray-800"
          //     }
          //   `}
          //           >
          //             {toast.message}
          //           </div>

          <SwipeToast
            key={toast.id}
            toast={toast}
            onRemove={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
