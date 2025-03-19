import {useState} from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Wallet } from "lucide-react";
import FundWalletDetails from "./FundWalletDetails";
import ManualWalletDetails from './Manual-WalletDetails';

export function FundWallet() {

  const [activeTab, setActiveTab] = useState("Self Top-up");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex px-2 h-10 gap-1 items-center cursor-pointer border  text-black text-[13px] rounded-[8px]">
          <Wallet className="h-3 w-3" />
          <span>Fund Wallet</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[40vw]">
        <div className="-mt-2 bg-[#EDF0F7] rounded-full h-7 w-7 flex justify-center items-center">
          <ArrowLeft className="h-4 w-4" />
        </div>

        <div className=" my-0">

          <h3 className="font-bold">Fund your Wallet</h3>

        <div className="relative">
        <div className="flex gap-10 text-[15px] py-2">
          {["Self Top-up", "Manual Top-up"].map((tab) => (
            <div key={tab} className="relative">
              <h4
                className={`cursor-pointer ${
                  activeTab === tab ? " font-semibold" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </h4>
          
              {activeTab === tab && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-full h-[3px] bg-[#B66FCF] rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        <hr className="border-gray-300 " />
      </div>

      {activeTab==='Self Top-up'  && <FundWalletDetails/>}

      {activeTab==='Manual Top-up' && <ManualWalletDetails/>}
          {/* <FundWalletDetails /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
