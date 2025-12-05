import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "@/lib/utils";
import { useCurrency } from "@/hooks/useCurrency";

interface SuccessFulTopUpProps {
  ManualTopUpDetails: any;
}

function SuccessFulTopUp({ ManualTopUpDetails }: SuccessFulTopUpProps) {
  const user = useUser();
    const { currency: airtelCurrency } = useCurrency();
  

  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
        <div className="bg-[#3DA755] flex   justify-center items-center w-10 h-10 p-3 rounded-full">
          <Check className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span>Top-up request submitted</span>
        <span>
          Your request has been received. It will be reviewed and processed
          shortly.
        </span>
        <span>
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(new Date())}
        </span>{" "}
      </div>
      <Separator className="dotted" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span>Amount to top-up</span>
          <span>{formatMoney(ManualTopUpDetails.amount,airtelCurrency)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Request ID</span>
          <span>#{String(ManualTopUpDetails.transactonId).slice(0, 10)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Airtel Money wallet</span>
          <span>{formatMoney(ManualTopUpDetails?.airtelAllocation,airtelCurrency) || 0}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Mtn Money wallet</span>
          <span>{formatMoney(ManualTopUpDetails?.mtnAllocation,airtelCurrency) || 0}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>User</span>
          <span>{user?.firstName + " " + user?.lastName}</span>
        </div>
        <div className="flex justify- gap-4">
          <Button variant={"outline"} className="border grow">
            Close
          </Button>
          <Button
            className="grow"
            onClick={() => {
              navigate("/transactions");
            }}
          >
            View Transactions
          </Button>
        </div>{" "}
      </div>
    </div>
  );
}

export default SuccessFulTopUp;
