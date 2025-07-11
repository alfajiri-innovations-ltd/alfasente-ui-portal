

import useSWR from "swr";
import { IMembers, listsWithMembers } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { FetchClientLists, GetMembersByListId } from "../api-routes";

const fetcherWithAuth = (url: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${getUserToken()}` },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed request");
    return res.json();
  });

export function useClientListsWithMembers() {
  const clientId = getAuthUser()?.clientID;
  const { data: lists, error, isLoading, mutate } = useSWR<listsWithMembers[]>(
    clientId ? FetchClientLists(clientId) : null,
    fetcherWithAuth
  );

  const { data: listsWithMembers, error: memberError, isLoading: loadingMembers } = useSWR<listsWithMembers[]>(
    lists ? `members-for-client-${clientId}` : null,
    async () => {
      if (!lists) return [];

      const token = getUserToken();

      const all = await Promise.all(
        lists.map(async (list) => {
          try {
            const res = await fetch(GetMembersByListId(list.id), {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch members");

            const members: IMembers[] = await res.json();
            return { ...list, members };
          } catch (err) {
            console.error(err);
            return { ...list, members: [] };
          }
        })
      );

      return all;
    },
    {
      revalidateOnFocus: true, // Optional: prevents refetching when tab is focused
    }
  );

  return {
    data: listsWithMembers,
    isLoading: isLoading || loadingMembers,
    error: error || memberError,
    mutate, //
  };
}
