import { useChatContext } from "@/context/ChatContext";
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
        <div className="group-hover:flex gap-2 text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            ✏️
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteChat(chat.id); // ✅ correct place
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
