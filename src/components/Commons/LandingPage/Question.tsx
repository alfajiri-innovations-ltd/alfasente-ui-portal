import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/signup");
  };
  return (
    <div className="flex lg:mx-[6.25vw] mx-4  justify-center items-center bg-gradient-to-r from-[#923AAF] to-[#CB90E2] mt-14 lg:mt-[98px] md:gap-[120px] text-white rounded-[20px] md:py-[6px] py-4 md:px-5">
      <div>
        <h5 className="font-medium text-center text-[26px] lg:text-[42px] leading-[40px] md:leading-[56px]">
          Ready to Simplify
          <br />
          Bulk Payments?{" "}
        </h5>

        <h6 className="font-normal text-[17px] md:mt-5 md:mb-6">
          Experience fast, secure payments today.{" "}
        </h6>

        <Button
          onClick={HandleClick}
          className="text-white mx-20 md:mx-0 rounded-[40px] text-[15px] shadow-none h-[46px] p-5 bg-[#E59339]"
        >
          Manage payments{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>

      <div>
      <div className="hidden md:flex w-[260px] h-[278px] object-cover ">
      <img src="/images/questionimage.svg" alt="Manage Payment"  />
      </div>

      </div>
    </div>
  );
}

export default Question;
