import { useEffect, useState } from "react";


import { getUserToken } from "../cookies/UserMangementCookie";
import {  CalculateChargeByListId } from "../api-routes";

export function CalculateCharge(listId:number) {
  const [Charges, setCharges] = useState<any>();
  const token = getUserToken();

  useEffect(() => {
    const calculatecharge = async () => {
      try {
        const response = await fetch(CalculateChargeByListId(listId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);

          setCharges(data.Charges);
        } else {
        }
      } catch (error) {}
    };

    calculatecharge();
  }, []);

  return Charges;
}
