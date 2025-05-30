import { useEffect, useState } from "react";
import { IList, IMembers, listsWithMembers } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { FetchClientLists, GetMembersByListId } from "../api-routes";

export function GetLists() {
  const [lists, setLists] = useState<listsWithMembers[]>([]);
  const token = getUserToken();
  const clientId = getAuthUser().clientID;

  useEffect(() => {
    const fetchListsWithMembers = async () => {
      try {
        const response = await fetch(FetchClientLists(clientId), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch client lists");
        }

        const listsData: IList[] = await response.json();

        const listsWithMembers = await Promise.all(
          listsData.map(async (list) => {
            try {
              const membersResponse = await fetch(GetMembersByListId(list.id), {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (!membersResponse.ok) {
                throw new Error(`Failed to fetch members for list ${list.id}`);
              }

              const membersData: IMembers[] = await membersResponse.json();
              return { ...list, members: membersData };
            } catch (error) {
              console.error(error);
              return { ...list, members: [] };
            }
          })
        );

        setLists(listsWithMembers);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchListsWithMembers();
  }, [clientId, token]);

  return lists;
}
