import { Link, useLocation } from "react-router-dom";

function NavItems() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="flex flex-col max-h-[70vh] overflow-auto md:flex-row px-4 lg:px-0 lg:items-center gap-3 list-none md:gap-2 lg:gap-8 text-[16px] ">
      <li
        className={`cursor-pointer text-textcolor ${pathname === "/about" && "text-texthighlight font-semibold"} active:text-primary   `}
      >
        <Link to="/about" className="cursor-pointer">
          About Us
        </Link>
      </li>

      <li
        className={`cursor-pointer text-textcolor ${pathname === "/contact-us" && "text-texthighlight font-semibold"}  active:text-primary `}
      >
        <Link to="/contact-us">Contact Us</Link>
      </li>
    </nav>
  );
}

export default NavItems;
