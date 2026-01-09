import { ForgotPasswordForm } from "@/components/AuthForms/ForgotPasswordForm";
import { ResetPasswordForm } from "@/components/AuthForms/ResetPasswordForm";
import ResetOtp from "@/components/Client/ResetPasswordOtp";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const BackToLogin = () => {
    navigate("/login");
  };

  return (
    //   <SuccessScreen />
    <div className="flex flex-col h-screen">
      <div className="rounded-full ml-auto -translate-x-10 translate-y-5 md:translate-y-10 w-min p-2 bg-[#EDF0F7]">
        <X
          className=" right-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="flex flex-col   mt-10 items-center md:justify-center  ">
        <Progress
          value={(currentStep / 3) * 100}
          className="md:w-[40vw] w-[80vw] translate-y-8 "
        />

        <div className="md:w-[40vw]  w-[80vw]">
          {currentStep === 1 && (
            <div className=" mt-16">
              <h5 className="font-semibold text-[22px] my-2">
                Forgot password?
              </h5>
              <ForgotPasswordForm handleClick={handleNextStep} />

              <p
                className="underline text-center my-3 cursor-pointer"
                onClick={BackToLogin}
              >
                Back to Login
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className=" mt-16">
              <ResetOtp handleClick={handleNextStep} />
            </div>
          )}

          {currentStep === 3 && (
            <div className=" mt-16">
              <h5 className="text-left font-semibold text-[22px] my-2">
                Set new password
              </h5>
              <ResetPasswordForm handleClick={BackToLogin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
