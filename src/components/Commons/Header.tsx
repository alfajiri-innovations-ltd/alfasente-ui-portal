import { useNavigate } from "react-router-dom";
import { MobilePopOver } from "./LandingPage/MobileNav";
import NavItems from "./NavItems";
import { Button } from "../ui/button";
// import { getUserToken } from "@/lib/cookies/UserMangementCookie";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex lg:px-[6.25vw] px-4 justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-[36px] items-center py-[19.5px]  border-b border-[#DCE1EC]  transition-all duration-300">
      <div
        className="h-[38px] w-[154px] flex items-center justify-center overflow-hidden"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="/images/logos/alfasente-logo.png"
          alt="Alfasente"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="hidden xl:flex">
        {" "}
        <NavItems />
      </div>
      {/* {
        getUserToken()
      } */}
      <div className="flex gap-3 items-center">
        <Button
          variant={"outline"}
          onClick={() => {
            navigate("/login");
          }}
          className="rounded-[40px] h-11 hover:bg-[#FBFDFF] bg-[#E4E8F1] text-[#000000E5] border-none px-5 text-sm"
        >
          Login
        </Button>

        <MobilePopOver />

        <div className="hidden xl:flex">
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="flex w-full bg-primary h-11 rounded-[40px] hover:bg-[#7E249A] text-sm shadow-none"
          >
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
