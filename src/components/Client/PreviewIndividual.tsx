import { IMembers } from "@/lib/interfaces/interfaces";

import { useCalculateCharge } from "@/lib/services/CalculateCharge";

import { GetClient } from "@/lib/services/GetClientById";
import { Button } from "../ui/button";
import { FundWallet } from "./FundWalletDialog";

interface PaymentOverViewProps {
  beneficiary: IMembers;
  onClose?: () => void;
}
function PaymentOverViewIndividual({
  beneficiary,
}: PaymentOverViewProps) {
  const client = GetClient();

  const clientId = client?.clientID;
  const Charges = useCalculateCharge({ beneficiary, clientId: clientId || 0 });

  const Wallet = client?.walletID;

  return (
    <div className="">
      <div className="flex items-center justify-between gap-3">
        {Charges?.airtelCharges > 0 ? (
          <div className="border flex items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md">
            <div className="bg-red-600 rounded-full w-8 h-8 items-center object-cover overflow-hidden flex justify-center">
              <img src="/images/logos/Airtel.svg" alt="Airtel" />
            </div>
            <span>UGX {Wallet?.airtelWalletBalance}</span>
          </div>
        ) : (
          <div className="border flex items-center justify-between bg-[#FBFDFF] border-[#848EA2] grow p-2 rounded-md">
            <div className="bg-yellow-400 rounded-full w-8 h-8 items-center overflow-hidden object-cover flex justify-center">
              <img src="/images/logos/MTN.svg" alt="MTN" />
            </div>
            <span>UGX {Wallet?.mtnWalletBalance}</span>
          </div>
        )}
      </div>
      {Charges?.errorMessage && (
        <div className="mt-2">
          <span className="text-red-500 text-xs cursor-pointer">
            {Charges?.errorMessage}
          </span>
          <FundWallet  />
        </div>
      )}

      <div className="flex flex-col gap-3 my-3">
        <div className="flex justify-between items-center">
          <span>Beneficiary name</span>
          <span className="text-[#000000CC] font-bold capitalize">
            {beneficiary?.beneficiaryName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Mobile Number</span>
          <span className="text-[#000000CC] font-bold">
            {beneficiary?.mobileMoneyNumber}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Amount</span>
          <span className="text-[#000000CC] font-bold">
            UGX {beneficiary?.amount}
          </span>
        </div>

        {Charges?.airtelCharges > 0 ? (
          <div className="flex justify-between  items-center">
            <span>Airtel charges</span>
            <span className="text-[#000000CC] font-bold">
              UGX {Charges?.airtelCharges}
            </span>
          </div>
        ) : (
          <div className="flex justify-between  items-center">
            <span>Mtn charges</span>
            <span className="text-[#000000CC] font-bold">
              UGX {Charges?.mtnCharges}
            </span>
          </div>
        )}

        <div className="flex justify-between  items-center">
          <span>Service fee</span>
          <span className="text-[#000000CC] font-bold">
            UGX {Charges?.alfasenteCharge}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Total cost</span>
          <span className="text-[#000000CC] font-bold">
            UGX {Charges?.overallTotal}
          </span>
        </div>
      </div>
      <Button className="w-full mt-5">Send</Button>
    </div>
  );
}

export default PaymentOverViewIndividual;
