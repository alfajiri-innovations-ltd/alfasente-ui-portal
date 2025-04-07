import { listsWithMembers } from "@/lib/interfaces/interfaces";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MembersTable } from "./Tables/MembersTable";
import { ScrollArea } from "@/components/ui/scroll-area"

import { CalculateCharge } from "@/lib/services/CalculateCharge";

import {GetClient} from "@/lib/services/GetClientById"




interface PaymentOverViewProps {
  list: listsWithMembers;
}
function PaymentOverView({ list }: PaymentOverViewProps) {

  console.log(list.id
  );

  const client= GetClient();

  const Wallet =client?.walletID;
  const Charges =CalculateCharge(list.id);

  console.log("----->Wallet",Wallet);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
        <div className="border flex items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md">
          <div className="bg-red-600 rounded-full w-8 h-8 items-center object-cover overflow-hidden flex justify-center">
            <img src="/images/logos/Airtel.svg" alt="Airtel" />
            </div>
            <span>UGX {Wallet?.airtelWalletBalance}
            </span>
        </div>

        <div className="border flex items-center justify-between bg-[#FBFDFF] border-[#848EA2] grow p-2 rounded-md">
          <div className="bg-yellow-400 rounded-full w-8 h-8 items-center overflow-hidden object-cover flex justify-center">
            <img src="/images/logos/MTN.svg" alt="MTN" />
          </div>
          <span>UGX {Wallet?.mtnWalletBalance
          }</span>
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
          <span className="text-[#000000CC] font-bold">UGX {Wallet?.mtnWalletBalance
          }</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Airtel Amount</span>
          <span className="text-[#000000CC] font-bold">UGX {Wallet?.airtelWalletBalance}</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Airtel charges</span>
          <span className="text-[#000000CC] font-bold">UGX {Charges?.
airtelCharges}</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Mtn charges</span>
          <span className="text-[#000000CC] font-bold">UGX {Charges?.mtnCharges
          }</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Service fee</span>
          <span className="text-[#000000CC] font-bold">UGX {Charges?.alfasenteCharge
          }</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Total cost</span>
          <span className="text-[#000000CC] font-bold">UGX {Charges?.
overallTotal}</span>
        </div>
      </div>

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

            <MembersTable members={list.members}/>
            </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default PaymentOverView;
