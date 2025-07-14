import { useState } from "react";
import { EmailOtpForm } from "../AuthForms/EmailOtp";

function VerifyEmail() {
  const email = localStorage.getItem("email");

  const [resetTimer] = useState(false);

  const handleResendOtp = async () => {};

  return (
    <div className="">
      <h4 className="text-[22px] font-semibold my-2  ">Confirm your email</h4>
      <span className="">
        Enter the verification code sent to
        <span className="font-semibold"> {email}</span>
      </span>
      <EmailOtpForm resetTimer={resetTimer} />

      <div className="my-4 flex justify-center">
        <h4 className="text-inactive">
          Didn&apos;t receive OTP code?
          <span className="underline cursor-pointer" onClick={handleResendOtp}>
            Resend it
          </span>
        </h4>
      </div>
    </div>
  );
}

export default VerifyEmail;
