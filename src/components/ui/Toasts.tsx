import { toast } from "sonner";

const ErrorToast = (data: String | any, styles?: Object) => {
  return toast.error(
    data,
    styles != null
      ? styles
      : {
          style: {
            backgroundColor: "#F443361A",
            color: "#F44336",
            border: "1px solid #F4433680",
          },
        },
  );
};

const SuccessToast = (data: String | any, styles?: Object) => {
  return toast.success(
    data,
    styles != null
      ? styles
      : {
          style: {
            background: "#007BFF1A",

            color: "#007BFF",
            border: "1px solid #007BFF80",
          },
        },
  );
};

export { ErrorToast, SuccessToast };
