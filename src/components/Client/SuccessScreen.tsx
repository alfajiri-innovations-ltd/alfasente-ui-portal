import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

function SuccessScreen() {
  return (
    <div className="flex flex-col justify-center px-4 items-center gap-2 h-96  ">
      <div className="flex justify-center rounded-full p-3 w-max bg-[#EDF0F7]">
        <img src="/images/icons/Timer.svg" alt="Timer" width={50} />
      </div>
      <h4 className="font-semibold text-[23px]">Application under review</h4>

      <p>
        Our team is reviewing your application, which usually takes{" "}
        <br className="hidden md:flex" /> up to 48 hours. You’ll be notified via
        email upon approval.
      </p>

      <Button
        className="flex items-center gap-1"
        onClick={() => (window.location.href = "/")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Button>
    </div>
  );
}

export default SuccessScreen;
