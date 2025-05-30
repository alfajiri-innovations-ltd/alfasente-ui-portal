import { useNavigate } from "react-router-dom";
import { Login } from "../Client/Login";
import { SignUp } from "../Client/Signup";
import { MobilePopOver } from "./LandingPage/MobileNav";
import NavItems from "./NavItems";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex lg:px-[6.25vw] px-4 justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-[36px] items-center py-[19.5px]  border-b border-[#DCE1EC]  transition-all duration-300">
      <div className="h-[38px] w-[154px] flex items-center justify-center overflow-hidden" onClick={()=>{navigate('/')}}>
        <img
          src="/images/logos/alfasente-logo.png"
          alt="Alfasente"
          className="h-full w-full object-cover"
        />
      </div>

     <div className="hidden xl:flex"> <NavItems /></div>
      <div className="flex gap-3 items-center">
        <Login />

      
          <MobilePopOver />

          <div className="hidden xl:flex">
          <SignUp />
          </div>
        
        
      </div>
    </div>
  );
}

export default Header;
