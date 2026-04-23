import { createContext, useContext, useState } from "react";

const UIContext = createContext<any>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const [xpToast, setXpToast] = useState<number | null>(null);

  const showLevelUp = (level: number) => {
    setLevelUp(level);

    setTimeout(() => {
      setLevelUp(null);
    }, 2000);
  };

  const showXPToast = (xp: number) => {
    setXpToast(xp);

    setTimeout(() => {
      setXpToast(null);
    }, 1200);
  };

  return (
    <UIContext.Provider
      value={{
        levelUp,
        xpToast,
        showLevelUp,
        showXPToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
