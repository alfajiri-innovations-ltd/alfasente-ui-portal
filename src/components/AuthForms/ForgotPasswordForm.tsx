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
import { ForgotPassword } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  user_email: z.string().min(2, { message: "Field is Required" }).email(),
});

interface IUserDetailsFormProps {
  handleClick: () => void;
}
export function ForgotPasswordForm({ handleClick }: IUserDetailsFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    try {
      const response = await fetch(ForgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.setItem("email", data.user_email);

        toast({
          variant: "success",
          title: "Successful",
          description: `Otp sucessfully sent to ${data.user_email}`,
        });

        setTimeout(() => {
          handleClick();
        }, 3000);
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "Invalid Email.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "An expected error occured.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2  space-y-2"
      >
        <FormField
          control={form.control}
          name="user_email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Personal Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail"
                  className=" border-[#DCE1EC] py-5"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <Button
            type="submit"
            className="w-full my-5 font-bold text-lg py-6 bg-[#8D35AA]"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : " Reset Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
