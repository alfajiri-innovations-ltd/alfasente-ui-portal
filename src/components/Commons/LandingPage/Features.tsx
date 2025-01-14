function Features() {
  return (
    <section
      id="services"
      className="flex flex-col justify-center items-center  absolute pt-[4vw]   z-40 bg-white px-[4vw]"
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
