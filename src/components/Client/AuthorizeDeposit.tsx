import { useEffect, useState } from "react";
import { IDetails } from "@/lib/interfaces/interfaces";
import { GetTransaction } from "@/lib/services/GetTransactionById";
interface IAuthorizeDeposit {
  handleNextStep: () => void;
  details: IDetails;
}

function AuthorizeDeposit({ handleNextStep, details }: IAuthorizeDeposit) {
  console.log(details);
  const [failed, setFailed] = useState(false);
  const [pollTrigger, setPollTrigger] = useState(0);

  const transactionID = details.transaction_id;

  const { Transaction } = GetTransaction(transactionID ?? "");

  useEffect(() => {
    if (!transactionID) return;

    const interval = setInterval(() => {
      setPollTrigger((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [transactionID]);

  useEffect(() => {
    if (Transaction?.status === "TS" || Transaction?.status === "SUCCESSFUL") {
      handleNextStep();
    } else if (
      Transaction?.status === "FL" ||
      Transaction?.status === "FAILED"
    ) {
      setFailed(true);
    }
  }, [Transaction]);

  console.log(pollTrigger, "Poll Trigger");

  return (
    <>
      <div className="space-y-3">
        <h3 className="font-semibold text-2xl my-4">Authorize Deposit</h3>
        <p className="font-normal text-sm">
          {`A payment prompt has been sent to +256${details.accountNumber}. Enter your PIN to
            authorize deposit of UGX ${details.totalFee?.toLocaleString()}.`}
        </p>

        {failed && (
          <p className="text-red-500 font-medium">
            Transaction failed. Please try again.
          </p>
        )}

        <div className="flex justify-center ">
          <img src="/images/logos/authorize.svg" alt="Authorize" />
        </div>
      </div>
    </>
  );
}

export default AuthorizeDeposit;
