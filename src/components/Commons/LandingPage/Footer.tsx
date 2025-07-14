import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { MdMailOutline } from "react-icons/md";

function Footer() {
  return (
    <footer className="mt-20 lg:px-[6.25vw] px-4 ">
      <Separator className="bg-[#D4DAE6]" />
      <div className="flex justify-between py-5">
        <div className="h-[31px] w-[154px] hidden xl:flex items-center justify-center overflow-hidden">
          <img
            src="/images/logos/alfasente-logo.png"
            alt="Alfasente"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center gap-1">
          <MdMailOutline size={19} className=" text-black/70" />

          <span className=" text-black/80 ">support@alfasente.com</span>
        </div>

        <div className="flex items-center gap-3">
          <FaXTwitter size={24} className="text-black/90" />

          <IoLogoInstagram size={24} className="text-black/90" />
          <IoLogoLinkedin size={24} className="text-black/90" />
        </div>
      </div>
      <Separator className="bg-[#D4DAE6]" />

      <div className="flex xl:flex-row flex-col gap-5 xl:gap-0 justify-between xl:my-4 xl:pt-2 xl:pb-5">
        <div className="text-[15px] order-last xl:order-first font-normal text-black/90">
          <span> &copy; </span>
          <span>{new Date().getFullYear()}.</span>{" "}
          <span>All rights reserved.</span>
        </div>

        <div className="flex xl:flex-row flex-col my-3 xl:my-0 gap-5 text-[15px] font-normal text-black/70">
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
