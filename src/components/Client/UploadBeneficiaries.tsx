import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { MdUploadFile } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import PreviewList from "./PreviewList";
import { ArrowLeft } from "lucide-react";
import { UploadList } from "@/lib/api-routes";
import { getUserToken, getAuthUser } from "@/lib/cookies/UserMangementCookie";
import { toast } from "@/hooks/use-toast";

export function UploadBeneficiaries() {
  const [DialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null
  );

  const [isTaken, setIsTaken] = useState<boolean>(false);


  const handleClose = () => {
    setFileContent(null);

    setIsDialogOpen(false);
  };
  const [previewList, setPreviewList] = useState(false);
  const [submit, setIsSubmitting] = useState(false);
  const token = getUserToken();
  const nuser = getAuthUser();
  const clientID = nuser.clientID;

  const handleTogglePreview = () => {
    setPreviewList(!previewList);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.includes("sheet")) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        if (e.target?.result) {
          setFileContent(e.target.result);
        }
      };
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a valid Excel file (.xls, .xlsx).",
      })
      
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileContent(null);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (!fileContent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No file content to upload.",
      });
      return;
    }

    try {
      const workbook = XLSX.read(fileContent, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const [headers, ...rows] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: null,
      }) as any;

      const formattedMembers = rows.map((row: any[]) =>
        headers.reduce(
          (acc: any, header: string, index: number) => {
            let value = row[index] || null;

            if (header === "mobileMoneyNumber" && value !== null) {
              value = String(value).padStart(10, "0");
            }

            acc[header] = value;
            return acc;
          },
          {
            clientID: isNaN(Number(clientID)) ? 0 : Number(clientID),
          }
        )
      );

      const payload = {
        name: `${sheetName}`,
        members: formattedMembers,
        clientID: isNaN(Number(clientID)) ? 0 : Number(clientID),
      };

      fetch(UploadList, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            toast({
              variant: "success",
              title: "Successful",
              description: "List submitted successfully.",
            });

            handleClose();
          } else {
            toast({
              variant: "destructive",
              title: "Failure",
              description: "Failed to upload the list.",
            });
          }
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Failure",
            description: `An error occurred: ${error.message || "Failed to upload the list."}`,
          });
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "Failed to upload the list.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Upload List</Button>
      </DialogTrigger>

      <DialogContent
        className={`w-[60vw] flex flex-col py-6 ${
          !previewList && "justify-center items-center"
        }`}
      >
        <ArrowLeft
          className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
          onClick={handleTogglePreview}
        />

        {!previewList ? (
          <>
            <DialogHeader className="text-left">
              <DialogTitle>Upload Beneficiary List</DialogTitle>
              <DialogDescription>
                Ensure the list follows the correct format.
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/Template.xlsx";
                    link.download = "Beneficiary_Template.xlsx";
                    link.click();
                  }}
                >
                  {" "}
                  Download Template
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pb-6 border rounded-[12px] border-[#C8CFDE] w-[80%] ">
              <Label
                htmlFor="fileUpload"
                className="flex flex-col w-full justify-center items-center"
              >
                <span className="my-4">
                  <MdUploadFile className="h-10 w-10" />
                </span>
                <span className="flex gap-1">
                  <span className="text-primary underline flex">Upload</span>{" "}
                  Excel file (.xls, .xlsx)
                </span>
              </Label>
              <Input
                id="fileUpload"
                type="file"
                className="hidden"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </div>

            {file && (
              <div className="mt-4 p-2 border rounded-md flex justify-between bg-[#F7F9FD] items-center w-[80%]">
                <div className="flex items-center gap-1.5">
                  <div className="bg-white border p-1 rounded-sm">
                    <img src="/images/icons/file-icon.svg" alt="File" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  <LiaTimesSolid />
                </Button>
              </div>
            )}
          </>
        ) : (
          <PreviewList fileContent={fileContent} setIsTaken={setIsTaken} />
        )}
        <DialogFooter
          className={`${
            previewList ? "w-full px-40" : "w-[40%]"
          }  flex justify-between items-center`}
        >
          <Button
            type="submit"
            variant={"outline"}
            className=""
            onClick={handleClose}
          >
            Cancel
          </Button>
          {!previewList ? (
            <Button
              type="submit"
              className="bg-[#8D35AA]"
              onClick={handleTogglePreview}
            >
              Preview List
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#8D35AA]"
              onClick={handleSubmit}
              disabled={submit || isTaken}
            >
              {submit ? "Submitting..." : "Submit for Approval"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
