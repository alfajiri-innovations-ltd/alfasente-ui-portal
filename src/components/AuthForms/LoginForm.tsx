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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setUserToken } from "@/lib/cookies/UserMangementCookie";
import { LogIn } from "@/lib/api-routes";
import { ErrorToast, SuccessToast } from "../ui/Toasts";

const FormSchema = z.object({
  user_email: z.string().min(2, { message: "Field is Required" }).email(),

  password: z.string().min(8, { message: "Field is Required" }),
});

interface IUserDetailsFormProps {
  handleClick: () => void;
  HandleLogin: () => void;
}
export function LoginForm({ handleClick, HandleLogin }: IUserDetailsFormProps) {
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
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        ErrorToast("Unexpected server response.");
        return;
      }

      const message = res?.result?.code;

      if (response.status === 200) {
        setUserToken(res.token);
        setAuthUser(res.userData);

        SuccessToast("Login Successful, Redirecting You ...");

        setTimeout(() => {
          if (res.userData?.role_name === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      } else {
        switch (message) {
          case 401:
            HandleLogin();
            break;
          case "User account unverified":
            ErrorToast("User account unverified. Please verify your email.");
            break;
          default:
            ErrorToast("Invalid username or password");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      ErrorToast("An error occurred. Please try again later.");
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
                  disabled={submitting}
                  className=" border-[#DCE1EC]"
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
              <FormLabel className="font-medium text-sm ">Password</FormLabel>
              <FormControl>
                <div className="flex border border-input h-10 justify-between items-center pr-4 rounded-md overflow-hidden">
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
          onClick={handleClick}
        >
          Forgot password?
        </span>
        <div className="col-span-2">
          <Button
            type="submit"
            className="w-full my-2 bg-[#8D35AA]"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : " Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
