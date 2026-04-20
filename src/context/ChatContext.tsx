import { useChat } from "@/hooks/useChats";
import { createContext, useContext } from "react";

const ChatContext = createContext<any>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const chat = useChat();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export const useChatContext = () => useContext(ChatContext);
