export function groupChats(chats: any[]) {
  const today: any[] = [];
  const yesterday: any[] = [];
  const older: any[] = [];

  const now = new Date();

  chats.forEach((chat) => {
    const date = new Date(chat.created_at);
    const diff = now.getTime() - date.getTime();

    const oneDay = 1000 * 60 * 60 * 24;

    if (diff < oneDay) {
      today.push(chat);
    } else if (diff < oneDay * 2) {
      yesterday.push(chat);
    } else {
      older.push(chat);
    }
  });

  return { today, yesterday, older };
}
