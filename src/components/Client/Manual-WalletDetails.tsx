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
import { useState } from "react";

const FormSchema = z.object({
  amount: z
    .number()
    .min(1000, { message: "Amount must be at least 1,000" })
    .max(3000000, { message: "Amount cannot exceed 3,000,000" }),
  proofOfPayment: z.instanceof(File),

  airtelAllocation: z
    .number()
    .min(1000, { message: "Amount must be at least 1,000" }),

  mtnAllocation: z
    .number()
    .min(1000, { message: "Amount must be at least 1,000" }),
});

interface IManualWalletDetails {
  handleNextStep: () => void;
}
function ManualWalletDetails({ handleNextStep }: IManualWalletDetails) {
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: undefined,
      proofOfPayment: undefined,
      airtelAllocation: undefined,
      mtnAllocation: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted Data:", data);
    handleNextStep();
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-base font-medium my-3">
          Ensure you have completed the payment before submitting this request.
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Proof of Payment (Image Upload) */}
            <FormField
              control={form.control}
              name="proofOfPayment"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="space-y-1 col-span-2">
                  <FormLabel>Proof of Payment</FormLabel>
                  <FormControl>
                    <>
                      <div className=" rounded-[6px] border h-10 flex justify-center items-center">
                        <label htmlFor="file-upload" className="text-sm">
                          {fileName ? (
                            <span className="text-gray-700">{fileName}</span>
                          ) : (
                            <div>
                              <span className="text-primary underline">
                                Upload
                              </span>
                              image file (.jpg, .png)
                            </div>
                          )}
                        </label>
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*, .zip"
                          multiple
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFileName(file ? file.name : null);
                            onChange(file);
                          }}
                          {...rest}
                          className="hidden"
                        />
                      </div>

                      <div>
                        {value && typeof value === "object" && (
                          <img
                            src={URL.createObjectURL(value)}
                            alt="Proof of Payment"
                            className="w-20 h-24 object-cover rounded-md"
                          />
                        )}
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Wallet Allocation */}
            <div>
              <h3>Wallet Allocation</h3>
              <div className="flex justify-between gap-4 my-3">
                {/* Airtel Wallet Allocation */}
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

                {/* MTN Wallet Allocation */}
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

            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default ManualWalletDetails;
