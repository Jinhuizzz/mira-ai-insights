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
      toastOptions={{
        style: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'hsl(210 100% 65% / 0.9)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '14px',
          border: 'none',
          backdropFilter: 'blur(12px)',
        }
      }}
    />
  </>
);
