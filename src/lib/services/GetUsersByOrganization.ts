import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { GetUsersByClientId } from "../api-routes";
import { IUsers } from "../interfaces/interfaces";

export const userService = {
  token: getUserToken(),
  clientId: getAuthUser()?.clientID ?? 0,
  fetchUsers: async function (): Promise<IUsers[]> {
    const response = await fetch(GetUsersByClientId(this.clientId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (response.ok === false) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  },
};
