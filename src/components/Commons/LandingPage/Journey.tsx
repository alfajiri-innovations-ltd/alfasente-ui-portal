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
      className="flex flex-col  justify-center items-center mt-14 lg:mt-[98px] lg:px-[6.25vw]"
    >
      <h3 className="font-bold text-black/90 text-[42px]">How It Works</h3>

      <div className="grid lg:grid-cols-3 gap-5 my-5 ">
        {steps.map((step, index) => (
          <div
            className="bg-[#FFDBAD] flex flex-col items-center justify-center border  border-[#EFEFF9]   px-[22px] py-[29.5px]  rounded-[10px]  "
            key="index"
          >
            <h4 className="text-[19px] border border-[#FFC07C] font-semibold mb-5 text-[#D68421] h-[54px] w-[54px] flex justify-center items-center bg-[#FFF6ED] rounded-full p-2">
              {index + 1}{" "}
            </h4>

            <span className=" font-semibold text-[18px] text-black/85 "> {step.title}</span>
            <p className="font-normal text-[15px] text-black/70 text-center leading-5">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Journey;
