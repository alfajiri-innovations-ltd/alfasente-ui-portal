import { useState } from "react";
import { EmailOtpForm } from "./Forms/EmailOtp";

function VerifyEmail() {
  const [resetTimer] = useState(false);

  const handleResendOtp = async () => {};

  return (
    <div>
      <h4>Confirm your email</h4>
      <p>Enter the verification code sent to ugaka@gmail.com</p>
      <EmailOtpForm resetTimer={resetTimer} />

      <div className="my-4">
        <h4 className="text-inactive">
          Didn&apos;t get verification code?
          <span
            className="text-primary cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend
          </span>
        </h4>
      </div>
    </div>
  );
}

export default VerifyEmail;
