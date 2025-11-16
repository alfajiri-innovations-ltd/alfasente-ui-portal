import { useEffect, useState } from "react";
import { IList, IMembers } from "../interfaces/interfaces";
import { GetListbyId, GetMembersByListId } from "../api-routes";
import { getUserToken } from "../cookies/UserMangementCookie";

export function GetList(listId: number) {
  const [list, setList] = useState<IList | null>(null);
  const [members, setMembers] = useState<IMembers[] | null>([]);
  const token = getUserToken();

  useEffect(() => {
    const fetchListWithMembers = async () => {
      try {
        const listResponse = await fetch(`${GetListbyId(listId)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!listResponse.ok) {
          throw new Error("Failed to fetch list");
        }


        const listData = await listResponse.json();

        const membersResponse = await fetch(`${GetMembersByListId(listId)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(membersResponse);

        if (!membersResponse.ok) {
          throw new Error("Failed to fetch members");
        }

        const membersData = await membersResponse.json();

        setList({ ...listData, members: membersData });
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchListWithMembers();
  }, [listId, token]);

  return { list, members };
}
