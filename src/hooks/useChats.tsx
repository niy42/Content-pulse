import { api } from "@/api/client";
import { getUserId } from "@/lib/user";
import { useEffect, useRef, useState } from "react";

export function useChat() {
  const [chats, setChats] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = getUserId();

  // 🔥 track active stream
  const streamRef = useRef<EventSource | null>(null);

  // -------------------------
  // 📚 Load Chats
  // -------------------------
  const loadChats = async () => {
    const res = await api.get(`/chats?user_id=${userId}`);
    setChats(res.data);
  };

  // -------------------------
  // 💬 Open Chat
  // -------------------------
  const openChat = async (chatId: string) => {
    // ❌ close any active stream
    if (streamRef.current) {
      streamRef.current.close();
      streamRef.current = null;
    }

    const res = await api.get(`/chats/${chatId}`);
    setCurrentChatId(chatId);
    setMessages(res.data.messages);
  };

  // -------------------------
  // ➕ New Chat
  // -------------------------
  const createChat = async () => {
    const res = await api.post(`/chats`, { user_id: userId });

    setCurrentChatId(res.data.id);
    setMessages([]);

    await loadChats();
  };

  // -------------------------
  // ⚡ STREAM CHAT (SSE)
  // -------------------------
  const streamChat = (chatId: string) => {
    // ❌ prevent multiple streams
    if (streamRef.current) {
      streamRef.current.close();
    }

    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}/chats/${chatId}/stream`,
    );

    streamRef.current = es;

    let currentMessage = "";

    // 🧠 full message fallback (if backend sends full messages)
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setMessages(data);
        }
      } catch {
        // ignore if not JSON
      }
    };

    // 🔥 streaming chunks (preferred)
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

        return updated;
      });
    });

    // ✅ stream finished
    es.addEventListener("end", () => {
      setLoading(false);
      currentMessage = "";

      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }

      loadChats(); // refresh sidebar titles
    });

    // ❌ error handling
    es.onerror = () => {
      setLoading(false);

      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }
    };
  };

  // -------------------------
  // 🚀 Send Message
  // -------------------------
  const sendMessage = async (content: string) => {
    if (loading) return;

    let chatId = currentChatId;

    try {
      // 🆕 create chat if none
      if (!chatId) {
        const res = await api.post(`/chats`, { user_id: userId });
        chatId = res.data.id;

        setCurrentChatId(chatId);
        setMessages([]);
      }

      // ⚡ optimistic UI
      setMessages((prev) => [...prev, { role: "user", content }]);

      setLoading(true);

      // 📡 send message
      await api.post(`/chats/${chatId}/messages`, { content });

      // 🔥 start streaming
      streamChat(chatId!);
    } catch (err: any) {
      setLoading(false);

      const message = err?.response?.data?.detail || "Something went wrong";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: {
            error: message,
          },
          isError: true,
        },
      ]);
    }
  };

  // -------------------------
  // 🧹 Cleanup on unmount
  // -------------------------
  useEffect(() => {
    loadChats();

    return () => {
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
  };
}
