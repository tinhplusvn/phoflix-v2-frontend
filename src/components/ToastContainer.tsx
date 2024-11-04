import { Toaster } from "react-hot-toast";

const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{
        className: "",
        duration: 2000,
      }}
    />
  );
};

export default ToastContainer;
