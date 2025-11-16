


import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

function LogsDatePicker({ dateFilteredLogs}: any) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);

  function exportToCSV(
    logs: any[],
    filename = "auditlogs.csv",
    columnsToInclude?: string[]
  ) {
    if (!logs || logs.length === 0) {
      alert("No logs to export");
      return;
    }

    const headers = columnsToInclude?.length
      ? columnsToInclude
      : Object.keys(logs[0]);

    const csvRows = [
      headers.join(","), // header row
      ...logs.map((tx) =>
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
          Export Logs
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
            exportToCSV(dateFilteredLogs, "auditlogs.csv", [
              "id",
              "event",
              "role",
              "created_by",
              "created_at",
             
            ]);
            setIsExporting(false);

            // ✅ reset dates after export
            setStartDate("");
            setEndDate("");
            setOpen(false); // close popover after export
          }}
          disabled={
            isExporting || !startDate || !endDate || dateFilteredLogs?.length === 0
          }
          className="w-full"
        >
          {isExporting ? "Exporting..." : "Continue"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default LogsDatePicker;

