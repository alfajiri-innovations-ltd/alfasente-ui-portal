import { getAuthUser } from "@/lib/cookies/UserMangementCookie";
import { IUser } from "@/lib/interfaces/interfaces";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const UserContext = createContext<IUser | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = getAuthUser();

    if (user) {
      setUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        clientID: user.clientID,
        status: user.status || "",
        userId: user.userId || "",
        user_email: user.user_email || "",
        role_name: user.role_name || "user",
        date_of_birth: user.date_of_birth || "",


      });
    }
  }, []);


  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
