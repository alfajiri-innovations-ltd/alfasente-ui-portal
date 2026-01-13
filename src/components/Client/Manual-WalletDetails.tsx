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
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/UserContext";
import { ManualTopUp } from "@/lib/api-routes";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { useCurrency } from "@/hooks/useCurrency";
import { Copy, Check } from "lucide-react";

const FormSchema = z.object({
  amount: z.number().min(1000, { message: "Amount must be at least 1,000" }),
  proofOfCredit: z.instanceof(File),

  airtelAllocation: z.number(),

  mtnAllocation: z.number(),
});

interface IManualWalletDetails {
  handleNextStep: () => void;
  setManualDetails: (data: any) => void;
}
function ManualWalletDetails({
  handleNextStep,
  setManualDetails,
}: IManualWalletDetails) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isFormReady, setIsFormReady] = useState(true);

  const [balanceMsg, setBalanceMsg] = useState("");
  const [editing, setEditing] = useState<"airtel" | "mtn" | null>(null);
  const user = useUser();
  const token = getUserToken();
  const { currency: airtelCurrency } = useCurrency();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: undefined,
      proofOfCredit: undefined,
      airtelAllocation: undefined,
      mtnAllocation: undefined,
    },
  });

  const amount = form.watch("amount");
  const airtel = form.watch("airtelAllocation");
  const mtn = form.watch("mtnAllocation");

  useEffect(() => {
    if (!amount || amount <= 0) return;
    if (editing === "airtel") {
      const newMtn = amount - (airtel || 0);
      form.setValue("mtnAllocation", newMtn > 0 ? newMtn : 0, {
        shouldValidate: true,
      });
    }

    if (editing === "mtn") {
      const newAirtel = amount - (mtn || 0);
      form.setValue("airtelAllocation", newAirtel > 0 ? newAirtel : 0, {
        shouldValidate: true,
      });
    }

    const total =
      (form.watch("airtelAllocation") || 0) +
      (form.watch("mtnAllocation") || 0);

    if (total < amount) {
      setBalanceMsg(`You still have UGX ${amount - total} unallocated`);
      setIsFormReady(false);
    } else if (total > amount) {
      setBalanceMsg(`Allocation exceeds amount by UGX ${total - amount}`);
      setIsFormReady(false);
    } else {
      setBalanceMsg("");
      setIsFormReady(true);
    }
  }, [airtel, mtn, amount, editing]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setSubmitting(true);
      const clientID = user?.clientID;
      if (isNaN(clientID ?? NaN)) throw new Error("Invalid client ID");

      const formData = new FormData();
      formData.append("clientID", String(clientID));
      formData.append("airtelAllocation", String(data.airtelAllocation));
      formData.append("mtnAllocation", String(data.mtnAllocation));
      formData.append("amount", String(data.amount));
      formData.append("proofOfCredit", data.proofOfCredit);

      const response = await fetch(ManualTopUp(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseBody = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Failure",
          description: `${responseBody.message}`,
        });
      } else {
        toast({
          variant: "success",
          title: "Successful",
          description: `${responseBody.message}`,
        });

        const transactonId = responseBody.result.transactionID;

        const formEntries = Object.fromEntries(formData.entries());
        const newData = { ...formEntries, transactonId };
        setManualDetails(newData);

        setTimeout(() => {
          handleNextStep();
        }, 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: `An error occurred: ${error}`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const valueToCopy = "9030027385973";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(valueToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-base font-medium mb-3 text-[#5C6474] ">
          Deposit to the bank account below first. After your deposit is
          successful, submit your manual top-up request{" "}
        </h3>
        <div className="border border-[#E4E8F1] bg-[#F7F9FD] rounded-[10px] p-4">
          <h4 className="font-semibold text-base text-[#000000CC] border-b pb-1 mb-3 border-[#EDF0F7]">
            Stanbic Bank - Deposit details
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center  border-b pb-1 border-[#EDF0F7]">
              <span className="text-[#7A8397] text-[15px]">Account Name</span>
              <span className="font-medium text-[15px] text-[#000000CC]">
                THE BYTE VILLAGE (U) LTD
              </span>
            </div>

            <div className="flex justify-between items-center  border-b pb-1 border-[#EDF0F7]">
              <span className="text-[#7A8397] text-[15px]">Account Number</span>
              <p className="font-medium text-[15px] flex items-center gap-2 text-[#000000CC]">
                {valueToCopy}
                <span
                  onClick={handleCopy}
                  className="cursor-pointer"
                  title="Copy"
                >
                  {copied ? (
                    <Check className="text-green-600" size={15} />
                  ) : (
                    <Copy className="text-[#8D35AA] cursor-pointer" size={15} />
                  )}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-center  ">
              <span className="text-[#7A8397] text-[15px]">Branch</span>
              <span className="font-medium text-[15px] text-[#000000CC]">
                Lugogo Branch{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="border border-[#EDF0F7] "></div>

        <div>
          <h5 className="font-semibold text-base">
            Submit manual top-up request
          </h5>
          <p className="text-[#5C6474] text-sm">
            Enter the deposited amount and upload proof of deposit
          </p>
        </div>

        <ScrollArea className="h-[400px] w-full">
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
                          {airtelCurrency}
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
                name="proofOfCredit"
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
                              {airtelCurrency}
                            </span>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => {
                                setEditing("airtel");
                                field.onChange(e.target.valueAsNumber || 0);
                              }}
                              className="border-none focus-visible:ring-0 focus:ring-0 outline-none shadow-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* MTN Wallet Allocation */}
                  {/* <FormField
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
                              disabled
                              readOnly
                              type="number"
                              onChange={(e) => {
                                setEditing("mtn");
                                field.onChange(e.target.valueAsNumber || 0);
                              }}
                              className="border-none focus-visible:ring-0 focus:ring-0 outline-none shadow-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                {balanceMsg && (
                  <p
                    className={`text-sm ${balanceMsg.includes("exceeds") ? "text-red-500" : "text-yellow-600"}`}
                  >
                    {balanceMsg}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg"
                disabled={submitting || !isFormReady}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </>
  );
}

export default ManualWalletDetails;
