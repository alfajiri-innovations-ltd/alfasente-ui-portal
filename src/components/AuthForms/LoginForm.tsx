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
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";

interface LoginFormProps {
  HandleNextStep: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const FormSchema = z.object({
  user_email: z.string().min(2, { message: "Field is Required" }).email(),

  password: z.string().min(8, { message: "Field is Required" }),
});

export function LoginForm({ HandleNextStep, setEmail }: LoginFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    try {
      const response = await fetch(LogIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.text();

      let res;
      try {
        res = JSON.parse(responseBody);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Failure",
          description: "An expected server respone.",
        });
        return;
      }

      const message = res?.result?.code;

      if (response.status === 200) {
        setEmail(data.user_email);
        setTimeout(() => {
          HandleNextStep();
        }, 2000);
      } else {
        switch (message) {
          case 401:
            navigate("/wait-approval");
            break;
          case "User account unverified":
            toast({
              variant: "destructive",
              title: "Failure",
              description: "User account unverified. Please verify your email.",
            });

            break;
          default:
            toast({
              variant: "destructive",
              title: "Failure",
              description: "Invalid name or password.",
            });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-2  space-y-2"
        >
          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="md:text-lg">Personal Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail"
                    disabled={submitting}
                    className=" border-[#DCE1EC] py-6"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="  space-y-1 col-span-2">
                <FormLabel className="font-medium text-sm md:text-lg ">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="flex border border-input h-14 justify-between items-center pr-4 rounded-md overflow-hidden">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={submitting}
                      className=" border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none  "
                      {...field}
                    />
                    <p onClick={togglePassword}>
                      {passwordVisible ? (
                        <EyeIcon
                          className="w-[14px]"
                          color="rgba(88, 89, 98, 1)"
                        />
                      ) : (
                        <EyeOffIcon
                          className="w-[14px]"
                          color="rgba(88, 89, 98, 1)"
                        />
                      )}
                    </p>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <span
            className="text-primary flex justify-end  col-span-2 cursor-pointer"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot password?
          </span>
          <div className="col-span-2">
            <Button
              type="submit"
              className="w-full my-2 py-5 bg-[#8D35AA]"
              disabled={
                submitting ||
                form.watch("password") === "" ||
                form.watch("user_email") === ""
              }
            >
              {submitting ? "Submitting..." : " Login"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
