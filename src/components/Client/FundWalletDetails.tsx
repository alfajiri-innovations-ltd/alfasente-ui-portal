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

import { IDetails } from "@/lib/interfaces/interfaces";
import {  useState } from "react";

const FormSchema = z
  .object({
    amount: z
      .number()
      .min(1000, { message: "Amount must be at least 1,000" })
      .max(3000000, { message: "Amount cannot exceed 3,000,000" }),

    accountNumber: z
      .string()
      .min(9, { message: "Enter a valid number" })
      .regex(/^\d{9}$/, { message: "Must be a 9-digit number" }),

    network: z.string().min(1, { message: "Please select a network" }),
  })
  .superRefine((data, ctx) => {
    const { network, accountNumber } = data;

    const normalized = accountNumber.trim();

    if (normalized.length < 2) return;

    const prefix2 = normalized.slice(0, 2);

    const isAirtel = ["70", "75", "74"].includes(prefix2);
    const isMTN = ["77", "78", "76"].includes(prefix2);

    if (network === "airtel" && !isAirtel) {
      ctx.addIssue({
        path: ["accountNumber"],
        code: z.ZodIssueCode.custom,
        message: "The phone number entered is not an Airtel number",
      });
    }

    if (network === "mtn" && !isMTN) {
      ctx.addIssue({
        path: ["accountNumber"],
        code: z.ZodIssueCode.custom,
        message: "The phone number entered is not an MTN number",
      });
    }
  });
interface IFundWalletDetails {
  handleNextStep: () => void;
  details: IDetails;
  setFundDetails: React.Dispatch<React.SetStateAction<IDetails>>;
}
function FundWalletDetails({
  handleNextStep,
  setFundDetails,
  details,
}: IFundWalletDetails) {
  const [isFormReady] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: details.amount ? Number(details.amount) : undefined,
      accountNumber: details.accountNumber || "",
      network: details.network || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...data,
      amount: data.amount,
    };

    setFundDetails(formattedData);
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
              <SelectTrigger className="w-full h-10 focus:ring-0 focus-visible:ring-0 border border-input   shadow:none rounded-lg">
                <SelectValue placeholder="Select Network " className="p-2 " />
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          disabled={form.formState.isSubmitting}
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
                          disabled={form.formState.isSubmitting}
                          type="tel"
                          placeholder="Phone Number"
                          className="border-none focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!isFormReady || form.formState.isSubmitting}
              >
                Proceed to Pay
              </Button>
            </form>
          </Form>
        </div>
   
    </>
  );
}

export default FundWalletDetails;
