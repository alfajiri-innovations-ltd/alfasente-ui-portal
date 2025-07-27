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
import { useLocation } from "react-router-dom";

const FormSchema = z
  .object({
    currentPassword: z.string().min(8, { message: "Field is required" }),
    newPassword: z.string().min(8, { message: "Field is required" }),
    confirmPassword: z.string().min(8, { message: "Field is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ChangePasswordForm() {
  const location = useLocation();
  const { pathname } = location;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setnewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglenewPassword = () => {
    setnewPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full    md:w-[30vw] "
      >
        <h3 className="font-medium text-[18px] ">Update password</h3>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className={` space-y-[3px] md:space-y-2`}>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="flex border justify-between items-center bg-[#fffff0] pr-4 rounded-[8px] overflow-hidden">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="*** *** ***"
                    className={`h-10 w-[391px] border-none  bg-[#fffff0] ring-offset-0 focus-visible:ring-0   focus-visible:ring-offset-0 ${pathname === "/settings" && "h-8 bg-inputbackground"}  `}
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
          name="newPassword"
          render={({ field }) => (
            <FormItem className={`md:my-4 my-2 space-y-[3px] md:space-y-2 `}>
              {" "}
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="flex border justify-between bg-[#fffff0] items-center pr-4 rounded-[8px] overflow-hidden">
                  <Input
                    type={newPasswordVisible ? "text" : "password"}
                    placeholder="*** *** ***"
                    className={`h-10 w-[391px] border-none  bg-[#fffff0] ring-offset-0 focus-visible:ring-0  focus-visible:ring-offset-0 ${pathname === "/settings" && "h-8 bg-inputbackground"}  `}
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
                <div className="flex border justify-between bg-[#fffff0] items-center pr-4 rounded-[8px] overflow-hidden">
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="*** *** ***"
                    className={`h-10 w-[391px] border-none  bg-[#fffff0] ring-offset-0 focus-visible:ring-0  focus-visible:ring-offset-0 ${pathname === "/settings" && "h-8 bg-inputbackground "} `}
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
          Save changes
        </Button>
      </form>
    </Form>
  );
}
