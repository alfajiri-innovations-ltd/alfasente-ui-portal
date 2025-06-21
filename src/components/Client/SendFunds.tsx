import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Search, Send } from "lucide-react";
import { HiMiniUsers } from "react-icons/hi2";
import { getRandomColor } from "./Tables/MembersTable";
import { IMembers, listsWithMembers } from "@/lib/interfaces/interfaces";
import { GetLists } from "@/lib/services/FetchClientLists";
import PaymentOverView from "./PaymentOverView";
import { AddBeneficiaryForm } from "./Forms/AddBeneficiaryForm";
import PaymentOverViewIndividual from "./PreviewIndividual";

export function SendFunds() {
  const [previewList, setPreviewList] = useState(false);
  const [items, setItems] = useState<listsWithMembers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked] = useState(false);
  const [checkedListId, setCheckedListId] = useState<number | null>(null);
  const [DialogOpen, setFundWalletDialog] = useState(false);

  const [errorMessage,showErrorMessage] = useState(false);

  // Ensure IMembers is imported or defined correctly
  const [Beneficiary, setBeneficiary] = useState<IMembers | null>(null);

  const [checkedList, setCheckedList] = useState<listsWithMembers | null>(null);

  const [activeTab, setActiveTab] = useState("Lists");


  const onClose = () => {
    setFundWalletDialog(false);
  };



  // const [page, setPage] = useState(1);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  // const handlePreviousStep = () => {
  //   setCurrentStep((prev) => Math.max(prev - 1, 1));
  // };
  // const itemsPerPage = 3;
  const allLists = GetLists();

  const approvedLists = allLists.filter((list) => list.status === "Approved");

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      console.log(items);
      setItems(approvedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const HandleClick = () => {
    setPreviewList(!previewList);
  };

  const HandleCheck = (list: listsWithMembers) => {
    const isAlreadyChecked = checkedListId === list.id;

    setCheckedListId(isAlreadyChecked ? null : list.id);
    setCheckedList(isAlreadyChecked ? null : list);
  };

  return (
    <>
      <Dialog open={DialogOpen} onOpenChange={setFundWalletDialog}>
        <DialogTrigger asChild>
          <div className="flex px-2 h-10 cursor-pointer gap-1 items-center bg-primary text-white text-[15px] rounded-[8px]">
            <Send className="h-4 w-4" />
            <span>Send Funds</span>
          </div>
        </DialogTrigger>

        <DialogContent
          className={`sm:w-[60vw] w-screen sm:h-[40vw] h-full flex flex-col py-6 ${!previewList && "sm:px-20"}`}
        >
          <ArrowLeft
            className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
            onClick={HandleClick}
          />

          <DialogHeader>
            <DialogTitle>Send Funds</DialogTitle>

            <div className="relative">
              <div className="flex gap-10 text-[15px] py-2">
                {["Lists", "Individual"].map((tab) => (
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
            <DialogDescription className="text-black">
              {activeTab === "Lists" &&
                (currentStep === 1
                  ? "1. Select beneficiary list"
                  : "2.Payment Overview")}
            </DialogDescription>
          </DialogHeader>

          {activeTab === "Individual" ? (
            <>
              {currentStep === 1 && (
                <div className="overflow-y-scroll scrollbar-hidden ">
                  <AddBeneficiaryForm
                    handleNext={handleNextStep}
                    setBeneficiary={setBeneficiary}
                  />
                </div>
              )}

              {currentStep === 2 && Beneficiary && (
                <PaymentOverViewIndividual
                  beneficiary={Beneficiary}
                  onClose={onClose}
                />
              )}
            </>
          ) : currentStep === 1 ? (
            <div className="w-full">
              <div className="flex bg-[#EDF0F7] items-center px-1 rounded-full sm:px-3 sm:rounded-[10px]">
                <Search className="sm:w-4 sm:h-4 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for list"
                  className="hidden sm:flex sm:w-full border-none outline-none bg-[#EDF0F7] focus:ring-0 focus-visible:ring-0 shadow-none placeholder:text-sm"
                />
              </div>

              <div className="sm:h-[200px] overflow-auto my-4 scrollbar-hide ">
                {approvedLists.length > 0 ? (
                  approvedLists.map((item: listsWithMembers, index: number) => (
                    <div
                      key={index}
                      className="flex px-3  gap-64 relative items-center border rounded-md my-2 "
                    >
                      <div
                        className={`rounded-full p-[2px] h-4 w-4 flex items-center justify-center border absolute right-2 top-2 border-[#C8CFDE] ${checkedListId === item.id && "bg-black"}
`}
                        onClick={() => {
                          HandleCheck(item);
                        }}
                      >
                        {checkedListId === item.id && (
                          <Check size={15} className="text-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 my-3">
                        <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                          <HiMiniUsers
                            style={{
                              fill: getRandomColor(),
                            }}
                          />
                        </span>
                        <span
                          className={`capitalize ${isChecked ? "font-medium" : "font-normal"}`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <div className="flex  gap-1 text-[#5C6474]">
                        {item.members.length}

                        <span className="text-capitalize">members</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No approved lists yet
                  </p>
                )}

                {isLoading && <p>Loading...</p>}
              </div>
            </div>
          ) : checkedList ? (
            <PaymentOverView list={checkedList} showErrorMessage={showErrorMessage}/>
          ) : (
            <p>No list selected</p>
          )}

          <DialogFooter
            className={`${previewList ? "w-full px-40" : "w-full "}`}
          >
            {activeTab === "Lists" &&
              (currentStep === 1 ? (
                <Button
                  type="submit"
                  className="bg-[#8D35AA] w-full"
                  onClick={handleNextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#8D35AA] w-full"
                  onClick={HandleClick}
                  disabled={!checkedListId || errorMessage}
                >
                  Send
                </Button>
              ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
