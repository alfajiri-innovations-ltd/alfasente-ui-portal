import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ITransaction } from "./interfaces/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoleLabel = (role: string) => {
  switch (role) {
    case "client_admin":
      return "Admin";
    case "client_employee":
      return "Employee";
    case "System":
      return "___";
    default:
      return "Unknown";
  }
};
export function truncateUUID(uuid: string, length: number = 10): string {
  if (!uuid) {
    console.error("truncateUUID received an undefined or null value.");
    return ""; 
}
return uuid.slice(0, length);
}

export const formatDateTime = (dateStringOrDate: string | Date) => {
  const dateObj = typeof dateStringOrDate === "string" ? new Date(dateStringOrDate) : dateStringOrDate;
  
  if (isNaN(dateObj.getTime())) {
    return { date: "Invalid Date", time: "" };
  }

  const date = dateObj.toISOString().split("T")[0]; 
  const time = dateObj.toTimeString().split(" ")[0].slice(0, 5); 

  return { date, time };
};


export const getTotalCost = (transaction: ITransaction) => {
    const mainAmount = parseFloat(transaction?.mainAmount || "0");
    const alfasenteCharge = (transaction?.alfasenteCharge);
    const mtnCharge = (transaction?.mtnCharge);
    const airtelCharge = (transaction?.airtelCharge);
  
    const telecomCharge = (mtnCharge ?? 0) > 0 ? mtnCharge ?? 0 : airtelCharge ?? 0;
    return mainAmount + (alfasenteCharge ?? 0) + telecomCharge;
  };


  export function formatMoney(amount: number | string, currency: string = "UGX"): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) return `${currency} 0`;

  return `${currency} ${num.toLocaleString("en-UG")}`;
}





