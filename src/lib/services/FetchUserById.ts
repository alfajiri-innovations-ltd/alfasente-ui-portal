import { useEffect, useState } from "react";

import { IUsers } from "../interfaces/interfaces";

import { GetUserById } from "../api-routes";

export function FetchUserById({userId:number}) {
  const [user, setUser] = useState<IUsers>();
  

  

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await GetUserById(userId);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log(data);
        } else {
        }
      } catch (error) {}
    };

    fetchuser();
  }, []);

  return user;
}
