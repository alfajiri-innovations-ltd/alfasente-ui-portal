import {  GetPlatformCurrency } from "@/lib/api-routes";
import { useEffect, useState, useCallback } from "react";

export function useCurrency() {
  const [currency, setCurrency] = useState<string>("UGX"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrency = useCallback(async () => {

    
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(GetPlatformCurrency());


      if (!res.ok) throw new Error("Failed to fetch currency");

      const data = await res.json();


      setCurrency(data.currency || "UGX");

    } catch (err: any) {
      setError(err.message || "Could not fetch currency");
      setCurrency("UGX"); // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  return { currency, loading, error, refetch: fetchCurrency };
}
