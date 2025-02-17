export const CreateUser = `${import.meta.env.VITE_BACKEND_API_URL}/user`;

export const CreateClient = `${import.meta.env.VITE_BACKEND_API_URL}/client`;

export const VerifyEmail = `${import.meta.env.VITE_BACKEND_API_URL}/verifyEmail`;

export const LogIn = `${import.meta.env.VITE_BACKEND_API_URL}/login`;

export const ForgotPassword = `${import.meta.env.VITE_BACKEND_API_URL}/forgotpassword`;

export const VerifyPasswordOtp = `${import.meta.env.VITE_BACKEND_API_URL}/verifyPasswordOtp`;

export const ResetPassword = `${import.meta.env.VITE_BACKEND_API_URL}/resetpassword`;

export const FetchUser = (user_email: string) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/user/${user_email}`;

export const FetchClient = (clientId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/client/${clientId}`;

export const UploadList = `${import.meta.env.VITE_BACKEND_API_URL}/uploadList`;

export const FetchClientLists = (clientId: number) =>
  `${import.meta.env.VITE_BACKEND_API_URL}/getListsByClientId?clientID=${clientId}`;

export const FetchAllOrganizations = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/getallclients`;

export const ApproveClient = () =>
  `${import.meta.env.VITE_BACKEND_API_URL}/approveClient`;
