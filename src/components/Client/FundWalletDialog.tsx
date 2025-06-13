import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Wallet } from "lucide-react";
import FundWalletDetails from "./FundWalletDetails";
import { Progress } from "@/components/ui/progress";

import ManualWalletDetails from "./Manual-WalletDetails";
import ConfirmPaymentDetails from "./ConfirmPaymentDetails";
import AuthorizeDeposit from "./AuthorizeDeposit";
import SuccessFulDeposit from "./SuccessFulDeposit";
import SuccessFulTopUp from "./SuccessFulTopup";

// interface FundWalletProps {
//   onClick?: () => void;
// }


export function FundWallet() {
  const [DialogOpen, setIsDialogOpen] = useState(false);
  const [Details, setDetails] = useState({
    amount: "",
    accountNumber: "",
    network: "",
    airtelAllocation: 0,
    mtnAllocation: 0,

  });

  const [ManualDetails, setManualDetails] = useState({
    amount: "",
    proofOfCredit: "",
    airtelAllocation: 0,
    mtnAllocation: 0,
    transactionID: "",
  });

  const [activeTab, setActiveTab] = useState("Self Top-up");
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex px-2 h-10 sm:gap-1 justify-center items-center cursor-pointer border text-black text-[13px] rounded-[8px]">
          <Wallet className="h-3 w-5" />
          <span>Fund Wallet</span>
        </div>
      </DialogTrigger>
      {/* dialog content */}
      <DialogContent className="sm:w-[40vw] sm:h-[50vw] h-full">
        <div className="flex items-center gap-10  -mt-2">
          <div
            className="-mt-2 bg-[#EDF0F7] rounded-full h-7 w-7 flex justify-center items-center"
            onClick={handlePreviousStep}
          >
            <ArrowLeft className="h-4 w-4" />
          </div>
          {currentStep !== 3 &&
            !(activeTab === "Manual Top-up" && currentStep === 2) && (
              <Progress
                value={
                  activeTab === "Manual Top-up" ? 100 : (currentStep / 3) * 100
                }
                className="w-[70%]"
              />
            )}
        </div>

        <div className=" my-0">
          {(activeTab === "Self Top-up" && currentStep <= 2) ||
            (activeTab === "Manual Top-up" && currentStep === 1) ? (
            <h3 className="font-bold">Fund your Wallet</h3>
          ) : null}

          {currentStep !== 4 &&
            !(activeTab === "Manual Top-up" && currentStep === 2) && (
              <div className="relative">
                <div className="flex gap-10 text-[15px] py-2">
                  {["Self Top-up", "Manual Top-up"].map((tab) => (
                    <div key={tab} className="relative">
                      <h4
                        className={`cursor-pointer ${activeTab === tab ? " font-semibold" : ""
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
            )}

          {activeTab === "Self Top-up" && currentStep === 1 && (
            <FundWalletDetails handleNextStep={handleNextStep} setFundDetails={setDetails} details={Details} />
          )}

          {activeTab === "Self Top-up" && currentStep === 2 && (
            <ConfirmPaymentDetails handleNextStep={handleNextStep} details={Details} handlePreviousStep={handlePreviousStep} />
          )}

          {activeTab === "Self Top-up" && currentStep === 3 && (
            <AuthorizeDeposit handleNextStep={handleNextStep} details={Details} />
          )}

          {activeTab === "Self Top-up" && currentStep === 4 && (
            <SuccessFulDeposit />
          )}

          {activeTab === "Manual Top-up" && currentStep === 1 && (
            <ManualWalletDetails handleNextStep={handleNextStep} setManualDetails={setManualDetails} />
          )}

          {activeTab === "Manual Top-up" && currentStep === 2 && (
            <SuccessFulTopUp ManualTopUpDetails={ManualDetails} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
