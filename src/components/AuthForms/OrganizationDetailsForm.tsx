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

const FormSchema = z.object({
  clientName: z.string().min(2, {
    message: "Field is required",
  }),
  walletBalance: z.number().min(0),
  isApproved: z.boolean(),
  clientEmail: z.string().min(2, { message: "Field is Required" }),
  physicalAddress: z.string().min(2, { message: "Field is Required" }),
  clientPhoneNumber: z.string().min(2, { message: "Field is Required" }),

  certificateOfIncorparation: z
    .string()
    .min(2, { message: "Field is Required" }),
});

export interface IOrganizationDetailsFormProps {
  handleClick: () => void;
}
export function OrganizationDetailsForm({
  handleClick,
}: IOrganizationDetailsFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientName: "",
      clientPhoneNumber: "",
      clientEmail: "",
      walletBalance: 0,
      isApproved: false,
      certificateOfIncorparation: "",
      physicalAddress: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    handleClick();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation name</FormLabel>
              <FormControl>
                <Input
                  placeholder="XXX Company"
                  className="focus-visible:ring-0 shadow-none border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide full legal name as appears on government
                certification.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@gmail.com"
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
          name="clientPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+256 7XX XXX XXX"
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
          name="physicalAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical address</FormLabel>
              <FormControl>
                <Input
                  placeholder="District/City"
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
          name="certificateOfIncorparation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to the Certificate of Incorporation</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.example.com"
                  className=" border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide a link to the Certificate of Incorporation that
                can be viewed online.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <Button type="submit" className="w-full">
            Continue{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
