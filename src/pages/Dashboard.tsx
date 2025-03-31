import { useEffect } from "react";
import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, EyeClosed, EyeOffIcon } from "lucide-react";
import { BeneficiariesTable } from "@/components/Client/Tables/BeneficiariesTables";
import { useState } from "react";
import { FundWallet } from "@/components/Client/FundWalletDialog";
import { SendFunds } from "@/components/Client/SendFunds";
import { GetUser } from "@/lib/services/GetUser";
import { GetLists } from "@/lib/services/FetchClientLists";
import {  listsWithMembers } from "@/lib/interfaces/interfaces";
import { Link } from "react-router-dom";
import { SlEnvolope } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { AuditlogsTable } from "@/components/Client/Tables/AuditLogsTable";

import { useUser } from "@/hooks/UserContext";
import { GetClients } from "@/lib/services/FetchAllOrganizations";
import {GetClient} from "@/lib/services/GetClientById";
import { GetAllLogs } from "@/lib/services/FetchAllAuditLogs";
import {GetWallet} from "@/lib/services/fetchWalletById";

function Dashboard() {
  const User = GetUser();
  const nuser = useUser();

  const client= GetClient()
  const Wallet =client?.walletID

  console.log("---->",Wallet)

  const userRole = nuser?.role_name || "admin";

  console.log("iiiiiii", userRole);

  const auditlogs=GetAllLogs()

  const DashboardAuditlogs = auditlogs.slice(0, 5);

  const [user, setUser] = useState(false);
  const [viewAirtelBalance, setViewAirtelBalance] = useState(true);
  const [viewMtnBalance, setViewMtnBalance] = useState(true);

  const Lists: listsWithMembers[] = GetLists();
  console.log(Lists);
  const HandleAirtelClick = () => {
    setViewAirtelBalance(!viewAirtelBalance);
  };

  const HandleMtnClick = () => {
    setViewMtnBalance(!viewMtnBalance);
  };

  useEffect(() => {
    if (User) {
      setUser(false);
    }
  }, []);

  const Clients = GetClients();
  console.log(Clients);

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
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4  bg-white">
        <DashboardHeader PageTitle="Dashboard" />

        {userRole === "admin" ? (
          <>
            <div>
              <div className="grid grid-cols-3 gap-5 mx-5 my-5">
                {AdminCards.map((card, index: number) => (
                  <div>
                    <div
                      className="border  border-[#D4DAE6] rounded-[10px]"
                      key={index}
                    >
                      <div className="flex items-center justify-between p-4 ">
                        <div className="flex flex-col">
                          <span className="text-[#5C6474] text-[17px]">
                            {card.title}
                          </span>

                          <span className="text-[#222222] font-semibold text-base">
                            {card.number}
                          </span>
                        </div>
                        <div className="rounded-full p-1.5 bg-[#F7F9FD]">
                          {card.icon}
                        </div>
                      </div>

                      <hr />
                      <div className="p-2 text-[#848EA2] text-xs">
                        {card.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mx-5 my-10">
                <div className="flex justify-between">
                  <div className="gap-1 flex ">
                    <span className="font-semibold text-lg">Audit Logs</span>
                    <Badge variant="outline" className="rounded-full p-2">
                      {Lists.length}
                    </Badge>
                  </div>

                  <Button className="text-white bg-secondary px-2">
                    <Link
                      to="/beneficiaries"
                      className="flex items-center gap-1"
                    >
                      {" "}
                      See All
                      <span>
                        <ArrowRight />
                      </span>
                    </Link>
                  </Button>
                </div>

                <div>
                  <AuditlogsTable
                    auditlogs={DashboardAuditlogs}
                    role_name={userRole}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col mx-28 my-5">
              <div className="flex justify-between">
                <div>
                  {" "}
                  <h3 className="font-normal text-base">Welcome,</h3>
                  {!user ? (
                    <span className="font-normal text-[24px] flex gap-1.5 italic ">
                      {nuser?.firstName} {nuser?.lastName}
                    </span>
                  ) : (
                    <Skeleton className="h-4 w-[200px] bg-slate-500" />
                  )}
                </div>

                {userRole === "client_admin" && (
                  <div className="flex gap-3  ">
                    <FundWallet />
                    <SendFunds />
                  </div>
                )}
              </div>

              {userRole === "client_admin" && (
                <div className="flex gap-5">
                  <div className="grow px-8 py-12 rounded-[10px] my-4 space-y-4 bg-primary bg-contain bg-hero-pattern bg-right bg-no-repeat">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 rounded-full w-10 h-10 items-center flex justify-center">
                        <img
                          src="/images/logos/Airtel.svg"
                          alt="Airtel"
                          className="w-9 h-9 rounded-full"
                        />
                      </div>

                      <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">
                            Airtel Money
                          </span>

                          {viewAirtelBalance ? (
                            <EyeClosed
                              className="text-white h-4 w-4"
                              onClick={HandleAirtelClick}
                            />
                          ) : (
                            <EyeOffIcon
                              className="text-white h-4 w-4"
                              onClick={HandleAirtelClick}
                            />
                          )}
                        </div>
                        <span className="text-white text-lg font-bold ">
                          {viewAirtelBalance ? `UGX ${Wallet
?.airtelWalletBalance
}` : "XXXXXX"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grow px-8 py-12 rounded-[10px] my-4 space-y-4 bg-primary bg-contain bg-hero-pattern bg-right bg-no-repeat">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-400 rounded-full w-10 h-10 items-center flex justify-center">
                        <img
                          src="/images/logos/MTN.svg"
                          alt="MTN"
                          className="w-8 h-8"
                        />
                      </div>

                      <div className="flex flex-col ">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">
                            Mtn Money
                          </span>

                          {viewMtnBalance ? (
                            <EyeClosed
                              className="text-white h-4 w-4"
                              onClick={HandleMtnClick}
                            />
                          ) : (
                            <EyeOffIcon
                              className="text-white h-4 w-4"
                              onClick={HandleMtnClick}
                            />
                          )}
                        </div>
                        <span className="text-white text-lg font-bold ">
                          {viewMtnBalance ? `UGX ${Wallet?.mtnWalletBalance}` : "XXXXXX"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="my-5">
                <div className="flex justify-between">
                  <div className="gap-1 flex ">
                    <span className="font-semibold text-lg">
                      Beneficiary Lists
                    </span>
                    <Badge
                      variant="outline"
                      className="rounded-full p-2 border-[#1B2029]"
                    >
                      {Lists.length}
                    </Badge>
                  </div>

                  <Button
                    className="text-black border-[#B2BCD1] px-2"
                    variant={"outline"}
                  >
                    <Link
                      to="/beneficiaries"
                      className="flex items-center gap-1"
                    >
                      {" "}
                      See All
                      <span>
                        <ArrowRight />
                      </span>
                    </Link>
                  </Button>
                </div>

                <div>
                  <BeneficiariesTable lists={Lists} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
