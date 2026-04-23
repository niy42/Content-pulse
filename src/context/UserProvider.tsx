import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../api/client";
import { getUserId } from "../lib/user";

export const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const fetchUser = useCallback(async () => {
    const userId = getUserId();
    if (!userId) return setUser(null);

    const res = await api.get("/me", {
      headers: { "x-user-id": userId },
    });

    setUser(res.data);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// export const useUser = () => useContext(UserContext);
