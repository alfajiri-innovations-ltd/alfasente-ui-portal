import { useState } from "react";
import { PaaswordOtpForm } from "../AuthForms/PasswordResetOtpForm";

interface IVerifyEmailProps {
  handleClick: () => void;
}
function ResetOtp({ handleClick }: IVerifyEmailProps) {
  const email = localStorage.getItem("email");

  const [resetTimer] = useState(false);

  const handleResendOtp = async () => {};

  return (
    <div className="">
      <h4 className="text-[22px] font-semibold my-2  ">Password reset</h4>
      <span className="">
        Enter the code sent to
        <span className="font-semibold"> {email}</span>
      </span>
      <PaaswordOtpForm resetTimer={resetTimer} handleClick={handleClick} />

      <div className="my-4 flex justify-center">
        <h4 className="text-inactive">
          Didn&apos;t receive the code?
          <span className="underline cursor-pointer" onClick={handleResendOtp}>
            Resend it
          </span>
        </h4>
      </div>
    </div>
  );
}

export default ResetOtp;
