import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (error?.isAxiosError) {
    var err = error.response;

    if (Array.isArray(err?.data)) {
      for (let val of err.data) {
        toast.warning(val.description);
      }
    } 
    else if (err?.data?.errors && typeof err.data.errors === "object") {
      for (let e in err.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } 
    else if (err?.status === 401) {
      toast.warning(err.data || "Unauthorized. Please login.");
      window.history.pushState({}, "LoginPage", "/login");
    } 
    else if (err?.data) {
      toast.warning(err.data);
    }
  } else if (error?.message) {
    toast.warning(error.message);
  }
};