import { GetClient } from "@/lib/services/GetClientById";

function OrganizationSettings() {
  const client = GetClient();

  const baseUrl = import.meta.env.VITE_BACKEND_API_URL;
  return (
    <div className="rounded-md border border-[#D4DAE6] flex flex-col gap-2 py-4 px-5">
      <h3 className="font-medium text-[18px]">Organization details</h3>

      <div className="grid grid-cols-3 space-y-4">
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm font-normal">
            Organisation Name
          </span>
          <span className="text-[#000000E5] text-[15px] font-medium">
            {client?.clientName}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm font-normal">
            Phone Number
          </span>
          <span className="text-[#000000E5] text-[15px] font-medium">
            {client?.clientPhoneNumber}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm font-normal">
            Certificate of Incorporation
          </span>
          <span className="text-[#000000E5] text-[15px] flex flex-wrap font-medium break-words">
            <a
              href={`${baseUrl}/${client?.certificateOfIncorparation}`}
              className="break-all text-blue-500 underline"
            >
              {baseUrl} /{client?.certificateOfIncorparation}
            </a>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm font-normal">
            Email Address
          </span>
          <span className="text-[#000000E5] text-[15px] font-medium">
            {client?.clientEmail}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm font-normal">
            Physical Address
          </span>
          <span className="text-[#000000E5] text-[15px] font-medium">
            {client?.physicalAddress}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm font-normal">
            Date approved
          </span>
          <span className="text-[#000000E5] text-[15px] font-medium">
            02 Jan, 2025
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrganizationSettings;
