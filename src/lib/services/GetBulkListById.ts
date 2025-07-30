import { useEffect, useState } from "react";
import { ITransaction } from "../interfaces/interfaces";
import { GetTransactionsByBulkId } from "../api-routes";
import { getUserToken } from "../cookies/UserMangementCookie";

export function useBulkTransactions(bulkId: number) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const token = getUserToken();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(GetTransactionsByBulkId(bulkId), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();

        console.log(data);

        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [bulkId, token]);

  return { transactions };
}
