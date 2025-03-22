import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { MdMailOutline } from "react-icons/md";


function Footer() {
  return (
    <footer className="mt-20 lg:px-[6.25vw] ">
      <Separator className="bg-[#D4DAE6]" />
      <div className="flex justify-between py-5">
        <div className="h-[31px] w-[154px] flex items-center justify-center overflow-hidden">
          <img
            src="/images/logos/alfasente-logo.png"
            alt="Alfasente"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center gap-1">
        <MdMailOutline size={19} className=" text-black/70"/>


          <span className=" text-black/80 ">support@alfasente.com</span>
        </div>

        <div className="flex items-center gap-3">
          <FaXTwitter size={24} className="text-black/90"/>

          <IoLogoInstagram size={24} className="text-black/90" />
          <IoLogoLinkedin size={24} className="text-black/90" />
        </div>
      </div>
      <Separator className="bg-[#D4DAE6]" />

      <div className="flex justify-between my-4 pt-2 pb-5">
        <div className="text-[15px] font-normal text-black/90">
          <span>Copyright &copy; </span>
          <span>{new Date().getFullYear()}.</span>{" "}
          <span>
            All rights reserved. Alfasente is licensed and regulated by the
            Uganda Revenue Authority.
          </span>
        </div>

        <div className="flex gap-5 text-[15px] font-normal text-black/70">
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
