import { Button } from "@/components/ui/button";
import {  ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/signup");
  };
  return (
    <div
      className="flex justify-center flex-col items-center mt-20 lg:mt-10"
      id="home"
    >
      <h3 className="font-extrabold text-3xl leading-[46px] lg:text-4xl lg:leading-[56px]">
        Simplify Payments To Many
        <br />
        <span className="mx-20">With One Platform</span>
      </h3>
      <p className="text-[#666666] text-base font-normal mb-4">
        Alfasente empowers businesses to process bulk payments, saving time,
        reducing errors, and growing business.
      </p>

      <div className="flex flex-col lg:flex-row my-3 items-center gap-4">
        <Button
          onClick={HandleClick}
          className="text-white rounded-[40px] p-5 hover:bg-[#EBAD00] hover:text-white bg-[#8D35AA]"
        >
          Manage payments{" "}
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
      <div className="w-[60vw] h-[50vh] overflow-clip mt-8 shadow-primary shadow-2xl">
        <img src="/images/heroimage.png" alt="AdminDashboard" />
      </div>
    </div>
  );
}

export default Hero;
