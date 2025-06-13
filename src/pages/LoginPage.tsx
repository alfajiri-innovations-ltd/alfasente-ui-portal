import { LoginForm } from "@/components/AuthForms/LoginForm";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="rounded-full ml-auto -translate-x-10 translate-y-5 md:translate-y-10 w-min p-2 bg-[#EDF0F7]">
        <X
          className=" right-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      <div className="flex flex-col md:mt-32 mt-10 items-center md:justify-center  ">
        <div className="md:w-[30vw] w-[80vw]">
          <h5 className="text-left my-2 font-semibold text-[22px]">
            Welcome back.Login here
          </h5>
          <LoginForm />
          <p className="flex justify-center my-2">
            <span>New here?</span>
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* {currentStep === 2 && ({
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
        )} */

export default LoginPage;
