import ManagePaymentComponent from "./ManagePaymentComponent";

function Features() {
  return (
    <section
      id="services"
      className="flex sm:flex-row flex-col justify-center sm:justify-between items-center"
    >
      {/* section 1 */}
      <div className="w-full mx-5">
        {/* <img src="/images/feature1.png" alt="Managing Payments" /> */}
        <ManagePaymentComponent />
      </div>
      {/* section 2 */}
      <div className="w-full h-full mx-5">
        <img
          src="/images/time.png"
          width={600}
          height={700}
          alt="Timeless Transactions"
        />
      </div>
    </section>
  );
}

export default Features;
