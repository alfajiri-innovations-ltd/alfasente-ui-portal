import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ResetPassword } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";

interface IEmailOtpProps {
  handleClick: () => void;
}

const FormSchema = z
  .object({
    new_password: z
      .string()
      .min(8, { message: "Password must have atleast 8 alphanumerics" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({ handleClick }: IEmailOtpProps) {
  const email = localStorage.getItem("email");

  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      new_password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    try {
      const response = await fetch(ResetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          new_password: data.new_password,
        }),
      });

      const responseBody = await response.text();

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: "Password reset successfully",
        });

        setTimeout(() => {
          handleClick();
        }, 3000);
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: `An error occurred: ${responseBody}`,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: ` An unexpected error occurred: ${error.message}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  md:space-y-4"
      >
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel className="font-medium text-sm ">Password</FormLabel>
              <FormControl>
                <div className="flex border border-input justify-between items-center pr-4 rounded-md h-10 overflow-hidden">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 border-none ring-offset-0 focus-visible:ring-0  focus-visible:ring-offset-0  "
                    {...field}
                  />
                  <p onClick={togglePassword}>
                    {passwordVisible ? (
                      <EyeIcon className="w-4   " color="rgba(88, 89, 98, 1)" />
                    ) : (
                      <EyeOffIcon className="w-4" color="rgba(88, 89, 98, 1)" />
                    )}
                  </p>
                </div>
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long, include a mix of letters,
                numbers, and symbols.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="my-2">
              <FormLabel className="font-medium text-sm ">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="flex border border-input justify-between items-center h-10 pr-4 rounded-md overflow-hidden">
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 border-none ring-offset-0 focus-visible:ring-0  focus-visible:ring-offset-0  "
                    {...field}
                  />
                  <p onClick={toggleConfirmPassword}>
                    {confirmPasswordVisible ? (
                      <EyeIcon className="w-4   " color="rgba(88, 89, 98, 1)" />
                    ) : (
                      <EyeOffIcon className="w-4" color="rgba(88, 89, 98, 1)" />
                    )}
                  </p>
                </div>
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long, include a mix of letters,
                numbers, and symbols.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-normal text-sm mt-3  md:mt-6 bg-[#8D35AA] "
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
