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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { CheckboxDemo } from "../Client/TermsCheckBox";
import { CreateClient, CreateUser } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";
import { useClientContext } from "@/hooks/ClientContext";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Field is required",
  }),
  role_name: z.string(),
  isEmailVerified: z.boolean(),
  user_email: z.string().min(2, { message: "Field is Required" }).email(),
  date_of_birth: z
    .string()
    .min(2, { message: "Field is Required" })
    .refine(
      (value) => {
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        const isOldEnough =
          age > 18 ||
          (age === 18 && m >= 0 && today.getDate() >= dob.getDate());
        return isOldEnough;
      },
      {
        message: "You must be at least 18 years old",
      }
    ),
  lastName: z.string().min(2, { message: "Field is Required" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must include at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include at least one special character",
    }),
});

interface IUserDetailsFormProps {
  handleClick: () => void;
}
export function UserDetailsForm({ handleClick }: IUserDetailsFormProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { clientData, setClientData } = useClientContext();

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
      if (userResponse.ok) {
        const userData = await userResponse.json();
        const userId = userData.userId;

        localStorage.setItem("email", userData.user_email);

        const clientObject = clientData;

        const clientDataToSend = {
          ...clientObject,
          userId: userId,
        };


        const clientFormData = new FormData();
        for (const [key, value] of Object.entries(clientDataToSend)) {
          if (value instanceof File) {
            clientFormData.append(key, value); 
          } else {
            clientFormData.append(key, String(value)); 
          }
        }

        const clientResponse = await fetch(CreateClient, {
          method: "POST",

          body: clientFormData,
        });

        if (clientResponse.ok) {
          const email = localStorage.getItem("email");

          toast({
            variant: "success",
            title: "Successful",
            description: `All set! please verify your email sent to ${email}`,
          });

          setTimeout(() => {
            setClientData({
              clientName: "",
              clientEmail: "",
              physicalAddress: "",
              clientPhoneNumber: "",
              certificateOfIncorparation: "",
            });
            handleClick();
          }, 2000);
        } else {
          const clientError = await clientResponse.json();
          toast({
            variant: "destructive",
            title: "Failure",
            description: `Client creation failed. ${clientError.message}`,
          });
        }
      } else {
        const userError = await userResponse.json();
        toast({
          variant: "destructive",
          title: "Failure",
          description: `User creation failed. ${userError.message}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: `${error}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid  grid-cols-2 relative  space-y-2"
      >
        <div className=" col-span-2 flex justify-between gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name..."
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
                    placeholder="Your last name..."
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
                  max={
                    new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
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
                Password must be at least 8 characters long, and include at
                least one lowercase letter, one uppercase letter, one number,
                and one special character.
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
          <Button
            type="submit"
            className="w-full my-4 bg-primary"
            disabled={!termsAccepted || submitting}
          >
            {submitting ? "Registering..." : " Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
