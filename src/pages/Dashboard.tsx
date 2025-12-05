import { useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { EyeClosed, EyeOffIcon } from "lucide-react";

import { useState } from "react";

import { GetUser } from "@/lib/services/GetUser";

import { useUser } from "@/hooks/UserContext";
import { GetClient } from "@/lib/services/GetClientById";
import Layout from "@/components/Commons/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatMoney } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";

function Dashboard() {
  const User = GetUser();
  const nuser = useUser();

  const client = GetClient();
  const Wallet = client?.walletID;

  const userRole = nuser?.role_name || "admin";

  const [user, setUser] = useState(false);
  const [viewAirtelBalance, setViewAirtelBalance] = useState(false);
  const [viewMtnBalance, setViewMtnBalance] = useState(false);
  const { currency: airtelCurrency } = useCurrency();

  const HandleAirtelClick = () => {
    setViewAirtelBalance(!viewAirtelBalance);
  };

  const HandleMtnClick = () => {
    setViewMtnBalance(!viewMtnBalance);
  };

  useEffect(() => {
    if (User) {
      setUser(false);
    }
  }, [User]);

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const HandleClick = (url: string) => {
    navigate(url);
  };

  return (
    <Layout title="Dashboard">
      <div className="flex flex-col sm:mx-20 m-4">
        <div className="flex sm:flex-row flex-col justify-between">
          <div className="my-4">
            <span className="font-bold text-base">
              Welcome,
              {!user ? (
                <span className="mx-2 font-normal ">
                  {nuser?.firstName} {nuser?.lastName}
                </span>
              ) : (
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              )}
            </span>
          </div>
          {isMobile && (
            <>
              <br />
            </>
          )}
          {/* {userRole === "client_admin" && (
            <div className="flex flex-row justify-between sm:gap-2 ">
              <FundWallet />
              {isMobile && <br />}
              <SendFunds />
            </div>
          )} */}
        </div>
        {isMobile && (
          <>
            <br />
          </>
        )}
        {userRole === "client_admin" && (
          <div className="flex sm:flex-row justify-between flex-col gap-3">
            <div className="grow px-8 sm:py-12 py-8 rounded-[10px] sm:my-4 my-2 sm:space-y-4 bg-primary bg-contain bg-hero-pattern bg-right bg-no-repeat">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 rounded-full w-10 h-10 items-center flex justify-center">
                  <img
                    src="/images/logos/Airtel.svg"
                    alt="Airtel"
                    className="w-9 h-9 rounded-full"
                  />
                </div>

                <div className="flex flex-col ">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">
                      Airtel Money
                    </span>

                    {viewAirtelBalance ? (
                      <EyeClosed
                        className="text-white h-4 w-4"
                        onClick={HandleAirtelClick}
                      />
                    ) : (
                      <EyeOffIcon
                        className="text-white h-4 w-4"
                        onClick={HandleAirtelClick}
                      />
                    )}
                  </div>
                  <span className="text-white text-lg font-bold ">
                    {viewAirtelBalance
                      ? formatMoney(
                          Wallet?.airtelWalletBalance ?? 0,
                          airtelCurrency
                        )
                      : "XXXXXX"}
                  </span>
                </div>
              </div>
            </div>
            {!isMobile && <div></div>}
            <div className="grow px-8 sm:py-12 py-8 rounded-[10px] sm:my-4 my-2 sm:space-y-4 bg-primary bg-contain bg-hero-pattern bg-right bg-no-repeat">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 rounded-full w-10 h-10 items-center flex justify-center">
                  <img
                    src="/images/logos/MTN.svg"
                    alt="MTN"
                    className="w-8 h-8"
                  />
                </div>

                <div className="flex flex-col ">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">Mtn Money</span>

                    {viewMtnBalance ? (
                      <EyeClosed
                        className="text-white h-4 w-4"
                        onClick={HandleMtnClick}
                      />
                    ) : (
                      <EyeOffIcon
                        className="text-white h-4 w-4"
                        onClick={HandleMtnClick}
                      />
                    )}
                  </div>
                  <span className="text-white text-lg font-bold ">
                    {viewMtnBalance
                      ? formatMoney(Wallet?.mtnWalletBalance ?? 0, airtelCurrency)
                      : "XXXXXX"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="my-8">
          <h3 className="font-medium text-xl mb-2">Quick Actions</h3>
          <div className="grid grid-cols-1 bg-[#F7F9FD] p-4  rounded-lg sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {[
              {
                icon: "/images/icons/wallet.svg",
                label: "Fund Wallet",
                url: "fundwallet",
              },
              {
                icon: "/images/icons/sendfunds.svg",
                label: "Send Funds",
                url: "send-funds",
              },
              {
                icon: "/images/icons/benefeciaries.svg",
                label: "Manage Beneficiaries",
                url: "beneficiaries",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => HandleClick(`/${item.url}`)}
                className="border cursor-pointer flex flex-col items-center justify-center text-center py-6 border-[#EDF0F7] bg-white rounded-md"
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 mb-2"
                />
                <span>{item.label}</span>
              </div>
            ))}

            <div
              onClick={() => {
                navigate("/transactions");
              }}
              className=" cursor-pointer col-span-1 sm:col-span-2 lg:col-span-3 border flex flex-col items-center justify-center text-center py-6 border-[#EDF0F7] bg-white rounded-md"
            >
              <img
                src="/images/icons/transaction.svg"
                alt="Transactions"
                className="w-6 h-6 mb-2"
              />
              <span>View Transactions</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
