import { ForgotPasswordForm } from "@/components/AuthForms/ForgotPasswordForm";
import { ResetPasswordForm } from "@/components/AuthForms/ResetPasswordForm";
import ResetOtp from "@/components/Client/ResetPasswordOtp";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const BackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      {currentStep > 1 && (
        <ArrowLeft
          className="h-4 w-4 cursor-pointer"
          onClick={handlePreviousStep}
        />
      )}
      <div className="rounded-full ml-auto -translate-x-10 translate-y-5 md:translate-y-10 w-min p-2 bg-[#EDF0F7]">
        <X
          className=" right-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="flex flex-col  mt-10 items-center md:justify-center  ">
        <Progress
          value={(currentStep / 3) * 100}
          className="md:w-[40vw] w-[80vw] translate-y-8 "
        />

        <div className="md:w-[40vw] w-[80vw]">
          {currentStep === 1 && (
            <div className=" mt-16">
              <h5 className="text-left my-2 font-semibold text-[22px]">
                Tell us about your organization
              </h5>
              <OrganizationDetailsForm handleClick={handleNextStep} />
              <p className="flex justify-center my-2">
                <span>Already registered?</span>
                <span className="underline">Login here</span>
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className=" mt-16">
              <h5 className="text-left font-semibold text-[22px] my-2">
                Setup your profile
              </h5>
              <UserDetailsForm handleClick={handleNextStep} />
            </div>
          )}

          {currentStep === 3 && (
            <div className=" mt-16">
              <VerifyEmail  />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
