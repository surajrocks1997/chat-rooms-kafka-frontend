import { toast } from "react-toastify";

export const generateToastifyError = (error) => {
    toast.error(error);
};
