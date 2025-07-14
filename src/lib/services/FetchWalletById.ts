// import { useEffect, useState } from "react";

// import {  IWallet } from "../interfaces/interfaces";
// import { getUserToken } from "../cookies/UserMangementCookie";
// import {  GetWalletById } from "../api-routes";
// import { GetClient } from "./GetClientById";

// export function GetWallet() {
//   const [Wallet, setWallet] = useState<IWallet[]>([]);
//   const token = getUserToken();

// const client= GetClient();
// console.log("---->Client",client)
// const WalletID=client?.walletID?.walletID;

//   useEffect(() => {
//     const fetchwallet = async () => {
//       try {

// const response = await fetch(GetWalletById(WalletID), {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();

//           console.log(data);

//           setWallet(data);
//         } else {
//         }
//       } catch (error) {}
//     };

//     fetchwallet();
//   }, []);

//   return Wallet;
// }
