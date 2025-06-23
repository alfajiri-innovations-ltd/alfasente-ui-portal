export interface IClient {
  clientName: string;

  isApproved?: string;
  clientEmail: string;
  physicalAddress: string;
  clientPhoneNumber: string;
  clientID?: number;
  alfasenteCharge?: number;
   created_at?:Date;
  dateRejected?: Date;
  dateApproved?: Date;
  // date_of_birth?: string;
  walletID?: {
    walletID: number;
    airtelWalletBalance: number;
    mtnWalletBalance: number;
    totalWalletBalance: number;
  };

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
  clientID?: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  user_email: string;
  date_of_birth: string;
  userId: number;

  role_name: string;
  createdAt?: string;
  status: string;
  clientID?: number;
}
export interface IMembers {
  beneficiaryId?: number;
  beneficiaryName: string;
  reason: string;
  amount: number;
  mobileMoneyNumber: string;
  serviceProvider?: string;
  clientID?: number;
}

export interface IList {
  id: number;
  name: string;
  createdAt: string;
  clientID: number;
  createdBy: string;
  status: string;
  members?: string;
}

export interface listsWithMembers {
  members: IMembers[];
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  status: string;
  clientID: number;
}

export interface IDetails {
  accountNumber: string;
  amount: number;
  network: string;
 
  totalFee?: number;
  transaction_id?:string;
}

export interface IAuditLogs {
  created_by: string;
  role: string;
  created_at: string;
  event: string;
  organization: {
    organization_id: number;
    organization_name: string;
  };
}

export interface ITransaction {
  clientID: number;
  beneficiaryMobileNumber?: string;
  sourceOfFunds?: string;
  transactionID: string;
  mainAmount: string;
  airtelCharge?: number;
  mtnCharge?: number;
  organizationName?: string;
  userName?: string;
  proofOfCredit?: string;
  airtelWalletBalance?: number;
  mtnWalletBalance?: number;
  beneficiaryName?: string;
  OrganisationName?: string;

  transactionType: string;
  alfasenteCharge?: number;
  currency: string;
  narration: string;
  status: string;
  liquidationDate: Date;
  recordDate: Date;
}

export interface IWallet {
  walletID: number;
  airtelWalletBalance: string;
  mtnWalletBalance: string;
  totalWalletBalance: string;
}
