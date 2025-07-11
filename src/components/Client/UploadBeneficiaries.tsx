import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdUploadFile } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import PreviewList from "./PreviewList";
import { ArrowLeft, X } from "lucide-react";
import { UploadList } from "@/lib/api-routes";
import { getUserToken, getAuthUser } from "@/lib/cookies/UserMangementCookie";
import { toast } from "@/hooks/use-toast";
import { useClientListsWithMembers } from "@/lib/services/FetchClientLists";
import { useNavigate } from "react-router-dom";
import useStaff from "@/hooks/useStaff";
// interface RowType extends Array<string | number | null> { }
// interface HeadersType extends Array<string> { }
export function UploadBeneficiaries() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null
  );
  const { mutate } = useClientListsWithMembers();
  const { staffData } = useStaff();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>();
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  const [isTaken, setIsTaken] = useState<boolean>(false);

  const handleClose = () => {
    setFileContent(null);
  };
  const [previewList, setPreviewList] = useState(false);
  const [submit, setIsSubmitting] = useState(false);
  const token = getUserToken();
  const nuser = getAuthUser();
  const clientID = nuser?.clientID;
  const loggedInUser = getAuthUser();

  const users = staffData;

  const filteredUsers = users.filter((user) => {
    if (loggedInUser?.role_name === "client_admin") {
      return true;
    }

    return user.userId !== loggedInUser?.userId;
  });

  const handleTogglePreview = () => {
    setPreviewList(!previewList);
  };

  const navigate = useNavigate();

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
      });
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
      });



      const validRows: unknown[] = (rows).filter((row) =>
        row.some((cell) => cell !== null && cell !== "")
      );



      const formattedMembers = validRows.map((row) =>
        headers.reduce(
          (acc, header: string, index: number) => {
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
        assignedTo: value,
        clientID: isNaN(Number(clientID)) ? 0 : Number(clientID),
      };

      const optimisticList = {
        id: Date.now(),
        name: payload.name,
        members: payload.members,
        clientID: payload.clientID,
        createdAt: new Date().toISOString(),
        createdBy: nuser?.name || "",
        assignedUserId: value,

        status: "Pending",
      };

      mutate((prev) => [optimisticList, ...(prev || [])], false);

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
            mutate();
            navigate("/beneficiaries");
          } else {
            mutate();
            toast({
              variant: "destructive",
              title: "Failure",
              description: "Failed to upload the list.",
            });
          }
        })
        .catch((error) => {
          mutate();
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
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isTaken) {
      toast({
        variant: "destructive",
        description: "List Name already exists",
      });
    }
  }, []);

  return (
    <div>
      <div
        className={` ${!previewList && "hidden"} rounded-full  md:translate-y-16 translate-y-14 translate-x-10 w-min p-2 bg-[#EDF0F7]`}
      >
        <ArrowLeft
          className={`h-4 w-4 cursor-pointer `}
          onClick={handleTogglePreview}
        />
      </div>
      <div className="rounded-full ml-auto -translate-x-10 translate-y-5 md:translate-y-10 w-min p-2 bg-[#EDF0F7]">
        <X
          className=" right-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => {
            navigate("/beneficiaries");
          }}
        />
      </div>

      <div className="mt-[10vh]  flex items-center  flex-col">
        <div
          className={` flex flex-col  py-6 ${!previewList && "justify-center items-center"
            }`}
        >
          {!previewList ? (
            <>
              <div className="text-left">
                <span className="font-bold my-3  text-xl">
                  Upload Beneficiary List
                </span>
                <p className="mb-3">
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
                </p>
              </div>
              <div className="grid gap-4 pb-6 border rounded-[12px] border-[#C8CFDE] w-full ">
                <Label
                  htmlFor="fileUpload"
                  className="flex flex-col w-full justify-center items-center"
                >
                  <span className="my-4">
                    <MdUploadFile className="h-10 w-10" />
                  </span>
                  <span className="flex gap-1">
                    <span className="text-primary underline cursor-pointer flex">
                      Upload
                    </span>{" "}
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
                <div className="mt-4 p-2 border rounded-md flex justify-between bg-[#F7F9FD] items-center w-full">
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

              <div className="w-full my-8">
                <h3 className="my-2 font-bold">Assign To</h3>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? filteredUsers.find((user) => user.userId === value)
                          ?.firstName +
                        " " +
                        filteredUsers.find((user) => user.userId === value)
                          ?.lastName
                        : "Select Staff..."}

                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="md:w-[34vw] p-0 "
                    side="bottom"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search Staff..." />
                      <CommandList>
                        <CommandEmpty>No staff found.Invite one</CommandEmpty>
                        <CommandGroup>
                          {filteredUsers.map((user) => (
                            <CommandItem
                              className="flex justify-between items-center"
                              key={user.userId}
                              value={`${user.firstName} ${user.lastName}`}
                              onSelect={(currentValue) => {
                                const selected = filteredUsers.find(
                                  (u) =>
                                    `${u.firstName} ${u.lastName}` ===
                                    currentValue
                                );
                                if (selected) {
                                  setValue(selected.userId);
                                  setSelectedUserName(
                                    `${selected.firstName} ${selected.lastName}`
                                  );
                                }
                                setOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === user.userId
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {user.firstName} {user.lastName}
                              </div>
                              <span className="text-gray-500 text-sm">
                                {user.user_email}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </>
          ) : (
            <PreviewList
              fileContent={fileContent}
              Asignee={selectedUserName}
              setIsTaken={setIsTaken}
              isTaken={isTaken}
            />
          )}
          <div
            className={`${previewList ? "w-full px-20" : "w-full"
              }  flex justify-between items-center my-5`}
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
                className="bg-[#8D35AA] w-[50%]"
                onClick={handleTogglePreview}
                disabled={!file || !value}
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
          </div>
        </div>
      </div>
    </div>
  );
}
