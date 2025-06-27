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
import { RenameList } from "@/lib/api-routes";
import { useState } from "react";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { listsWithMembers } from "@/lib/interfaces/interfaces";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface RenameListProps {
  list: listsWithMembers;
  handleClose: () => void;
}
export function RenameListForm({ list, handleClose }: RenameListProps) {
  const [submitting, setSubmitting] = useState(false);
  const token = getUserToken();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: list?.name,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    try {
      if (!list?.id) {
        throw new Error("List ID is undefined.");
      }

      const response = await fetch(RenameList(list.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: `${responseBody.message}`,
        });

        handleClose();
      } else {
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: `An error occured`,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter name</FormLabel>
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
        <Button type="submit" className="float-right" disabled={submitting}>
          {submitting ? "Submitting" : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
