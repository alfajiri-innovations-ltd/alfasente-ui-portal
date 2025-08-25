import { useState } from "react";

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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPassword } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";

const FormSchema = z
  .object({
    newPassword: z.string().min(8, { message: "Field is required" }),
    confirmPassword: z.string().min(8, { message: "Field is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [passwordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const email = localStorage.getItem('email')

  const [newPasswordVisible, setnewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // const togglePassword = () => {
  //   setPasswordVisible(!passwordVisible);
  // };
  const togglenewPassword = () => {
    setnewPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      setSubmitting(true);

      try {
        const response = await fetch(ResetPassword, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email,
            new_password: values.newPassword,
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
            navigate("/access-dashboard");
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
        className="w-full    md:w-[30vw] "
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className={`md:my-4 my-2 space-y-[3px] md:space-y-2 `}>
              {" "}
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex border justify-between  items-center pr-4 rounded-[8px] overflow-hidden">
                  <Input
                    type={newPasswordVisible ? "text" : "password"}
                    className={`h-10 w-[391px] border-none   ring-offset-0 focus-visible:ring-0  focus-visible:ring-offset-0 ${pathname === "/settings" && "h-8 bg-inputbackground"}  `}
                    {...field}
                  />
                  <p onClick={togglenewPassword}>
                    {newPasswordVisible ? (
                      <EyeIcon className="w-4   " color="rgba(88, 89, 98, 1)" />
                    ) : (
                      <EyeOffIcon className="w-4" color="rgba(88, 89, 98, 1)" />
                    )}
                  </p>
                </div>
              </FormControl>
              <FormDescription className="text-[#5C6474] font-normal text-xs">
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
            <FormItem className={`md:my-4 my-2 space-y-[3px] md:space-y-2 }`}>
              {" "}
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="flex border justify-between  items-center pr-4 rounded-[8px] overflow-hidden">
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className={`h-10 w-[391px] border-none   ring-offset-0 focus-visible:ring-0  focus-visible:ring-offset-0 ${pathname === "/settings" && "h-8 bg-inputbackground "} `}
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
              <FormDescription className="text-[#5C6474] font-normal text-xs">
                Must be at least 8 characters long, include a mix of letters,
                numbers, and symbols.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {submitting ? "Submiting" : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
