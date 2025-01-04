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
import PreviewList from "./PreviewList";
import { ArrowLeft, Search, Send } from "lucide-react";
import { lists } from "@/pages/ClientDashboard";
import { ILists } from "./Tables/BeneficiariesTables";
import { HiMiniUsers } from "react-icons/hi2";
import { getRandomColor } from "./Tables/MembersTable";

export function SendFunds() {
  const [previewList, setpreviewList] = useState(false);
  const [items, setItems] = useState<ILists[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = lists.slice((page - 1) * itemsPerPage, page * itemsPerPage);

      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const HandleClick = () => {
    setpreviewList(!previewList);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex px-2 py-1 cursor-pointer gap-1 items-center bg-secondary text-white text-[15px] rounded-[8px]">
          <Send className="h-4 w-4" />
          <span>Send Funds</span>
        </div>
      </DialogTrigger>

      <DialogContent
        className={`w-[50vw] flex flex-col py-6 ${!previewList && "px-20"}`}
      >
        <ArrowLeft
          className={`h-4 w-4 cursor-pointer ${!previewList && "hidden"}`}
          onClick={HandleClick}
        />

        {!previewList ? (
          <>
            <DialogHeader className="">
              <DialogTitle>Send Funds</DialogTitle>
              <DialogDescription className="text-black">
                {" "}
                1.Select beneficiary list
              </DialogDescription>
            </DialogHeader>
            <div className=" ">
              <div className="flex  bg-[#EDF0F7] items-center px-1 rounded-full  lg:px-3 lg:rounded-[10px]">
                <Search className=" w-3 h-3 lg:h-4 lg:w-4" />

                <Input
                  type="search"
                  placeholder="Search for list"
                  className="hidden lg:flex w-[20vw] border-none outtline-none bg-[#EDF0F7]  focus:ring-0 focus-visible:ring-0 shadow-none placeholder:text-sm"
                />
              </div>{" "}
              <div className="h-[200px] overflow-auto my-4 scrollbar-hidden">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex p-3 justify-between items-center border rounded-md my-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                        <HiMiniUsers
                          style={{
                            fill: getRandomColor(),
                          }}
                        />
                      </span>
                      {item.name}
                    </div>

                    <div className="flex">{item.members}</div>
                  </div>
                ))}

                {isLoading && <p>Loading...</p>}
              </div>
            </div>
          </>
        ) : (
          <PreviewList />
        )}
        <DialogFooter
          className={`${previewList ? "w-full px-40" : "w-full"}  `}
        >
          {!previewList ? (
            <Button
              type="submit"
              className="bg-[#8D35AA] w-full"
              onClick={HandleClick}
            >
              Continue{" "}
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
