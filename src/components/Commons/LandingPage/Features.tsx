function Features() {
  return (
    <section
      id="services"
      className="flex  lg:px-[6.25vw] flex-col top-[500px] md:top-[800px] px-4 md:mx-0 justify-center items-center  absolute xl:pt-[4vw]   z-40 bg-white "
    >
      <div className="flex flex-col items-center lg:flex-row gap-10 my-5">
        <div>
          <img src="/images/feature1.png" alt="Managing Payments" />
        </div>
        <div>
          <img src="/images/time.png" alt="Timeless Transactions" />
        </div>
      </div>
    </section>
  );
}

export default Features;
