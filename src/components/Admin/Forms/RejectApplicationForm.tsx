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
import { RejectClient, RejectList } from "@/lib/api-routes";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { ErrorToast, SuccessToast } from "@/components/ui/Toasts";

const FormSchema = z.object({
  reviewMessage: z.string().min(2, {
    message: "Field is Required.",
  }),
});

export interface RejectApplicationFormProps {
  clientID: number;
  handleClose: () => void;
}

export function RejectApplicationForm({
  clientID,
  handleClose,
}: RejectApplicationFormProps) {
  

  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reviewMessage: "",
    },
  });

  const token = getUserToken();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    const requestBody = {
      clientID,
      reviewMessage: data.reviewMessage,
    };
    console.log("Request Body: ", requestBody);
    try {
      const response = await fetch(RejectClient(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientID,
          reviewMessage: data.reviewMessage,
        }),
      });

      const responsedata = await response.json();

      if (response.ok) {
        SuccessToast("Application rejected successfully!");

        handleClose();
      } else {
        throw new Error(responsedata || "Failed to reject the Application.");
      }
    } catch (error: any) {
      ErrorToast(error.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="reviewMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please provide reviewMessage for rejecting</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="bg-[#F7F9FD] border-[#DCE1EC] focus-visible:ring-0 focus:ring-0 shadow-none "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-self-end gap-3">
          <Button variant={"outline"} className=" justify-self-end  ">
            Cancel
          </Button>

          <Button
            variant={"outline"}
            className="bg-[#D93E39] justify-self-end  text-white"
            disabled={submitting}
          >
            {submitting ? "Rejecting" : "Reject"}
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
}
