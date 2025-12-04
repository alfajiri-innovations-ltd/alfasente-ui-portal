import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "@/lib/utils";
import { useUser } from "@/hooks/UserContext";
import { useCurrency } from "@/hooks/useCurrency";


interface ISuccessFulDeposit {
  listName: string;
  amount:number;
  beneficiaryName?:string

}
function PaymentInitiated({listName,amount,beneficiaryName}:ISuccessFulDeposit) {
  const navigate = useNavigate();
    const user = useUser();
    const { currency: airtelCurrency } = useCurrency("airtel");



  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
        <div className="bg-[#3DA755] flex   justify-center items-center w-10 h-10 p-3 rounded-full">
          <Check className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
          <span>+{formatMoney(amount)}</span>

        <p>Payment initiated. You’ll be notified once completed</p>
        <span>Deposit Successful</span>
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
          <span>{listName ? 'Beneficiary list':'Beneficiary Name'}</span>
          <span className="capitalize">
            {listName || beneficiaryName}
          </span>
        </div>
       
        <div className="flex items-center justify-between">
          <span>Performed by</span>
          <span className="capitalize">{user?.firstName + " " + user?.lastName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total amount sent</span>
          <span>{formatMoney(amount,airtelCurrency)}</span>
        </div>
        <div className="flex justify- gap-4">
          <Button
            variant={"outline"}
            className="border grow"
            onClick={() => {
              navigate("/");
            }}
          >
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

export default PaymentInitiated;
