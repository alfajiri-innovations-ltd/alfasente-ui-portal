import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GrSend } from "react-icons/gr";

function Hero() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/login");
  };
  return (
    <div
      className="flex justify-center flex-col  items-center mt-10 lg:mt-10 bg-gradient-to-b from-white 30% via-[#E6C2F480] to-[#8D35AA92] "
      id="home"
    >
      <div
        className="flex items-center rounded-xl border px-2 py-1 gap-1 font-medium text-xs border-[#C8CFDE] cursor-pointer"
        onClick={HandleClick}
      >
        <GrSend className="text-primary" />
        <span>Bulk Payments</span>
      </div>
      <h3 className="font-extrabold text-3xl text-[#000000E5] text-center leading-[46px] lg:text-[54px] lg:leading-[120%]">
        Send money to anyone
        <br className="hidden xl:flex" />
        <span className=" lg:text xl:mx-24 mx-3">
          anywhere <span className="text-primary">all at once</span>
        </span>
      </h3>
      <p className="text-[#666666] text-center text-[18px] px-6 leading-6 font-normal xl:px-1  mt-4">
        Send bulk payments instantly,manage approvals and{" "}
        <br className="hidden xl:flex" /> track everything securely
      </p>

      <div className="flex flex-col lg:flex-row my-3 w-[82%] md:w-[14%] items-center gap-4">
        <Button
          onClick={HandleClick}
          style={{
            boxShadow:
              "inset 0px 2.2px 2px 0px rgba(255, 255, 255, 0.5), inset 0px -2.2px 2px 0px rgba(0, 0, 0, 0.15)",
          }}
          className="text-white text-[15px] rounded-[40px] w-full mt-3 h-12 p-5 mb-[18px] bg-[#8D35AA] hover:bg-[#7E249A] hover:text-white 
  shadow-[-2px_7px_40px_-8px_rgba(0,0,0,0.3)]   "
        >
          Start Bulk Payments{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
      <div className="md:w-[70vw] px-5 relative  xl:h-[40vh] bg-[#EDF0F799] border border-[#FBFDFF] pt-5 rounded-ss-3xl rounded-t-3xl overflow-clip xl:mt-8  ">
        <img src="/images/hero-image.png" alt="AdminDashboard" />
      </div>
    </div>
  );
}

export default Hero;
