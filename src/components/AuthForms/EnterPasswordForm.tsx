import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

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
import { LogIn } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { CheckboxDemo } from "../Client/TermsCheckBox";

// interface LoginFormProps {
//   HandleNextStep: () => void;
//   //   setEmail: React.Dispatch<React.SetStateAction<string>>;
// }

const FormSchema = z.object({
  user_email: z.string().min(2, { message: "Field is Required" }).email(),

  password: z.string().min(8, { message: "Field is Required" }),
});

export function PasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
        // setEmail(data.user_email);
        // setTimeout(() => {
        //   HandleNextStep();
        // }, 2000);
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
                <FormLabel> Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail"
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
          <div className="col-span-2 my-3">
            <CheckboxDemo
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
              label={
                <div className="mx-1">
                  I acknowledge that I have reviewed and agreed to Alfasente's{" "}
                  <span className="text-primary underline ">
                    <Link to={"/privacy-policy"}>Terms and Conditions</Link>
                  </span>{" "}
                  and{" "}
                  <span className="text-primary underline">
                    <Link to={"/terms-and-conditions"}>Privacy Policy</Link>
                  </span>
                </div>
              }
            />
          </div>

          <div className="col-span-2">
            <Button
              type="submit"
              className="w-full my-2 bg-[#C8CFDE]"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : " Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
