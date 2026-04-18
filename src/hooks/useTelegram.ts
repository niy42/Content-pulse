import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) return;

    tg.ready();
    tg.expand();

    setUser(tg.initDataUnsafe?.user);

  }, []);

  return {
    user,
    tg: window.Telegram?.WebApp
  };
};