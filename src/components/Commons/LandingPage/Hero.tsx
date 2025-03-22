import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/signup");
  };
  return (
    <div
      className="flex justify-center flex-col relative items-center mt-20 lg:mt-10 bg-gradient-to-b from-white 30% via-[#E6C2F480] to-[#8D35AA92] "
      id="home"
      // style={{
      //   background:
      //     "linear-gradient(to top, #8D35AA99 15%, #8D35AA92 15%, #8D35AA8C 15% , #8D35AA80 15%, #8D35AA73 20%,#8D35AA70 18% , #8D35AA70 15%, #8D35AA6C 20%, #8D35AA66 18%, #8D35AA66 18%, #DABDE3CD 18%, #E9D8EFE2 18%, #E9D8EFE2 30%, #FFFFFF 20%)",
      // }}
    >
      <h3 className="font-extrabold text-3xl text-[#000000E5] leading-[46px] lg:text-[54px] lg:leading-[120%]">
        Simplify Payments To Many
        <br />
        <span className=" lg:text mx-24">With One Platform</span>
      </h3>
      <p className="text-[#666666] text-center text-[18px] leading-6 font-normal  mt-4">
        Alfasente empowers businesses to process bulk payments,
        <br /> saving time, reducing errors, and growing business.
      </p>

      <div className="flex flex-col lg:flex-row my-3  items-center gap-4">
        <Button
          onClick={HandleClick}
          style={{
            boxShadow:
              "inset 0px 2.2px 2px 0px rgba(255, 255, 255, 0.5), inset 0px -2.2px 2px 0px rgba(0, 0, 0, 0.15)",
          }}
          className="text-white text-[15px] rounded-[40px] mt-3 h-12 p-5 mb-[18px] bg-[#8D35AA] hover:bg-[#7E249A] hover:text-white 
  shadow-[-2px_7px_40px_-8px_rgba(0,0,0,0.3)]   "
        >
          Manage payments{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
      <div className="w-[70vw] h-[60vh] overflow-clip mt-8 ">
        <img src="/images/heroimage.webp" alt="AdminDashboard" />
      </div>
    </div>
  );
}

export default Hero;
