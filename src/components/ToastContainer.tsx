import { Toaster } from "react-hot-toast";

const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={true}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
};

export default ToastContainer;
