import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";
import ConfirmPaymentDetails from "./ConfirmPaymentDetails";

const FormSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  number: z.string().min(9, { message: "Enter a valid number" }),
  network: z.string().min(1, { message: "Please select a network" }),
});

function FundWalletDetails() {
  const [Paymentdetails, setShowPaymentDetails] = useState(false);

  const handleClick = () => {
    setShowPaymentDetails(!Paymentdetails);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: "",
      number: "",
      network: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    handleClick();
  }

  return (
    <>
      {!Paymentdetails ? (
        <>
          <h3 className="font-bold mb-2">Fund your wallet</h3>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Select Mobile Money Provider</h3>

            <div className="flex space-x-4">
              <div
                onClick={() => form.setValue("network", "mtn")}
                className={`relative border rounded-lg p-2 flex-1 cursor-pointer ${
                  form.watch("network") === "mtn"
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="network"
                  value="mtn"
                  checked={form.watch("network") === "mtn"}
                  onChange={() => form.setValue("network", "mtn")}
                  className="absolute top-2 right-2 hidden"
                />
                <div
                  className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                    form.watch("network") === "mtn"
                      ? "bg-black text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {form.watch("network") === "mtn" && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <div className="bg-yellow-400 rounded-full w-10 h-10 items-center flex justify-center">
                  <img
                    src="/images/logos/MTN.svg"
                    alt="MTN"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-sm font-normal mt-2">MTN MoMo</p>
              </div>

              <div
                onClick={() => form.setValue("network", "airtel")}
                className={`relative border rounded-lg p-2 flex-1 cursor-pointer ${
                  form.watch("network") === "airtel"
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="network"
                  value="airtel"
                  checked={form.watch("network") === "airtel"}
                  onChange={() => form.setValue("network", "airtel")}
                  className="absolute top-2 right-2 hidden"
                />
                <div
                  className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                    form.watch("network") === "airtel"
                      ? "bg-black text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {form.watch("network") === "airtel" && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <div className="bg-red-600 rounded-full w-10 h-10 items-center flex justify-center">
                  <img
                    src="/images/logos/Airtel.svg"
                    alt="Airtel"
                    className="w-9 h-9 rounded-full"
                  />
                </div>
                <p className="text-sm font-normal mt-2">Airtel Money</p>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Amount</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-lg">
                          <span className="px-3 py-2 text-gray-700 rounded-l-md">
                            UGX
                          </span>
                          <Input
                            {...field}
                            placeholder="Amount"
                            type="text"
                            className="border-none focus-visible:ring-0 focus:ring-0 outline-none shadow-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Number</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-lg">
                          <span className="px-3 py-2 text-gray-700 rounded-l-md">
                            +256
                          </span>
                          <Input
                            {...field}
                            placeholder="Phone Number"
                            className="border-none focus-visible:ring-0 shadow-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Proceed to Pay
                </Button>
              </form>
            </Form>
          </div>
        </>
      ) : (
        <ConfirmPaymentDetails />
      )}
    </>
  );
}

export default FundWalletDetails;
