import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FetchClient, GetUserById } from "@/lib/api-routes";

import { EyeIcon } from "lucide-react";
import { RejectAplication } from "./RejectApplication";
import { ApproveApplication } from "./ApproveApplication";
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

  const handleRejectClose = () => {
    setShowReject(false);
  };

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

  const handleClose = () => {
    setIsDialogOpen(false);
  };

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

        <DialogContent className="md:w-[500px] w-[90vw] lg:left-[80%] rounded-[10px] h-[90vh]">
          {loading ? (
            <p className="text-[13px] font-normal text-[#66666]">Loading...</p>
          ) : error ? (
            <p className="text-[13px] font-normal text-red-500">
              Error: {error}
            </p>
          ) : (
            <div className="flex flex-col gap-3 ">
              <span>Application Details</span>

              <div>
                <span>User (Applicant) information</span>

                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span>First Name</span>
                    <span>{client?.user.firstName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Name</span>
                    <span>{client?.user.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personal Email</span>
                    <span>{client?.user.user_email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date Of Birth</span>
                    <span>{client?.user.date_of_birth}</span>
                  </div>
                </div>
              </div>

              <div>
                <span>Organisation information</span>

                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span>Organisation </span>
                    <span>{client?.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span>{client?.clientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone </span>
                    <span>{client?.clientPhoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Physical Address</span>
                    <span>{client?.physicalAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6474] text-sm font-normal">
                      Certificate of Incorporation
                    </span>
                    <span className="text-[#000000E5] text-[15px] flex  font-medium break-words">
                      <a
                        href={client?.certificateOfIncorparation}
                        className="break-all text-blue-500 underline"
                      >
                        {client?.certificateOfIncorparation}
                      </a>
                    </span>
                  </div>
                </div>

                <div>
                  <h3>Review Details</h3>
                  <div className="flex justify-between">
                    <span>Date submitted</span>
                    <span>{client?.clientEmail}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Date Reviewed</span>
                    <span>{client?.dateRejected || client?.dateApproved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span>{client?.isApproved}</span>
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
                  }}
                  className="  text-white"
                >
                  Approve
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showApprove && clientID !== undefined && clientID !== null && (
        <ApproveApplication clientID={clientID} onClose={handleApproveClose} />
      )}

      {showReject && clientID !== undefined && clientID !== null && (
        <RejectAplication clientID={clientID} onClose={handleRejectClose} />
      )}
    </>
  );
}
