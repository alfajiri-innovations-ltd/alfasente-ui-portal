import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LoginForm } from "../AuthForms/LoginForm";
import { ForgotPasswordForm } from "../AuthForms/ForgotPasswordForm";
import ResetOtp from "./ResetPasswordOtp";
import { ResetPasswordForm } from "../AuthForms/ResetPasswordForm";
import SuccessScreen from "./SuccessScreen";

export function Login() {
  const [currentStep, setCurrentStep] = useState(1);
  const [waitScreen, showWaitScreen] = useState(false);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const BackToLogin = () => {
    setCurrentStep(1);
  };

  const HandleLogin = () => {
    showWaitScreen(!waitScreen);

    setTimeout(() => {
      showWaitScreen(false);
    }, 10000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded-[40px] text-sm">
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[60vw] min-h-[60vh]  ">
        <div className=" ">
          <img
            src="/images/logos/alfasente-logo.svg"
            alt="Alfasente"
            width={150}
          />
        </div>
        <div className="px-40">
          {currentStep > 1 && (
            <Progress value={(currentStep / 4) * 100} className="w-full  " />
          )}
          {currentStep === 1 && (
            <>
              {waitScreen ? (
                <SuccessScreen />
              ) : (
                <>
                  <h5 className="text-left my-2 font-semibold text-[22px]">
                    Welcome back! Log in here
                  </h5>
                  <LoginForm
                    handleClick={handleNextStep}
                    HandleLogin={HandleLogin}
                  />
                  <p className="flex justify-center my-2">
                    <span>New here?</span>
                    <span className="underline"> Create Account</span>
                  </p>
                </>
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              <h5 className="text-left font-semibold text-[22px] my-2">
                Forgot password?
              </h5>
              <ForgotPasswordForm handleClick={handleNextStep} />

              <p className="underline text-center my-3" onClick={BackToLogin}>
                Back to Login
              </p>
            </>
          )}

          {currentStep === 3 && (
            <>
              <ResetOtp handleClick={handleNextStep} />
            </>
          )}

          {currentStep === 4 && (
            <>
              <h5 className="text-left font-semibold text-[22px] my-2">
                Set new password
              </h5>
              <ResetPasswordForm handleClick={BackToLogin} />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
