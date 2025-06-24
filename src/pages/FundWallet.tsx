import { useState } from "react";
import { ArrowLeft,  X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import FundWalletDetails from "@/components/Client/FundWalletDetails";
import ConfirmPaymentDetails from "@/components/Client/ConfirmPaymentDetails";
import AuthorizeDeposit from "@/components/Client/AuthorizeDeposit";
import SuccessFulDeposit from "@/components/Client/SuccessFulDeposit";
import ManualWalletDetails from "@/components/Client/Manual-WalletDetails";
import SuccessFulTopUp from "@/components/Client/SuccessFulTopup";
import { useNavigate } from "react-router-dom";



export function FundWallet() {
  const [Details, setDetails] = useState({
    amount: 0,
    accountNumber: "",
    network: "",
    
  });

  const navigate = useNavigate();

  const [ManualDetails, setManualDetails] = useState({
    amount: 0,
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
    <div className="flex flex-col  h-screen scrollbar-hide">
      <div className="rounded-full  md:translate-y-8 translate-y-14 translate-x-10 w-min p-2 bg-[#EDF0F7]">
        <ArrowLeft
          className="h-6 w-6 cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        />
      </div>

      <div className="rounded-full ml-auto -translate-x-10 translate-y-5 md:-translate-y-3 w-min p-2 bg-[#EDF0F7]">
        <X
          className=" right-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => {
            navigate("/dashboard");
          }}
        />
      </div>
      <div className="flex flex-col  items-center ">
        <div className="flex items-center gap-10 md:-mt-5  ">
          {currentStep !== 3 &&
            !(activeTab === "Manual Top-up" && currentStep === 2) && (
              <Progress
                value={
                  activeTab === "Manual Top-up" ? 100 : (currentStep / 3) * 100
                }
                className="w-[40vw] my-4"
              />
            )}
        </div>

          <div className="md:w-[40vw] w-[80vw]">
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
            )}

          {activeTab === "Self Top-up" && currentStep === 1 && (
            <FundWalletDetails
              handleNextStep={handleNextStep}
              setFundDetails={setDetails}
              details={Details}
            />
          )}

          {activeTab === "Self Top-up" && currentStep === 2 && (
            <ConfirmPaymentDetails
              handleNextStep={handleNextStep}
              details={Details}
              setFundDetails={setDetails}
              handlePreviousStep={handlePreviousStep}
            />
          )}

          {activeTab === "Self Top-up" && currentStep === 3 && (
            <AuthorizeDeposit
              handleNextStep={handleNextStep}
              details={Details}
            />
          )}

          {activeTab === "Self Top-up" && currentStep === 4 && (
            <SuccessFulDeposit
              details={Details}
              handleClose={() => {
                setCurrentStep(1);
              }}
            />
          )}

          {activeTab === "Manual Top-up" && currentStep === 1 && (
            <ManualWalletDetails
              handleNextStep={handleNextStep}
              setManualDetails={setManualDetails}
            />
          )}

          {activeTab === "Manual Top-up" && currentStep === 2 && (
            <SuccessFulTopUp ManualTopUpDetails={ManualDetails} />
          )}
        </div>
      </div>
    </div>
  );
}
