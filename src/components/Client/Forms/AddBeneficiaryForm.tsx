"use client";

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
import { IMembers } from "@/lib/interfaces/interfaces";

const FormSchema = z.object({
  beneficiaryName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  mobileMoneyNumber: z.string().min(2, { message: "Field is Required" }),
  amount: z.number(),
  reason: z.string().min(2, { message: "Field is Required" }),
});

interface AddBeneficiaryFormProps {
  handleNext: () => void;
  setBeneficiary: (data: IMembers) => void;
}
export function AddBeneficiaryForm({
  handleNext,
  setBeneficiary,
}: AddBeneficiaryFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      beneficiaryName: "",
      mobileMoneyNumber: "",
      reason: "",
      amount: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setBeneficiary(data);
    handleNext();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:space-y-2"
      >
        <FormField
          control={form.control}
          name="beneficiaryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beneficiary name</FormLabel>
              <FormControl>
                <Input className="bg-[#F7F9FD] border-[#DCE1EC]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileMoneyNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beneficiary number</FormLabel>
              <FormControl>
                <Input className="bg-[#F7F9FD] border-[#DCE1EC]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-[#F7F9FD] border-[#DCE1EC]"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input className="bg-[#F7F9FD] border-[#DCE1EC]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" w-full ">
          <Button className="w-full mt-5">Continue</Button>
        </div>
      </form>
    </Form>
  );
}
