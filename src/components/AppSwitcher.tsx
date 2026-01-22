
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown, ReceiptIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AppSwitcher() {
  const navigate = useNavigate();
  const [appsOpen, setAppsOpen] = useState(false);
 const apps = [
    { name: "POS System", subtitle: 'Point Of Sale Transactions', icon: ReceiptIcon, href: "", active: true, color: 'bg-purple-400' },
    { name: "Bulk Payment", subtitle: 'Process multiple payments', icon: SendIcon, href: "https://app.alfasente.com/", active: false, color: 'bg-amber-400' },
  ];
  return (
     <Popover open={appsOpen} onOpenChange={setAppsOpen}>
              <PopoverTrigger asChild>
                <div className={`px-3 py-1 rounded-lg border  flex items-center space-x-2 cursor-pointer  transition-colors`}>
                  {/* <Grid size={16} className="sm:hidden" /> */}
                  <span className="hidden sm:block">Apps</span>
                  <ChevronDown size={16} className={`transition-transform ${appsOpen ? 'rotate-180' : ''}`} />
                </div>
              </PopoverTrigger>
              <PopoverContent className={`w-64 p-0  border`} align="end">
                <div className="p-2">
                  <div className={`text-md font-medium  px-2 py-1 mb-2`}>
                    <p>Alfasente Applications</p>
                    <p className={`text-xs line-clamp-1 leading-tight text-gray-400`}>Switch between apps</p>
                    <hr className={`my-1`} />
                  </div>

                  <div className="space-y-1">
                    {apps.map((app) => {
                      const IconComponent = app.icon;
                      return (
                        <div
                          key={app.name}
                          onClick={() => {
                            navigate(app.href);
                            setAppsOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-2 py-2 mb-2 rounded-md cursor-pointer border ${app.active ? 'border-purple-400' : 'border-gray-200'} hover: transition-colors`}
                        >
                          <IconComponent size={13} className={`w-7.5 h-7.5 p-1.5 ${app.color} rounded-full`} />
                          <div className="flex flex-col">
                            <span className={` text-sm`}>{app.name}</span>
                            <span className={`text-xs text-gray-400`}>{app.subtitle}</span>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
  );
}
