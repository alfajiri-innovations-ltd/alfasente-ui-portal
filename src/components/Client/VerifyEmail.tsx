import { useState } from "react";
import { EmailOtpForm } from "../AuthForms/EmailOtp";
import { ResendEmailOtp } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { IUser } from "@/lib/interfaces/interfaces";

function VerifyEmail() {
  const userData = localStorage.getItem("userData");

  const user: IUser | undefined = userData ? JSON.parse(userData) : undefined;

  const [submitting, setSubmitting] = useState(false);

  console.log("Email from localStorage:", user);

  const [resetTimer] = useState(false);

  const handleResendOtp = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(ResendEmailOtp(), {
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
        <span className="font-semibold"> {user?.user_email}</span>
      </span>
      <EmailOtpForm resetTimer={resetTimer} />

      <div className="my-4 flex justify-center">
        <h4 className="text-inactive">
          Didn&apos;t receive OTP code?
          <span
            className="underline cursor-pointer mx-1"
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

export default VerifyEmail;
