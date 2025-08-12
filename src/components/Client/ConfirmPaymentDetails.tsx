import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { IDetails } from "@/lib/interfaces/interfaces";
import { useState } from "react";
import { getAuthUser, getUserToken } from "@/lib/cookies/UserMangementCookie";
import { CollectMoney } from "@/lib/api-routes";
import { useClientContext } from "@/hooks/ClientContext";
import { toast } from "@/hooks/use-toast";

interface IConfirmDetails {
  details: IDetails;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  setFundDetails: React.Dispatch<React.SetStateAction<IDetails>>;
}

function ConfirmPaymentDetails({
  details,
  handleNextStep,
  setFundDetails,
  handlePreviousStep,
}: IConfirmDetails) {
  const client = useClientContext();

  const Charge = import.meta.env.VITE_SERVICE_FEE;

  const serviceFee = client.clientData?.alfasenteCharge || Charge;
  const totalFee = Number(details.amount) + Number(serviceFee);

  const [warning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = getUserToken();
  const clientID = getAuthUser()?.clientID ?? "";

  const submit = async () => {
    setSubmitting(true);

    const data = { ...details, clientID };

    try {
      const response = await fetch(CollectMoney(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (response.status === 200) {
        console.log("Response is 200");
        const result = await response.json();

        console.log("Result:", result);

        setFundDetails({
          ...details,
          totalFee,
          transaction_id:
            result.result.transactionId || result.result.response.data.transaction.id,
        });
        handleNextStep();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: `${error}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between mt-3 items-center">
          <span className="font-semibold text-lg">Deposit details</span>
          <span
            aria-disabled={submitting}
            tabIndex={submitting ? -1 : 0}
            className={`flex items-center gap-1 text-secondary cursor-pointer ${
              submitting ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={handlePreviousStep}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Network</span>
          <span className="capitalize">
            {details?.network === "mtn" ? "MTN MoMo" : `${details?.network}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Mobile Number</span>
          <span>+256{details?.accountNumber}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Amount</span>
          <span>UGX {details?.amount.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between font-semibold">
          <span>Total Fee</span>
          <span>UGX {details?.amount.toLocaleString()}</span>
        </div>

        {warning && <div className="text-red-600 text-sm">{warning}</div>}

        <Button onClick={submit} className="py-2" disabled={submitting}>
          {submitting ? "Submitting..." : "  Confirm Payment"}{" "}
        </Button>
      </div>
    </>
  );
}

export default ConfirmPaymentDetails;
