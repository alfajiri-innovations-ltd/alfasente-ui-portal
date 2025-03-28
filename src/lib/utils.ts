import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
