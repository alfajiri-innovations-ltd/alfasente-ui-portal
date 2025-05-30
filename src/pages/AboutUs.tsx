import Header from "@/components/Commons/Header";
import Footer from "@/components/Commons/LandingPage/Footer";

function AboutUs() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      <Header />

      <main className="px-4 sm:px-8 md:px-12 lg:px-24 py-4 lg:py-16">
       
        <section className="text-center mb-12">
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold lg:font-extrabold text-black/90 leading-tight">
            Simplifying Bulk Payments For Businesses
          </h3>
        </section>

   
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        
          <div className="flex items-center justify-center bg-[#F7F9FD] rounded-3xl h-72 w-full p-6">
            <img
              src="/images/logos/alfasente-logo.png"
              alt="Alfasente Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>

      
          <div className="lg:col-span-2 text-base leading-relaxed text-gray-800 space-y-4">
            <p>
              <strong>Alfasente</strong> is a powerful platform designed to make bulk
              payments faster, easier, and more secure. Whether it’s payroll, vendor
              payments, or other disbursements, Alfasente enables businesses to
              process multiple payments to beneficiaries in just a few clicks.
            </p>
            <p>
              Since its launch, Alfasente has focused on eliminating manual
              processes, reducing errors, and improving payment speed. The
              platform allows businesses to manage beneficiaries, fund wallets,
              and authorize payments—all in one place.
            </p>
            <p>
              Alfasente is a licensed and regulated business in Uganda, ensuring
              compliance with local regulations while providing a secure and
              reliable solution for bulk payment management.
            </p>
            <p>
              Join businesses across Africa who trust Alfasente to handle their
              bulk payments seamlessly and securely. Let Alfasente streamline
              your financial processes and help you focus on what matters most –
              growing your business.
            </p>
          </div>
        </section>
      </main>

    <div  className="px-4 xl:px-0  ">
    <Footer />
    </div>
    </div>
  );
}

export default AboutUs;
