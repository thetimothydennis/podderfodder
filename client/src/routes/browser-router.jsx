import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesUi from "./routes.jsx";
import { apiCall } from "../functions/api-call.jsx";

import { io } from "socket.io-client";

function toastError(arg) {
  return toast.error(arg, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toastMessage",
    autoClose: 2500,
  });
}

function toastSuccess(arg) {
  return toast.success(arg, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toastMessage",
    autoClose: 2500,
  });
}

function App() {
  const [toastErr, setToastErr] = useState("");
  const [toastSucc, setToastSucc] = useState("");

  useEffect(() => {
    const socket = io(apiCall);

    function onToastieError(value) {
      setToastErr(value.message);
    }

    function onToastieSuccess(value) {
      setToastSucc(value.message);
    }

    socket.on("error", onToastieError);

    socket.on("success", onToastieSuccess);

    return () => {
      setTimeout(() => {
        socket.off("error", onToastieError);
        socket.off("success", onToastieSuccess);
      }, 2000);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (toastErr !== "") {
      toastError(toastErr);
    }
  }, [toastErr]);

  useEffect(() => {
    if (toastSucc !== "") {
      toastSuccess(toastSucc);
    }
  }, [toastSucc]);

  return (
    <BrowserRouter>
      <RoutesUi />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
