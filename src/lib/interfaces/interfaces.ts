export interface IClient {
  clientName: string;
  walletBalance: number;
  isApproved: boolean;
  clientEmail: string;
  physicalAddress: string;
  clientPhoneNumber: string;

  certificateOfIncorparation: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  userId: number;
  clientId?: number;
  role_name?: string;
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
