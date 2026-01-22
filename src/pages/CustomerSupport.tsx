import { useEffect, useState } from "react";
import Layout from "@/components/Commons/Layout";
import { GetUser } from "@/lib/services/GetUser";
import { useUser } from "@/hooks/UserContext";
import { Skeleton } from "@/components/ui/skeleton";

type FAQ = {
  q: string;
  a: string;
};

function CustomerSupport() {
  const User = GetUser();
  const nuser = useUser();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const [user, setUser] = useState(false);
  const [activeTab, setActiveTab] = useState<"message" | "help">("message");

  useEffect(() => {
    if (User) setUser(false);
  }, [User]);

 

  const faqs: FAQ[] = [
    {
      q: "What if I don’t have enough balance for all recipients?",
      a: "You can: Pay recipients on one network only (MTN or Airtel), or fund your wallet and complete the remaining payments later. This gives you flexibility without blocking the entire payment.",
    },
    {
      q: "How do approvals work before sending payments?",
      a: "Approvals allow designated reviewers to confirm details (amounts, recipients, wallet balance) before the bulk payment is processed. Once approved, the payment can be sent.",
    },
    {
      q: "Can I retry failed payments in a bulk list?",
      a: "Yes. You can retry failed items from the bulk list after fixing the issue (e.g., insufficient balance, invalid recipient, network outage).",
    },
    {
      q: "Why are transactions shown individually and as a bulk list?",
      a: "The bulk list gives you a summary of the entire batch, while individual transactions provide detailed status per recipient for reconciliation and troubleshooting.",
    },
  ];

  return (
    <Layout title="Customer Support">
      <div className=" mx-20 my-10">
        <h1 className=" text-3xl font-semibold text-slate-900">
          Hey{" "}
          {!user ? (
            <span className="mx-2 font-normal ">{nuser?.lastName}</span>
          ) : (
            <Skeleton className="h-4 w-[200px] bg-slate-500" />
          )}
          , how may we help today?
        </h1>

        <div className="mt-6 flex  gap-3">
          <button
            onClick={() => setActiveTab("message")}
            className={[
              "inline-flex items-center gap-2 rounded-md border px-5 py-2 text-sm font-medium",
              activeTab === "message"
                ? "border-slate-300 bg-white text-slate-900 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Message
          </button>

          <button
            onClick={() => setActiveTab("help")}
            className={[
              "inline-flex items-center gap-2 rounded-md border px-5 py-2 text-sm font-medium",
              activeTab === "help"
                ? "border-slate-300 bg-white text-slate-900 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Help
          </button>
        </div>

        <div className="mt-8 flex ">
          {activeTab === "message" && (
            <div className="w-full  rounded-xl border border-slate-200 bg-white py-8 px-40 ">
              <h2 className=" text-lg font-semibold text-slate-900">
                Send us a message
              </h2>

              <script src="https://desk.zoho.com/portal/api/feedbackwidget/1203601000000476001?orgId=904784784&displayType=iframe"></script>
              <iframe
                id="zsfeedbackFrame"
                width="100%"
                height="570"
                name="zsfeedbackFrame"
                scrolling="no"
                // allowtransparency="false"
                // frameborder="0"
                // border="0"
                src="https://desk.zoho.com/support/fbw?formType=AdvancedWebForm&fbwId=edbsncb3c21c6a267135ccc00cdca526ddf72196788b163c64d082dfa89ad9b4f7019&xnQsjsdp=edbsn5355bc04fa425f4e51d95f4f70dc17fa&mode=showNewWidget&displayType=iframe"
              ></iframe>

            </div>
          )}

          {activeTab === "help" && (
            <div className="  px-4 ">
              <h2 className="mb-6  text-2xl font-semibold text-slate-900">
                Frequently asked questions
              </h2>

              <div className="space-y-4">
                {faqs.map((item, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <div
                      key={`${item.q}-${idx}`}
                      className="overflow-hidden rounded-xl w-full  border border-slate-200 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                      >
                        <span className="text-sm font-medium text-slate-900">
                          {item.q}
                        </span>

                        <span
                          className={[
                            "transition-transform duration-200 text-slate-600",
                            isOpen ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          {/* Chevron */}
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 15L12 9L18 15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div className="bg-slate-50 px-6 pb-5 pt-1 text-sm text-slate-700">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CustomerSupport;
