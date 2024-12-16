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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function EmailOtpForm({ resetTimer }: { resetTimer: boolean }) {
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (resetTimer) {
      setTimeLeft(600);
    }
  }, [resetTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  function handleOtpChange(value: string) {
    setValue(value);
    form.setValue("pin", value);
  }
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-4 md:w-full flex flex-col justify-center items-center space-y-6 "
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  value={value}
                  onChange={handleOtpChange}
                >
                  <InputOTPGroup className="">
                    <InputOTPSlot index={0} className="w-10 h-10" />
                    <InputOTPSlot index={1} className="w-10 h-10" />
                    <InputOTPSlot index={2} className="w-10 h-10" />
                  </InputOTPGroup>

                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-10 h-10" />
                    <InputOTPSlot index={4} className="w-10 h-10" />
                    <InputOTPSlot index={5} className="w-10 h-10" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="w-full md:w-[417px]">
                Code expires in {formatTime(timeLeft)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-[417px] h-11 rounded-[8px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </Form>
  );
}
