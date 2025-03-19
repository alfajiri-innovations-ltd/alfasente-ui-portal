export interface IClient {
  clientName: string;
  walletBalance: number;
  isApproved?: string;
  clientEmail: string;
  physicalAddress: string;
  clientPhoneNumber: string;
  clientID?: number;

  certificateOfIncorparation: string;

  userId?: IUsers;
}

export interface IUsers {
  firstName: string;
  lastName: string;
  user_email: string;
  date_of_birth: string;
  role_name: {
    roleId: number;
    roleName: string;
  };
  createdAt?: string;
  status: string;
}
export interface IMembers {
  beneficiaryName: string;
  reason: string;
  amount: number;
  mobileMoneyNumber: string;
  serviceProvider?: string;
}

export interface IList {
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  status: string;
  members: string;
}

export interface listsWithMembers{
  members: IMembers[];
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  status: string;
}[]


export interface IDetails{
  accountNumber:string,
  amount:string,
  network:string
}
