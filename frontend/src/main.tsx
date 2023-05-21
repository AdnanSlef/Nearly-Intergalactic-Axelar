import React from "react";
import ReactDOM from "react-dom/client";
import ProgressBar from "@ramonak/react-progress-bar";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProgressBar completed={40} />
    <App />
  </React.StrictMode>
);
