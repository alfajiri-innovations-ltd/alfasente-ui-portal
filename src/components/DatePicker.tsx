


import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

function DatePicker({ dateFilteredTransactions }: any) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);

  function exportToCSV(
    transactions: any[],
    filename = "transactions.csv",
    columnsToInclude?: string[]
  ) {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const headers = columnsToInclude?.length
      ? columnsToInclude
      : Object.keys(transactions[0]);

    const csvRows = [
      headers.join(","), // header row
      ...transactions.map((tx) =>
        headers.map((header) => JSON.stringify(tx[header] ?? "")).join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Records
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4">
        <div className="date-picker-box flex items-center gap-2 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <span>-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <Button
          onClick={() => {
            setIsExporting(true);
            exportToCSV(dateFilteredTransactions, "transactions.csv", [
              "transactionID",
              "transactionType",
              "status",
              "alfasenteCharge",
              "organizationName",
              "airtelCharge",
              "payer",
              "sourceOfFunds",
              "beneficiaryName",
              "beneficiaryMobileNumber",
              "currency",
              "recordDate",
              "liquidationDate",
              "mtnCharge",
              "mainAmount",
            ]);
            setIsExporting(false);

            // ✅ reset dates after export
            setStartDate("");
            setEndDate("");
            setOpen(false); // close popover after export
          }}
          disabled={
            isExporting || !startDate || !endDate || dateFilteredTransactions.length === 0
          }
          className="w-full"
        >
          {isExporting ? "Exporting..." : "Continue"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;

