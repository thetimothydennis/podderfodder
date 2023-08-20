import { toast } from "react-toastify";

export function updateToast(toastId, render) {
    return toast.update(toastId, {
        render: render,
        type: "success",
        isLoading: false,
        autoClose: 250,
        className: "toastMessage"
    })
}