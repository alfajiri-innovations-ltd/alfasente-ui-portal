import { ReactNode } from "react";
import SideBar from "../Client/SideBar";
import DashboardHeader from "../Client/Dashboard-Header";
import { Toaster } from "../ui/toaster";

interface Props {
  children: ReactNode;
  title: string;
}
const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Toaster  />

      <main className="grid grid-cols-5 h-screen">
        <SideBar />
        <section className="col-span-4  bg-white">
          <DashboardHeader PageTitle={title} />
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
