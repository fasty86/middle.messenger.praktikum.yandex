import { ChatController } from "../framework/Store/controllers/chatController";
import store from "../framework/Store/Store";

export async function watchChatData() {
  await ChatController.get_chat_list();
  const interValId: ReturnType<typeof setInterval> = setInterval(async () => {
    const activeChatId = store.getState().activeChat?.chatId || null;
    await ChatController.get_chat_list();
    if (activeChatId) await ChatController.get_chat_users(Number(activeChatId));
  }, 5000);
  store.set("chatInterValId", interValId);
  return interValId;
}
