import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { ArrowLeft, X } from "lucide-react";

import { IMembers, IUser, listsWithMembers } from "@/lib/interfaces/interfaces";
import { useClientListsWithMembers } from "@/lib/services/FetchClientLists";

import { GetClient } from "@/lib/services/GetClientById";
import { getAuthUser, getUserToken } from "@/lib/cookies/UserMangementCookie";
import {
  SendMoney,
  SendMoneyOtp,
  VerifySendMoneyOtp,
} from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { AddBeneficiaryForm } from "@/components/Client/Forms/AddBeneficiaryForm";
import PaymentOverViewIndividual from "@/components/Client/PreviewIndividual";
import PaymentOverView from "@/components/Client/PaymentOverView";
import { useNavigate, useParams } from "react-router-dom";
import PaymentInitiated from "@/components/Client/PaymentInitiated";
import { GetList } from "@/lib/services/GetListById";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.number().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

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
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [Beneficiary, setBeneficiary] = useState<IMembers | null>(null);
  const [isSubmittingOtp, setSubmittingOtp] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [resetTimer,setResetTimer] = useState(false);
  const [resendSubmitting, setIsResendSubmitting] = useState(false);
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: 0,
    },
  });
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (resetTimer) {
      setTimeLeft(600);
    }
  }, [resetTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  function handleOtpChange(value: string) {
    setValue(value);
    form.setValue("pin", parseInt(value, 10));
  }
  const onSubmit = async () => {
    setSubmittingOtp(true);
    const otpNumber = parseInt(value, 10);

    try {
      const response = await fetch(VerifySendMoneyOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: loggedInUser?.user_email,
          otp: otpNumber,
        }),
      });



      if (response.ok) {
        setCurrentStep(3);

        setTimeout(() => {
          MakePayment();
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "Invalid OTP.",
        });

        form.reset();
        setValue("");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: `${error}`,
      });
    } finally {
      setSubmittingOtp(false);
    }
  };


  const SendOtp = async () => {
    try {
      const response = await fetch(SendMoneyOtp(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: loggedInUser?.user_email }),
      });



      if (response.ok) {
        
       handleNextStep();
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "Invalid Email.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "An expected error occured.",
      });
    } finally {
      setIsResendSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setResetTimer(true)
    setIsResendSubmitting(true);
    try {
      const response = await fetch(SendMoneyOtp(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: loggedInUser?.user_email }),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: `Otp sucessfully sent to ${loggedInUser?.user_email}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "Invalid Email.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "An expected error occured.",
      });
    } finally {
      setIsResendSubmitting(false);
    }
  };

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

  const MakePayment = () => {
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
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Failed to send money. Please try again."
          );
        }
        return res.json();
      })

      .catch((error) => {
        console.error("SendMoney error (background):", error);
      });

    // setCurrentStep(2);

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
            {currentStep !== 3 && <h3>Send Funds</h3>}
            {currentStep !== 3 && (
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
          {currentStep === 2   && (
            <div className=" h-screen flex flex-col justify-center">
              <h4 className="text-[22px] text-left font-semibold my-2  ">
                Confirm your email
              </h4>
              <span className="">
                Enter the verification code sent to
                <span className="font-semibold">
                  {" "}
                  {loggedInUser?.user_email ?? ""}
                </span>
              </span>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full  flex flex-col px-0  space-y-6 "
                  >
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              {...field}
                              value={value}
                              onChange={handleOtpChange}
                            >
                              <InputOTPGroup className="">
                                <InputOTPSlot index={0} className="w-10 h-10" />
                                <InputOTPSlot index={1} className="w-10 h-10" />
                                <InputOTPSlot index={2} className="w-10 h-10" />
                              </InputOTPGroup>

                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={3} className="w-10 h-10" />
                                <InputOTPSlot index={4} className="w-10 h-10" />
                                <InputOTPSlot index={5} className="w-10 h-10" />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription className="w-full md:w-[417px]">
                            Code expires in {formatTime(timeLeft)}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-[70%] h-11 rounded-[8px]"
                      disabled={isSubmittingOtp}
                    >
                      {isSubmittingOtp ? "Verifying..." : "Verify"}
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="my-4  mx-20">
                <h4 className="text-inactive">
                  Didn&apos;t receive OTP code?
                  <span
                    className="underline cursor-pointer"
                    onClick={handleResendOtp}
                    aria-disabled={resendSubmitting}
                  >
                    {resendSubmitting ? "Resending..." : "Resend it"}
                  </span>
                </h4>
              </div>
            </div>
          )}

          {currentStep === 3  || ( currentStep=== 4 && activeTab==="individual") && (
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
                  onClick={SendOtp}
                  // onClick={handleSubmit}
                  disabled={errorMessage || submitting}
                >
                  Confirm Payment
                  {/* {submitting ? "Submitting..." : "Send Payments "} */}
                </Button>
              ) : (
                currentStep !== 3 && (
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
                      // onClick={handleSubmit}
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
