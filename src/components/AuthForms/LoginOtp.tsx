import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setUserToken } from "@/lib/cookies/UserMangementCookie";

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
import { VerifyLoginOtp } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  pin: z.number().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
interface IEmailOtpProps {
  resetTimer: boolean;
  email: string;
}

export function LoginOtpForm({ resetTimer, email }: IEmailOtpProps) {
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: 0,
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
    form.setValue("pin", parseInt(value, 10));
  }
  const onSubmit = async () => {
    setSubmitting(true);
    const otpNumber = parseInt(value, 10);

    try {
      const response = await fetch(VerifyLoginOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          otp: otpNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserToken(data.token);
        setAuthUser(data.userData);
        setTimeout(() => {
          toast({
            variant: "success",
            title: "Successful",
            description: "Login Successful , Redirecting...",
          });
        }, 1000);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Failure",
          description: "Invalid OTP.",
        });

        form.reset();
        setValue("");
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
        className="w-full  flex flex-col px-0  space-y-6 "
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
          className="w-full h-11 rounded-[8px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </Form>
  );
}
