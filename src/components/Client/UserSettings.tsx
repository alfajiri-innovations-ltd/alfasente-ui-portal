import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { getRole } from "./Tables/UsersTable";

import { Badge } from "../ui/badge";

import { useUser } from "@/hooks/UserContext";

function UserSettings() {
  const user = useUser();
  

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md border border-[#D4DAE6] py-4 px-5">
        <h3 className="font-medium text-[18px]">Profile</h3>

        <div className="flex items-center gap-5 mb-5 space-y-3">
          <div className="rounded-full flex justify-center items-center object-cover h-28 w-28 ">
            <img src="/images/user.png" alt="User Profile" />
          </div>

          <Button disabled>Upload Photo</Button>
        </div>

        <div className="flex justify-between space-y-3">
          <div className="flex flex-col">
            <span className="text-[#5C6474] text-sm font-normal">
              First Name
            </span>
            <span className="text-[#000000E5] text-[15px] font-medium">
              {user?.firstName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#5C6474] text-sm font-normal">
              Last Name
            </span>
            <span className="text-[#000000E5] text-[15px] font-medium">
              {user?.lastName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#5C6474] text-sm font-normal">Role</span>

            <Badge
              variant={"outline"}
              className={`border rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
            >
              <div
                className={`${getRole(user?.role_name || "")} h-2 w-2 rounded-full`}
              ></div>
              {user?.role_name === "client_admin" ? "Admin" : "Employee"}
            </Badge>
          </div>
        </div>

        <div className="flex  gap-[190px]  ">
          <div className="flex flex-col">
            <span className="text-[#5C6474] text-sm font-normal">
              Email Address
            </span>
            <span className="text-[#000000E5] text-[15px] font-medium">
              {user?.user_email}
            </span>
          </div>

          <div className="flex flex-col  ">
            <span className="text-[#5C6474] text-sm font-normal">
              Date of Birth
            </span>
            <span className="text-[#000000E5] text-[15px] font-medium">
              {user?.date_of_birth}
            </span>
          </div>

          <div className="flex flex-col"></div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Info />
        <span>
          To update details, please contact{" "}
          <span className="font-bold underline">Support</span>.
        </span>
      </div>
    </div>
  );
}

export default UserSettings;
