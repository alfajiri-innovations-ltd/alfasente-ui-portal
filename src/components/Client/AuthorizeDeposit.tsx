import { useEffect, useState } from "react";
import { IDetails } from "@/lib/interfaces/interfaces";
import { GetTransaction } from "@/lib/services/GetTransactionById";
interface IAuthorizeDeposit {
  handleNextStep: () => void;
  details: IDetails;
}

function AuthorizeDeposit({ handleNextStep, details }: IAuthorizeDeposit) {
  const [failed, setFailed] = useState(false);
  const [, setPollTrigger] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [attemptId, setAttemptId] = useState(0);

  const transactionID = details.transaction_id;

  const { Transaction } = GetTransaction(transactionID ?? "");

  setTimeout(() => {});

  useEffect(() => {
    if (!transactionID) return;

    const maxAttempts = 60;
    let attempts = 0;
    setTimedOut(false);

    const interval = setInterval(() => {
      attempts++;

      setPollTrigger((prev) => prev + 1);

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setTimedOut(true);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [transactionID, attemptId]);

  useEffect(() => {
    if (!Transaction) return;

    if (Transaction.status === "TS" || Transaction.status === "SUCCESSFUL") {
      handleNextStep();
    } else if (Transaction.status === "FL" || Transaction.status === "FAILED") {
      setFailed(true);
    }
  }, [Transaction]);

  const handleRetry = () => {
    setAttemptId((prev) => prev + 1);
    setPollTrigger(0);
    setFailed(false);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl my-4">Authorize Deposit</h3>

          {timedOut && !failed && Transaction?.status !== "SUCCESSFUL" && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleRetry}
                className="bg-primary text-white px-4 py-2 rounded "
              >
                Try Again
              </button>
            </div>
          )}
        </div>
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

        <div className="flex items-center justify-between mt-4">
          <span className="font-medium">Transaction Status:</span>

          <span className="text-sm text-muted-foreground">
            {Transaction?.status === "TS" && "Processing..."}
            {Transaction?.status === "SUCCESSFUL" && "Successful "}
            {Transaction?.status === "FAILED" && "Failed "}
            {Transaction?.status === "FL" && "Failed "}
            {!Transaction?.status && "Checking..."}
          </span>
        </div>
      </div>
    </>
  );
}

export default AuthorizeDeposit;
