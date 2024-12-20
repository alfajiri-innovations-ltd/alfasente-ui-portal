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
import { useState } from "react";
import { Check, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { CheckboxDemo } from "../Client/TermsCheckBox";
import { CreateClient, CreateUser } from "@/lib/api-routes";
import { SuccessToast } from "../SuccessToast";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Field is required",
  }),
  role_name: z.string(),
  isEmailVerified: z.boolean(),
  user_email: z.string().min(2, { message: "Field is Required" }).email(),
  date_of_birth: z.string().min(2, { message: "Field is Required" }),
  lastName: z.string().min(2, { message: "Field is Required" }),

  password: z.string().min(8, { message: "Field is Required" }),
});

interface IUserDetailsFormProps {
  handleClick: () => void;
}
export function UserDetailsForm({ handleClick }: IUserDetailsFormProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      user_email: "",
      password: "",
      date_of_birth: "",
      role_name: "client_admin",
      isEmailVerified: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    try {
      const userResponse = await fetch(CreateUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(userResponse);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        const userId = userData.userId;

        localStorage.setItem("email", userData.user_email);

        const clientObject = JSON.parse(localStorage.getItem("client") || "{}");

        const clientData = {
          ...clientObject,
          userId: userId,
        };
        const clientResponse = await fetch(CreateClient, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientData),
        });

        console.log(clientResponse);
        if (clientResponse.ok) {
          setToastVisible(true);

          setTimeout(() => {
            localStorage.removeItem("client");
            handleClick();
          }, 2000);
        } else {
          const clientError = await clientResponse.json();
          console.error("Client creation failed:", clientError);
        }
      } else {
        const userError = await userResponse.json();
        console.error("User creation failed:", userError);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const email = localStorage.getItem("email");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid  grid-cols-2 relative  space-y-2"
      >
        {toastVisible && (
          <SuccessToast>
            <div className="flex gap-1 items-center w-full absolute -top-28  left-1/2 px-[1px] transform -translate-x-1/2 bg-green-500 text-white py-2 rounded-md shadow-md">
              <div className="rounded-full bg-white flex justify-center items-center p-[2px]">
                <Check className="w-4 h-4 text-black" />
              </div>
              <span>All set! please verify your email sent to {email}</span>
            </div>
          </SuccessToast>
        )}

        <div className=" col-span-2 flex justify-between gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lubwama"
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mildred"
                    className=" border-[#DCE1EC]"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <span className="col-span-2">
          <FormDescription>
            Please provide full legal name as appears on government
            certification.
          </FormDescription>
        </span>
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

        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="shadcn"
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
                    className="h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0  "
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
              <FormDescription>
                Must be at least 8 characters long, include a mix of letters,
                numbers, and symbols.
              </FormDescription>

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
        <div className="col-span-2 ">
          <Button type="submit" className="w-full my-4 bg-[#C8CFDE]">
            {submitting ? "Registering..." : " Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
