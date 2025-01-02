import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator"


function Footer() {
  return (
    <footer className="mt-20 px-[4vw]">
      <Separator className="bg-[#D4DAE6]"/>
      <div className="flex justify-between">
        <div>
          <img
            src="/images/logos/alfasente-logo.svg"
            alt="Alfasente"
            width={150}
          />
        </div>


        <div className="flex items-center gap-1">
          <FaXTwitter />

          <IoLogoInstagram />
          <IoLogoLinkedin />
        </div>
      </div>
      <Separator className="bg-[#D4DAE6]"/>

      <div className="flex justify-between my-4">
        <div>
        <span>Copyright &copy; </span>
        <span>{new Date().getFullYear()}.</span>          <span>
            All rights reserved. Alfasente is licensed and regulated by the
            Uganda Revenue Authority.
          </span>
        </div>

        <div className="flex gap-2 ">
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
