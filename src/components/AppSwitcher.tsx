import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export function AppSwitcher() {


  return (
    <Select>
      <SelectTrigger className="w-[120px] border-[#E4E8F1]">
        <div className="flex items-center gap-2">
          <img src="/images/icons/apps.svg" alt="Apps" />
          <span className="font-bold text-lg">Apps</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="bulk" className="font-bold">
            Bulk Payments
          </SelectItem>
          <SelectItem value="pos" className="font-bold" >
            <a href="https://pos.alfasente.com/">POS</a>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
