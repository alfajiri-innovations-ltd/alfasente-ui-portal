import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AccessDashboard() {
  const navigate = useNavigate();

  const org = localStorage.getItem("organizationName");
  const role = localStorage.getItem("role");

  const HandleClick = () => {
    navigate("/login");
    setTimeout(() => {
      localStorage.removeItem("organizationName");
      localStorage.removeItem("role");
      localStorage.removeItem("email")
    }, 1000);
  };
  return (
    <div className="flex items-center  flex-col justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-semibold text-[28px]">Welcome to {org}</h3>
        <span className=" text-center  text-[#5C6474]">
          Your account has been created successfully.
          <br />
          <span className="text-center  w-full">
            {" "}
            You're now part of the staff
          </span>{" "}
        </span>

        <div className="border h-[.2px] border-[#B2BCD1] w-full my-4"></div>

        <div className="flex items-center gap-4 my-3 w-[90%]">
          <div className="rounded-full flex items-center justify-center bg-gray-500 p-3">
            {org ? getInitials(org) : ""}{" "}
          </div>
          <div className="flex flex-col ">
            <span>{org}</span>
            <span className="text-[#5C6474]">
              {role === "client_employee" ? "Employee" : role}
            </span>
          </div>
        </div>

        <Button
          className="flex items-center gap-2 w-full my-3"
          onClick={HandleClick}
        >
          Login to access Dashboard
          <span>
            <ArrowRight />{" "}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default AccessDashboard;
