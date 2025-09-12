// import { useEffect, useState } from "react";


// import {  GetUserDetails } from "../api-routes";

// export function FetchUserDetails(msisdn: string) {
//   const [user, setUser] = useState<unknown>();

//   useEffect(() => {
//     const fetchuser = async () => {
//       try {
//         const response = await fetch(GetUserDetails(msisdn));
//         if (response.ok) {
//           const data = await response.json();

//           setUser(data);
//         } else {
//         }
//       } catch (error) {}
//     };

//     fetchuser();
//   }, []);

//   return user;
// }
// services/FetchUserDetails.ts
import { GetUserDetails } from "../api-routes";

export async function FetchUserDetails(msisdn: string) {
  const response = await fetch(GetUserDetails(msisdn));
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}
