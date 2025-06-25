// import { useEffect, useState } from "react";
// import { IList, IMembers, listsWithMembers } from "../interfaces/interfaces";
// import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
// import { FetchClientLists, GetMembersByListId } from "../api-routes";

// export function GetLists() {
//   const [lists, setLists] = useState<listsWithMembers[]>([]);
//   const token = getUserToken();
//   const clientId = getAuthUser().clientID;

//   useEffect(() => {
//     const fetchListsWithMembers = async () => {
//       try {
//         const response = await fetch(FetchClientLists(clientId), {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch client lists");
//         }

//         const listsData: IList[] = await response.json();

//         const listsWithMembers = await Promise.all(
//           listsData.map(async (list) => {
//             try {
//               const membersResponse = await fetch(GetMembersByListId(list.id), {
//                 headers: { Authorization: `Bearer ${token}` },
//               });

//               if (!membersResponse.ok) {
//                 throw new Error(`Failed to fetch members for list ${list.id}`);
//               }

//               const membersData: IMembers[] = await membersResponse.json();
//               return { ...list, members: membersData };
//             } catch (error) {
//               console.error(error);
//               return { ...list, members: [] };
//             }
//           })
//         );

//         setLists(listsWithMembers);
//       } catch (error) {
//         console.error("Error fetching lists:", error);
//       }
//     };

//     fetchListsWithMembers();
//   }, [clientId, token]);

//   return lists;
// }

import useSWR from "swr";
import { IList, IMembers, listsWithMembers } from "../interfaces/interfaces";
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
  const clientId = getAuthUser().clientID;
  const { data: lists, error, isLoading,mutate } = useSWR<listsWithMembers[]>(
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
      revalidateOnFocus: false, // Optional: prevents refetching when tab is focused
    }
  );

  return {
    data: listsWithMembers,
    isLoading: isLoading || loadingMembers,
    error: error || memberError,
    mutate, //
  };
}
