import {
  BriefcaseIcon,
  DollarSignIcon,
  ClipboardListIcon,
  SettingsIcon,
  LayoutDashboard,
  CircleUserRound,
} from "lucide-react";

function SideBar() {
  const currentPath = window.location.pathname;

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
      href: "/",
    },
    {
      title: "Beneficiaries",
      icon: <CircleUserRound />,
      href: "/beneficiaries",
    },
    {
      title: "Staff",
      icon: <BriefcaseIcon />,
      href: "/staff",
    },
    {
      title: "Transactions",
      icon: <DollarSignIcon />,
      href: "/transactions",
    },
    {
      title: "Audit Logs",
      icon: <ClipboardListIcon />,
      href: "/audit-logs",
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      href: "/settings",
    },
  ];

  return (
    <aside className=" h-full bg-gray-100 p-4">
      <div>
        <img
          src="/images/logos/alfasente-logo.svg"
          alt="Alfasente"
          width={150}
        />
      </div>
      <div className="flex border items-center px-2 py-1 rounded-[5px] gap-3">
        <img src="/images/icons/enterprise.svg" alt="Alfasente" width={25} />
        <div className="flex flex-col">
          <span className="font-bold text-base">Kizza Enterprises</span>
          <span className="text-[12px] font-normal">10 staff</span>
        </div>
      </div>
      <ul className="space-y-2 my-5">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`flex items-center p-2 rounded ${
                currentPath === item.href
                  ? "bg-gray-300 text-black"
                  : "text-[#5C6474] "
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
