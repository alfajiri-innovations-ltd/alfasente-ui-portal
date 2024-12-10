import { useEffect, useState } from "react";
import SuccessFulDeposit from "./SuccessFulDeposit";

function AuthorizeDeposit() {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isSuccess ? (
        <SuccessFulDeposit />
      ) : (
        <div className="space-y-3">
          <h3 className="font-semibold text-2xl">Authorize Deposit</h3>
          <p className="font-normal text-sm">
            A payment prompt has been sent to +256788210793. Enter your PIN to
            authorize deposit of UGX 2,000,000.
          </p>

          <div className="flex justify-center ">
            <img src="/images/logos/authorize.svg" alt="Notifications" />
          </div>
        </div>
      )}
    </>
  );
}

export default AuthorizeDeposit;
