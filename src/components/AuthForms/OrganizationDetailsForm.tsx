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
import { useClientContext } from "@/hooks/ClientContext";

const FormSchema = z.object({
  clientName: z.string().min(2, {
    message: "Field is required",
  }),
  clientEmail: z.string().email({ message: "Invalid email address" }).min(1, {
    message: "Field is required",
  }),
  physicalAddress: z.string().min(2, { message: "Field is required" }),
  clientPhoneNumber: z.string().min(2, { message: "Field is required" }),
  certificateOfIncorparation: z
    .any()
    .refine((file) => file?.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

export interface IOrganizationDetailsFormProps {
  handleClick: () => void;
}

export function OrganizationDetailsForm({
  handleClick,
}: IOrganizationDetailsFormProps) {
  const { clientData, setClientData } = useClientContext();

  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clientName: clientData?.clientName || "",
      clientPhoneNumber: clientData?.clientPhoneNumber || "",
      clientEmail: clientData?.clientEmail || "",

      certificateOfIncorparation:
        clientData?.certificateOfIncorparation || null,
      physicalAddress: clientData?.physicalAddress || "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Submitted Data:", data);
    setClientData({
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      physicalAddress: data.physicalAddress,
      clientPhoneNumber: data.clientPhoneNumber,
      certificateOfIncorparation: data.certificateOfIncorparation, // This is the File object
    });

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
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>Certificate of Incorporation</FormLabel>
              <FormControl>
                <div>
                  <input
                    id="certificate-upload"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

                      if (file.size > maxSizeInBytes) {
                        alert(
                          "File size exceeds 5MB. Please choose a smaller file."
                        );
                        e.target.value = "";
                        setFileName(null); // Reset the input
                        return;
                      }
                      setFileName(file.name); // Save the name
                      onChange(file);
                    }}
                    ref={ref}
                  />

                  <label
                    htmlFor="certificate-upload"
                    className="block cursor-pointer text-xs bg-[#EDF0F7] text-gray-700 border border-[#DCE1EC] rounded-md px-4 py-2 text-center hover:bg-[#e2e6f0] transition"
                  >
                    <span className="text-primary underline">Upload</span> file
                    (.pdf)(max 5MB)
                    {fileName && (
                      <span className="mt-2 font-bold text-sm text-gray-600">
                        <span className="font-medium">{fileName}</span>
                      </span>
                    )}
                  </label>
                </div>
              </FormControl>
              <FormDescription>
                Upload a scanned PDF or image of the Certificate of
                Incorporation.
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
