import { useState } from "react";
import { PaaswordOtpForm } from "../AuthForms/PasswordResetOtpForm";
import { toast } from "@/hooks/use-toast";
import { ForgotPassword } from "@/lib/api-routes";

interface IVerifyEmailProps {
  handleClick: () => void;
}
function ResetOtp({ handleClick }: IVerifyEmailProps) {
  const email = localStorage.getItem("email");

  const [resetTimer] = useState(false);

  const handleResendOtp = async () => {
    try {
      const response = await fetch(ForgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email ? { user_email: email } : {}),
      });

      if (response.ok) {
        localStorage.setItem("email", email ?? "");

        toast({
          variant: "success",
          title: "Successful",
          description: `Otp sucessfully sent to ${email}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "Invalid Email.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "An expected error occured.",
      });
    }
  };

  return (
    <div className="">
      <h4 className="text-[22px] font-semibold my-2  ">Password reset</h4>
      <p className="">
        Enter the code sent to
        <span className="font-semibold"> {email}</span>
      </p>
      <PaaswordOtpForm resetTimer={resetTimer} handleClick={handleClick} />

      <div className="my-4 flex justify-center">
        <h4 className="text-inactive">
          Didn&apos;t receive the code?
          <span
            className="text-[#8D35AA] cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend it
          </span>
        </h4>
      </div>
    </div>
  );
}

export default ResetOtp;
