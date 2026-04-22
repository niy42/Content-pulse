import { useChatContext } from "@/context/ChatContext";
import { groupChats } from "@/utils/helper";
import LibraryItem from "./LibraryItem";

export default function LibraryDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { chats, openChat, currentChatId } = useChatContext();

  const { today, yesterday, older } = groupChats(chats);

  function SkeletonItem() {
    return (
      <div className="p-3 rounded bg-white/5 animate-pulse">
        <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-white/10 rounded w-1/3"></div>
      </div>
    );
  }

  const Section = ({ title, items }: { title: string; items: any[] }) =>
    items.length > 0 && (
      <div>
        <div className="text-xs text-white/40 px-2 py-2">{title}</div>
        <div className="space-y-1">
          {items.map((chat) => (
            <LibraryItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === currentChatId}
              onOpen={openChat}
            />
          ))}
        </div>
      </div>
    );

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

      {/* Content */}
      <div className="p-3 space-y-4 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <SkeletonItem key={i} />
            ))}
          </div>
        ) : (
          <>
            <Section title="Today" items={today} />
            <Section title="Yesterday" items={yesterday} />
            <Section title="Older" items={older} />
          </>
        )}
      </div>
    </div>
  );
}
