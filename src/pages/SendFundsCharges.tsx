import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { ArrowLeft, X } from "lucide-react";

import { IMembers, IUser, listsWithMembers } from "@/lib/interfaces/interfaces";
import { useClientListsWithMembers } from "@/lib/services/FetchClientLists";

import { GetClient } from "@/lib/services/GetClientById";
import { getAuthUser, getUserToken } from "@/lib/cookies/UserMangementCookie";
import { SendMoney } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { AddBeneficiaryForm } from "@/components/Client/Forms/AddBeneficiaryForm";
import PaymentOverViewIndividual from "@/components/Client/PreviewIndividual";
import PaymentOverView from "@/components/Client/PaymentOverView";
import { useNavigate, useParams } from "react-router-dom";
import PaymentInitiated from "@/components/Client/PaymentInitiated";
import { GetList } from "@/lib/services/GetListById";
// import PaymentInitiated from "@/components/Client/PaymentInitiated";

export function SendFundsCharges() {
  const [previewList] = useState(false);
  const [, setItems] = useState<listsWithMembers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<IUser>();
  const [checkedListId] = useState<number | null>(null);
  const [, setFundWalletDialog] = useState(false);
  const client = GetClient();
  const token = getUserToken();
  // const[transaction_id,setTransactionId]=useState<string>()
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const clientId = client?.clientID;
  const [errorMessage, showErrorMessage] = useState(false);

  const [Beneficiary, setBeneficiary] = useState<IMembers | null>(null);

  const [amount, setAmount] = useState<number>(0);

  const checkedList = GetList(Number(id || 0));

  const [activeTab, setActiveTab] = useState("Lists");

  const onClose = () => {
    setFundWalletDialog(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const authUser = getAuthUser();
    setLoggedInUser(authUser);
  }, []);

  // const [page, setPage] = useState(1);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  // const itemsPerPage = 3;
  // const allLists = GetLists();

  const { data: allLists } = useClientListsWithMembers();

  const approvedLists = allLists?.filter((list) => list.status === "Approved");

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      setItems(approvedLists || []);
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

  const handleSubmit = () => {
    setSubmitting(true);

    const payer = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

    if (!checkedList || checkedList?.members?.length === 0) {
      console.warn("No members selected.");
      setSubmitting(false);
      return;
    }

    const payload = {
      clientID: clientId,
      payer,
      id: checkedList?.list?.id,
      members: checkedList?.members?.map((member) => {
        let cleanNumber = member.mobileMoneyNumber;

        if (typeof cleanNumber === "string" && cleanNumber.startsWith("0")) {
          cleanNumber = cleanNumber.slice(1);
        }

        return {
          ...member,
          mobileMoneyNumber: cleanNumber,
        };
      }),
    };

    fetch(SendMoney(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("Response:", data);
      })

      .catch((error) => {
        console.error("SendMoney error (background):", error);
      });

    setCurrentStep(2);

    toast({
      variant: "success",
      title: "Sent!",
      description: "Processing in the background.",
    });
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
          className={`sm:w-[60vw] w-screen sm:h-[40vw]   -mt-10 mx-auto h-full flex flex-col py-6 ${!previewList && "sm:px-20"}`}
        >
          {/* <ArrowLeft
            className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
            onClick={HandleClick}
          /> */}

          <div className="">
            {currentStep !== 2 && <h3>Send Funds</h3>}
            {currentStep !== 2 && (
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
            )}
            <h4 className="text-black my-3">
              {activeTab === "Lists" &&
                currentStep === 1 &&
                "1.Payment Overview"}
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
                  setCurrentStep={setCurrentStep}
                  onClose={onClose}
                  setAmount={setAmount}
                />
              )}
            </>
          ) : (
            currentStep === 1 && (
              <PaymentOverView
                list={checkedList}
                setAmount={setAmount}
                showErrorMessage={showErrorMessage}
              />
            )
          )}

          {currentStep === 2 && (
            <PaymentInitiated
              amount={amount ?? 0}
              listName={checkedList?.list?.name ?? ""}
              beneficiaryName={Beneficiary?.beneficiaryName}
            />
          )}

          <div className={`${previewList ? "w-full px-40 " : "w-full "} my-5`}>
            {activeTab === "Lists" &&
              (currentStep === 1 ? (
                <Button
                  type="submit"
                  className="bg-[#8D35AA] w-full"
                  onClick={handleSubmit}
                  disabled={errorMessage || submitting}
                >
                  {submitting ? "Submitting..." : "Send Payments "}
                </Button>
              ) : (
                currentStep !== 2 && (
                  <div className="flex justify-between items-center gap-3 my-5">
                    <Button
                      type="submit"
                      disabled={!checkedListId}
                      variant={"outline"}
                      className=" w-full"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#8D35AA] w-full"
                      onClick={handleSubmit}
                      disabled={!checkedListId || errorMessage || submitting}
                    >
                      {submitting ? "Submitting..." : "Send Payments "}
                    </Button>
                  </div>
                )
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
