import {
 
  BriefcaseIcon,
  DollarSignIcon,
  ClipboardListIcon,
  SettingsIcon,
  LayoutDashboard,
  CircleUserRound,
} from "lucide-react";

function SideBar() {
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="" />,
      href: "/dashboard",
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
    <aside className="2/5 h-full bg-gray-100 p-4">
      <div>
        <img
          src="/images/logos/alfasente-logo.svg"
          alt="Alfasente"
          width={150}
        />
      </div>
      <div className="flex border items-center px-2 py-1 rounded-[5px] gap-3">
        <img src="/images/icons/enterprise.svg" alt="Alfasente" width={25} />

        <div className="flex flex-col ">
          <span className="font-bold text-base">Kizza Enterprises</span>
          <span className="text-[12px] font-normal">10 staff</span>
        </div>
      </div>
      <ul className="space-y-2 my-2">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
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
