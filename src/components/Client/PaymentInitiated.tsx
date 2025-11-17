import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { GetTransaction } from "@/lib/services/GetTransactionById";
import { GetClient } from "@/lib/services/GetClientById";
import { formatMoney } from "@/lib/utils";

interface ISuccessFulDeposit {
  transaction_id: string;
}
function PaymentInitiated({transaction_id}:ISuccessFulDeposit) {
  const navigate = useNavigate();

  const transactionID =transaction_id;

  const { Transaction } = GetTransaction(transactionID ?? "");
const network="mtn"
  const client = GetClient();
  const Wallet = client?.walletID;

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
        <div className="bg-[#3DA755] flex   justify-center items-center w-10 h-10 p-3 rounded-full">
          <Check className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span>+UGX {0}</span>

        <p>Payment initiated. You’ll be notified once completed</p>
        <span>Deposit Successful</span>
        <span>
          {Transaction?.liquidationDate
            ? Transaction.liquidationDate instanceof Date
              ? Transaction.liquidationDate.toLocaleString()
              : Transaction.liquidationDate
            : ""}
        </span>
      </div>
      <Separator className="dotted" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span>Wallet balance</span>
          <span>
            {network === "mtn"
              ? formatMoney(Wallet?.mtnWalletBalance ?? 0)
              : formatMoney(Wallet?.airtelWalletBalance ?? 0)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Transaction ID</span>
          <span>#{Transaction?.transactionID.slice(0, 10)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Mobile number</span>
          <span>+256{Transaction?.sourceOfFunds}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Funder</span>
          <span>{Transaction?.payer || Transaction?.userName}</span>
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
