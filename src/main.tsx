import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster
      position="top-center"
      theme="dark"
      toastOptions={{ style: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } }}
    />
  </>
);
