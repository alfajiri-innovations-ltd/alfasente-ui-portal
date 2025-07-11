import { ITransaction } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { GetaTransactionsByOrganization } from "../api-routes";


export const organizationService = {
  token: getUserToken(),
  clientId: getAuthUser()?.clientID ?? 0,
  transactionUrlData: GetaTransactionsByOrganization(getAuthUser()?.clientID ?? 0),
  organizationData: async function (): Promise<ITransaction[]> {
    console.log(this.clientId);
    const response = await fetch(this.transactionUrlData, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      redirect: 'follow'
    });

    if (response.ok === false) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      console.log(data);
      return data.transactions;
    }
  }
}
// GetOrganizationTransactions() {
// const [Transactions, setTransactions] = useState<ITransaction[]>([]);
// const [loadingTrasactions, setLoadingTransactions] = useState(false);
// const token = getUserToken();
// const clientID = getAuthUser().clientID;
// const { } = useSWR(GetaTransactionsByOrganization(clientID), );
//   useEffect(() => {
//     (async function () {
//       setLoadingTransactions(true);
//       try {
//         const response = await fetch(GetaTransactionsByOrganization(clientID), {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();

//           console.log(data);

//           setTransactions(data.transactions);
//           setLoadingTransactions(false);
//         }
//       } catch (error) {
//         console.log(error);
//         setLoadingTransactions(false);
//       }
//     })();
//   }, [clientID, token]);

//   return { Transactions, loadingTrasactions };
// }
