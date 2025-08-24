import { PasswordForm } from "@/components/AuthForms/EnterPasswordForm";

function EnterPasswordPage() {
  return (
    <div>
      <h3>You are invited</h3>
      <p>
        Join <strong>KT Enterprises</strong> on Alfasente
      </p>

      <div className="flex flex-col bg-[#EDF0F7] border border-[#F7F9FD]">
        <div className="flex items-center justify-between">
          <span>Organisation</span>
          <span>Organisation</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Your role</span>
          <span>Organisation</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Invited By</span>
          <span>Organisation</span>
        </div>
      </div>

      <PasswordForm />
    </div>
  );
}

export default EnterPasswordPage;
