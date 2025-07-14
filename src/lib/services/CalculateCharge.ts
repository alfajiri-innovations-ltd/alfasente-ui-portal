// useCalculateCharge.ts
import { useEffect, useState } from "react";
import { getUserToken } from "../cookies/UserMangementCookie";
import { CalculateChargeByListId } from "../api-routes";

interface ICalculateCharge {
  listId?: number;
  clientId: number;
  beneficiary?: any;
}

export function useCalculateCharge({
  listId,
  clientId,
  beneficiary,
}: ICalculateCharge) {
  const [charges, setCharges] = useState<any>(null);
  const token = getUserToken();

  useEffect(() => {
    const calculateCharge = async () => {
      try {
        const payload: Record<string, any> = { clientId };
        if (listId) payload.listId = listId;
        else if (beneficiary) payload.beneficiary = beneficiary;

        const response = await fetch(CalculateChargeByListId(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          setCharges(data.Charges);
        }
      } catch (error) {
        console.error("Charge calculation error", error);
      }
    };

    calculateCharge();
  }, [listId, clientId, beneficiary, token]);

  return charges;
}
