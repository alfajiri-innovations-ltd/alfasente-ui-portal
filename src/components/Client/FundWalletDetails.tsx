import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import ConfirmPaymentDetails from "./ConfirmPaymentDetails";

const FormSchema = z.object({
  amount: z
    .number()
    .min(1000, { message: "Amount must be at least 1,000" })
    .max(3000000, { message: "Amount cannot exceed 3,000,000" }),

  accountNumber: z.string().min(9, { message: "Enter a valid number" }),
  network: z.string().min(1, { message: "Please select a network" }),
  airtelAllocation: z
    .number()
    .min(1000, { message: "Amount must be at least 1,000" }),

  mtnAllocation: z
    .number()
    .min(1000, { message: "Amount must be at least 1,000" }),
});
interface IFundWalletDetails {
  handleNextStep:()=>void;
}
function FundWalletDetails({handleNextStep}:IFundWalletDetails) {
  // const [Paymentdetails, setShowPaymentDetails] = useState(false);

  const [Details, setDetails] = useState({
    amount: "",
    accountNumber: "",
    network: "",
    airtelAllocation: 0,
    mtnAllocation: 0,
  });

  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: undefined,
      accountNumber: "",
      network: "",
      airtelAllocation: undefined,
      mtnAllocation: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const formattedData = {
      ...data,
      amount: data.amount.toString(),
    };

    setDetails(formattedData);
   handleNextStep();
  }

  return (
    <>
    
       
          <div className="space-y-4">
            <h3 className="text-base font-medium my-3">
              Select Mobile Money Provider
            </h3>

            <div className="flex flex-col gap-2">
              <Select
                value={form.watch("network")}
                onValueChange={(value) => form.setValue("network", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Network " className="py-2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">
                    <div className="flex items-center space-x-2">
                      <div className="bg-yellow-400 rounded-full w-8 h-8 items-center flex justify-center">
                        <img
                          src="/images/logos/MTN.svg"
                          alt="MTN"
                          className="w-8 h-8"
                        />
                      </div>

                      <span>MTN MoMo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="airtel">
                    <div className="flex items-center space-x-2 py-2">
                      <div className="bg-red-600 rounded-full w-8 h-8 items-center flex justify-center">
                        <img
                          src="/images/logos/Airtel.svg"
                          alt="Airtel"
                          className="w-9 h-9 rounded-full"
                        />
                      </div>
                      <span>Airtel Money</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div>
                {form.formState.errors.network && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.network.message}
                  </p>
                )}
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
                      <FormLabel className="flex justify-between">
                        Enter Amount
                        <span className="text-[#7A8397] font-normal text-xs">
                          Min: UGX 1,000 | Max: UGX 3,000,000
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-lg">
                          <span className="px-3 py-2 text-gray-700 rounded-l-md">
                            UGX
                          </span>
                          <Input
                            {...field}
                            placeholder="Amount"
                            type="number"
                            onChange={(e) => {
                              const value = e.target.valueAsNumber || 0;
                              field.onChange(value);
                            }}
                            className="border-none focus-visible:ring-0 focus:ring-0 outline-none shadow-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <h3>Wallet Allocation</h3>
                  <div className="flex justify-between gap-4 my-3">
                    
                    <FormField
                      control={form.control}
                      name="airtelAllocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airtel Money Wallet</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-lg">
                              <span className="px-3 py-2 text-gray-700 rounded-l-md">
                                UGX
                              </span>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber || 0)
                                }
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
                      name="mtnAllocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MTN Money Wallet</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-lg">
                              <span className="px-3 py-2 text-gray-700 rounded-l-md">
                                UGX
                              </span>
                              <Input
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber || 0)
                                }
                                className="border-none focus-visible:ring-0 focus:ring-0 outline-none shadow-none"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your number</FormLabel>
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
     
   
  );
}

export default FundWalletDetails;
