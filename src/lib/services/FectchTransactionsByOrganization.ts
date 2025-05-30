import { useEffect, useState } from "react";

import {  ITransaction } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import {  GetaTransactionsByOrganization } from "../api-routes";

export function GetOrganizationTransactions() {
  const [Transactions, setTransactions] = useState<ITransaction[]>([]);
  const token = getUserToken();
  const clientID = getAuthUser().clientID;

  useEffect(() => {
    const fetchtransactions = async () => {
      try {
        const response = await fetch(GetaTransactionsByOrganization(clientID), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);

          setTransactions(data.transactions);
        } else {
        }
      } catch (error) {}
    };

    fetchtransactions();
  }, []);

  return Transactions;
}
