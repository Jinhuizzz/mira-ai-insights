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
      duration={1000}
      style={{ top: '50%', transform: 'translateY(-50%)' }}
      toastOptions={{
        style: {
          background: 'linear-gradient(135deg, hsl(212 58% 18% / 0.95), hsl(210 100% 65% / 0.15))',
          color: '#fff',
          border: '1px solid hsl(210 100% 65% / 0.2)',
          backdropFilter: 'blur(16px)',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 500,
          textAlign: 'center' as const,
        }
      }}
    />
  </>
);
