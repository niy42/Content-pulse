// src/app/App.tsx
import { useState } from "react";
import Home from "./pages/Home";
import Processing from "./pages/Processing";
import Results from "./pages/Results";

type View = "home" | "processing" | "results";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [data, setData] = useState<any>(null);

  // 🔥 Simulated flow (replace with real API later)
  const handleGenerate = async (_url: string) => {
    setView("processing");

    try {
      // Simulate backend delay
      await new Promise((res) => setTimeout(res, 2000));

      const mock = {
        hooks: ["Hook 1", "Hook 2", "Hook 3"],
        insights: ["Insight 1", "Insight 2"],
        contrarian: ["Take 1", "Take 2"],
        summary: "This video explains how AI is transforming content...",
        quotes: ["Quote 1", "Quote 2"],
      };

      setData(mock);
      setView("results");
    } catch (err) {
      console.error(err);
      setView("home");
    }
  };

  // const handleGenerate = async (url: string) => {
  //   if (!url) return;

  //   setView("processing");

  //   try {
  //     const res = await api.post("/process-video", {
  //       url,
  //     });

  //     setData(res.data);
  //     setView("results");
  //   } catch (err: any) {
  //     console.error(err);

  //     alert(
  //       err?.response?.data?.message ||
  //       "Something went wrong. Try again."
  //     );

  //     setView("home");
  //   }
  // };

  return (
    <>
      {view === "home" && <Home onGenerate={handleGenerate} />}

      {view === "processing" && <Processing />}

      {view === "results" && (
        <Results data={data} onBack={() => setView("home")} />
      )}
    </>
  );
}
