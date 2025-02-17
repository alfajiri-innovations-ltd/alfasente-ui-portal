export interface IClient {
  clientName: string;
  walletBalance: number;
  isApproved?: string;
  clientEmail: string;
  physicalAddress: string;
  clientPhoneNumber: string;
  clientID?: number;

  certificateOfIncorparation: string;

  userId?: IUser;
}

export interface IUser {
  firstName: string;
  lastName: string;
  userId: number;
  clientId?: number;
  role_name: string;
  user_email: string;
}
export interface IMembers {
  beneficiaryName: string;
  reason: string;
  amount: number;
  mobileMoneyNumber: string;
}

export interface IList {
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  status: string;
  members: IMembers[];
}
