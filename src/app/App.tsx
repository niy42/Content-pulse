import { api } from "@/api/client";
import { getUserId } from "@/lib/user";
import ChatScreen from "@/pages/ChatScreen";
import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const updateLastMessage = (updates: any) => {
    setMessages((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];

      if (last?.role === "assistant") {
        last.content = { ...last.content, ...updates };
      }

      return copy;
    });
  };

  const pollJob = async (jobId: string) => {
    while (true) {
      const res = await api.get(`/job/${jobId}`);

      if (res.data.status === "completed") {
        const data = res.data.result;

        updateLastMessage({ hooks: data.hooks });
        await delay(500);

        updateLastMessage({ insights: data.insights });
        await delay(500);

        updateLastMessage({ contrarian: data.contrarian });
        await delay(500);

        updateLastMessage({ summary: data.summary });

        setLoading(false);
        break;
      }

      if (res.data.status === "failed") {
        setLoading(false);
        break;
      }

      await delay(2000);
    }
  };

  const handleGenerate = async (url: string) => {
    setLoading(true);

    const userId = getUserId();
    console.log("User ID:", userId);

    setMessages((prev) => [
      ...prev,
      { role: "user", url },
      {
        role: "assistant",
        content: {
          hooks: null,
          insights: null,
          contrarian: null,
          summary: null,
        },
      },
    ]);

    try {
      const res = await api.post("/start-job", {
        url,
        user_id: userId,
      });

      // 🚫 backend rejected request
      if (res.data?.error === "LIMIT_REACHED") {
        setLoading(false);
        alert(res.data.message);
        return;
      }

      pollJob(res.data.job_id);
    } catch (err: any) {
      setLoading(false);

      // handle backend errors safely
      const detail = err?.response?.data?.detail;
      const message = err?.response?.data?.detail || "Something went wrong";

      if (detail) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: {
              hooks: null,
              insights: null,
              contrarian: null,
              summary: null,
              error: message,
            },
            isError: true,
          },
        ]);
      }
    }
  };

  return (
    <ChatScreen
      messages={messages}
      loading={loading}
      onGenerate={handleGenerate}
    />
  );
}
