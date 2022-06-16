import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FormStepProvider } from "./FormStepContext";
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FormStepProvider>
      <App />
    </FormStepProvider>
  </React.StrictMode>
);
