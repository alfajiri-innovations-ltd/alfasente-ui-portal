import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area"


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
import { getClient, setClient } from "@/lib/cookies/UserMangementCookie";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const FormSchema = z.object({
  client: z.object({
    clientName: z.string().min(2, {
      message: "Field is required",
    }),
    walletBalance: z.number().min(0),
    isApproved: z.boolean(),
    clientEmail: z.string().email({ message: "Invalid email address" }).min(1, {
      message: "Field is required",
    }),
    physicalAddress: z.string().min(2, { message: "Field is required" }),
    clientPhoneNumber: z.string().min(2, { message: "Field is required" }),
    certificateOfIncorparation: z
      .string()
      .url({ message: "Invalid URL" })
      .min(2, {
        message: "Field is required",
      }),
  }),

  user: z.object({
    firstName: z.string().min(2, {
      message: "Field is required",
    }),
    role_name: z.string(),
    isEmailVerified: z.boolean(),
    user_email: z.string().min(2, { message: "Field is Required" }).email(),
    date_of_birth: z.string().min(2, { message: "Field is Required" }),
    lastName: z.string().min(2, { message: "Field is Required" }),

    password: z.string().min(8, { message: "Field is Required" }),
  }),
});

export interface IOrganizationDetailsFormProps {
  handleClick?: () => void;
}

export function OrganizationForm({
  handleClick,
}: IOrganizationDetailsFormProps) {
  const client = getClient() || {};
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      client: {
        clientName: client.clientName || "",
        clientPhoneNumber: client.clientPhoneNumber || "",
        clientEmail: client.clientEmail || "",
        walletBalance: client.walletBalance || 0,
        isApproved: client.isApproved || false,
        certificateOfIncorparation: client.certificateOfIncorparation || "",
        physicalAddress: client.physicalAddress || "",
      },
      user: {
        firstName: "",
        lastName: "",
        role_name: "",
        isEmailVerified: true,
        user_email: "",
        date_of_birth: "",
        password: "",
      },
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Submitted Data:", data);

    handleClick?.();
  };

  return (
    <ScrollArea className="h-96 ">

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  grid grid-cols-2 gap-5"
      >
        <FormField
          control={form.control}
          name="client.clientName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="XXX Company"
                  className="focus-visible:ring-0 shadow-none border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client.clientEmail"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Organization Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@gmail.com"
                  className="border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client.clientPhoneNumber"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+256 7XX XXX XXX"
                  className="border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client.physicalAddress"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Physical Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="District/City"
                  className="border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client.certificateOfIncorparation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Certificate of Incorporation Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.example.com"
                  className="border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <span className="col-span-2">Admin User Details</span>

        <FormField
          control={form.control}
          name="user.firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
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
          name="user.lastName"
          render={({ field }) => (
            <FormItem className="col-span-1">
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

        <FormField
          control={form.control}
          name="user.user_email"
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
          name="user.date_of_birth"
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
          name="user.password"
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

              <FormMessage />
            </FormItem>
          )}
        />


        <Button  className="col-span-2">Add Organization</Button>
      </form>
    </Form>
    </ScrollArea>

  );
}
