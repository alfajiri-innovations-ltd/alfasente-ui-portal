import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/signup");
  };
  return (
    <div className="flex mx-[4vw] justify-center items-center bg-[#7E249A] mt-14 lg:mt-20 gap-10 text-white rounded-[20px] p-5">
      <div>
        <h5 className="font-medium  text-2xl lg:text-[26px]">
          Ready to Simplify
          <br/> 
          Bulk Payments?{" "}
        </h5>

        <h6 className="font-normal text-[17px] my-4">
          Experience fast, secure payments today.{" "}
        </h6>

        <Button
          onClick={HandleClick}
          className="text-white rounded-[40px] p-5 bg-[#E59339]"
        >
          Manage payments{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>

      <div>
        <img src="/images/questionimage.png" alt="Manage Payment" width={250} />
      </div>
    </div>
  );
}

export default Question;
