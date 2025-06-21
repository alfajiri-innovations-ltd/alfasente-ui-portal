import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MembersTable } from "./Tables/MembersTable";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useCalculateCharge } from "@/lib/services/CalculateCharge";

import { GetClient } from "@/lib/services/GetClientById";
import { formatMoney } from "@/lib/utils";
import { useEffect } from "react";

interface PaymentOverViewProps {
  list: any;
  showErrorMessage:React.Dispatch<React.SetStateAction<boolean>>;
  // onClose?: () => void;
}
function PaymentOverView({ list ,showErrorMessage}: PaymentOverViewProps) {
  const client = GetClient();

  const Wallet = client?.walletID;
  
  
  

  const ClientID = list.clientID.clientID;

  const Charges = useCalculateCharge({
    listId: list.id,
    clientId: ClientID,
  });

  useEffect(() => {

    if( Charges?.errorMessage) {
      showErrorMessage(true);
    }
  })

  
  return (
    <div className="space-y-1 md:h-[350px] overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between gap-3">
        <div className="border flex items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md">
          <div className="bg-red-600 rounded-full w-8 h-8 items-center object-cover overflow-hidden flex justify-center">
            <img src="/images/logos/Airtel.svg" alt="Airtel" />
          </div>
          <span>{formatMoney(Wallet?.airtelWalletBalance ?? 0)}</span>
        </div>

        <div className="border flex items-center justify-between bg-[#FBFDFF] border-[#848EA2] grow p-2 rounded-md">
          <div className="bg-yellow-400 rounded-full w-8 h-8 items-center overflow-hidden object-cover flex justify-center">
            <img src="/images/logos/MTN.svg" alt="MTN" />
          </div>
          <span> {formatMoney(Wallet?.mtnWalletBalance ?? 0)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span>Beneficiary List</span>
          <span className="text-[#000000CC] font-bold capitalize">
            {list?.name}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>MTN Amount</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Wallet?.mtnWalletBalance ?? 0)}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Airtel Amount</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Wallet?.airtelWalletBalance ?? 0)}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Airtel charges</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.airtelCharges ?? 0)}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Mtn charges</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.mtnCharges ?? 0)}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Service fee</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.alfasenteCharge ?? 0)}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Total cost</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.overallTotal ?? 0)}
          </span>
        </div>

         {Charges?.errorMessage && (
          <div className="text-red-600 text-sm">
            {Charges.errorMessage}
      </div>
        )}

       

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div>
                <span className="capitalize">{list.name}</span>
                <span>({list.members.length} members)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] scrollbar-hidden">
                <MembersTable members={list.members} />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
      </div>
  );
}

export default PaymentOverView;
