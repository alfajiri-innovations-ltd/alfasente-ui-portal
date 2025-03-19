import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import AuthorizeDeposit from "./AuthorizeDeposit";
import { IDetails } from "@/lib/interfaces/interfaces";

interface IConfirmDetails {
  details: IDetails;
}

function ConfirmPaymentDetails({ details }: IConfirmDetails) {
  const [AuthoriseDeposit, setShowAuthorizeDeposit] = useState(false);

  console.log(details);

  const handleClick = () => {
    setShowAuthorizeDeposit(!AuthoriseDeposit);
  };
  return (
    <>
      {!AuthoriseDeposit ? (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold mb-2">Fund your wallet</h3>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Deposit details</span>
            <span className="flex items-center gap-1 text-secondary">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Network</span>
            <span className="capitalize">{details.network==="mtn"?'Mtn MoMo':`${details.network}`}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Mobile Number</span>
            <span>+256{details.accountNumber}</span>
          </div>
       
          <div className="flex items-center justify-between">
            <span>Amount</span>
            <span>UGX {details.amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Service Fee</span>
            <span>UGX 2,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Fee</span>
            <span>UGX 2,002,000</span>
          </div>

          <Button onClick={handleClick} className="py-2">
            Confirm Payment
          </Button>
        </div>
      ) : (
        <AuthorizeDeposit />
      )}
    </>
  );
}

export default ConfirmPaymentDetails;
