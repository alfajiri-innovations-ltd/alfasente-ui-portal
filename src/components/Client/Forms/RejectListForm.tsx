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
import { RejectList } from "@/lib/api-routes";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  reviewMessage: z.string().min(2, {
    message: "Field is Required.",
  }),
});

export interface RejectListFormProps {
  listId: number;
  handleClose: () => void;
  onRejected?: (listId: number) => void;
}

export function RejectListForm({
  listId,
  handleClose,
  onRejected,
}: RejectListFormProps) {
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

    try {
      const response = await fetch(RejectList(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listId,
          reviewMessage: data.reviewMessage,
        }),
      });

      const responsedata = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Success",
          description: "List rejected successfully!",
        });
        onRejected?.(listId);

        handleClose();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: responsedata?.message || "Failed to reject the list.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred.",
      });
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
