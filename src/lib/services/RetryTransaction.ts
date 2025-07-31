import { RetryTransactionById } from "../api-routes";

export const retryTransaction = async (
  token: string,
  payload: { transactionIDs?: string[],transactionID?: string }
) => {
  const response = await fetch(RetryTransactionById(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Retry failed.");
  }

  return result;
};
