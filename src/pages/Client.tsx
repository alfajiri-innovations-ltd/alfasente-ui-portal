import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowRight, EyeClosed, EyeOffIcon, Send } from "lucide-react";
import { BeneficiariesTable } from "@/components/Client/Tables/BeneficiariesTables";
import { useState } from "react";
import { FundWallet } from "@/components/Client/FundWalletDialog";

function Client() {
  const [viewBalance, setViewBalance] = useState(true);

  const HandleClick = () => {
    setViewBalance(!viewBalance);
  };
  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4  bg-white">
        <DashboardHeader />

        <div className="flex flex-col mx-28 my-5">
          <div>
            {" "}
            <h3 className="font-normal text-base">Welcome,</h3>
            <span className="font-normal text-[24px] italic ">
              George Kizza
            </span>
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

              <div className="flex px-2 py-1 gap-1 items-center bg-secondary text-white text-[15px] rounded-[8px]">
                <Send className="h-4 w-4" />
                <span>Send Funds</span>
              </div>
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
              <BeneficiariesTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Client;
