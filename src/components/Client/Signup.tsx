import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { OrganizationDetailsForm } from "../AuthForms/OrganizationDetailsForm";
import { UserDetailsForm } from "../AuthForms/UserDetailsForm";
import VerifyEmail from "./VerifyEmail";
import SuccessScreen from "./SuccessScreen";

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>

      <DialogContent className="w-[60vw] h-[98vh] ">
        {currentStep > 1 && (
          <ArrowLeft
            className="h-4 w-4 cursor-pointer"
            onClick={handlePreviousStep}
          />
        )}

        <div className="px-40">
          <Progress value={(currentStep / 4) * 100} className="w-full  " />

          {currentStep === 1 && (
            <>
              <h5 className="text-left my-2 font-semibold text-[22px]">
                Tell us about your organization
              </h5>
              <OrganizationDetailsForm handleClick={handleNextStep} />
              <p className="flex justify-center my-2">
                <span>Already registered?</span>
                <span className="underline">Login here</span>
              </p>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h5 className="text-left font-semibold text-[22px] my-2">
                Setup your profile
              </h5>
              <UserDetailsForm handleClick={handleNextStep} />
            </>
          )}

          {currentStep === 3 && (
            <>
              <VerifyEmail handleClick={handleNextStep} />
            </>
          )}

          {currentStep === 4 && (
            <>
              <SuccessScreen />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
