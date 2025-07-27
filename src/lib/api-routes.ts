export const CreateUser = `${import.meta.env.VITE_BACKEND_API_URL}/user`;

export const InviteUser = `${import.meta.env.VITE_BACKEND_API_URL}/invite-user`;

export const CreateClient = `${import.meta.env.VITE_BACKEND_API_URL}/client`;

export const VerifyEmail = `${import.meta.env.VITE_BACKEND_API_URL}/verifyEmail`;

export const LogIn = `${import.meta.env.VITE_BACKEND_API_URL}/login`;

export const ForgotPassword = `${import.meta.env.VITE_BACKEND_API_URL}/forgotpassword`;

export const VerifyPasswordOtp = `${import.meta.env.VITE_BACKEND_API_URL}/verifyPasswordOtp`;

export const ResetPassword = `${import.meta.env.VITE_BACKEND_API_URL}/resetpassword`;

export const FetchUser = (user_email: string) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/user/${user_email}`;

export const GetUserById = (userId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/user/${userId}`;

export const FetchClient = (clientId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/client/${clientId}`;

export const UploadList = `${import.meta.env.VITE_BACKEND_API_URL}/uploadList`;

export const FetchClientLists = (clientId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/getListsByClientId?clientID=${clientId}`;

export const FetchAllOrganizations = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/getallclients`;

export const ApproveClient = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/approveClient`;

export const RejectClient = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/rejectClient`;

export const GetListbyId = (listId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/getList/${listId}`;

export const GetMembersByListId = (listId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/mnobeneficiaries/${listId}`;

export const GetUsersByClientId = (clientId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/users/${clientId}`;

export const RejectList = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/rejectList`;

export const ApproveListEndPoint = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/approveList`;

export const RenameList = (listID: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/renameList/${listID}`;

export const GetAuditLogsByOrganization = (clientID: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/auditlogs/organization/${clientID}`;

export const GetAllAuditLogs = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/auditlogs`;

export const GetaTransactionsByOrganization = (clientID: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/transactions/${clientID}`;

export const GetAllTransactions = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/transactions`;

export const GetTransactionById = (transactionID: string) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/transaction/${transactionID}`;

export const GetWalletById = (walletID: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/wallet/${walletID}`;

export const CalculateChargeByListId = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/calculate-charge`;

export const CollectMoney = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/collect-money`;

export const SendMoney = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/sendmoney`;

export const ManualTopUp = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/manual-top`;

export const CheckListName = (listName: string, clientId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/checkListName/${listName}/${clientId}`;

export const UpdateBeneficiary = (beneficiaryId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/mnobeneficiary/${beneficiaryId}`;

export const DeleteBeneficiaryRoute = (beneficiaryId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/mnobeneficiary/${beneficiaryId}`;

export const VerifyLoginOtp = `${import.meta.env.VITE_BACKEND_API_URL}/verifyLoginEmail`;
