// src/components/library/LibraryDrawer.tsx

import { api } from "@/api/client";
import { getUserId } from "@/lib/user";
import { useEffect, useState } from "react";
import LibraryItem from "./LibraryItem";

export default function LibraryDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      const userId = getUserId();
      const res = await api.get(`/jobs?user_id=${userId}`);
      setJobs(res.data);
    };

    load();
  }, [open]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-black/90 border-l border-white/10 backdrop-blur-xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between border-b border-white/10">
        <h2 className="text-sm font-semibold">Library</h2>
        <button onClick={onClose}>Close</button>
      </div>

      {/* Items */}
      <div className="p-3 space-y-2 overflow-y-auto">
        {jobs.map((job) => (
          <LibraryItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}