import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { IDetails } from "@/lib/interfaces/interfaces";
import { useEffect, useState } from "react";
import { getAuthUser, getUserToken } from "@/lib/cookies/UserMangementCookie";
import { CollectMoney } from "@/lib/api-routes";
import { useClientContext } from "@/hooks/ClientContext";

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

  const serviceFee = client.clientData?.alfasenteCharge || 2000; // Default service fee if not set in client data
  const totalFee = Number(details.amount) + Number(serviceFee);

  const allocationSum = details.mtnAllocation + details.airtelAllocation;
  const isAllocationExceeded = allocationSum > Number(details.amount);

  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = getUserToken();
  const clientID = getAuthUser().clientID;

  useEffect(() => {
    if (isAllocationExceeded) {
      setWarning("⚠️ The total allocations exceed the amount to fund!");
    } else {
      setWarning("");
    }
  }, [isAllocationExceeded]);

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const result = await response.json();
        console.log("Payment confirmation result:", result);

        setFundDetails({
          ...details,
          totalFee,
          transaction_id: result.transaction_id,
        });
        setTimeout(() => {
          handleNextStep();
        }, 1000);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("There was an error confirming the payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
    console.log("Form submitted:", data);
  };
  // setFundDetails({ ...details, totalFee });

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

        <div className="flex items-center justify-between">
          <span>MTN Allocation</span>
          <span>UGX {details?.mtnAllocation.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Airtel Allocation</span>
          <span>UGX {details?.airtelAllocation.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Service Fee</span>
          <span>UGX {serviceFee.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between font-semibold">
          <span>Total Fee</span>
          <span>UGX {totalFee.toLocaleString()}</span>
        </div>

        {warning && <div className="text-red-600 text-sm">{warning}</div>}

        <Button
          onClick={submit}
          className="py-2"
          disabled={isAllocationExceeded || submitting}
        >
          {submitting ? "Submitting..." : "  Confirm Payment"}{" "}
        </Button>
      </div>
    </>
  );
}

export default ConfirmPaymentDetails;
