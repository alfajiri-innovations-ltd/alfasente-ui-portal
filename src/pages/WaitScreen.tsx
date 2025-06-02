import Header from "@/components/Commons/Header";

function WaitScreen() {
  return (
    <div className=" xs:w-[100vw]  overflow-x-hidden overflow-y-auto ">
      <div className="   ">
        <Header />
        <SuccessScreen />
      </div>
    </div>
  );
}

export default WaitScreen;
