import Header from "@/components/Commons/Header";
import { PhoneCallIcon } from "lucide-react";
import { MdMailOutline } from "react-icons/md";
import { useEffect, useState } from "react";

function TermsOfUse() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col mx-[200px] py-16">
        <div className="flex items-center justify-center flex-col">
          <h3 className="text-4xl font-extrabold mb-2 text-center">
            Terms of Use{" "}
          </h3>
          <p className="text-[#000000CC] mb-8">Last updated: July 2025</p>
        </div>

        <div className="w-full border-t border-gray-300 mb-10"></div>

        <div className="w-full grid grid-cols-5 gap-10 relative">
          <div className="col-span-1 bg-[#F7F9FD] text-black rounded-xl p-5 space-y-3 h-min sticky top-24 self-start">
            <h2 className="font-semibold text-gray-700 uppercase tracking-wide text-sm">
              Index
            </h2>

            <ol className="list-decimal list-inside text-sm space-y-1 text-gray-800">
              {[
                { id: "intro", title: "Acceptance of terms" },
                { id: "information", title: "User Eligibility" },
                { id: "usage", title: "User Responsibilities" },
                { id: "share", title: "Platform Services" },
                { id: "security", title: "Payment and Wallet Use" },
                { id: "rights", title: "Intellectual Property" },
                { id: "updates", title: "Termination" },
                                { id: "limitation", title: "Limitation of Liability" },
                { id: "law", title: "Governing Law" },

                { id: "contact", title: "Contact Us" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={` transition-all duration-200 ${
                      activeSection === item.id
                        ? " font-semibold"
                        : "text-gray-700 "
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Main Content */}
          <div className="col-span-4 space-y-10 scroll-smooth">
            <section id="intro">
              <h2 className="text-xl font-semibold mb-2 text-[#000000E5] uppercase">
                1. ACCEPTANCE OF TERMS
              </h2>
              <p className="text-[#000000CC] leading-relaxed">
                By signing up for or using Alfasente, you agree to these Terms
                and Conditions. If you do not agree, please do not use the
                platform.
              </p>
            </section>

            <section id="information">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                2. USER ELIGIBILITY
              </h2>
              <p>To use Alfasente, you must be:</p>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>At least 18 years old.</li>
                <li>
                  Authorized to act on behalf of an organization or business.{" "}
                </li>
              </ul>
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                3. USER RESPONSIBILITIES
              </h2>
              <p>You agree to:</p>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>Provide accurate information during registration.</li>
                <li>Keep your login credentials secure.</li>
                <li>Use the platform for lawful business activities only.</li>
                <li>
                  Not misuse, tamper with, or exploit the platform or its data.
                </li>
              </ul>
            </section>

            <section id="share">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                4. PLATFORM SERVICES
              </h2>
              <p className="text-[#000000CC] mb-2">
                Alfasente enables organizations to:
              </p>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>Create and manage bulk payments to beneficiaries.</li>
                <li>Manage wallet balances and view transactions.</li>
                <li>Upload and approve beneficiary lists.</li>
              </ul>
              <p>
                We may update, suspend, or discontinue services with or without
                notice.
              </p>
            </section>

            <section id="security">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                5. PAYMENT AND WALLET USE
              </h2>
              <p className="text-[#000000CC] leading-relaxed">
                You are responsible for funding your wallet and verifying
                transactions. Alfasente is not liable for errors due to
                incorrect beneficiary data or insufficient balances.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                6. INTELLECTUAL PROPERTY
              </h2>
              <p>
                All content, design, and technology used in the platform is
                owned by Alfasente or its licensors. You may not copy,
                distribute, or modify any part of the platform without
                permission.
              </p>
            </section>

            <section id="updates">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                7. Termination
              </h2>
              <p className="text-[#000000CC]">
                We reserve the right to suspend or terminate your access if you
                violate these terms or use the platform inappropriately.
              </p>
            </section>

            <section id="limitation">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                8. LIMITATION OF LIABILITY
              </h2>
              <p className="text-[#000000CC] mb-2">
                Alfasente is not responsible for:{" "}
              </p>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>Indirect or consequential losses.</li>
                <li>
                  Delays due to third-party service providers or networks.
                </li>
                <li>
                  User generated errors (e.g., incorrect data submissions).
                </li>
              </ul>
            </section>

            <section id="law">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                9. Governing Law
              </h2>
              <p className="text-[#000000CC]">
                These terms are governed by the laws of Uganda.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                8. Contact Us
              </h2>
              <p className="text-[#000000CC] mb-3">
                For legal inquiries or help:{" "}
              </p>
              <div className="space-y-2 text-[#000000CC]">
                <div className="flex items-center gap-2">
                  <MdMailOutline size={20} />
                  <span>support@alfasente.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCallIcon size={20} />
                  <span>+256 708210793</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsOfUse;
