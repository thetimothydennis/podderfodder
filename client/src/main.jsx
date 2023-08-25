import React from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/browser-router.jsx";
import "./stylesheets/App.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
