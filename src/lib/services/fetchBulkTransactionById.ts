import { useEffect, useState } from "react";

import { BulkList,  } from "../interfaces/interfaces";

import { getUserToken } from "../cookies/UserMangementCookie";

import { GetBulkTransactionById } from "../api-routes";

export function GetBulkTransaction(id: number) {
  const [Transaction, setTransaction] = useState<BulkList>();
  const token = getUserToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchtransaction = async () => {
      try {
        setLoading(true);
        const response = await fetch(GetBulkTransactionById(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          setTransaction(data.transactions);
        } else {
        }
      } catch (error) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchtransaction();
  }, []);

  return { Transaction, loading, error };
}
