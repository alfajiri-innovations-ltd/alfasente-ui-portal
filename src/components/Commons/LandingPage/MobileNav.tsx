import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NavItems from "../NavItems";
import { useState } from "react";
import { X } from "lucide-react";
import { SignUp } from "@/components/Client/Signup";

export function MobilePopOver() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div onClick={handleToggle}>
          {isOpen ? (
            <X className="text-icon text-2xl" />
          ) : (
            <div className="flex flex-col relative  gap-1  xl:hidden">
              <img
                src="images/icons/menu.svg"
                alt="Menu"
                className="h-5 w-5 object-cover"
              />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-50 mt-10 w-[100vw] flex flex-col gap-3 bg-white py-2 overflow-scroll">
        <NavItems />
        <div className="w-full">
          <SignUp />
        </div>
      </PopoverContent>
    </Popover>
  );
}
