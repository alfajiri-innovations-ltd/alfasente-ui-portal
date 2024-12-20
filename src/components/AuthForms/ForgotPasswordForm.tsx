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
  user_email: z.string().min(2, { message: "Field is Required" }).email(),
});

interface IUserDetailsFormProps {
  handleClick: () => void;
}
export function ForgotPasswordForm({ handleClick }: IUserDetailsFormProps) {
  const [submitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setSubmitting(true);
    console.log(data);
    handleClick();
  }

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
                  className=" border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <Button type="submit" className="w-full my-2 bg-[#8D35AA]">
            {submitting ? "Submitting..." : " Reset Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
