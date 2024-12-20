import { useState, useEffect } from "react";
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
import PreviewList from "./PreviewList";
import { ArrowLeft } from "lucide-react";

export function UploadBeneficiaries() {
  const [previewList, setpreviewList] = useState(false);

  const HandleClick = () => {
    setpreviewList(!previewList);
  };
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const savedFile = localStorage.getItem("uploadedFile");
    if (savedFile) {
      const parsedFile = JSON.parse(savedFile);
      setFile(parsedFile);
    }
  }, []);

  useEffect(() => {
    if (file) {
      const fileData = {
        name: file.name,
        size: file.size,
      };
      localStorage.setItem("uploadedFile", JSON.stringify(fileData));
    } else {
      localStorage.removeItem("uploadedFile");
    }
  }, [file]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.includes("sheet")) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid Excel file.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload List</Button>
      </DialogTrigger>

      <div className="text-primary cursor-pointer flex items-center gap-2"></div>

      <DialogContent
        className={`w-[70vw] flex flex-col py-6 ${!previewList && "justify-center items-center"}`}
      >
        <ArrowLeft
          className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
          onClick={HandleClick}
        />

        {!previewList ? (
          <>
            <DialogHeader className="text-center">
              <DialogTitle>Upload Beneficiary List</DialogTitle>
              <DialogDescription>
                Ensure the list follows the correct format.
                <span className="text-primary"> Download Template</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6 border rounded-[12px] border-[#C8CFDE] w-[43%] ">
              <Label
                htmlFor="fileUpload"
                className="flex flex-col w-full justify-center items-center"
              >
                <span>
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
              <div className="mt-4 p-2 border rounded-md flex justify-between bg-[#F7F9FD] items-center w-[40%]">
                <div className="flex items-center gap-1.5">
                  <div className=" bg-white border p-1 rounded-sm">
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
          <PreviewList />
        )}
        <DialogFooter
          className={`${previewList ? "w-full px-40" : "w-[40%]"}  flex justify-between items-center`}
        >
          <Button type="submit" variant={"outline"} className="">
            Cancel
          </Button>
          {!previewList ? (
            <Button
              type="submit"
              className="bg-[#8D35AA]"
              onClick={HandleClick}
            >
              Preview List
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#8D35AA]"
              onClick={HandleClick}
            >
              Submit for Approval{" "}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
