import { ResetPasswordForm } from "@/components/AuthForms/ResetPassword";
import { useNavigate } from "react-router-dom";

function SetPassword() {
  const navigate = useNavigate();

  return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className=" flex flex-col items-center">
          <div
          className="h-[80px] w-[80px] flex items-center justify-center object-cover  "
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="/images/logos/alfasente icon.png"
            alt="Alfasente"
            className="h-full w-full "
          />
        </div>

        <div className="flex justify-center flex-col items-center  md:w-[100%]">
          <h3 className="font-semibold text-[28px]">Create Password</h3>
          <p className="text-[#5C6474]">Set up your secure password for Alfasente</p>
        </div>

        <ResetPasswordForm />
        </div>
      </div>
  );
}

export default SetPassword;
