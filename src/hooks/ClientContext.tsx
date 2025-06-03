// context/ClientContext.tsx
import { IClient } from "@/lib/interfaces/interfaces";
import { createContext, useContext, useState, ReactNode } from "react";



interface ClientContextType {
  clientData: IClient | null;
  setClientData: (data: IClient) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clientData, setClientData] = useState<IClient | null>(null);

  return (
    <ClientContext.Provider value={{ clientData, setClientData }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error("useClientContext must be used within ClientProvider");
  return context;
};
