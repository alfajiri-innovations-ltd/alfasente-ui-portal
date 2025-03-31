export interface IClient {
  clientName: string;
  walletBalance: number;
  isApproved?: string;
  clientEmail: string;
  physicalAddress: string;
  clientPhoneNumber: string;
  clientID?: number;
  date_of_birth: string;
  walletID: {
    walletID: number,
    airtelWalletBalance: string,
    mtnWalletBalance: string,
    totalWalletBalance: string
}

  certificateOfIncorparation: string;

  userId?: IUsers;
}

export interface IUsers {
  firstName: string;
  lastName: string;
  user_email: string;
  date_of_birth: string;
  userId: number;

  role_name: {
    roleId: number;
    roleName: string;
  };
  createdAt?: string;
  status: string;
  clientID?:number
}

export interface IUser {
  firstName: string;
  lastName: string;
  user_email: string;
  date_of_birth: string;
  userId: number;

  role_name:string;
  createdAt?: string;
  status: string;
  clientID?:number
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

export interface listsWithMembers {
  members: IMembers[];
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  status: string;
}
[];

export interface IDetails {
  accountNumber: string;
  amount: string;
  network: string;
}


export interface IAuditLogs {
 created_by: string;
  role: string;
  created_at: string;
  event: string;
  organization: {
                organization_id: number,
                organization_name: string
            },
}


export interface ITransaction{
  clientID: number;
  beneficiaryMobileNumber?: string;
  sourceOfFunds?: string;
  transactionID: string;
  mainAmount: string;
  airtelCharge?:number;
  mtnCharge?:number;
  proofOfCredit?:string;
  airtelWalletBalance?:number;
  mtnWalletBalance?:number;
  beneficiaryName?:string;

  
  transactionType: string;
  alfasenteCharge?: number;
  currency: string;
  narration: string;
  status: string;
  liquidationDate: Date;
  recordDate: Date;
}


export interface IWallet{

  walletID: number
  airtelWalletBalance:string,
  "mtnWalletBalance": "0",
  "totalWalletBalance": "0"

}