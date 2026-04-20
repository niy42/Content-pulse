import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ChatProvider } from "./context/ChatContext.tsx";
import { ToastProvider } from "./context/ToastProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ToastProvider>
  </StrictMode>,
);
