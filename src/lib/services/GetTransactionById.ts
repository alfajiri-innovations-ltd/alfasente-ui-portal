import { useEffect, useState } from "react";

import { ITransaction } from "../interfaces/interfaces";

import { getUserToken } from "../cookies/UserMangementCookie";

import { GetTransactionById } from "../api-routes";

export function GetTransaction(transactionID: string) {
  const [Transaction, setTransaction] = useState<ITransaction>();
  const token = getUserToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchtransaction = async () => {
      try {
        setLoading(true);
        const response = await fetch(GetTransactionById(transactionID),{
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("---->",data);

          setTransaction(data.transactions);
        } else {
        }
      } catch (error) {
        setError("An error occurred");
      }

      finally{
        setLoading(false);
      }
    };

    fetchtransaction();
  }, []);

  return { Transaction, loading, error };
}
