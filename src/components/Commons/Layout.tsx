import React, { ReactNode } from "react";
import SideBar from "../Client/SideBar";
import DashboardHeader from "../Client/Dashboard-Header";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  children: ReactNode;
  title: string;
}
const Layout = ({ children, title }: Props) => {
  const isMobile = useIsMobile();
  const [show, setShow] = React.useState(false);
  return (
    <>
      <main className="flex flex-row w-screen h-screen">
        {!isMobile && <SideBar />}
        {show && isMobile && (
          <div
            className="z-[200] w-screen h-screen transition-all bg-[#0000009b] fixed"
            onClick={() => setShow(!show)}
          >
            <SideBar />
          </div>
        )}

        <section className="w-full h-full flex flex-col bg-white">
          <DashboardHeader
            triggerSidebar={(open) => setShow(open)}
            PageTitle={title}
          />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </section>
      </main>
      {/* 
      <main className="flex flex-row w-screen overflow-y-hidden h-screen">
        {!isMobile && <SideBar />}
        {
          show && isMobile && (
            <>
              <div className={`z-[200] w-screen h-screen transition-all  bg-[#0000009b] fixed`} onClick={() => setShow(!show)}>
                <SideBar />
              </div>
            </>
          )
        }
        <section className="w-full h-full overflow-y-hidden bg-white">
          <DashboardHeader triggerSidebar={(open) => {
            setShow(open)
          }} PageTitle={title} />
          <div className="w-full h-full overflow-y-scroll">{children}</div>
        </section>
      </main> */}
    </>
  );
};

export default Layout;
