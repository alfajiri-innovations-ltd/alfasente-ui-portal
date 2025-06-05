
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
import { SlEnvolope } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { AuditlogsTable } from "@/components/Client/Tables/AuditLogsTable";

import { useUser } from "@/hooks/UserContext";

import { useGetAllLogs } from "@/lib/services/FetchAllAuditLogs";
import Layout from "@/components/Commons/Layout";

function AdminDashboard() {
  const nuser = useUser();

  const userRole = nuser?.role_name || "admin";

  const auditlogs = useGetAllLogs();

  const DashboardAuditlogs = auditlogs.slice(0, 5);

  const AdminCards = [
    {
      title: "Pending Applications",
      number: 300,
      description: "Pending client applications awaiting review.",
      icon: <SlEnvolope className="w-4 h-4 fill-[#E59339]" />,
    },
    {
      title: "Active Organisations",
      number: 129,
      description: "Organisations actively using the platform.",
      icon: <PiBuildingOfficeLight className="w-4 h-4 fill-[#0088E8]" />,
    },
    {
      title: "Transactions Processed",
      number: 120,
      description: "Transactions completed yesterday.",
      icon: <FaMoneyBillTransfer className="w-4 h-4 fill-[#308242]" />,
    },
  ];
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-3 gap-5 mx-5 my-5">
        {AdminCards.map((card, index: number) => (
          <div className="border  border-[#D4DAE6] rounded-[10px]" key={index}>
            <div className="flex items-center justify-between p-4 ">
              <div className="flex flex-col">
                <span className="text-[#5C6474] text-[17px]">{card.title}</span>

                <span className="text-[#222222] font-semibold text-base">
                  {card.number}
                </span>
              </div>
              <div className="rounded-full p-1.5 bg-[#F7F9FD]">{card.icon}</div>
            </div>

            <hr />
            <div className="p-2 text-[#848EA2] text-xs">{card.description}</div>
          </div>
        ))}
      </div>

      <div className="mx-5 my-10">
        <div className="flex justify-between">
          <div className="gap-1 flex ">
            <span className="font-semibold text-lg">Audit Logs</span>
            <Badge variant="outline" className="rounded-full p-2">
              {auditlogs?.length}
            </Badge>
          </div>

          <Button className="text-white bg-secondary px-2">
            <Link to="/audit-logs" className="flex items-center gap-1">
              {" "}
              See All
              <span>
                <ArrowRight />
              </span>
            </Link>
          </Button>
        </div>

        <div>
          <AuditlogsTable auditlogs={DashboardAuditlogs} role_name={userRole} />
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
