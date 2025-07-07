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
import { useState } from "react";
import { UpdateBeneficiary } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { IMembers } from "@/lib/interfaces/interfaces";

const FormSchema = z.object({
  beneficiaryName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  amount: z.coerce
    .number()
    .min(1000, { message: "Must be a number greater than 1000" }),
  mobileMoneyNumber: z.string().min(2, { message: "Field is Required" }),
  reason: z.string().min(2, { message: "Field is Required" }),
});

interface EditProps {
  handleClose: () => void;
  member: IMembers;
}

export function EditBeneficiaryForm({ member, handleClose }: EditProps) {
  const [submitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      beneficiaryName: member?.beneficiaryName,
      mobileMoneyNumber: member?.mobileMoneyNumber,
      reason: member?.reason,
      amount: member?.amount,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);

      if (!member || typeof member.beneficiaryId !== "number") {
        throw new Error("Beneficiary information is missing or invalid.");
      }

      console.log("sending data", data);

      const response = await fetch(UpdateBeneficiary(member.beneficiaryId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Failure",
          description: `An error occurred: ${errorData.message}`,
        });
      }

      toast({
        variant: "success",
        title: "Successful",
        description: "Beneficiary updated successfully",
      });

      handleClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: `An error occurred: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="beneficiaryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  className="bg-[#F7F9FD] border-[#DCE1EC]"
                  {...field}
                />
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
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  className="bg-[#F7F9FD] border-[#DCE1EC]"
                  {...field}
                />
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
              <FormLabel>Amount (UGX)</FormLabel>
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
                <Input
                  placeholder="shadcn"
                  className="bg-[#F7F9FD] border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            variant={"outline"}
            className=""
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button type="submit" className="" disabled={submitting}>
            {submitting ? "Submitting" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
