import { useEffect, useState } from "react";

import {  ITransaction } from "../interfaces/interfaces";
import {  getUserToken } from "../cookies/UserMangementCookie";
import {  GetAllTransactions } from "../api-routes";

export function GetTransactions() {
  const [Transactions, setTransactions] = useState<ITransaction[]>([]);
  const token = getUserToken();

  useEffect(() => {
    const fetchtransactions = async () => {
      try {
        const response = await fetch(GetAllTransactions(), {
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
