import DashboardHeader from "@/components/Client/Dashboard-Header";
import OrganizationSettings from "@/components/Client/OrganizationSettings";
import SecuritySettings from "@/components/Client/SecuritySettings";
import SideBar from "@/components/Client/SideBar";
import UserSettings from "@/components/Client/UserSettings";
import Layout from "@/components/Commons/Layout";
import { Building2, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Organisation");

  const tabs = [
    { name: "Organisation", icon: <Building2 size={14} /> },
    { name: "User", icon: <User size={14} /> },
    { name: "Security", icon: <LockKeyhole size={14} /> },
  ];

  return (
    <Layout title="Settings">

        <div className=" mx-20 my-10">
          <div className="relative">
            <div className="flex gap-4 text-[15px] py-2 mb-5 ">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={ `flex items-center gap-1 border  px-3 py-1  rounded-[6px] ${
                    activeTab === tab.name
                      ? "border-[#1B2029] font-medium text-[#1B2029]"
                      : "border-[#D4DAE6] font-normal text-[#5C6474]"
                  }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.icon}
                  <h4
                    className={`cursor-pointer `}
                  >
                    {tab.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div>
            {activeTab === "Organisation" && <OrganizationSettings />}
            {activeTab === "User" && <UserSettings />}
            {activeTab === "Security" && <SecuritySettings />}
          </div>
        </div>
     </Layout>
  );
}

export default SettingsPage;
