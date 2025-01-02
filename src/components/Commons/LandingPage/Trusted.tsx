function Trusted() {
  return (
    <div className="relative mt-[460px] px-[4vw] ">
      <h3 className="text-center my-3 font-medium text-3xl">
        Why businesses choose Alfasente
      </h3>

      <div className="grid grid-cols-2 gap-10">
        <div className="border border-[#E4E8F1] rounded-[10px]">
          <img src="images/time.png" alt="Time Saving" />

          <div className="flex flex-col my-2  px-2">
            <span className="font-bold">Save Time</span>
            <span>
              Send payments to hundreds of beneficiaries in just a few clicks.
            </span>
          </div>
        </div>

        <div className="border border-[#E4E8F1] rounded-[10px]">
          <img src="images/trusted.png" alt="Secure " />

          <div className="flex flex-col my-2 px-2">
            <span className="font-bold">Trusted and Secure</span>
            <span>
              Join businesses across Africa enjoying secure payments for every
              transaction.{" "}
            </span>
          </div>
        </div>

        <div className="border border-[#E4E8F1] rounded-[10px]">
          <img src="images/reporting.png" alt="Secure " />

          <div className="flex flex-col my-2 px-2">
            <span className="font-bold">Comprehensive Reporting</span>
            <span>
              Track every event effortlessly from a single dashboard
            </span>{" "}
          </div>
        </div>
        <div className="border border-[#E4E8F1] rounded-[10px]">
          <img src="images/seamless.png" alt="Secure " />

          <div className="flex flex-col my-2 px-2">
            <span className="font-bold">Seamless Beneficiary Management</span>
            <span>
              Easily manage, add, and update beneficiary details without hassle.
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trusted;
