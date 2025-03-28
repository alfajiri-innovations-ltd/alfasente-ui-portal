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
import PreviewList from "./PreviewList";
import { ArrowLeft, Check, Search, Send } from "lucide-react";
import { HiMiniUsers } from "react-icons/hi2";
import { getRandomColor } from "./Tables/MembersTable";
import { listsWithMembers } from "@/lib/interfaces/interfaces";
import { GetLists } from "@/lib/services/FetchClientLists";
import PaymentOverView from "./PaymentOverView";

export function SendFunds() {
  const [previewList, setPreviewList] = useState(false);
  const [items, setItems] = useState<listsWithMembers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedList, setCheckedList] = useState<listsWithMembers | null>(null);
  const [page, setPage] = useState(1);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const itemsPerPage = 3;
  const allLists = GetLists();
 
  const approvedLists = allLists.filter((list) => list.status === "Approved");
  console.log("---->",approvedLists)

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      console.log("yyeyyeye", approvedLists);
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
    setIsChecked(!isChecked);
    setCheckedList(list);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex px-2 h-10 cursor-pointer gap-1 items-center bg-primary text-white text-[15px] rounded-[8px]">
          <Send className="h-4 w-4" />
          <span>Send Funds</span>
        </div>
      </DialogTrigger>

      <DialogContent
        className={`w-[50vw] flex flex-col py-6 ${!previewList && "px-20"}`}
      >
        <ArrowLeft
          className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
          onClick={HandleClick}
        />

        
          
            <DialogHeader>
              <DialogTitle>Send Funds</DialogTitle>
              <DialogDescription className="text-black">
              { currentStep===1 ? '1. Select beneficiary list' :'2.Payment Overview'}
              </DialogDescription>
            </DialogHeader>

            {currentStep === 1 ? (

            <div>
              <div className="flex bg-[#EDF0F7] items-center px-1 rounded-full lg:px-3 lg:rounded-[10px]">
                <Search className="w-3 h-3 lg:h-4 lg:w-4" />
                <Input
                  type="search"
                  placeholder="Search for list"
                  className="hidden lg:flex w-[20vw] border-none outline-none bg-[#EDF0F7] focus:ring-0 focus-visible:ring-0 shadow-none placeholder:text-sm"
                />
              </div>

              <div className="h-[200px] overflow-auto my-4 scrollbar-hidden">
                {approvedLists.length > 0 ? (
                  approvedLists.map((item: listsWithMembers, index: number) => (
                    <div
                      key={index}
                      className="flex px-3  gap-64 relative items-center border rounded-md my-2 "
                    >
                      <div
                        className={`rounded-full p-[2px] h-4 w-4 flex items-center justify-center border absolute right-2 top-2 border-[#C8CFDE]  ${isChecked && "bg-black"}`}
                        onClick={() => {
                          HandleCheck(item);
                        }}
                      >
                        {isChecked ? (
                          <Check size={15} className="text-white" />
                        ) : (
                          ""
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

                        <span>members</span>
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
          <PaymentOverView list={checkedList} />
        ) : (
          <p>No list selected</p>
        )}

        <DialogFooter className={`${previewList ? "w-full px-40" : "w-full"}`}>
          {currentStep === 1 ? (
            <Button
              type="submit"
              className="bg-[#8D35AA] w-full"
              onClick={handleNextStep}
            >
              Continue
            </Button>
           ): (
            <Button
              type="submit"
              className="bg-[#8D35AA] w-full"
              onClick={HandleClick}
            >
              Send
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
