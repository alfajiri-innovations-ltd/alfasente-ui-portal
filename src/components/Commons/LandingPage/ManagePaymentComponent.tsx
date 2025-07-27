import React from "react";
import { X, Check } from "lucide-react";

const BulkPaymentsComponent: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto sm:mt-10 p-8">
      {/* Main Heading */}
      <h3 className="text-xl md:text-[42px] font-bold text-gray-900 mb-2 leading-tight">
        Managing bulk payments shouldn't be this hard
      </h3>

      {/* Pain Points */}
      <div className="space-y-0 mb-12">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <X className="w-6 h-6 text-orange-500" />
          </div>
          <p className="sm:text-lg text-md text-gray-700 leading-relaxed">
            Manual processes slow you down
          </p>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <X className="w-6 h-6 text-orange-500" />
          </div>
          <p className="sm:text-lg text-md text-gray-700 leading-relaxed">
            Payment errors damage trust
          </p>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <X className="w-6 h-6 text-orange-500" />
          </div>
          <p className="sm:text-lg text-md text-gray-700 leading-relaxed">
            Delayed transactions hinder growth
          </p>
        </div>
      </div>

      {/* Solution Box */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-2">
        <div className="flex items-start space-x-1">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <p className="sm:text-xl text-md text-gray-800 leading-relaxed">
              <span className="font-semibold text-green-700">
                With Alfasente
              </span>
              , you get a fast, secure, and reliable way to handle bulk
              payments, all from one platform.
            </p>
          </div>
        </div>
      </div>

      {/* Optional CTA section */}
      {/* <div className="mt-8 text-center">
                <Link to={"/register"} className="bg-green-600 hover:bg-green-700 text-white font-normal px-5 py-4 my-4 rounded-xl transition-colors duration-200 text-md">
                    Get Started with Alfasente
                </Link>
                <br />
                <br />

                <p className="text-gray-500 text-sm mt-1">
                    Join thousands of businesses streamlining their payments
                </p>
            </div> */}
    </div>
  );
};

export default BulkPaymentsComponent;
