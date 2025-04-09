import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { UsersProvider } from "./contexts/UsersContext/provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
  </StrictMode>
);
