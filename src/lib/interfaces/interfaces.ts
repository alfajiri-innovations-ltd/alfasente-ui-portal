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
}
