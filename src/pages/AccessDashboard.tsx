import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AccessDashboard() {
  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex items-center  flex-col justify-center min-h-screen">
      <h3>Welcome to KT enterprises</h3>
      <span>
        Your account has been created successfully. You're now part of the staff
      </span>

      <Button className="flex items-center gap-2" onClick={HandleClick}>
        Access Dashboard
        <span>
          <ArrowRight />{" "}
        </span>
      </Button>
    </div>
  );
}

export default AccessDashboard;
