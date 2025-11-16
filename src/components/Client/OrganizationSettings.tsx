import { useState } from "react";
import { GetClient } from "@/lib/services/GetClientById";
import { Button } from "../ui/button";
import { Cloud, Trash } from "lucide-react";
import { UploadLogo } from "@/lib/api-routes";

function OrganizationSettings() {
  const client = GetClient();
  const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

  const [logoPreview, setLogoPreview] = useState<string | null>(
    client?.avatar
      ? `${baseUrl}/${client.avatar}`
      : "/images/user.png"
  );
  const [, setLogoFile] = useState<File | null>(null);

 const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !client?.clientID) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("clientID", client.clientID.toString());
    formData.append("logoFile", file);

    try {
      const response = await fetch(UploadLogo(), {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setLogoFile(result.avatar); 
        alert("Logo uploaded successfully!");
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setLogoFile(null);
    setLogoPreview("/images/user.png");
  };


  return (
    <div className="rounded-md border border-[#D4DAE6] flex flex-col gap-2 py-4 px-5">
      <h3 className="font-medium text-[18px]">Organization details</h3>

      {/* LOGO AREA */}
      <div className="flex items-center gap-5 mb-5 space-y-3">
        <div className="rounded-full overflow-hidden h-28 w-28">
          <img
            src={logoPreview!}
            alt="Organization Logo"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant="outline" className="text-[#8D35AA]" disabled={uploading} asChild>
              <span className="flex items-center gap-1 cursor-pointer">
                <Cloud size={16} />
                Upload logo
              </span>
            </Button>
          </label>

          <Button
            variant="destructive"
            disabled={logoPreview === "/images/user.png"}
            onClick={handleRemove}
            className="flex items-center gap-1"
          >
            <Trash size={15} />
            Remove logo
          </Button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-3 space-y-4">
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm">Organisation Name</span>
          <span className="text-black font-medium">{client?.clientName}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm">Phone Number</span>
          <span className="text-black font-medium">
            {client?.clientPhoneNumber}
          </span>
        </div>

        <div className="flex flex-col gap-1 break-all">
          <span className="text-[#5C6474] text-sm">
            Certificate of Incorporation
          </span>

          <a
            href={`${baseUrl}/${client?.certificateOfIncorparation}`}
            target="_blank"
            className="text-blue-500 underline break-all"
          >
            {baseUrl}/{client?.certificateOfIncorparation}
          </a>
        </div>
      </div>

      {/* OTHER FIELDS */}
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm">Email Address</span>
          <span className="text-black font-medium">{client?.clientEmail}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm">Physical Address</span>
          <span className="text-black font-medium">
            {client?.physicalAddress}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[#5C6474] text-sm">Date approved</span>
          <span className="text-black font-medium">02 Jan, 2025</span>
        </div>
      </div>
    </div>
  );
}

export default OrganizationSettings;
