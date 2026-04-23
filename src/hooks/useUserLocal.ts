import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import { getUserId } from "../lib/user";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  const fetchUser = useCallback(async () => {
    const userId = getUserId();
    if (!userId) {
      setUser(null);
      return;
    }

    try {
      const res = await api.get("/me", {
        headers: { "x-user-id": userId },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  }, []); // still empty — we don't want to recreate the function unnecessarily

  // Key change: depend on the actual source of truth (userId)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // or better, depend directly on userId if you can

  // Even better pattern — depend on userId directly:
  // const userId = getUserId(); // but avoid calling on every render if expensive

  return { user, setUser, refreshUser: fetchUser };
}
