import React from "react";
import { ToastContainer } from "react-toastify";

const Notification = () => (
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
    />
);

export default Notification;