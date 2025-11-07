import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <footer className="mt-20 lg:px-[10vw]  px-4 ">
      <div className="flex flex-col md:flex-row gap-10 md:gap-[30vw] py-5">
        <div
          className="flex
      flex-col  gap-5 md:items-center"
        >
          <div className="h-[31px] w-[154px] hidden xl:flex items-center justify-center overflow-hidden">
            <img
              src="/images/logos/alfasente-logo.png"
              alt="Alfasente"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaXTwitter size={24} className="text-black/90" />

            <IoLogoInstagram size={24} className="text-black/90" />
            <IoLogoLinkedin size={24} className="text-black/90" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2  w-full">
          <div className="flex flex-col gap-1 col-span-1 ">
            <h3 className="font-semibold">Explore</h3>

            <div className="flex flex-col my-3 xl:my-0  text-[15px] font-normal text-black/70">
              <a href="/about">About Us</a>
              <a href="/">Developers</a>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-1">
            <h3 className="font-semibold">Products</h3>

            <div className="flex flex-col my-3 xl:my-0  text-[15px] font-normal text-black/70">
              <a href="/">POS</a>
              <a href="/">Bulk Payments</a>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-1">
            <h3 className="font-semibold">Legal</h3>

            <div className="flex  flex-col my-3 xl:my-0  text-[15px] font-normal text-black/70">
              <a href="/terms">Terms of Use</a>
              <a href="/privacy-policy">Privacy Policy</a>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-1">
            <h3 className="font-semibold">Contact Us</h3>

            <div className="flex  flex-col my-3 xl:my-0  text-[15px] font-normal text-black/70">
              <a href="/">+256 764 945 756</a>
              <a href="/">info@alfajiri.co</a>
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-[#D4DAE6]" />

      <div className="flex gap-5 justify-center items-center  xl:my-4 xl:pt-2 xl:pb-5">
        <div className="text-[15px] text-center font-normal text-black/90">
          <span> &copy; </span>
          <span>{new Date().getFullYear()}.</span>{" "}
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
