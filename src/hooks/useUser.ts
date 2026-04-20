import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import { getUserId } from "../lib/user";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  const fetchUser = useCallback(async () => {
    const userId = getUserId();

    const res = await api.get("/me", {
      headers: {
        "x-user-id": userId,
      },
    });

    setUser(res.data);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, refreshUser: fetchUser };
}