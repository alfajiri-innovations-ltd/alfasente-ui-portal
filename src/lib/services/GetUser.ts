import { useEffect, useState } from "react";

import { IUsers } from "../interfaces/interfaces";
import { getAuthUser } from "../cookies/UserMangementCookie";
import { FetchUser } from "../api-routes";

export function GetUser() {
  const [user, setUser] = useState<IUsers>();
  const email = getAuthUser()?.user_email;

  useEffect(() => {
    const fetchuser = async () => {
      try {
        if (typeof email === "string") {
          const response = await fetch(FetchUser(email));
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
          }
        }
      } catch (error) {}
    };

    fetchuser();
  }, []);

  return user;
}
