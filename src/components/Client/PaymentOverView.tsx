
import { useCurrency } from "@/hooks/useCurrency";
import { getRandomColor } from "./Tables/MembersTable";

import { useCalculateCharge } from "@/lib/services/CalculateCharge";

import { GetClient } from "@/lib/services/GetClientById";
import { formatMoney } from "@/lib/utils";
import { useEffect } from "react";
import { HiMiniUsers } from "react-icons/hi2";

interface PaymentOverViewProps {
  list: any;
  showErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount:React.Dispatch<React.SetStateAction<number>>;
  // onClose?: () => void;
}
function PaymentOverView({ list, showErrorMessage,setAmount }: PaymentOverViewProps) {
  const client = GetClient();
  const { currency: airtelCurrency } = useCurrency();
  const Wallet = client?.walletID;

  const ClientID = list.clientID.clientID;

  const Charges = useCalculateCharge({
    listId: list.id,
    clientId: ClientID,
  });
  

  setAmount(Charges?.overallTotal)

  useEffect(() => {
    if (Charges?.errorMessage) {
      showErrorMessage(true);
    }
  });

  return (
    <div className="space-y-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between gap-2  bg-[#F7F9FD] border rounded-md p-4 border-[#DCE1EC]">
        <div className="flex items-center gap-3">
          <span className="rounded-full border    flex justify-center items-center p-1.5">
            <HiMiniUsers
              style={{
                fill: getRandomColor(),
              }}
            />
          </span>
          <span className="capitalize font-medium text-base">{list.name}</span>
        </div>

        <span>{list.members.length} beneficiaries</span>
      </div>

      <div className="flex flex-col justify-between border rounded-md border-[#DCE1EC] p-4">
        <h3 className="font-semibold text-lg mb-2">Current Wallet Balances</h3>
        <div className="flex justify-between items-center gap-3">
          <div
            className={` flex border  items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md `}
          >
           <div className="flex items-center gap-3">

             <div className="bg-red-600 rounded-full w-8 h-8 items-center object-cover overflow-hidden flex justify-center">
              <img src="/images/logos/Airtel.svg" alt="Airtel" />
            </div>
                          <span>Airtel</span>

           </div>
            <span>{formatMoney(Wallet?.airtelWalletBalance ?? 0,airtelCurrency)}</span>
          </div>

          <div
            className={`flex border  items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md `}
          >
          <div className="flex items-center gap-3">
              <div className="bg-yellow-400 rounded-full w-8 h-8 items-center overflow-hidden object-cover flex justify-center">
              <img src="/images/logos/MTN.svg" alt="MTN" />
            </div>
            <span>MTN</span>
          </div>
            <span> {formatMoney(Wallet?.mtnWalletBalance ?? 0,airtelCurrency)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col border border-[#DCE1EC] p-4 rounded-md">
        <div className="flex">
          <span className="font-semibold text-lg">Airtel Breakdown</span>
        </div>{" "}
        <div className="h-[.7px] border border-[#E4E8F1] my-2"></div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>Amount to Beneficiaries</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.airtelRawTotal ?? 0,airtelCurrency)}
            </span>{" "}
          </div>

          <div className="flex justify-between items-center">
            <span>Charges</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.airtelCharges ?? 0,airtelCurrency)}
            </span>{" "}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.airtelTotal ?? 0,airtelCurrency)}
            </span>{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-col border border-[#DCE1EC] p-4 rounded-md">
        <div className="flex">
          <span className="font-semibold font-lg">Mtn Breakdown</span>
        </div>{" "}
        <div className="h-[.7px] border border-[#E4E8F1] my-2"></div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>Amount to Beneficiaries</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.mtnRawTotal ?? 0,airtelCurrency)}
            </span>{" "}
          </div>

          <div className="flex justify-between items-center">
            <span>Charges</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.mtnCharges ?? 0,airtelCurrency)}
            </span>{" "}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.mtnTotal ?? 0,airtelCurrency)}
            </span>{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-col border border-[#DCE1EC] p-4 rounded-md">
        <div className="flex ">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">Payment summary</span>
            <p className="text-[13px] text-[#5C6474]">Processing AIRTEL and MTN payments</p>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>Total to Beneficiaries</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.airtelRawTotal + Charges?.mtnRawTotal,airtelCurrency)}
            </span>{" "}
          </div>

          <div className="flex justify-between items-center">
            <span>Platform Charges</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.alfasenteCharge ?? 0,airtelCurrency)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>Total Charges</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(
                Charges?.airtelCharges +
                  Charges?.mtnCharges +
                  Charges?.alfasenteCharge,airtelCurrency
              )}
            </span>{" "}
          </div>

          <div className="h-[.7px] border border-[#E4E8F1] my-2"></div>

          <div className="flex justify-between items-center">
            <span className="font-bold">Grand Total</span>
            <span className="text-[#000000CC] font-bold">
              {formatMoney(Charges?.overallTotal ?? 0,airtelCurrency)}
            </span>
          </div>
        </div>
      </div>

      {/* {Charges?.errorMessage && (
        <div
          onClick={() => {
            navigate("/fundwallet");
          }}
          className="flex px-2 h-10 cursor-pointer gap-1 w-32  items-center bg-primary text-white text-[15px] rounded-[8px]"
        >
          <Wallet2 className="h-4 w-4" />
          <span>Fund Wallet</span>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-3">
        <div className="flex justify-between items-center">
          <span>Beneficiary List</span>
          <span className="text-[#000000CC] font-bold capitalize">
            {list?.name}
          </span>
        </div>
        <div
          className={` justify-between items-center ${Charges?.mtnRawTotal ? "flex" : "hidden"}`}
        >
          <span>Total Mtn Payout</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.mtnRawTotal ?? 0)}
          </span>
        </div>
        <div
          className={` justify-between items-center ${Charges?.airtelRawTotal ? "flex" : "hidden"}`}
        >
          <span>Total Airtel Payout</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.airtelRawTotal ?? 0)}
          </span>
        </div>
        <div
          className={` justify-between items-center ${Charges?.airtelCharges ? "flex" : "hidden"}`}
        >
          <span>Airtel charges</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.airtelCharges ?? 0)}
          </span>
        </div>
        <div
          className={` justify-between items-center ${Charges?.mtnCharges ? "flex" : "hidden"}`}
        >
          <span>Mtn charges</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.mtnCharges ?? 0)}
          </span>
        </div>
        <div
          className={` justify-between items-center ${Charges?.mtnTotal ? "flex" : "hidden"}`}
        >
          <span>Total Mtn Amount</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.mtnTotal ?? 0)}
          </span>
        </div>
        <div
          className={` justify-between items-center ${Charges?.airtelTotal ? "flex" : "hidden"}`}
        >
          <span>Total Airtel Amount</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.airtelTotal ?? 0)}
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
          <div className="text-red-600 text-sm">{Charges.errorMessage}</div>
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
      </div> */}
    </div>
  );
}

export default PaymentOverView;
