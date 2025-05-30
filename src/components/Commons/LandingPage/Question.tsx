import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/signup");
  };
  return (
    <div className="flex lg:mx-[6.25vw]  justify-center items-center bg-gradient-to-r from-[#923AAF] to-[#CB90E2] mt-14 lg:mt-[98px] gap-[120px] text-white rounded-[20px] py-[6px]  px-5">
      <div>
        <h5 className="font-medium text-[26px] lg:text-[42px] leading-[56px]">
          Ready to Simplify
          <br />
          Bulk Payments?{" "}
        </h5>

        <h6 className="font-normal text-[17px] mt-5 mb-6">
          Experience fast, secure payments today.{" "}
        </h6>

        <Button
          onClick={HandleClick}
          className="text-white rounded-[40px] text-[15px] shadow-none h-[46px] p-5 bg-[#E59339]"
        >
          Manage payments{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>

      <div>
      <div className="flex w-[260px] h-[278px] object-cover">
      <img src="/images/questionimage.svg" alt="Manage Payment"  />
      </div>

      </div>
    </div>
  );
}

export default Question;
