import { ReactNode } from "react";
import SideBar from "../Client/SideBar";
import DashboardHeader from "../Client/Dashboard-Header";

interface Props {
  children: ReactNode;
  title: string;
}
const Layout = ({ children, title }: Props) => {
  return (
    <>

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
