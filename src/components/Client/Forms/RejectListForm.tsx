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

const FormSchema = z.object({
  reason: z.string().min(2, {
    message: "Field is Required.",
  }),
});

export function RejectListForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please provide reason for rejecting</FormLabel>
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
          >
            Delete
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
}
