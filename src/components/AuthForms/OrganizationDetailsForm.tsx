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
import { getClient, setClient } from "@/lib/cookies/UserMangementCookie";

const FormSchema = z.object({
  clientName: z.string().min(2, {
    message: "Field is required",
  }),
  walletBalance: z.number().min(0),
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
});

export interface IOrganizationDetailsFormProps {
  handleClick: () => void;
}

export function OrganizationDetailsForm({
  handleClick,
}: IOrganizationDetailsFormProps) {
  const client = getClient() || {};

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientName: client.clientName || "",
      clientPhoneNumber: client.clientPhoneNumber || "",
      clientEmail: client.clientEmail || "",
      walletBalance: client.walletBalance || 0,

      certificateOfIncorparation: client.certificateOfIncorparation || "",
      physicalAddress: client.physicalAddress || "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Submitted Data:", data);
    setClient(data);
    handleClick();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="XXX Company"
                  className="focus-visible:ring-0 shadow-none border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide the full legal name as it appears on government
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
          name="clientPhoneNumber"
          render={({ field }) => (
            <FormItem>
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
          name="physicalAddress"
          render={({ field }) => (
            <FormItem>
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
          name="certificateOfIncorparation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate of Incorporation Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.example.com"
                  className="border-[#DCE1EC]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a link to the Certificate of Incorporation that can be
                viewed online.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
