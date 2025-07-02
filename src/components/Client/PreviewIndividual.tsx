import { IMembers, IUser } from "@/lib/interfaces/interfaces";

import { useCalculateCharge } from "@/lib/services/CalculateCharge";

import { GetClient } from "@/lib/services/GetClientById";
import { Button } from "../ui/button";
import { formatMoney } from "@/lib/utils";
import { getAuthUser, getUserToken } from "@/lib/cookies/UserMangementCookie";
import { useEffect, useState } from "react";
import { SendMoney } from "@/lib/api-routes";
import { Wallet2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface PaymentOverViewProps {
  beneficiary: IMembers;
  onClose?: () => void;
}
function PaymentOverViewIndividual({ beneficiary }: PaymentOverViewProps) {
  const client = GetClient();
  const token = getUserToken();
  const [loggedInUser, setLoggedInUser] = useState<IUser>();

  const [submitting, setSubmitting] = useState(false);
  const clientId = client?.clientID;

  const navigate = useNavigate();
  const Charges = useCalculateCharge({ beneficiary, clientId: clientId || 0 });

  useEffect(() => {
    const authUser = getAuthUser();
    setLoggedInUser(authUser);
  }, []);

  const Wallet = client?.walletID;

  const onSubmit = async () => {
    setSubmitting(true);
    const payer = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

    const payload = {
      member: {
        beneficiaryName: beneficiary.beneficiaryName,
        mobileMoneyNumber: beneficiary.mobileMoneyNumber.slice(1),
        amount: beneficiary.amount.toString(),
        reason: beneficiary.reason,
        serviceProvider: Charges?.airtelCharges > 0 ? "Airtel" : "MTN",
      },

      clientID: clientId,
      payer,
    };

    try {
      const response = await fetch(SendMoney(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: `${result.message}`,
        });
      }

      toast({
        variant: "success",
        description: "Money sent Successfully",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to send money",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between gap-3">
        {Charges?.airtelCharges > 0 ? (
          <div className="border flex items-center justify-between grow bg-[#FBFDFF] border-[#848EA2] p-2 rounded-md">
            <div className="bg-red-600 rounded-full w-8 h-8 items-center object-cover overflow-hidden flex justify-center">
              <img src="/images/logos/Airtel.svg" alt="Airtel" />
            </div>
            <span>{formatMoney(Wallet?.airtelWalletBalance ?? 0)}</span>
          </div>
        ) : (
          <div className="border flex items-center justify-between bg-[#FBFDFF] border-[#848EA2] grow p-2 rounded-md">
            <div className="bg-yellow-400 rounded-full w-8 h-8 items-center overflow-hidden object-cover flex justify-center">
              <img src="/images/logos/MTN.svg" alt="MTN" />
            </div>
            <span>{formatMoney(Wallet?.mtnWalletBalance ?? 0)}</span>
          </div>
        )}
      </div>
      {Charges?.errorMessage && (
        <div className="mt-2">
          <span className="text-red-500 text-xs cursor-pointer">
            {Charges?.errorMessage}
          </span>
          <div
            onClick={() => {
              navigate("/fundwallet");
            }}
            className="flex px-2 h-10 cursor-pointer gap-1 w-32 my-2 items-center bg-primary text-white text-[15px] rounded-[8px]"
          >
            <Wallet2 className="h-4 w-4" />
            <span>Fund Wallet</span>
          </div>
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
            {formatMoney(beneficiary?.amount ?? 0)}
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
            {formatMoney(Charges?.alfasenteCharge ?? 0)}
          </span>
        </div>
        <div className="flex justify-between  items-center">
          <span>Total cost</span>
          <span className="text-[#000000CC] font-bold">
            {formatMoney(Charges?.overallTotal ?? 0)}
          </span>
        </div>
      </div>
      <Button
        className="w-full mt-5"
        type="submit"
        onClick={() => {
          onSubmit();
        }}
        disabled={submitting || !beneficiary?.amount || Charges?.errorMessage}
      >
        {submitting ? "Sending..." : "Send Money"}
      </Button>
    </div>
  );
}

export default PaymentOverViewIndividual;
