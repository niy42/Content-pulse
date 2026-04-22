import { api } from "@/api/client";
import { getUserId } from "@/lib/user";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: any;
  isError?: boolean;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
};

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const loadingChatsRef = useRef(false);

  const userId = getUserId();

  // 🔥 refs
  const streamRef = useRef<EventSource | null>(null);
  const messagesCache = useRef<Record<string, Message[]>>({});

  // -------------------------
  // 📚 Load Chats
  // -------------------------
  const loadChats = async () => {
    if (loadingChatsRef.current) return;
    loadingChatsRef.current = true;

    try {
      const res = await api.get(`/chats?user_id=${userId}`);
      setChats(res.data);
    } catch (err) {
      console.error("Failed to load chats");
    }
  };

  // -------------------------
  // 💬 Open Chat
  // -------------------------
  const openChat = async (chatId: string) => {
    // close stream
    if (streamRef.current) {
      streamRef.current.close();
      streamRef.current = null;
    }

    setCurrentChatId(chatId);

    // ⚡ instant render from cache
    if (messagesCache.current[chatId]) {
      setMessages(messagesCache.current[chatId]);
    }

    try {
      const res = await api.get(`/chats/${chatId}`);
      setMessages(res.data.messages);
      messagesCache.current[chatId] = res.data.messages;
    } catch {
      console.error("Failed to open chat");
    }
  };

  // -------------------------
  // ➕ Create Chat (Optimistic)
  // -------------------------
  const createChat = async () => {
    const tempId = crypto.randomUUID();

    const optimisticChat: Chat = {
      id: tempId,
      title: "New Chat",
      messages: [],
      created_at: new Date().toISOString(),
    };

    setChats((prev) => [optimisticChat, ...prev]);
    setCurrentChatId(tempId);
    setMessages([]);

    try {
      const res = await api.post(`/chats`, { user_id: userId });

      setChats((prev) =>
        prev.map((chat) => (chat.id === tempId ? res.data : chat)),
      );

      setCurrentChatId(res.data.id);
    } catch {
      // rollback
      setChats((prev) => prev.filter((c) => c.id !== tempId));
    }
  };

  // -------------------------
  // ⚡ STREAM CHAT (SSE)
  // -------------------------
  const streamChat = (chatId: string) => {
    if (streamRef.current) {
      streamRef.current.close();
    }

    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}/chats/${chatId}/stream`,
    );

    streamRef.current = es;

    let currentMessage = "";

    // full sync fallback
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setMessages(data);
          messagesCache.current[chatId] = data;
        }
      } catch {}
    };

    // streaming chunks
    es.addEventListener("chunk", (event: MessageEvent) => {
      currentMessage += event.data;

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];

        if (last?.role === "assistant") {
          last.content = currentMessage;
        } else {
          updated.push({ role: "assistant", content: currentMessage });
        }

        messagesCache.current[chatId] = updated;
        return updated;
      });
    });

    // end
    es.addEventListener("end", () => {
      setLoading(false);
      currentMessage = "";

      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }

      loadChats(); // refresh sidebar
    });

    // error fallback
    es.onerror = () => {
      setLoading(false);

      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }

      // 🔁 recover
      loadChats();
      openChat(chatId);
    };
  };

  // -------------------------
  // 🚀 Send Message
  // -------------------------
  const sendMessage = async (content: string) => {
    if (loading) return;

    let chatId = currentChatId;

    try {
      // create chat if needed
      if (!chatId) {
        const res = await api.post(`/chats`, { user_id: userId });
        chatId = res.data.id;

        setCurrentChatId(chatId);
        setMessages([]);
      }

      // ⚡ optimistic message
      setMessages((prev) => {
        const updated = [...prev, { role: "user", content } as Message];
        messagesCache.current[chatId!] = updated;
        return updated;
      });

      // ⚡ update sidebar title instantly
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, title: content.slice(0, 50) } : chat,
        ),
      );

      setLoading(true);

      await api.post(`/chats/${chatId}/messages`, { content });

      streamChat(chatId!);
    } catch (err: any) {
      setLoading(false);

      const message =
        err?.response?.data?.detail?.message || "Something went wrong";
      const action = err?.response?.data?.detail?.action;
      const subMessage = err?.response?.data?.detail?.sub_message;
      const title = err?.response?.data?.detail?.title || "Error";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: {
            title,
            error: message,
            subMessage,
            action,
          },
          isError: true,
        },
      ]);
    }
  };

  const deleteChat = async (chatId: string) => {
    await api.delete(`/chats/${chatId}`);
    setChats((prev) => prev.filter((c) => c.id !== chatId));
  };

  const renameChat = async (chatId: string, title: string) => {
    await api.patch(`/chats/${chatId}`, { title });

    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, title } : c)),
    );
  };

  // -------------------------
  // 🔁 Background Sync
  // -------------------------
  useEffect(() => {
    if (userId) loadChats();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(loadChats, 10000);

    const onFocus = () => loadChats();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);

      if (streamRef.current) {
        streamRef.current.close();
      }
    };
  }, []);

  return {
    chats,
    currentChatId,
    messages,
    loading,
    createChat,
    openChat,
    sendMessage,
    deleteChat,
    renameChat,
    loadChats, // exposed
  };
}
