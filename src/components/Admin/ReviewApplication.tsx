import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FetchClient } from "@/lib/api-routes";
import { EyeIcon } from "lucide-react";

async function fetchApplication(clientID: number) {
  const response = await fetch(FetchClient(clientID), {});
  if (!response.ok) {
    throw new Error("Failed to fetch client");
  }
  return response.json();
}

interface ViewApplicationDetails {
  clientID?: number;
}

export function ViewApplication({ clientID }: ViewApplicationDetails) {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (clientID) {
      setLoading(true);
      fetchApplication(clientID)
        .then((data) => {
          setClient(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="">
            <EyeIcon className="h-4 w-4" />
          </span>
          <span className="text-[12px] font-normal text-[#33333]">
            Review Application
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="md:w-[400px] w-[90vw] lg:left-[83%] rounded-[10px] h-[90vh]">
        {loading ? (
          <p className="text-[13px] font-normal text-[#66666]">Loading...</p>
        ) : error ? (
          <p className="text-[13px] font-normal text-red-500">Error: {error}</p>
        ) : (
          <div className="flex flex-col gap-3 ">
            <span>Application Details</span>

            <div>
              <span>User (Applicant) information</span>

              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>First Name</span>
                  <span>First Name</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Name</span>
                  <span>First Name</span>
                </div>
                <div className="flex justify-between">
                  <span>Personal Email</span>
                  <span>First Name</span>
                </div>
                <div className="flex justify-between">
                  <span>Date Of Birth</span>
                  <span>First Name</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant={"outline"} className="text-white bg-[#F83E57]">
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
