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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  InviteUser } from "@/lib/api-routes";
import { useUser } from "@/hooks/UserContext";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Field is required",
  }),
  role_name: z.string(),
  isEmailVerified: z.boolean(),
  user_email: z.string().min(2, { message: "Field is Required" }).email(),
  date_of_birth: z.string().min(2, { message: "Field is Required" }),
  lastName: z.string().min(2, { message: "Field is Required" }),
  clientID: z.number(),
  password: z.string().min(8, { message: "Field is Required" }),
});

interface IUserDetailsFormProps {
  onClose: () => void;
}
export function InviteStaffForm({ onClose }: IUserDetailsFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const user = useUser();
  const token = getUserToken();

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
      role_name: "",
      clientID: user?.clientID,
      isEmailVerified: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);

    try {
      const userResponse = await fetch(InviteUser, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (userResponse.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: "Invitation sent successfully",
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
       toast({
          variant: "destructive",
          title: "Failure",
          description: "Unexpected server reponse",
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
        <span className="col-span-2"></span>
        <FormField
          control={form.control}
          name="user_email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel> Email</FormLabel>
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
          name="role_name"
          render={({ field }) => (
            <FormItem className="space-y-1 col-span-2 ">
              <FormLabel> Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client_employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="Enter their password"
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

        <div className="col-span-2 ">
          <Button
            type="submit"
            className="w-full my-4 bg-[#8D35AA]"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : " Invite Staff"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
