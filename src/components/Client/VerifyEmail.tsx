import { useState } from "react";
import { EmailOtpForm } from "../AuthForms/EmailOtp";

interface IVerifyEmailProps {
  handleClick: () => void;
}
function VerifyEmail({ handleClick }: IVerifyEmailProps) {
  const [resetTimer] = useState(false);

  const handleResendOtp = async () => {};

  return (
    <div className="">
      <h4 className="text-[22px] font-semibold my-2 ">Confirm your email</h4>
      <p>Enter the verification code sent to
        
<span className="font-semibold">         ugaka@gmail.com
</span>

         </p>
      <EmailOtpForm resetTimer={resetTimer} handleClick={handleClick} />

      <div className="my-4 flex justify-center">
        <h4 className="text-inactive">
          Didn&apos;t receive  OTP code?
          <span
            className="underline cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend it
          </span>
        </h4>
      </div>
    </div>
  );
}

export default VerifyEmail;
