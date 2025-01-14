import { useEffect, useState } from "react";

import { IUser } from "../interfaces/interfaces";
import { getAuthUser } from "../cookies/UserMangementCookie";
import { FetchUser } from "../api-routes";

export function GetUser() {
  const [user, setUser] = useState<IUser>();
  const email = getAuthUser().email;

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await fetch(FetchUser(email));
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
        }
      } catch (error) {}
    };

    fetchuser();
  }, []);

  return user;
}
