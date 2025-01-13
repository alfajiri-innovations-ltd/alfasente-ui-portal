import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { PaginationDemo } from "./Pagination";
import { PreviewMembersTable } from "./Tables/PreviewMembersTable";
import { IMembers } from "@/lib/interfaces/interfaces";



interface PreviewListProps {
  fileContent: any; 
}

function PreviewList({ fileContent }: PreviewListProps) {
  const [sheetName, setSheetName] = useState<string>("");
 
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<IMembers[]>([]);

  const MembersPerPage = 5;
  const totalPages = Math.ceil(members.length / MembersPerPage);
  const currentMembers = members.slice(
    (currentPage - 1) * MembersPerPage,
    currentPage * MembersPerPage
  );

  useEffect(() => {
    if (fileContent) {
      try {
     

        const workbook = XLSX.read(fileContent, { type: "buffer" });

        console.log(workbook);

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        setSheetName(sheetName);

        

        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
          defval: null, 
          header: 1,   
        });


        const [headers, ...rows] = jsonData;
        console.log("Parsed Data:", jsonData);

        const parsedMembers = rows.map((row: any[]) =>
          headers.reduce((acc: any, header: string, index: number) => {
            acc[header] = row[index] || null; 
            return acc;
          }, {})
        );

        console.log(parsedMembers)

      

        setMembers(parsedMembers);
      } catch (error) {
        console.error("Error decoding or parsing file content:", error);
      }
    }
  }, [fileContent]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="my-3">
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xl uppercase">
          {sheetName}
          </span>
        </div>
      </div>

      <PreviewMembersTable members={currentMembers} />

      <div className="flex justify-between items-center my-1">
        <div>
          <span className="font-normal text-[15px]">
            Showing {currentMembers.length} of {members.length} results
          </span>
        </div>
        <div>
          <PaginationDemo
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewList;
