import { LoginForm } from "@/components/AuthForms/LoginForm";
import VerifyLoginEmail from "@/components/Client/LoginOtp";
import { X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [email, setEmail] = useState("");

  const HandleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="rounded-full ml-auto -translate-x-10 translate-y-5 md:translate-y-10 w-min p-2 bg-[#EDF0F7]">
        <X
          className=" right-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      <div className="flex flex-col md:mt-32 mt-10 items-center   h-[60vh] md:justify-center  ">
        {currentStep === 1 && (
          <div className="md:w-[30vw] w-[80vw]">
            <h5 className="text-left my-2 font-semibold text-[22px]">
              Welcome back.Login here
            </h5>
            <LoginForm HandleNextStep={HandleNextStep} setEmail={setEmail} />
            <p className="flex justify-center my-2">
              <span>New here?</span>
              <Link to="/register" className="underline">
                {" "}
                Create Account
              </Link>
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <div className="md:w-[40vw] w-[80vw] ">
            <VerifyLoginEmail email={email} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
