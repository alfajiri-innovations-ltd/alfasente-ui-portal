import { Link, useLocation } from "react-router-dom";

function NavItems() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className=" xl:flex flex-col max-h-[70vh] overflow-auto md:flex-row px-4 lg:px-0 lg:items-center gap-3 list-none md:gap-2 lg:gap-8 text-base font-medium">
      <li
        className={`cursor-pointer text-[#000000CC] ${pathname === "/about" && "text-texthighlight font-semibold"} active:text-primary   `}
      >
        <Link to="/howitworks" className="cursor-pointer">
          How It Works
        </Link>
      </li>

      <li
        className={`cursor-pointer text-[#000000CC] ${pathname === "/resources" && "text-texthighlight font-semibold"} active:text-primary   `}
      >
        <Link to="/resources" className="cursor-pointer">
          Resources
        </Link>
      </li>
      <li
        className={`cursor-pointer text-[#000000CC] ${pathname === "/about" && "text-texthighlight font-semibold"} active:text-primary   `}
      >
        <Link to="/about" className="cursor-pointer">
          About Us
        </Link>
      </li>

     
    </nav>
  );
}

export default NavItems;
