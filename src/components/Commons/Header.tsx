import { Login } from "../Client/Login";
import { SignUp } from "../Client/Signup";
import NavItems from "./NavItems";

function Header() {
  return (
    <div className="flex justify-between items-center p-3 rounded-md bg-white">
      <h3 className="font-bold text-lg">AlfaSente</h3>
      <NavItems />
      <div className="flex gap-3">
        <Login />
        <SignUp />
      </div>
    </div>
  );
}

export default Header;
