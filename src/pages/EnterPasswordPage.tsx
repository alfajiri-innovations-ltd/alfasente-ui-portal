import { PasswordForm } from "@/components/AuthForms/EnterPasswordForm";
import { useGetClient } from "@/lib/services/FetchClientById";
import { FetchUserById } from "@/lib/services/FetchUserById";
import { useNavigate, useParams } from "react-router-dom";

function EnterPasswordPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = Number(id);

  const user = FetchUserById(userId ?? 0);
  const organization = useGetClient(user?.clientID ?? 0);

  organization
    ? localStorage.setItem("organizationName", organization?.clientName)
    : "";
  user ? localStorage.setItem("role", user.role_name) : "";
  const isLoading = !user || !organization;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        className="h-[80px] w-[80px] flex items-center justify-center object-cover"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="/images/logos/alfasente icon.png"
          alt="Alfasente"
          className="h-full w-full"
        />
      </div>

      <h3 className="font-semibold text-[28px]">You are invited</h3>
      <p>
        Join <strong>{organization?.clientName}</strong> on Alfasente
      </p>

      <div className="flex flex-col bg-[#EDF0F7] border border-[#EDF0F7]  px-3 py-4 md:w-[34%] rounded-xl gap-3 my-3">
        <div className="flex items-center justify-between border-b border-[#EDF0F7]">
          <span>Organisation</span>
          <span>{organization?.clientName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Your role</span>
          <span>
            {user?.role_name === "client_employee"
              ? "Employee"
              : user?.role_name}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Invited By</span>
          <span>{user?.invitedBy}</span>
        </div>
      </div>

      <PasswordForm />
    </div>
  );
}

export default EnterPasswordPage;
