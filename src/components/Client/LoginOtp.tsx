import { useState } from "react";
import { LoginOtpForm } from "../AuthForms/LoginOtp";
import { ResendLoginOtp } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { IUser } from "@/lib/interfaces/interfaces";

interface VerifyLoginProps {
  email: string;
}
function VerifyLoginEmail({ email }: VerifyLoginProps) {
  const userData = localStorage.getItem("alfasente_user");

  const user: IUser | undefined = userData ? JSON.parse(userData) : undefined;
  const [resetTimer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleResendOtp = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(ResendLoginOtp(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: `Otp sucessfully sent to ${user?.user_email}`,
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h4 className="text-[22px] font-semibold my-2  ">Confirm your email</h4>
      <span className="">
        Enter the verification code sent to
        <span className="font-semibold"> {email}</span>
      </span>
      <LoginOtpForm resetTimer={resetTimer} email={email} />

      <div className="my-4 flex justify-center">
        <h4 className="text-inactive">
          Didn&apos;t receive OTP code?
          <span
            className="underline cursor-pointer"
            onClick={handleResendOtp}
            aria-disabled={submitting}
          >
            {submitting ? "Resending..." : "Resend it"}
          </span>
        </h4>
      </div>
    </div>
  );
}

export default VerifyLoginEmail;
