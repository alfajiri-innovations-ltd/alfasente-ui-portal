function Journey() {
  const steps = [
    {
      title: "Upload Your Beneficiaries",
      description:
        "Easily add your beneficiary list in seconds. Upload a CSV file, no technical skills required.",
    },
    {
      title: "Fund Your Wallet",
      description:
        "Securely add money to your wallet. Use trusted methods to ready funds for disbursement.",
    },
    {
      title: "Execute Payments Instantly",
      description:
        "Send payments to hundreds of beneficiaries with one click and stay in control.",
    },
  ];
  return (
    <section
      id="journey"
      className="flex flex-col px-[4vw] justify-center items-center mt-14 lg:mt-20"
    >
      <h3 className="font-bold text-[#666666] text-[21px]">How It Works</h3>

      <div className="grid lg:grid-cols-3 gap-5 my-5 ">
        {steps.map((step, index) => (
          <div
            className="bg-[#F7B06A] flex flex-col gap-2  p-3  rounded-[10px]  shadow-md"
            key="index"
          >
            <h4 className="text-[19px] font-semibold text-[#000000CC] h-8 w-8 flex justify-center items-center bg-white rounded-full p-2">
              {index + 1}{" "}
            </h4>

            <span className=" font-semibold"> {step.title}</span>
            <p className="font-normal text-[15px]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Journey;
