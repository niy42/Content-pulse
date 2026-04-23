import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ChatProvider } from "./context/ChatContext.tsx";
import { ToastProvider } from "./context/ToastProvider.tsx";
import { UIProvider } from "./context/UIContext.tsx";
import { UserProvider } from "./context/UserProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <UIProvider>
        <ToastProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ToastProvider>
      </UIProvider>
    </UserProvider>
  </StrictMode>,
);
