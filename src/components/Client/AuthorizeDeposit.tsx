import { useEffect } from "react";
import { IDetails } from "@/lib/interfaces/interfaces";

interface IAuthorizeDeposit {
  handleNextStep: () => void;
  details: IDetails;
}
function AuthorizeDeposit({ handleNextStep, details }: IAuthorizeDeposit) {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextStep();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="space-y-3">
        <h3 className="font-semibold text-2xl">Authorize Deposit</h3>
        <p className="font-normal text-sm">
          {` A payment prompt has been sent to +256${details.accountNumber}. Enter your PIN to
            authorize deposit of UGX ${details.totalFee?.toLocaleString()}`}
          .
        </p>

        <div className="flex justify-center ">
          <img src="/images/logos/authorize.svg" alt="Notifications" />
        </div>
      </div>
    </>
  );
}

export default AuthorizeDeposit;
