import { ITransaction } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { GetaTransactionsByOrganization } from "../api-routes";

export const organizationService = {
  token: getUserToken(),
  clientId: getAuthUser()?.clientID ?? 0,
  transactionUrlData: GetaTransactionsByOrganization(
    getAuthUser()?.clientID ?? 0,
  ),
  organizationData: async function (): Promise<ITransaction[]> {
    const response = await fetch(this.transactionUrlData, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      redirect: "follow",
    });

    if (response.ok === false) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      return data.transactions;
    }
  },
};
