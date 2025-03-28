import { listsWithMembers } from "@/lib/interfaces/interfaces";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MembersTable } from "./Tables/MembersTable";
import { ScrollArea } from "@/components/ui/scroll-area"


interface PaymentOverViewProps {
  list: listsWithMembers;
}
function PaymentOverView({ list }: PaymentOverViewProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
        <div className="border flex items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md">
          <div className="bg-red-600 rounded-full w-8 h-8 items-center object-cover overflow-hidden flex justify-center">
            <img src="/images/logos/Airtel.svg" alt="Airtel" />
          </div>
          <span>UGX 500,000</span>
        </div>

        <div className="border flex items-center justify-between bg-[#FBFDFF] border-[#848EA2] grow p-2 rounded-md">
          <div className="bg-yellow-400 rounded-full w-8 h-8 items-center overflow-hidden object-cover flex justify-center">
            <img src="/images/logos/MTN.svg" alt="MTN" />
          </div>
          <span>UGX 500,000</span>
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
          <span className="text-[#000000CC] font-bold">UGX 500,000</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Airtel Amount</span>
          <span className="text-[#000000CC] font-bold">UGX 500,000</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Airtel charges</span>
          <span className="text-[#000000CC] font-bold">UGX 2,000</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Mtn charges</span>
          <span className="text-[#000000CC] font-bold">UGX 2,000</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Service fee</span>
          <span className="text-[#000000CC] font-bold">UGX 2,000</span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Total cost</span>
          <span className="text-[#000000CC] font-bold">UGX 2,309,000</span>
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
