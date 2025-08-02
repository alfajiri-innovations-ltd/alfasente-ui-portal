import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { GetUsersByClientId } from "../api-routes";
import { IUsers } from "../interfaces/interfaces";


export const userService = {
  fetchUsers: async function (): Promise<IUsers[]> {
    const token = getUserToken();
    const clientId = getAuthUser()?.clientID ?? 0;

    const response = await fetch(GetUsersByClientId(clientId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  },
};
