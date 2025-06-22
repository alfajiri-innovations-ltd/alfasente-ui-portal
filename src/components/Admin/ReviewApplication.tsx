import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FetchClient, GetUserById } from "@/lib/api-routes";

import { Eye, EyeIcon, UserIcon } from "lucide-react";
import { RejectAplication } from "./RejectApplication";
import { ApproveApplication } from "./ApproveApplication";
import { FaUserLarge } from "react-icons/fa6";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { formatDate } from "@/lib/Utilities/FormatDate";
import { Badge } from "../ui/badge";
import { getStatusBadge } from "../Client/Tables/BeneficiariesTables";
async function fetchApplication(clientID: number) {
  const response = await fetch(FetchClient(clientID), {});
  if (!response.ok) {
    throw new Error("Failed to fetch client");
  }
  return response.json();
}

async function fetchUser(userId: number) {
  const response = await fetch(GetUserById(userId), {});
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

interface ViewApplicationDetails {
  clientID?: number;
  onClose?: () => void;
}

export function ViewApplication({ clientID, onClose }: ViewApplicationDetails) {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const [showApprove, setShowApprove] = useState(false);

  const [showReject, setShowReject] = useState(false);

  const handleApproveClose = () => {
    setShowApprove(false);
  };

  // const handleRejectClose = () => {
  //   setShowReject(false);
  // };

  useEffect(() => {
    const fetchClientWithUser = async () => {
      if (!clientID) return;

      setLoading(true);

      try {
        const clientData = await fetchApplication(clientID);

        if (!clientData?.userId) {
          throw new Error("User ID not found for this client");
        }

        const userData = await fetchUser(clientData.userId);

        setClient({
          ...clientData,
          user: userData,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientWithUser();
  }, [clientID]);

  // const handleClose = () => {
  //   setIsDialogOpen(false);
  // };

  const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

  return (
    <>
      <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
              onClose?.();
            }}
          >
            <span className="">
              <EyeIcon className="h-4 w-4" />
            </span>
            <span className="text-[12px] font-normal text-[#33333]">
              Review Application
            </span>
          </div>
        </DialogTrigger>

        <DialogContent className="md:w-[500px] w-[90vw] lg:left-[80%] rounded-[10px] h-[90vh] overflow-y-auto scrollbar-hide">
          {loading ? (
            <p className="text-[13px] font-normal text-[#66666]">Loading...</p>
          ) : error ? (
            <p className="text-[13px] font-normal text-red-500">
              Error: {error}
            </p>
          ) : (
            <div className="flex flex-col gap-3 ">
              <span className="font-semibold text-[18px]">
                Application Details
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <FaUserLarge className="h-4 w-4 text-[#5C6474]" />
                  <span className="font-medium text-base">
                    User (Applicant) information
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      First Name
                    </span>
                    <span>{client?.user.firstName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Last Name
                    </span>
                    <span>{client?.user.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Personal Email
                    </span>
                    <span>{client?.user.user_email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Date Of Birth
                    </span>
                    <span>{client?.user.date_of_birth}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#EDF0F7] h-[2px]"></div>

              <div>
                <div className="flex items-center gap-2">
                  <PiBuildingOfficeLight className="h-4 w-4 text-[#5C6474]" />
                  <span className="font-medium text-base">
                    Organisation information
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Organisation{" "}
                    </span>
                    <span>{client?.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Email
                    </span>
                    <span>{client?.clientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Phone{" "}
                    </span>
                    <span>{client?.clientPhoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Physical Address
                    </span>
                    <span>{client?.physicalAddress}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 ">
                    <span className="text-[#7A8397] font-medium text-base">
                      Certificate of Incorporation
                    </span>
                    <span className="flex grow text-[15px] font-medium text-wrap break-words overflow-hidden">
                      <a
                        className="text-blue-400 truncate  underline"
                        href={
                          client?.certificateOfIncorparation
                            ? `${baseUrl}/${client.certificateOfIncorparation}`
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${baseUrl}/${client?.certificateOfIncorparation}`}
                      >
                        {baseUrl} /{client?.certificateOfIncorparation}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="border-b border-[#EDF0F7] h-[2px] mt-2"></div>

                <div className="flex flex-col gap-2 ">
                  <div className="flex items-center gap-2 mt-2">
                    <Eye className="h-4 w-4 text-[#5C6474]" />
                    <span className="font-medium text-base">
                      Review Details
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Date submitted
                    </span>
                    <span>
                      {" "}
                      {client?.created_at
                        ? formatDate(client.created_at.toISOString())
                        : ""}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Date Reviewed
                    </span>
                    <span>
                      {client?.dateRejected
                        ? formatDate(
                            new Date(client.dateRejected).toISOString()
                          )
                        : client?.dateApproved
                          ? formatDate(
                              new Date(client.dateApproved).toISOString()
                            )
                          : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Status
                    </span>
                    <Badge
                      variant={"outline"}
                      className={`border ${getStatusBadge(client?.isApproved)} capitalize rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
                    >
                      {client?.isApproved}
                    </Badge>{" "}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-4 items-center">
            <Button variant={"outline"} className="text-black ">
              Cancel
            </Button>

            <div className="flex items-center gap-2">
              {clientID && (
                <Button
                  onClick={() => {
                    setShowReject(true);
                    setIsDialogOpen(false);
                  }}
                  variant={"outline"}
                  className=" bg-[#D93E39] text-white justify-self-end  "
                >
                  Reject{" "}
                </Button>
              )}
              {clientID && (
                <Button
                  onClick={() => {
                    setShowApprove(true);
                    setIsDialogOpen(false);
                  }}
                  className="bg-primary text-white"
                >
                  Approve
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {clientID && showApprove && (
        <ApproveApplication
          clientID={clientID}
          onClose={() => {
            setShowApprove(false);
          }}
        />
      )}

      {showReject && clientID !== undefined && clientID !== null && (
        <RejectAplication
          clientID={clientID}
          onClose={() => {
            setShowReject(false);
          }}

          // onClose={handleRejectClose}
        />
      )}
    </>
  );
}
