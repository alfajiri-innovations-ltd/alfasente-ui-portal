import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { IDetails } from "@/lib/interfaces/interfaces";
import { useNavigate } from "react-router-dom";

interface ISuccessFulDeposit {
  details: IDetails;
  handleClose: () => void;
}
function SuccessFulDeposit({ details ,handleClose}: ISuccessFulDeposit) {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
        <div className="bg-[#3DA755] flex   justify-center items-center w-10 h-10 p-3 rounded-full">
          <Check className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span>+UGX {details.amount}</span>
        <span>Deposit Successful</span>
        <span>27 Nov, 2024, at 11:25 AM</span>
      </div>
      <Separator className="dotted" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span>Wallet balance</span>
          <span>UGX 5,000,300</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Transaction ID</span>
          <span>#TXN098657</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Mobile number</span>
          <span>+256{details.accountNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Funder</span>
          <span>George Kizza</span>
        </div>
        <div className="flex justify- gap-4">
          <Button variant={"outline"} className="border grow" onClick={handleClose}>
            Close
          </Button>
          <Button className="grow" onClick={()=>{navigate('/transactions')}}>View Transactions</Button>
        </div>{" "}
      </div>
    </div>
  );
}

export default SuccessFulDeposit;
