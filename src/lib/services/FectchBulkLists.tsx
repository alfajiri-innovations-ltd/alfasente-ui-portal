import useSWR from "swr";
import { BulkList } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { FetchClientBulkLists } from "../api-routes";

const fetcherWithAuth = (url: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${getUserToken()}` },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed request");
    return res.json();
  });

export function useClientBulkLists() {
  const clientId = getAuthUser()?.clientID;

  const {
    data: bulkLists,
    error,
    isLoading,
    mutate,
  } = useSWR<BulkList[]>(
    clientId ? FetchClientBulkLists(clientId) : null,
    fetcherWithAuth
  );

  return {
    data: bulkLists,
    isLoading,
    error,
    mutate,
  };
}
