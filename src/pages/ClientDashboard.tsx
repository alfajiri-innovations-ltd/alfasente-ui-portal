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

export const lists = [
  {
    name: "Staff",
    members: 46,
    createdBy: "Grace Kizza",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Interns",
    members: 150,
    createdBy: "Mutebire Arnold",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Security",
    members: 45,
    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Contractors",
    members: 10,
    createdBy: "Luswaata Vicent",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Drivers",
    members: 20,
    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
];

function ClientDashboard() {
  const User = GetUser();
  const [user, setUser] = useState(false);
  const [viewBalance, setViewBalance] = useState(true);
  console.log(User);
  const HandleClick = () => {
    setViewBalance(!viewBalance);
  };

  useEffect(() => {
    if (User) {
      setUser(false);
    }
  }, []);
  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4  bg-white">
        <DashboardHeader PageTitle="Dashboard" />

        <div className="flex flex-col mx-28 my-5">
          <div>
            {" "}
            <h3 className="font-normal text-base">Welcome,</h3>
            {!user ? (
              <span className="font-normal text-[24px] italic ">
                {User?.firstName} {User?.lastName}
              </span>
            ) : (
              <Skeleton className="h-4 w-[200px] bg-slate-500" />
            )}
          </div>

          <div className=" px-8 py-12 rounded-[10px] my-4 space-y-4 bg-primary bg-contain bg-hero-pattern bg-right bg-no-repeat">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">Wallet Balance</span>
              {viewBalance ? (
                <EyeClosed
                  className="text-white h-4 w-4"
                  onClick={HandleClick}
                />
              ) : (
                <EyeOffIcon
                  className="text-white h-4 w-4"
                  onClick={HandleClick}
                />
              )}
            </div>
            <span className="text-white text-lg font-bold my-5">
              {viewBalance ? "UGX 3,000,300" : "XXXXXX"}
            </span>

            <div className="flex gap-3  ">
              <FundWallet />
              <SendFunds />

              <div className="flex px-2 py-1 gap-1 items-center bg-[#F9EBFE] text-[#4F1762] text-[15px] rounded-[8px]">
                <img
                  src="/images/icons/transactions.svg"
                  width={20}
                  alt="Transactions"
                />
                <span>Transactions</span>
              </div>
            </div>
          </div>

          <div className="my-5">
            <div className="flex justify-between">
              <div className="gap-1 flex ">
                <span className="font-semibold text-lg">Beneficiary Lists</span>
                <Badge variant="outline" className="rounded-full p-2">
                  20
                </Badge>
              </div>

              <Button className="text-white bg-secondary px-2">
                See All
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </div>

            <div>
              <BeneficiariesTable lists={lists} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClientDashboard;
