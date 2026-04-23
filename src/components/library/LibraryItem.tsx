import { useChatContext } from "@/context/ChatContext";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function LibraryItem({
  chat,
  onOpen,
  isActive,
}: {
  chat: any;
  onOpen: (id: string) => void;
  isActive: boolean;
}) {
  const { deleteChat, renameChat } = useChatContext();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  return (
    <div
      onClick={() => onOpen(chat.id)}
      className={`p-3 rounded cursor-pointer group transition ${
        isActive ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
      }`}
    >
      {/* Title */}
      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            setEditing(false);
            if (title !== chat.title) {
              renameChat(chat.id, title); // ✅ correct place
            }
          }}
          className="bg-transparent text-sm outline-none w-full"
          autoFocus
        />
      ) : (
        <div className="text-sm font-medium truncate">{chat.title}</div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs text-white/40">
          {chat.status === "processing" ? "Processing..." : "Completed"}
        </div>

        {/* Actions */}
        <div className="group-hover:flex items-center gap-2 text-white/60">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
            className="hidden p-1 hover:text-white transition"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteChat(chat.id);
            }}
            className="p-1 hover:text-red-400 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
