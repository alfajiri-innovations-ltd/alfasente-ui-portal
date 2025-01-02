import { Login } from "../Client/Login";
import { SignUp } from "../Client/Signup";
import NavItems from "./NavItems";

function Header() {
  return (
    <div className="flex justify-between items-center py-1 px-10 border-b border-[#DCE1EC] ">
      <div>
        <img
          src="/images/logos/alfasente-logo.svg"
          alt="Alfasente"
          width={150}
        />
      </div>{" "}
      <NavItems />
      <div className="flex gap-3">
        <Login />
        <SignUp />
      </div>
    </div>
  );
}

export default Header;
