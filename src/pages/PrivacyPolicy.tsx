import Header from "@/components/Commons/Header";
import { PhoneCallIcon } from "lucide-react";
import { MdMailOutline } from "react-icons/md";
import { useEffect, useState } from "react";

function PrivacyPolicy() {
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
            Privacy Policy
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
                { id: "intro", title: "Introduction" },
                { id: "information", title: "Information we Collect" },
                { id: "usage", title: "How We Use Your Information" },
                { id: "share", title: "Sharing of Information" },
                { id: "security", title: "Data Security" },
                { id: "rights", title: "Your Rights" },
                { id: "updates", title: "Updates to This Policy" },
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
                1. Introduction
              </h2>
              <p className="text-[#000000CC] leading-relaxed">
                At Alfasente, we respect your privacy and are committed to
                protecting your personal data. This Privacy Policy explains how
                we collect, use, and safeguard your information.
              </p>
            </section>

            <section id="information">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                2. Information We Collect
              </h2>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>
                  Personal information: Name, email, phone number, date of birth,
                  organization details.
                </li>
                <li>
                  Financial information: Wallet balances, transaction history.
                </li>
                <li>
                  Usage data: Device type, IP address, browser type, and usage logs.
                </li>
              </ul>
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>Provide and improve our services.</li>
                <li>Process transactions securely.</li>
                <li>Communicate account and transaction updates.</li>
                <li>Respond to support inquiries.</li>
              </ul>
            </section>

            <section id="share">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                4. Sharing of Information
              </h2>
              <p className="text-[#000000CC] mb-2">
                We do not sell or share your personal data with third parties except:
              </p>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>When required by law.</li>
                <li>
                  With trusted service providers under confidentiality agreements.
                </li>
              </ul>
            </section>

            <section id="security">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                5. Data Security
              </h2>
              <p className="text-[#000000CC] leading-relaxed">
                We use encryption, access controls, and secure protocols to protect your data. 
                Despite our efforts, no method is 100% secure, so we encourage you to keep your 
                credentials safe.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                6. Your Rights
              </h2>
              <ul className="list-disc list-inside text-[#000000CC] space-y-1">
                <li>Access your personal information.</li>
                <li>Request corrections or deletions.</li>
                <li>Withdraw consent where applicable.</li>
              </ul>
              <p className="text-[#000000CC] mt-2">
                To exercise these rights, contact us at:{" "}
                <span className=" font-bold">
                  support@alfasente.com
                </span>
              </p>
            </section>

            <section id="updates">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                7. Updates to This Policy
              </h2>
              <p className="text-[#000000CC]">
                We may update this Privacy Policy from time to time. Changes will be posted 
                on this page with a new effective date.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-semibold mb-2 uppercase">
                8. Contact Us
              </h2>
              <p className="text-[#000000CC] mb-3">
                For questions or concerns, reach out to:
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

export default PrivacyPolicy;
