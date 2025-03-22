import { useEffect, useState } from "react";
import SuccessFulDeposit from "./SuccessFulDeposit";


interface IAuthorizeDeposit {
  handleNextStep:()=>void;
}
function AuthorizeDeposit({handleNextStep}:IAuthorizeDeposit) {
  

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
            A payment prompt has been sent to +256788210793. Enter your PIN to
            authorize deposit of UGX 2,000,000.
          </p>

          <div className="flex justify-center ">
            <img src="/images/logos/authorize.svg" alt="Notifications" />
          </div>
        </div>
   
    </>
  );
}

export default AuthorizeDeposit;
