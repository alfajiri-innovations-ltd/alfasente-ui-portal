import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Search, X } from "lucide-react";
import { HiMiniUsers } from "react-icons/hi2";

import { IMembers, listsWithMembers } from "@/lib/interfaces/interfaces";
import { GetLists } from "@/lib/services/FetchClientLists";

import { GetClient } from "@/lib/services/GetClientById";
import { getAuthUser, getUserToken } from "@/lib/cookies/UserMangementCookie";
import { SendMoney } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { AddBeneficiaryForm } from "@/components/Client/Forms/AddBeneficiaryForm";
import PaymentOverViewIndividual from "@/components/Client/PreviewIndividual";
import { getRandomColor } from "@/components/Client/Tables/MembersTable";
import PaymentOverView from "@/components/Client/PaymentOverView";
import { useNavigate } from "react-router-dom";

export function SendFunds() {
  const [previewList] = useState(false);
  const [items, setItems] = useState<listsWithMembers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked] = useState(false);
  const [checkedListId, setCheckedListId] = useState<number | null>(null);
  const [, setFundWalletDialog] = useState(false);
  const client = GetClient();
  const token = getUserToken();

  const [submitting, setSubmitting] = useState(false);
  const clientId = client?.clientID;
  const [errorMessage, showErrorMessage] = useState(false);

  // Ensure IMembers is imported or defined correctly
  const [Beneficiary, setBeneficiary] = useState<IMembers | null>(null);

  const [checkedList, setCheckedList] = useState<listsWithMembers | null>(null);

  const [activeTab, setActiveTab] = useState("Lists");

  const onClose = () => {
    setFundWalletDialog(false);
  };

  const navigate = useNavigate();

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

//   const HandleClick = () => {
//     setPreviewList(!previewList);
//   };

  const HandleCheck = (list: listsWithMembers) => {
    const isAlreadyChecked = checkedListId === list.id;

    setCheckedListId(isAlreadyChecked ? null : list.id);
    setCheckedList(isAlreadyChecked ? null : list);
  };

  const handleSubmit = async () => {
    const authUser = getAuthUser();
    const payer = authUser?.username;
    try {
      if (!checkedList || checkedList.members.length === 0) {
        console.warn("No members selected.");
        return;
      }

      const payload = {
        clientID: clientId,

        payer: payer,
        members: checkedList.members.map((member) => ({
          ...member,

          payer: payer,
        })),
      };

      const response = await fetch(SendMoney(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: "Funds sent successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: result?.message || "Failed to send funds.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred: ${error instanceof Error ? error.message : "Failed to send funds."}`,
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
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
        <div
          className={`sm:w-[60vw] w-screen sm:h-[40vw]   mx-auto h-full flex flex-col py-6 ${!previewList && "sm:px-20"}`}
        >
          {/* <ArrowLeft
            className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
            onClick={HandleClick}
          /> */}

          <div className="" >
            <h3>Send Funds</h3>

            <div className="relative">
              <div className="flex gap-10 text-[15px] py-2">
                {["Lists", "Individual"].map((tab) => (
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
            <h4 className="text-black my-3">
              {activeTab === "Lists" &&
                (currentStep === 1
                  ? "1. Select beneficiary list"
                  : "2.Payment Overview")}
            </h4>
          </div>

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
            <PaymentOverView
              list={checkedList}
              showErrorMessage={showErrorMessage}
            />
          ) : (
            <p>No list selected</p>
          )}

          <div className={`${previewList ? "w-full px-40" : "w-full "}`}>
            {activeTab === "Lists" &&
              (currentStep === 1 ? (
                <Button
                  type="submit"
                  disabled={!checkedListId}
                  className="bg-[#8D35AA] w-full"
                  onClick={handleNextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#8D35AA] w-full"
                  onClick={handleSubmit}
                  disabled={!checkedListId || errorMessage || submitting}
                >
                  {submitting ? "Submitting..." : "Send "}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
